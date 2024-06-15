import { CardDescription, CardTitle } from "@/components/ui/card";
import { Tag } from "@/validators/tag";

type TagsHeaderProps = {
  tags: Tag[];
};
const TagsHeader = ({ tags }: TagsHeaderProps) => {
  return (
    <div>
      <CardTitle>
        {" "}
        {tags.map((tag) => (
          <span key={tag.id}>{tag.name}</span>
        ))}
      </CardTitle>
      <CardDescription>
        Visualisez les recettes liées aux tags suivants :
        {tags.map((tag) => (
          <span key={tag.id}> {tag.name}</span>
        ))}
      </CardDescription>
    </div>
  );
};

export default TagsHeader;
