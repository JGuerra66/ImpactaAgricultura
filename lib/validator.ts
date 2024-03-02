import * as z from "zod";

export const productFormSchema = z.object({
    name: z.string().min(3).max(255),
    price: z.number().min(0),
    unitId: z.string(),
    categoryId: z.string(),
    

  })

  export const lotFormSchema = z.object({
    name: z.string().min(3).max(255),
    deposit: z.string(),
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

  export const initStockFormSchema = z.object({
    product: z.string(),
    quantity: z.number().min(0),
    deposit: z.string(),
    movementType: z.string(),
    receipt: z.string().optional(),
    concept: z.string().optional(),
  });

  export const stockMovementFormSchema = z.object({
    productId: z.string(),
    quantity: z.number(),
    depositId: z.string(),
    movementType: z.string(),
    receipt: z.string().optional(),
    concept: z.string().optional(),
  });

  export const workOrderFormSchema = z.object({
    name: z.string().min(3).max(255),
    date: z.date(),
    status: z.string(),
    lot: z.string(),
    deposit: z.string(),
    labour: z.string(),
    activity: z.string(),
    contractor: z.string(),
    hectareas: z.number(),
    usedProducts: z.array(z.object({
      product: z.object({
        _id: z.string(),
        name: z.string(),
        category: z.string(),
        unit: z.string(),
      }),
      quantity: z.number(),
      total: z.number(),
    })),
    userId: z.string(),
    orgId: z.string(),
  });

export const ProductLoaderSchema = z.object({
  product: z.string(),
  quantity: z.number(),
  quantityType: z.string(),
});
export const LotLoaderSchema = z.object({
  lot: z.string(),
  hectareas: z.number(),
});