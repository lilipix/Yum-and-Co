"use client";

import { MoreHorizontal } from "lucide-react";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

import { SelectOption } from "./CreateSelect";
import ColorSelectItemMenu from "./ColorSelectItemMenu";
import { ColorPalette } from "@/validators/tag";

type CreateSelectItemMenuProps = {
  option: SelectOption;
  onUpdateOption: (option: SelectOption) => void;
  debounceDelay?: number;
  enableColors?: boolean;
};

const CreateSelectItemMenu = ({
  enableColors,
  option,
  onUpdateOption,
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

  const handleChangeColor = (color: ColorPalette) => {
    onUpdateOption({
      ...option,
      color,
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        {enableColors ? (
          <Button className="h-8 w-8 p-0" variant="ghost">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        ) : null}
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {/* <DropdownMenuGroup className="gap-2 hover:cursor-pointer">
          <Input value={inputValue} onChange={handleChangeInputValue} />
        </DropdownMenuGroup> */}
        <DropdownMenuSeparator />
        {enableColors ? (
          <ColorSelectItemMenu
            option={option}
            onChangeColor={handleChangeColor}
          />
        ) : null}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default CreateSelectItemMenu;
