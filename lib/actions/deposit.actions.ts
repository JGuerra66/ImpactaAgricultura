"use server"

import { CreateDepositParams, DeleteDepositParams, UpdateDepositParams } from "@/types"
import { handleError } from "../utils"
import { connectToDatabase } from "../mongodb/database"
import User from "../mongodb/database/models/user.model"
import Deposit from "../mongodb/database/models/deposit.model"
import { revalidatePath } from "next/cache"

// CREATE
export const createDeposit = async ({deposit, userId, orgId, path}: CreateDepositParams) => {
    try {
        await connectToDatabase();

        const creator = await User.findById(userId);

        if (!creator) {
            throw new Error('User not found')
        }

        const newDeposit = await Deposit.create({
            ...deposit, 
            creator: userId});

        return JSON.parse(JSON.stringify(newDeposit));
    } catch (error) {
        handleError(error)
    }
}

const populateDeposit = (query: any) => {
    return query
      .populate({ path: 'creator', model: User, select: '_id firstName lastName' })
}

// GET ONE DEPOSIT BY ID
export async function getDepositById(depositId: string) {
    try {
      await connectToDatabase()
  
      const deposit = await populateDeposit(Deposit.findById(depositId))
  
      if (!deposit) throw new Error('Deposit not found')
  
      return JSON.parse(JSON.stringify(deposit))
    } catch (error) {
      handleError(error)
    }
}

// GET ALL DEPOSITS
export async function getAllDeposits() {
    try {
      await connectToDatabase()
  
      const depositsQuery = Deposit.find().sort({ createdAt: 'desc' })
      const deposits = await populateDeposit(depositsQuery)
  
      return JSON.parse(JSON.stringify(deposits))
    } catch (error) {
      handleError(error)
    }
  }

// UPDATE
export async function updateDeposit({ userId, deposit, path }: UpdateDepositParams) {
    try {
      await connectToDatabase()
  
      const depositToUpdate = await Deposit.findById(deposit._id)
      if (!depositToUpdate || depositToUpdate.creator.toHexString() !== userId) {
        throw new Error('Unauthorized or deposit not found')
      }
  
      const updatedDeposit = await Deposit.findByIdAndUpdate(
        deposit._id,
        { ...deposit },
        { new: true }
      )
      revalidatePath(path)
  
      return JSON.parse(JSON.stringify(updatedDeposit))
    } catch (error) {
      handleError(error)
    }
}

// DELETE
export async function deleteDeposit({ depositId, path }: DeleteDepositParams) {
    try {
      await connectToDatabase()
  
      const deletedDeposit = await Deposit.findByIdAndDelete(depositId)
      if (deletedDeposit) revalidatePath(path)
    } catch (error) {
      handleError(error)
    }
}