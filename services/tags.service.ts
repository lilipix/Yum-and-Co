import { Tag, TagSchema, TagsSchema } from "@/validators/tag";

export const fetchTags = async () => {
  try {
    const response = await fetch("./api/tags");
    if (!response.ok) {
      throw new Error("Network Failed to fetch tags");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to fetch tags:", error);
    return [];
  }
};

export const createTag = async (tag: Partial<Tag>): Promise<Tag> => {
  try {
    const data = await fetch("/api/tags", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(tag),
    });

    if (data.ok) {
      const parsedData = await data.json();
      return TagSchema.parse(parsedData);
    }

    throw new Error("Failed to create tags");
  } catch (error) {
    throw error;
  }
};

export const updateTag = async (tag: Partial<Tag>): Promise<Tag> => {
  try {
    const data = await fetch(`/api/tags/${tag.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(tag),
    });

    if (data.ok) {
      const parsedData = await data.json();
      return TagSchema.parse(parsedData);
    }

    throw new Error("Failed to update tags");
  } catch (error) {
    throw error;
  }
};
