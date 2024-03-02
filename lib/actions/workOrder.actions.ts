"use server"
import { CreateWorkOrderParams, UpdateWorkOrderParams, WorkOrderFormData } from "@/types"
import { handleError } from "../utils"
import { connectToDatabase } from "../mongodb/database"
import WorkOrder from "../mongodb/database/models/workOrder.model"
import { revalidatePath } from "next/cache"
import { getAllDeposits } from "./deposit.actions"
import { getAllActivities } from "./activity.actions"
import { getAllLabours } from "./labour.actions"
import { getAllLots } from "./lots.actions"
import { getAllProducts } from "./product.actions"
import Deposit from "../mongodb/database/models/deposit.model"
import Activity from "../mongodb/database/models/activities.model"
import Lot from "../mongodb/database/models/lot.model"
import Product from "../mongodb/database/models/product.model"
import Labour from "../mongodb/database/models/labour.model"

// CREATE
export const createWorkOrders = async (formData: WorkOrderFormData) => {
  try {
    await connectToDatabase();

    const newWorkOrders = await Promise.all(formData.lots.map(async (lot) => {
      const newWorkOrder = await WorkOrder.create({
        ...formData,
        lot: lot.lot,
        hectareas: lot.hectareas,
      });

      return JSON.parse(JSON.stringify(newWorkOrder));
    }));

    return newWorkOrders;
  } catch (error) {
    handleError(error)
  }
}



// UPDATE

export const updateWorkOrder = async ({userId, workOrder, path}: UpdateWorkOrderParams) => {
  try {
      await connectToDatabase();

      const updatedWorkOrder = await WorkOrder.findByIdAndUpdate
        (workOrder._id, workOrder, { new: true });

        return JSON.parse(JSON.stringify(updatedWorkOrder));
    } catch (error) {
        handleError(error)
    }
}

// DELETE
export const deleteWorkOrder = async (workOrderId: string) => {
  try {
    await connectToDatabase();

    const deletedWorkOrder = await WorkOrder.findByIdAndDelete(workOrderId);

    return JSON.parse(JSON.stringify(deletedWorkOrder));
  } catch (error) {
    handleError(error)
  }
}

const populateWorkOrder = (query: any) => {
  return query
    .populate({ path: 'depositId', model: Deposit, select: '_id name' })
    .populate({ path: 'activityId', model: Activity, select: '_id name' })
    .populate({ path: 'labourId', model: Labour, select: '_id name' })
    .populate({ path: 'productId', model: Product, select: '_id name' })
    .populate({ path: 'lotId', model: Lot, select: '_id name' })
}


// GET ALL

export const getAllWorkOrders = async (orgId: string) => {
  try {
    await connectToDatabase();

    const workOrdersQuery = WorkOrder.find({ orgId });

    const workOrders = await populateWorkOrder(workOrdersQuery);

    return {
      data: JSON.parse(JSON.stringify(workOrders)),
    };
  } catch (error) {
    handleError(error);
  }
}