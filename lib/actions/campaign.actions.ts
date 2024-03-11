"use server"

import { CreateCampaignParams } from "@/types"
import { handleError } from "../utils"
import { connectToDatabase } from "../mongodb/database"
import Campaign from "../mongodb/database/models/campaign.model"

export const createCampaign = async ({campaignName, orgId, userId}:CreateCampaignParams) => {
    try {
        await connectToDatabase()

        const newCampaign = await Campaign.create({campaignName, orgId, userId});
        
        return JSON.parse(JSON.stringify(newCampaign));
    } catch (error) {
        handleError(error)
    }
}

export const getAllCampaigns = async (orgId: string) => {
    try {
        await connectToDatabase()

        const campaigns = await Campaign.find({ orgId: orgId });
        
        return JSON.parse(JSON.stringify(campaigns));
    } catch (error) {
        handleError(error)
    }
}

export const getCampaignById = async (id: string) => {
    try {
        await connectToDatabase()

        const campaign = await Campaign.findById(id);
        
        return JSON.parse(JSON.stringify(campaign));
    } catch (error) {
        handleError(error)
    }
}

export const updateCampaign = async (id: string, update: any) => {
    try {
        await connectToDatabase()

        const updatedCampaign = await Campaign.findByIdAndUpdate
        (id, update, { new: true, runValidators: true });

        return JSON.parse(JSON.stringify(updatedCampaign));
    } catch (error) {
        handleError(error)
    }
}

export const deleteCampaign = async (id: string) => {
    try {
        await connectToDatabase()

        const deletedCampaign = await Campaign.findByIdAndDelete(id);
        
        return JSON.parse(JSON.stringify(deletedCampaign));
    } catch (error) {
        handleError(error)
    }
}