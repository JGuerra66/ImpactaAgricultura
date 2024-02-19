"use server"
import { handleError } from "../utils"
import { connectToDatabase } from "../mongodb/database"
import StockMovement from "../mongodb/database/models/stockMovement.model"
import { CreateStockMovementParams, UpdateStockMovementParams, DeleteStockMovementParams, GetAllStockMovementsParams } from "@/types"
import ProductStock from "../mongodb/database/models/productStock.model"
import Product from "../mongodb/database/models/product.model"
import Deposit from "../mongodb/database/models/deposit.model"
import { Document } from 'mongoose';

export const createStockMovement = async ({userId, orgId, stockMovement, path}:CreateStockMovementParams) => {
    try {
        await connectToDatabase()

        const newStockMovement = await StockMovement.create({...stockMovement, userId, orgId});

        
        if (stockMovement.movementType !== 'movimiento interno') {
            
            let productStock = await ProductStock.findOne({orgId, productId: stockMovement.productId});

            
            if (!productStock) {
                // Buscar el producto
                const product = await Product.findById(stockMovement.productId);
                if (!product) {
                  throw new Error(`Product with id ${stockMovement.productId} not found`);
                }
              
                productStock = await ProductStock.create({
                  productId: stockMovement.productId,
                  unit: product.unit, // Usar el valor de unit del producto
                  currentStock: 0,
                  projectedStock: 0,
                  depositId: newStockMovement.depositId, 
                  userId,
                  orgId
                });
              }
            // Actualizar currentStock y projectedStock según el tipo de movimiento
            if (stockMovement.movementType === 'entrada') {
                productStock.currentStock += stockMovement.quantity;
                productStock.projectedStock += stockMovement.quantity;
            } else if (stockMovement.movementType === 'salida') {
                productStock.currentStock -= stockMovement.quantity;
                productStock.projectedStock -= stockMovement.quantity;
            }

            
            await productStock.save();
        }

        return JSON.parse(JSON.stringify(newStockMovement));
    } catch (error) {
        handleError(error)
    }
}

export const updateStockMovement = async ({userId, orgId, stockMovement, path}:UpdateStockMovementParams) => {
    try {
        await connectToDatabase()

        const updatedStockMovement = await StockMovement.findByIdAndUpdate(stockMovement._id, stockMovement, {new: true});
        
        return JSON.parse(JSON.stringify(updatedStockMovement));
    } catch (error) {
        handleError(error)
    }
}

export const deleteStockMovement = async ({stockMovementId, path}:DeleteStockMovementParams) => {
    try {
        await connectToDatabase()

        const deletedStockMovement = await StockMovement.findByIdAndDelete(stockMovementId);
        
        return JSON.parse(JSON.stringify(deletedStockMovement));
    } catch (error) {
        handleError(error)
    }
}

const populateStockMovements = (query: any) => {
    return query
      .populate({ path: 'productId', model: Product, select: 'name' })
      .populate({ path: 'depositId', model: Deposit, select: 'name' })
  }

  export async function getAllStockMovements(orgId: string) {
    try {
        await connectToDatabase()
    
        const stockMovementsQuery = StockMovement.find({ orgId }) 
    
        let stockMovements = await populateStockMovements(stockMovementsQuery)

        // Convertir cada documento a un objeto JavaScript simple
        stockMovements = stockMovements.map((doc: Document) => doc.toObject({ getters: true }));
    
        return {
          data: JSON.parse(JSON.stringify(stockMovements)),
        }
      } catch (error) {
        handleError(error)
      }
}