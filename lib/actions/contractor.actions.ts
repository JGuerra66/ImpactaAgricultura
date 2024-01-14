"use server"

import { CreateContractorParams } from "@/types"
import { handleError } from "../utils"
import { connectToDatabase } from "../mongodb/database"
import Contractor from "../mongodb/database/models/contractor.model"

export const createContractor = async ({contractorName}:CreateContractorParams) => {
    try {
        await connectToDatabase()

        const newContractor = await Contractor.create({name: contractorName});
        
        return JSON.parse(JSON.stringify(newContractor));
    } catch (error) {
        handleError(error)
    }
}

export const getAllContractors = async () => {
    try {
        await connectToDatabase()

        const contractors = await Contractor.find();
        
        return JSON.parse(JSON.stringify(contractors));
    } catch (error) {
        handleError(error)
    }
}