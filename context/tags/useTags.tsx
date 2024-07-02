import { useContext } from "react";
import TagsContext, { TagsContextValue } from ".";

const useTags = () => {
  const context = useContext(TagsContext);
  if (!context) {
    throw new Error("useTags was used outside of its Provider");
  }
  return context as TagsContextValue;
};

export default useTags;
