import { Tag, TagSchema, TagsSchema } from '@/validators/tag';

export const createTag = async(tag: Partial<Tag>): Promise<Tag> =>{
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

export const updateTag = async(tag: Partial<Tag>): Promise<Tag> =>{
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