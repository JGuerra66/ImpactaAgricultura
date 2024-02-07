"use server"

import { CreateCategoryParams } from "@/types"
import { handleError } from "../utils"
import { connectToDatabase } from "../mongodb/database"
import ProductCategory from "../mongodb/database/models/productCategory.model"

export const createCategory = async ({categoryName, userId, orgId}:CreateCategoryParams) => {
    try {
        await connectToDatabase()

        const newCategory = await ProductCategory.create({name: categoryName, userId, orgId});
        
        return JSON.parse(JSON.stringify(newCategory));
    } catch (error) {
        handleError(error)
    }
}

export const getAllCategories = async () => {
    try {
        await connectToDatabase()

        const categories = await ProductCategory.find();
        
        return JSON.parse(JSON.stringify(categories));
    } catch (error) {
        handleError(error)
    }
}