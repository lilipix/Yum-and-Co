"use client";

import { MoreHorizontal, Trash } from "lucide-react";
import { ChangeEventHandler, useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuGroup,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
// import { ColorPalette } from "@/types/ui.type";

import { SelectOption } from "./CreateSelect";
// import ColorSelectItemMenu from "./ColorSelectItemMenu";

type CreateSelectItemMenuProps = {
  option: SelectOption;
  onUpdateOption: (option: SelectOption) => void;
  onDeleteOption: (option: SelectOption) => void;
  debounceDelay?: number;
  enableColors?: boolean;
};

const CreateSelectItemMenu = ({
  enableColors,
  option,
  onUpdateOption,
  onDeleteOption,
  debounceDelay = 400,
}: CreateSelectItemMenuProps) => {
  const [inputValue, setInputValue] = useState<string>(option.label);

  useEffect(() => {
    let delay: NodeJS.Timeout;

    const handleClearDelay = () => {
      clearTimeout(delay);
    };

    if (inputValue) {
      handleClearDelay();
      delay = setTimeout(() => {
        onUpdateOption({
          ...option,
          label: inputValue.trim(),
        });
      }, debounceDelay);
    }

    return () => {
      handleClearDelay();
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputValue]);

  const handleChangeInputValue: ChangeEventHandler<HTMLInputElement> = (
    event,
  ) => {
    const { value } = event.currentTarget;
    setInputValue(value);
  };

  // const handleChangeColor = (color: ColorPalette) => {
  //   onUpdateOption({
  //     ...option,
  //     color,
  //   });
  // };

  const handleDeleteOption = () => onDeleteOption(option);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="h-8 w-8 p-0" variant="ghost">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuGroup className="gap-2 hover:cursor-pointer">
          <Input value={inputValue} onChange={handleChangeInputValue} />
        </DropdownMenuGroup>
        {/* <DropdownMenuSeparator />
        {enableColors ? (
          <ColorSelectItemMenu
            option={option}
            onChangeColor={handleChangeColor}
          />
        ) : null}
        <DropdownMenuItem
          className="gap-2 text-red-500 hover:cursor-pointer"
          onClick={handleDeleteOption}
        >
          <Trash size="16" /> Supprimer
        </DropdownMenuItem> */}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default CreateSelectItemMenu;
