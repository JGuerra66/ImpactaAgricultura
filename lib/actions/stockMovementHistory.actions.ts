"use server"

import { CreateStockMovementHistoryParams, DeleteStockMovementHistoryParams, UpdateStockMovementHistoryParams } from "@/types"
import { handleError } from "../utils"
import { connectToDatabase } from "../mongodb/database"
import User from "../mongodb/database/models/user.model"
import StockMovementHistory from "../mongodb/database/models/depositStock.model"
import { revalidatePath } from "next/cache"


// CREATE
export const createStockMovementHistory = async ({stockMovementHistory, userId, path}: CreateStockMovementHistoryParams) => {
    try {
        await connectToDatabase();

        const creator = await User.findById(userId);

        if (!creator) {
            throw new Error('User not found')
        }

        const newStockMovementHistory = await StockMovementHistory.create({
            ...stockMovementHistory, 
            creator: userId});

        return JSON.parse(JSON.stringify(newStockMovementHistory));
    } catch (error) {
        handleError(error)
    }
}

const populateStockMovementHistory = (query: any) => {
    return query
      .populate({ path: 'creator', model: User, select: '_id firstName lastName' })
}

// GET ONE STOCKMOVEMENTHISTORY BY ID
export async function getStockMovementHistoryById(stockMovementHistoryId: string) {
    try {
      await connectToDatabase()
  
      const stockMovementHistory = await populateStockMovementHistory(StockMovementHistory.findById(stockMovementHistoryId))
  
      if (!stockMovementHistory) throw new Error('StockMovementHistory not found')
  
      return JSON.parse(JSON.stringify(stockMovementHistory))
    } catch (error) {
      handleError(error)
    }
}

// GET ALL STOCKMOVEMENTHISTORIES
export async function getAllStockMovementHistories() {
    try {
      await connectToDatabase()
  
      const stockMovementHistoriesQuery = StockMovementHistory.find().sort({ createdAt: 'desc' })
      const stockMovementHistories = await populateStockMovementHistory(stockMovementHistoriesQuery)
  
      return JSON.parse(JSON.stringify(stockMovementHistories))
    } catch (error) {
      handleError(error)
    }
  }

// UPDATE
export async function updateStockMovementHistory({ userId, stockMovementHistory, path }: UpdateStockMovementHistoryParams) {
    try {
      await connectToDatabase()
  
      const stockMovementHistoryToUpdate = await StockMovementHistory.findById(stockMovementHistory._id)
      if (!stockMovementHistoryToUpdate || stockMovementHistoryToUpdate.creator.toHexString() !== userId) {
        throw new Error('Unauthorized or StockMovementHistory not found')
      }
  
      const updatedStockMovementHistory = await StockMovementHistory.findByIdAndUpdate(
        stockMovementHistory._id,
        { ...stockMovementHistory },
        { new: true }
      )
      revalidatePath(path)
  
      return JSON.parse(JSON.stringify(updatedStockMovementHistory))
    } catch (error) {
      handleError(error)
    }
}

// DELETE
export async function deleteStockMovementHistory({ stockMovementHistoryId, path }: DeleteStockMovementHistoryParams) {
    try {
      await connectToDatabase()
  
      const deletedStockMovementHistory = await StockMovementHistory.findByIdAndDelete(stockMovementHistoryId)
      if (deletedStockMovementHistory) revalidatePath(path)
    } catch (error) {
      handleError(error)
    }
}

