import { Schema, model, models } from "mongoose";

export interface IStockMovement {
    productId: string;
    quantity: number;
    depositId: string;
    movementType: string;
    userId: string;
    orgId: string;
    receipt: string;
    concept: string;

}

const StockMovementSchema = new Schema({
    productId: {type: Schema.Types.ObjectId, ref: 'Product', required: true},
    quantity: {type: Number, required: true},
    depositId: {type: Schema.Types.ObjectId, ref: 'Deposit', required: true},
    movementType: {type: String, required: true},
    userId: {type: String, required: true},
    orgId: {type: String, required: true},
    receipt: {type: String, required: false},
    concept: {type: String, required: false}

}, 
{timestamps: true});

const StockMovement = models.StockMovement || model('StockMovement', StockMovementSchema);

export default StockMovement;