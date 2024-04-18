import { PopulateOptions } from 'mongoose';

export const populateRecipe: PopulateOptions[] = [
    {path: 'category'},
    {path: 'labels'}
]