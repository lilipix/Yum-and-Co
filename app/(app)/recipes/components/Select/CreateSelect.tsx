"use client";

import { Check, Loader2 } from "lucide-react";
import {
  ChangeEventHandler,
  FocusEventHandler,
  KeyboardEventHandler,
  MouseEventHandler,
  PropsWithChildren,
  useEffect,
  useRef,
  useState,
} from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import CreateSelectItemMenu from "./CreateSelectItemMenu";
import { ColorTelltale } from "@/components/ui/custom/colorTelltale";
import { ColorPalette } from "@/validators/tag";

export type SelectOption = {
  value: string;
  label: string;
  color?: ColorPalette;
};

type CreateSelectProps = PropsWithChildren<{
  options: SelectOption[];
  placeholder?: string;
  value: string | string[];
  onSelect: (value: string | string[]) => void;
  onCreateOption?: (value: string) => Promise<SelectOption | undefined>;
  onUpdateOption?: (option: SelectOption) => Promise<void>;
  onBlur?: FocusEventHandler<HTMLDivElement>;
  allowMultiple?: boolean;
  isLoading?: boolean;
  disabled?: boolean;
  enableColors?: boolean;
}>;

const CreateSelect = ({
  onBlur: handleBlur,
  value,
  onSelect,
  placeholder,
  allowMultiple = false,
  options: initialOptions,
  onCreateOption,
  onUpdateOption,
  isLoading,
  disabled,
  enableColors = false,
}: CreateSelectProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const inputRef = useRef<HTMLInputElement>(null);

  const [options, setOptions] = useState<SelectOption[]>(initialOptions);

  const [selectedOptions, setSelectedOptions] = useState<string[]>(
    typeof value === "string" ? [value] : value || [],
  );

  const [inputValue, setInputValue] = useState<string>("");

  useEffect(() => {
    if (allowMultiple) {
      onSelect(selectedOptions);
    } else {
      const [selectedOption] = selectedOptions;
      if (selectedOption) {
        onSelect(selectedOption);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedOptions]);

  useEffect(() => {
    if (inputValue) {
      setOptions(
        initialOptions.filter((option) =>
          option.label
            .toLowerCase()
            .trim()
            .includes(inputValue.toLowerCase().trim()),
        ),
      );
    } else {
      setOptions(initialOptions);
    }
  }, [inputValue, initialOptions]);

  const handleSelect =
    (option: SelectOption): MouseEventHandler<HTMLDivElement> =>
    () => {
      if (allowMultiple) {
        if (selectedOptions.includes(option.value)) {
          setSelectedOptions((prevSelectedOptions) =>
            prevSelectedOptions.filter(
              (prevOption) => prevOption !== option.value,
            ),
          );
        } else {
          setSelectedOptions((prevSelectedOptions) => {
            const newSelectedOptions = [...prevSelectedOptions, option.value];
            const orderedSelectedOptions = initialOptions.filter((o) =>
              newSelectedOptions.includes(o.value),
            );
            return orderedSelectedOptions.map((o) => o.value);
          });
        }
      } else {
        setSelectedOptions([option.value]);
      }
      setIsOpen(false);
      setInputValue("");
    };

  const handleChangeInputValue: ChangeEventHandler<HTMLInputElement> = (
    event,
  ) => setInputValue(event.target.value);

  const handleCreateOption = () => {
    if (inputValue && onCreateOption) {
      try {
        onCreateOption(inputValue)
          .then((option) => {
            if (option) {
              setSelectedOptions((prevSelectedOptions) => {
                if (allowMultiple) {
                  return [...prevSelectedOptions, option.value];
                } else {
                  return [option.value];
                }
              });
              setOptions((prevOptions) => [...prevOptions, option]);
              setInputValue("");
              setIsOpen(false);
            }
          })
          .catch((error) => {
            console.error("Error creating option:", error);
          });
      } catch (error) {
        console.error("Error in handleCreateOption function:", error);
      }
    }
  };

  const handleUpdateOption = async (option: SelectOption) => {
    if (onUpdateOption) {
      const currentOption = options.find((cO) => cO.value === option.value);
      if (currentOption && currentOption.color !== option.color) {
        const updatedOption = { ...currentOption, color: option.color };
        onUpdateOption(updatedOption);
      }
    }
  };

  const handleInputClick: MouseEventHandler<HTMLInputElement> = (event) => {
    event.preventDefault();
    inputRef.current?.focus();
    if (!isOpen && !disabled) {
      setIsOpen(true);
    }
  };

  const handleInputFocus: FocusEventHandler<HTMLInputElement> = () => {
    if (!isOpen && !disabled) {
      setIsOpen(true);
    }
  };

  const handleOpenChanged = (newIsOpen: boolean) => setIsOpen(newIsOpen);

  const handleKeyDown: KeyboardEventHandler<HTMLInputElement> = (event) => {
    if (event.key === "Backspace" && !inputValue) {
      setSelectedOptions((prevSelectedOptions) =>
        prevSelectedOptions.slice(0, -1),
      );
    }
    if (event.key === "Enter") {
      event.preventDefault();
      handleCreateOption();
    }
  };

  return (
    <Popover open={isOpen} onOpenChange={handleOpenChanged}>
      <PopoverTrigger asChild>
        <div
          aria-controls={isOpen ? "option-list" : undefined}
          aria-multiselectable={allowMultiple}
          className="flex min-h-10 w-full gap-2 rounded-md border border-input bg-background text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-within:outline-none focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          role="listbox"
          onClick={handleInputClick}
        >
          <div className="flex h-fit flex-wrap items-center gap-2 px-3 py-2">
            {selectedOptions.length > 0
              ? initialOptions
                  .filter((option) => selectedOptions.includes(option.value))
                  .map((option) => (
                    <Badge
                      key={option.value}
                      className="h-fit"
                      variant={option.color || ColorPalette.SECONDARY}
                    >
                      {option.label}
                    </Badge>
                  ))
              : null}
            <input
              aria-disabled={disabled}
              className="block w-full grow focus-visible:outline-none"
              disabled={disabled}
              placeholder={!inputValue ? placeholder : undefined}
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={handleChangeInputValue}
              onClick={handleInputClick}
              onFocus={handleInputFocus}
              onKeyDown={handleKeyDown}
            />
          </div>
        </div>
      </PopoverTrigger>
      <PopoverContent
        className="w-[--radix-popover-trigger-width] p-1"
        onBlur={handleBlur}
        onOpenAutoFocus={(event) => {
          event.preventDefault();
          inputRef.current?.focus();
        }}
      >
        {onCreateOption && allowMultiple ? (
          <div className="flex items-center justify-between p-2">
            <p className="text-sm text-muted-foreground">
              Sélectionnez ou créez des options.
            </p>
            {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
          </div>
        ) : (
          <div className="flex items-center justify-between p-2">
            <p className="text-sm text-muted-foreground">
              Sélectionnez ou créez une option.
            </p>
            {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
          </div>
        )}
        <div className="flex max-h-[300px] flex-col overflow-y-auto overflow-x-hidden">
          {options.map((option) => (
            <div
              key={option.value}
              className="relative flex w-full cursor-default select-none items-center justify-between rounded-sm text-sm outline-none hover:bg-accent hover:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
              role="option"
              aria-selected={selectedOptions.includes(option.value)}
            >
              <div
                className="relative flex flex-1 items-center rounded-sm py-1.5 pl-8 pr-2"
                role="menuitem"
                onClick={handleSelect(option)}
              >
                {value === option.value ||
                selectedOptions.includes(option.value) ? (
                  <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
                    <Check className="h-4 w-4" />
                  </span>
                ) : null}
                {enableColors ? (
                  <ColorTelltale
                    className="mr-2"
                    variant={option.color || ColorPalette.SECONDARY}
                  />
                ) : null}
                {option.label}
              </div>
              <CreateSelectItemMenu
                enableColors={enableColors}
                option={option}
                onUpdateOption={handleUpdateOption}
              />
            </div>
          ))}
          {onCreateOption &&
          inputValue &&
          !initialOptions.find(
            (option) =>
              option.label.trim().toLowerCase() ===
              inputValue.trim().toLowerCase(),
          ) ? (
            <Button
              className="justify-start px-2 py-1.5 text-sm"
              role="menuitem"
              type="button"
              variant="ghost"
              onClick={handleCreateOption}
            >
              Créer &quot;
              {inputValue}
              &quot;
            </Button>
          ) : null}
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default CreateSelect;
