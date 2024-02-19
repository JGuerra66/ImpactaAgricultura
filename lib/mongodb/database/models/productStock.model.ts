import { Schema, model, models } from "mongoose";
import { string } from "zod";

export interface IProductStock {
    productId: string;
    currentStock: number;
    projectedStock: number;
    depositId: string;
    unit: string;
    userId: string;
    orgId: string;

    }

const productStockSchema = new Schema({
  productId: {
    type: Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  unit: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  currentStock: {
    type: Number,
    required: true,
  },
  projectedStock: {
    type: Number,
    required: true,
  },
  depositId: {
    type: Schema.Types.ObjectId,
    ref: "Deposit",
    required: true,
  },
  userId: {type: String, required: true},
  orgId: {type: String, required: true},
});

const ProductStock = models.ProductStock || model("ProductStock", productStockSchema);

export default ProductStock;