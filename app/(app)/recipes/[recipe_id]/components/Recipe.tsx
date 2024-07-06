// import { Recipe } from '@/validators/recipe';

// interface RecipeProps {
//    recipe: Recipe;
//   }

//   const GeneralRecipeInformation = ({
//     recipe
//   }: RecipeProps) => {
//     const [numberOfServings, setNumberOfServings] =
//       React.useState<number>(numberOfPersons);
//     const onIncrementServings = () => setNumberOfServings(numberOfServings + 1);
//     const onDecrementServings = () => setNumberOfServings(numberOfServings - 1);

//     const adjustedIngredients = (ingredients ?? []).map((ingredient) => ({
//       ...ingredient,
//       baseQuantity:
//         ((ingredient.baseQuantity ? ingredient.baseQuantity : 0) *
//           (numberOfServings ? numberOfServings : 1)) /
//         (numberOfPersons ? numberOfPersons : 1),
//     }));

//     const totalIngredients = adjustedIngredients.length;
//     const halfLength = Math.ceil(totalIngredients / 2);
//     const firstColumnIngredients = adjustedIngredients.slice(0, halfLength);
//     const secondColumnIngredients = adjustedIngredients.slice(halfLength);

//     return (
//       <>
//         <div className="flex flex-col justify-center md:w-1/2 mx-8 my-4 text-sm">
//           <div className="my-6 text-center">
//             {" "}
//             <Heading1>{title}</Heading1>
//             {toReceive && <Badge className="w-fit my-2">Pour recevoir</Badge>}
//           </div>
//           <div className="text-sm">
//             {preparationTime && (
//               <p>
//                 Préparation :{" "}
//                 <span className="font-medium">
//                   {preparationTime} min
//                 </span>
//               </p>
//             )}
//             {cookingTime && (
//               <p>
//                 Cuisson :{" "}
//                 <span className="font-medium">
//                   {cookingTime} min
//                 </span>
//               </p>
//             )}
//             {ovenTemperature && (
//               <p>
//                 Four :{" "}
//                 <span className="font-medium">
//                   {ovenTemperature}°
//                 </span>
//               </p>
//             )}
//           </div>
//           <div>
//             {ingredients.length > 1 && (
//               <Heading2 className="my-4">Ingrédients</Heading2>
//             )}
//             {numberOfPersons && (
//               <div className="flex h-10 border-primary-solid border-2 px-2 py-2 w-fit mx-auto rounded-md mb-4">
//                 <div className="flex items-center justify-center gap-2 ">
//                   <button
//                     onClick={onDecrementServings}
//                     className=" px-2 border-r-2 border-primary-solid"
//                   >
//                     <Minus className="w-6 h-6 text-muted-foreground" />
//                   </button>
//                   <span className="text-primary font-medium ">
//                     {numberOfServings} personnes
//                   </span>
//                   <button
//                     onClick={onIncrementServings}
//                     className="px-2 border-l-2 border-primary-solid"
//                   >
//                     <Plus className="w-6 h-6 text-muted-foreground" />
//                   </button>
//                 </div>
//               </div>
//             )}
//             {ingredients.length > 1 && (
//               <div className="flex flex-wrap justify-evenly text-sm">
//                 <div className="flex flex-col ">
//                   {firstColumnIngredients.map((ingredient) => (
//                     <div key={ingredient.name} className="flex flex-wrap">
//                       <span className="font-medium mr-1">
//                         {formatQuantity(ingredient.baseQuantity)}
//                       </span>
//                       <span className="font-medium mr-1">
//                         {getUnitLabel(ingredient.unit )}
//                       </span>{" "}
//                       {ingredient.name}
//                     </div>
//                   ))}
//                 </div>
//                 <div className="flex flex-col">
//                   {secondColumnIngredients.map((ingredient) => (
//                     <div key={ingredient.name} className="flex flex-wrap">
//                       <span className="font-medium mr-1">
//                         {formatQuantity(ingredient.baseQuantity)}
//                       </span>
//                       <span className="font-medium mr-1">
//                         {ingredient.unit}
//                       </span>{" "}
//                       {ingredient.name}
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             )}
//             <div>
//               <Heading2 className="my-4">Préparation</Heading2>
//               <p>{preparation}</p>
//             </div>
//           </div>
//         </div>
//       </>
//     );
//   };

//   export default GeneralRecipeInformation;
