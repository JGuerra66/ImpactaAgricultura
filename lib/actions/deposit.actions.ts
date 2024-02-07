"use server"

import { CreateDepositParams, DeleteDepositParams, UpdateDepositParams } from "@/types"
import { handleError } from "../utils"
import { connectToDatabase } from "../mongodb/database"
import Deposit from "../mongodb/database/models/deposit.model"
import { revalidatePath } from "next/cache"

// CREATE
export const createDeposit = async ({deposit, userId, orgId, path}: CreateDepositParams) => {
    try {
        await connectToDatabase();

        const newDeposit = await Deposit.create({
            ...deposit, 
            userId,
            orgId,});

        return JSON.parse(JSON.stringify(newDeposit));
    } catch (error) {
        handleError(error)
    }
}

// GET ONE DEPOSIT BY ID
export async function getDepositById(depositId: string) {
  try {
    await connectToDatabase()

    const deposit = await Deposit.findById(depositId)

    if (!deposit) throw new Error('Deposit not found')

    return JSON.parse(JSON.stringify(deposit))
  } catch (error) {
    handleError(error)
  }
}

// GET ALL DEPOSITS
export async function getAllDeposits(orgId: string) {
  try {
    await connectToDatabase()

    const deposits = await Deposit.find({ orgId })

    return JSON.parse(JSON.stringify(deposits))
  } catch (error) {
    handleError(error)
  }
}

// UPDATE
export async function updateDeposit({ deposit, path }: UpdateDepositParams) {
  try {
    await connectToDatabase()

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