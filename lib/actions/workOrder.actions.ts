"use server"
import { CreateWorkOrderParams, UpdateWorkOrderParams, WorkOrderFormData } from "@/types"
import { handleError } from "../utils"
import { connectToDatabase } from "../mongodb/database"
import WorkOrder from "../mongodb/database/models/workOrder.model"
import { revalidatePath } from "next/cache"
import { getAllDeposits } from "./deposit.actions"
import { getAllActivities } from "./activity.actions"
import { getAllLabours, getLabourById } from "./labour.actions"
import { getAllLots } from "./lots.actions"
import { getAllProducts } from "./product.actions"
import Deposit from "../mongodb/database/models/deposit.model"
import Activity from "../mongodb/database/models/activities.model"
import Lot from "../mongodb/database/models/lot.model"
import Product from "../mongodb/database/models/product.model"
import Labour from "../mongodb/database/models/labour.model"
import StockMovement, { IStockMovement } from "../mongodb/database/models/stockMovement.model"
import { createStockMovement } from "./stockMovement.actions"
import Contractor from "../mongodb/database/models/contractor.model"
import { get } from "http"

// CREATE
export const createWorkOrders = async (formData: WorkOrderFormData) => {
  try {
    await connectToDatabase();

    const newWorkOrders = await Promise.all(formData.lots.map(async (lot) => {
      let totalCost = 0; 

      const updatedUsedProducts = JSON.parse(JSON.stringify(formData.usedProducts));
      
      updatedUsedProducts.forEach((updatedUsedProducts: {product:string; dose: number; quantity: number; valuePerUnit: number; unit: string}) => {
        if (typeof updatedUsedProducts.dose === 'number' && updatedUsedProducts.dose !== 0) {
          
          updatedUsedProducts.quantity = updatedUsedProducts.dose * lot.hectareas;
          console.log('Dose:', updatedUsedProducts.dose, 'Hectareas:', lot.hectareas, 'Quantity:', updatedUsedProducts.quantity);
        } else {
          
          updatedUsedProducts.quantity = updatedUsedProducts.quantity || 0;
        }

        
        if (typeof updatedUsedProducts.quantity === 'number') {
          totalCost += updatedUsedProducts.quantity * updatedUsedProducts.valuePerUnit;
        }
      });

      
      const labourDetails = await getLabourById(formData.labour);
      
      const valuePerHectare = formData.valuePerHectare === 0 ? labourDetails.valuePerHectare : formData.valuePerHectare;
      totalCost += lot.hectareas * valuePerHectare;

      
      const newWorkOrder = await WorkOrder.create({
        ...formData,
        lot: lot.lot,
        hectareas: lot.hectareas,
        totalCost: totalCost,
        usedProducts:updatedUsedProducts 
      });

      console.log('Total cost for lot:', totalCost);

      return JSON.parse(JSON.stringify(newWorkOrder));
    }));

    return newWorkOrders;
  } catch (error) {
    handleError(error);
  }
};







// UPDATE

export const updateWorkOrder = async ({userId, workOrder, path}: UpdateWorkOrderParams) => {
  try {
      await connectToDatabase();

      const updatedWorkOrder = await WorkOrder.findByIdAndUpdate
        (workOrder._id, workOrder, { new: true });
        console.log('Updated workOrder:', updatedWorkOrder);

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
    .populate({ path: 'deposit', model: Deposit, select: '_id name' })
    .populate({ path: 'activity', model: Activity, select: '_id name' })
    .populate({ path: 'labour', model: Labour, select: '_id name valuePerHectare' })
    .populate({ path: 'usedProducts.product', model: Product, select: '_id name' }) 
    .populate({ path: 'lot', model: Lot, select: '_id name' })
    .populate({ path: 'contractor', model: Contractor, select: '_id name' })
    .populate({ path: 'campaign', model: 'Campaign', select: '_id name'})
    
}


// GET ALL

export const getAllWorkOrders = async (orgId: string) => {
  try {
    await connectToDatabase();

    const workOrdersQuery = WorkOrder.find({ orgId });

    const workOrders = await populateWorkOrder(workOrdersQuery);
    console.log('WorkOrders:', JSON.stringify(workOrders, null, 2));

    return {
      data: JSON.parse(JSON.stringify(workOrders)),
      
    };
  } catch (error) {
    handleError(error);
  }
}

// GET ONE BY ID
export const getWorkOrderById = async (workOrderId: string) => {
  try {
    await connectToDatabase();

    const workOrder = await populateWorkOrder(WorkOrder.findById
      (workOrderId));

    if (!workOrder) throw new Error('WorkOrder not found');
      
    return JSON.parse(JSON.stringify(workOrder));
  } catch (error) {
    handleError(error);
  }
}

export async function executeWorkOrder(workOrderId: string) {
  try {
    await connectToDatabase()
    
    const updatedWorkOrder = await WorkOrder.findByIdAndUpdate(
      workOrderId,
      { status: 'realizado' },
      { new: true }
    );
    
    if (!updatedWorkOrder) throw new Error('WorkOrder not found');

    const workOrder = await WorkOrder.findById(workOrderId);

    console.log(workOrder.usedProducts);
    for (const product of workOrder.usedProducts) {
      const stockMovement: IStockMovement = {
        productId: product.product,
        quantity: product.quantity,
        depositId: workOrder.deposit,
        movementType: 'salida', 
        receipt: '', 
        concept: 'Ejecucion de orden de trabajo',
        userId: workOrder.userId,
        orgId: workOrder.orgId, 
      };

      console.log('Creating stock movement with:', stockMovement);
      await createStockMovement({
        userId: updatedWorkOrder.userId,
        orgId: updatedWorkOrder.orgId,
        stockMovement: stockMovement,
        path: '' 
      });
    }

    

  } catch (error) {
    
  }
}

export async function getPendingWorkOrdersBeforeDate(orgId: string, date: Date) {
  try {
    await connectToDatabase();

    const pendingWorkOrders = await WorkOrder.find({ orgId, status: 'pendiente', date: { $lte: date } });

    return JSON.parse(JSON.stringify(pendingWorkOrders));
  } catch (error) {
    handleError(error);
  }
}

