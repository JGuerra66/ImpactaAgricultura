"use server"

import { CreateActivityParams } from "@/types"
import { handleError } from "../utils"
import { connectToDatabase } from "../mongodb/database"
import Activity from "../mongodb/database/models/activities.model"

export const createActivity = async ({activityName}:CreateActivityParams) => {
    try {
        await connectToDatabase()

        const newActivity = await Activity.create({name: activityName});
        
        return JSON.parse(JSON.stringify(newActivity));
    } catch (error) {
        handleError(error)
    }
}

export const getAllActivities = async () => {
    try {
        await connectToDatabase()

        const activities = await Activity.find();
        
        return JSON.parse(JSON.stringify(activities));
    } catch (error) {
        handleError(error)
    }
}