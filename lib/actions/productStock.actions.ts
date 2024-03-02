"use server"

import { handleError } from "../utils"
import { connectToDatabase } from "../mongodb/database"
import ProductStock from "../mongodb/database/models/productStock.model"
import { CreateProductStockParams, UpdateProductStockParams, DeleteProductStockParams, GetAllProductStocksParams } from "@/types"
import Product from "../mongodb/database/models/product.model"
import Deposit from "../mongodb/database/models/deposit.model"
import WorkOrder from "../mongodb/database/models/workOrder.model"
import ProductUnit from "../mongodb/database/models/productUnit.model"

export const createProductStock = async ({userId, orgId, productStock, path}:CreateProductStockParams) => {
    try {
        await connectToDatabase()

        const newProductStock = await ProductStock.create({...productStock, userId, orgId});
        
        return JSON.parse(JSON.stringify(newProductStock));
    } catch (error) {
        handleError(error)
    }
}

export const updateProductStock = async ({userId, orgId, productStock, path}:UpdateProductStockParams) => {
    try {
        await connectToDatabase()

        const updatedProductStock = await ProductStock.findByIdAndUpdate(productStock._id, productStock, {new: true});
        
        return JSON.parse(JSON.stringify(updatedProductStock));
    } catch (error) {
        handleError(error)
    }
}

export const deleteProductStock = async ({productStockId, path}:DeleteProductStockParams) => {
    try {
        await connectToDatabase()

        const deletedProductStock = await ProductStock.findByIdAndDelete(productStockId);
        
        return JSON.parse(JSON.stringify(deletedProductStock));
    } catch (error) {
        handleError(error)
    }
}

const populateProductStock = (query: any) => {
    return query
        .populate({ path: 'productId', model: Product, select: '_id name ' })
        .populate({ path: 'depositId', model: Deposit, select: '_id name' })
        .populate({ path: 'unit', model: ProductUnit, select: '_id name' })
}

export const getAllProductStocks = async (orgId: string) => {
    try {
        await connectToDatabase()

        const productStocksQuery = ProductStock.find({ orgId })

        const productStocks = (await populateProductStock(productStocksQuery)).map((doc: { toObject: () => any }) => doc.toObject());


        const workOrders = await WorkOrder.find({ orgId });

        const updatedProductStocks = productStocks.map((productStock: { depositId: any; stockActual: number }) => {
            const relatedWorkOrders = workOrders.filter(workOrder => workOrder.depositId === productStock.depositId);
            
            const totalUsedProducts = relatedWorkOrders.reduce((sum, workOrder) => {
              const usedProductsSum = workOrder.usedProducts.reduce((sum: any, usedProduct: { quantity: any }) => sum + usedProduct.quantity, 0);
              return sum + usedProductsSum;
            }, 0);
            
            console.log('totalUsedProducts:', totalUsedProducts);
          
            const stockActual = productStock.stockActual || 0;
          
            console.log('stockActual:', stockActual); 
          
            const newField = stockActual - totalUsedProducts;
          
            console.log('newField:', newField); 
          
            return { ...productStock, newField };
          });

        return {
            data: JSON.parse(JSON.stringify(updatedProductStocks)),
        }
    } catch (error) {
        handleError(error)
    }
}

