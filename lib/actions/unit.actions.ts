"use server"

import { CreateUnitParams } from "@/types"
import { handleError } from "../utils"
import { connectToDatabase } from "../mongodb/database"
import ProductUnit from "../mongodb/database/models/productUnit.model"

export const createUnit = async ({unitName}:CreateUnitParams) => {
    try {
        await connectToDatabase()

        const newUnit = await ProductUnit.create({name: unitName});
        
        return JSON.parse(JSON.stringify(newUnit));
    } catch (error) {
        handleError(error)
    }
}

export const getAllUnits = async () => {
    try {
        await connectToDatabase()

        const units = await ProductUnit.find();
        
        return JSON.parse(JSON.stringify(units));
    } catch (error) {
        handleError(error)
    }
}