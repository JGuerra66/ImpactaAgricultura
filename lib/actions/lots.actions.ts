"use server"

import { CreateLotParams, DeleteLotParams, UpdateLotParams } from "@/types"
import { handleError } from "../utils"
import { connectToDatabase } from "../mongodb/database"
import User from "../mongodb/database/models/user.model"
import Lot from "../mongodb/database/models/lot.model"
import { revalidatePath } from "next/cache"
import Deposit from "../mongodb/database/models/deposit.model"

// CREATE
export const createLot = async ({lot, userId, path, orgId}: CreateLotParams) => {
    try {
        await connectToDatabase();


        const newLot = await Lot.create({
            ...lot, 
            userId,
            orgId});

        return JSON.parse(JSON.stringify(newLot));
    } catch (error) {
        handleError(error)
    }
}

const populateLot = (query: any) => {
    return query
      .populate({ path: 'deposit', model: Deposit, select: '_id name' })
}

// GET ONE LOT BY ID
export async function getLotById(lotId: string) {
    try {
      await connectToDatabase()
  
      const lot = await populateLot(Lot.findById(lotId))
  
      if (!lot) throw new Error('Lot not found')
  
      return JSON.parse(JSON.stringify(lot))
    } catch (error) {
      handleError(error)
    }
}

// GET ALL LOTS
export async function getAllLots(orgId: string) {
    try {
      await connectToDatabase()
  
      const lotsQuery = Lot.find({ orgId })
      const lots = await populateLot(lotsQuery)
  
      return JSON.parse(JSON.stringify(lots))
    } catch (error) {
      handleError(error)
    }
  }

// UPDATE
export async function updateLot({ userId, lot, path }: UpdateLotParams) {
    try {
      await connectToDatabase()
  
      const lotToUpdate = await Lot.findById(lot._id)
      if (!lotToUpdate || lotToUpdate.creator.toHexString() !== userId) {
        throw new Error('Unauthorized or lot not found')
      }
  
      const updatedLot = await Lot.findByIdAndUpdate(
        lot._id,
        { ...lot },
        { new: true }
      )
      revalidatePath(path)
  
      return JSON.parse(JSON.stringify(updatedLot))
    } catch (error) {
      handleError(error)
    }
}

// DELETE
export async function deleteLot({ lotId, path }: DeleteLotParams) {
    try {
      await connectToDatabase()
  
      const deletedLot = await Lot.findByIdAndDelete(lotId)
      if (deletedLot) revalidatePath(path)
    } catch (error) {
      handleError(error)
    }
}