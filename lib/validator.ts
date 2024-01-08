import * as z from "zod";

export const productFormSchema = z.object({
    name: z.string().min(3).max(255),
    description: z.string().min(3).max(255),
    imageUrl: z.string(),
    price: z.number().min(0),
    unitId: z.string(),
    categoryId: z.string(),

  })