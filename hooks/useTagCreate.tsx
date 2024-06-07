import { SelectOption } from '@/app/components/Select/CreateSelect';
import { createTag as createTagsRequest } from '@/services/tags.service';
import {updateTag as updateTagRequest} from '@/services/tags.service';
import { ColorPalette, Tag } from '@/validators/tag';
import { useState } from 'react';


const useTagCreate = (initialTags: Tag[]) => {
    const [tags, setTags] = useState<Tag[]>(initialTags);
    const [isLoading, setIsLoading] = useState(false);
  

    const createTag = async (name: string) => {
          try {
            setIsLoading(true);
            const tag = await createTagsRequest({ name }); 
            setTags([...tags, tag]);
            return { 
              value: tag.id,
              label: tag.name,
              color: tag.color,
            };
          } catch (error) {
            console.error(error);
            throw error; 
          } finally {
            setIsLoading(false);
          }
        };
  
    
  const updateTag = async({value, color}: SelectOption) => { 
    try {
        setIsLoading(true);

        const currentTag = tags.find((tag) => tag.id === value);
        
    
        const updatedTag = await updateTagRequest({
            name: currentTag?.name,
            id: value,
            color,
        });
        setTags((prevTags) => prevTags.map((prevTag) => (prevTag.id === value ? { ...prevTag, color } : prevTag)));
    } catch (error) {
        console.error(error);
            throw error; 
          } finally {
            setIsLoading(false);
          }
        };

return { tags, createTag, updateTag, isLoading };
  };

  export default useTagCreate;