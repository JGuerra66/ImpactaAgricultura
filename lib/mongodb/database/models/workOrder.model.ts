import { Schema, model, models } from "mongoose";

export interface usedProductsSubSchema {
  product: string; 
  quantity: number;
}

export interface IWorkOrder extends Document {
    _id: string;
    name: string;
    activity: string;
    labour: string;
    date: Date;
    status: string;
    lot: string;
    hectareas: number;
    usedProducts: [usedProductsSubSchema];
    deposit: string;
    contractor: string;
    userId: string;
    orgId: string;
}

const usedProductsSubSchema = new Schema({
  product: {type: Schema.Types.ObjectId, ref: 'Product'},
  quantity: {type: Number, required: true},
});

const WorkOrderSchema = new Schema({
    name: {type: String, required: true},
    activity: {type: Schema.Types.ObjectId, ref: 'Activity'},
    labour: {type: Schema.Types.ObjectId, ref: 'Labour'},
    contractor: {type: Schema.Types.ObjectId, ref: 'Contractor'},
    date: {type: Date, required: true},
    status: {type: String, required: true},
    lot: {type: Schema.Types.ObjectId, ref: 'Lot'},
    hectareas: {type: Number, required: true},
    usedProducts: [usedProductsSubSchema],
    deposit: {type: Schema.Types.ObjectId, ref: 'Deposit'},
    userId:{type: String, required: true},
    orgId:{type: String, required: true},
});

const WorkOrder = models.WorkOrder || model('WorkOrder', WorkOrderSchema);

export default WorkOrder;