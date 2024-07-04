import { useContext } from "react";
import CategoryContext, { CategoryContextValue } from ".";

const useCategory = () => {
  const context = useContext(CategoryContext);
  if (!context) {
    throw new Error("useCategory was used outside of its Provider");
  }
  return context as CategoryContextValue;
};

export default useCategory;
