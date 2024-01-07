import { Schema, model, models } from "mongoose";
import { Document, Types } from "mongoose";

export interface IProductSubSchema {
    product: Types.ObjectId;
    quantity: number;
    unit: Types.ObjectId;
}

export interface IStockMovementHistorySubSchema {
    date: Date;
    product: Types.ObjectId;
    quantity: number;
    typeOfMovement: string;
    receipt?: string;
    origin?: Types.ObjectId;
    destiny?: Types.ObjectId;
}

export interface IDepositStock extends Document {
    _id: string;
    products: IProductSubSchema[];
    deposit: {_id: string, name: string};
    stockMovementHistory: IStockMovementHistorySubSchema[];
}

const ProductSubSchema = new Schema({
    product: {type: Schema.Types.ObjectId, ref: 'Product', required: true},
    quantity: {type: Number, required: true},
    unit: {type: Schema.Types.ObjectId, ref: 'ProductUnit', required: true},
});

const StockMovementHistorySubSchema = new Schema({
    date: {type: Date, required: true},
    product: {type: Schema.Types.ObjectId, ref: 'Product', required: true},
    quantity: {type: Number, required: true},
    typeOfMovement: {type: String, required: true},
    receipt: {type: String, required: false},
    origin: {type: Schema.Types.ObjectId, ref: 'Deposit', required: false},
    destiny: {type: Schema.Types.ObjectId, ref: 'Deposit', required: false},
});

const DepositStockSchema = new Schema({
    products: [ProductSubSchema],
    deposit: {type: Schema.Types.ObjectId, ref: 'Deposit', required: true},
    stockMovementHistory: [StockMovementHistorySubSchema],  
});

const DepositStock = models.DepositStock || model('DepositStock', DepositStockSchema);

export default DepositStock;