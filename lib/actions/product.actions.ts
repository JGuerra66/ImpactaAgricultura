"use server"

import { CreateProductParams, DeleteProductParams, GetAllProductsParams, UpdateProductParams } from "@/types"
import { handleError } from "../utils"
import { connectToDatabase } from "../mongodb/database"
import User from "../mongodb/database/models/user.model"
import Product from "../mongodb/database/models/product.model"
import { revalidatePath } from "next/cache"
import ProductCategory from "../mongodb/database/models/productCategory.model"
// CREATE
export const createProduct = async ({product, userId, path}: CreateProductParams) => {
    try {
        await connectToDatabase();

        const creator = await User.findById(userId);

        if (!creator) {
            throw new Error('User not found')
        }

        const newProduct = await Product.create({
            ...product, 
            category: product.categoryId, 
            unit: product.unitId, 
            creator: userId});

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
      .populate({ path: 'creator', model: User, select: '_id firstName lastName' })
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
export async function getAllProducts({ query, limit = 6, page, category }: GetAllProductsParams) {
    try {
      await connectToDatabase()
  
      const nameCondition = query ? { title: { $regex: query, $options: 'i' } } : {}
      const categoryCondition = category ? await getCategoryByName(category) : null
      const conditions = {
        $and: [nameCondition, categoryCondition ? { category: categoryCondition._id } : {}],
      }
  
      const skipAmount = (Number(page) - 1) * limit
      const productsQuery = Product.find(conditions)
        .sort({ createdAt: 'desc' })
        .skip(skipAmount)
        .limit(limit)
  
      const products = await populateProduct(productsQuery)
      const productsCount = await Product.countDocuments(conditions)
  
      return {
        data: JSON.parse(JSON.stringify(products)),
        totalPages: Math.ceil(productsCount / limit),
      }
    } catch (error) {
      handleError(error)
    }
  }
// UPDATE
export async function updateProduct({ userId, product, path }: UpdateProductParams) {
    try {
      await connectToDatabase()
  
      const productToUpdate = await Product.findById(product._id)
      if (!productToUpdate || productToUpdate.organizer.toHexString() !== userId) {
        throw new Error('Unauthorized or product not found')
      }
  
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
  
