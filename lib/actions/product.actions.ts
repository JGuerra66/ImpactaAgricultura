"use server"

import { CreateProductParams, DeleteProductParams, GetAllProductsParams, UpdateProductParams } from "@/types"
import { handleError } from "../utils"
import { connectToDatabase } from "../mongodb/database"
import Product from "../mongodb/database/models/product.model"
import { revalidatePath } from "next/cache"
import ProductCategory from "../mongodb/database/models/productCategory.model"
import ProductUnit from "../mongodb/database/models/productUnit.model"
// CREATE
export const createProduct = async ({product, userId, path, orgId}: CreateProductParams) => {
    try {
        await connectToDatabase();

        const newProduct = await Product.create({
            ...product, 
            category: product.categoryId, 
            unit: product.unitId, 
            userId,
            orgId});

        return JSON.parse(JSON.stringify(newProduct));
    } catch (error) {
        handleError(error)
    }
}


const getCategoryByName = async (name: string) => {
    return ProductCategory.findOne({ name: { $regex: name, $options: 'i' } })
  }

const populateProduct = (query: any) => {
    return query
      .populate({ path: 'unit', model: ProductUnit, select: '_id name' })
      .populate({ path: 'category', model: ProductCategory, select: '_id name' })
  }

// GET ONE PRODUCT BY ID
export async function getProductById(productId: string) {
    try {
      await connectToDatabase()
  
      const product = await populateProduct(Product.findById(productId))
  
      if (!product) throw new Error('Product not found')
  
      return JSON.parse(JSON.stringify(product))
    } catch (error) {
      handleError(error)
    }
  }

// GET ALL PRODUCTS
export async function getAllProducts(orgId: string) {
  try {
    await connectToDatabase()

    const productsQuery = Product.find({ orgId }) // use orgId in your query

    const products = await populateProduct(productsQuery)

    return {
      data: JSON.parse(JSON.stringify(products)),
    }
  } catch (error) {
    handleError(error)
  }
}
  
// UPDATE
export async function updateProduct({ product, path }: UpdateProductParams) {
  try {
    await connectToDatabase()

    const updatedProduct = await Product.findByIdAndUpdate(
      product._id,
      { ...product, category: product.categoryId, unit: product.unitId },
      { new: true }
    )
    revalidatePath(path)

    return JSON.parse(JSON.stringify(updatedProduct))
  } catch (error) {
    handleError(error)
  }
}
  
  // DELETE
  export async function deleteProduct({ productId, path }: DeleteProductParams) {
    try {
      await connectToDatabase()
  
      const deletedProduct = await Product.findByIdAndDelete(productId)
      if (deletedProduct) revalidatePath(path)
    } catch (error) {
      handleError(error)
    }
  }
  
