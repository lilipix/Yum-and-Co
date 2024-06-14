import {
  DropdownMenuItem,
  DropdownMenuSub,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";

import { SelectOption } from "./CreateSelect";
import { ColorTelltale } from "@/components/ui/colorTelltale";
import { ColorPalette, ColorTelltaleVariant } from "@/validators/tag";

type ColorSelectItemMenuProps = {
  onChangeColor: (color: ColorPalette) => void;
  option: SelectOption;
};

const ColorSelectItemMenu = ({
  option,
  onChangeColor,
}: ColorSelectItemMenuProps) => {
  const colors: ColorTelltaleVariant[] = [
    "default",
    "secondary",
    "destructive",
    "info",
    "success",
    "warning",
    "pinkdark",
    "purple",
    "orange",
  ];

  return (
    <DropdownMenuSub>
      <div className="flex flex-col">
        <DropdownMenuLabel>Choisissez une couleur</DropdownMenuLabel>
        {colors.map((color) => (
          <DropdownMenuItem
            key={color}
            className="gap-2 hover:cursor-pointer"
            onClick={() => onChangeColor(color as ColorPalette)}
          >
            <ColorTelltale variant={color} />
            <span className="capitalize">
              {color === ColorPalette.DEFAULT ? "Primary" : color}
            </span>
          </DropdownMenuItem>
        ))}
      </div>
    </DropdownMenuSub>
  );
};

export default ColorSelectItemMenu;
