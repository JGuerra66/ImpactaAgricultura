"use server"

import { CreateLabourParams } from "@/types"
import { handleError } from "../utils"
import { connectToDatabase } from "../mongodb/database"
import Labour from "../mongodb/database/models/labour.model"

export const createLabour = async ({labourName, valuePerHectare, orgId, userId}:CreateLabourParams) => {
    try {
        await connectToDatabase()
        console.log('labourName', labourName, 'valuePerHectare', valuePerHectare, 'orgId', orgId, 'userId', userId)
        const newLabour = await Labour.create({name: labourName ,orgId, userId, valuePerHectare});
        
        return JSON.parse(JSON.stringify(newLabour));
    } catch (error) {
        handleError(error)
    }
}

export const getAllLabours = async () => {
    try {
        await connectToDatabase()

        const labours = await Labour.find();
        
        return JSON.parse(JSON.stringify(labours));
    } catch (error) {
        handleError(error)
    }
}

export const getLabourById = async (id: string) => {
    try {
        await connectToDatabase()

        const labour = await Labour.findById(id);

        return JSON.parse(JSON.stringify(labour));
    } catch (error) {
        handleError(error)
    }
}

export const updateLabour = async (id: string, name: string) => {
    try {
        await connectToDatabase()

        const updatedLabour = await Labour.findByIdAndUpdate(id, {name}, {new: true});

        return JSON.parse(JSON.stringify(updatedLabour));
    } catch (error) {
        handleError(error)
    }
}       

export const deleteLabour = async (id: string) => {
    try {
        await connectToDatabase()

        const deletedLabour = await Labour.findByIdAndDelete(id);

        return JSON.parse(JSON.stringify(deletedLabour));
    } catch (error) {
        handleError(error)
    }
}

