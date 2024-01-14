import * as z from "zod";

export const productFormSchema = z.object({
    name: z.string().min(3).max(255),
    description: z.string().min(3).max(255),
    imageUrl: z.string().optional(),
    price: z.number().min(0),
    unitId: z.string(),
    categoryId: z.string(),

  })

  export const lotFormSchema = z.object({
    name: z.string().min(3).max(255),
    deposit: z.object({
        _id: z.string(),
        name: z.string(),
    }),
    kmzFile: z.string().optional(),

  });