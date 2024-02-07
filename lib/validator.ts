import * as z from "zod";

export const productFormSchema = z.object({
    name: z.string().min(3).max(255),
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

  export const depositFormSchema = z.object({
    name: z.string().min(3).max(255),
    depositLocation: z.string().min(3).max(255),
    type: z.string(),
    
  });

  export const stockMovementHistoryFormSchema = z.object({
    product: z.object({
        _id: z.string(),
        name: z.string(),
    }),
    quantity: z.number().min(0),
    unit: z.string(),
    deposit: z.object({
        _id: z.string(),
        name: z.string(),
    }),
    typeOfMovement: z.string(),
    description: z.string().optional(),
    date: z.string().optional(),
  });
