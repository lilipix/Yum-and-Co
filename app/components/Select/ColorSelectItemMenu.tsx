// import { DropdownMenuItem, DropdownMenuSubTrigger, DropdownMenuSub, DropdownMenuPortal, DropdownMenuSubContent, DropdownMenuLabel } from '@/components/ui/dropdown-menu';
// import { ColorPalette, ColorTelltaleVariant } from '@/types/ui.type';

// import { ColorTelltale } from '../../ui/colorTelltale';
// import { SelectOption } from './CreateSelect';

// type ColorSelectItemMenuProps = {
// 	onChangeColor: (color:ColorPalette) => void;
// 	option: SelectOption,
// };

// const ColorSelectItemMenu = ({ option, onChangeColor } : ColorSelectItemMenuProps) => {
// 	const colors: ColorTelltaleVariant[] = [
// 		'default',
// 		'secondary',
// 		'destructive',
// 		'info',
// 		'success',
// 		'warning',
// 		'purple',
// 		'yellow',
// 	];

// 	return (
// 		<DropdownMenuSub>
// 			<DropdownMenuSubTrigger className="flex gap-2">
// 				<ColorTelltale
// 					variant={ option.color || ColorPalette.SECONDARY }
// 				/>
// 				<span>Couleur</span>
// 			</DropdownMenuSubTrigger>
// 			<DropdownMenuPortal>
// 				<DropdownMenuSubContent>
// 					<DropdownMenuLabel>Choisissez une couleur</DropdownMenuLabel>
// 					{ colors.map((color) => (
// 						<DropdownMenuItem
// 							key={ color }
// 							className="gap-2 hover:cursor-pointer"
// 							onClick={ () => onChangeColor(color as ColorPalette) }
// 						>
// 							<ColorTelltale variant={ color } />
// 							<span className="capitalize">{ color === ColorPalette.DEFAULT ? 'Primary' : color }</span>
// 						</DropdownMenuItem>
// 					)) }
// 				</DropdownMenuSubContent>
// 			</DropdownMenuPortal>
// 		</DropdownMenuSub>
// 	);
// };

// export default ColorSelectItemMenu;
