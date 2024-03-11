import { Schema, model, models } from "mongoose";

export interface usedProductsSubSchema {
  product: string; 
  quantity: number;
  unit: string;
  valuePerUnit: number;
  dose: number;
  
}

export interface IWorkOrder extends Document {
    _id: string;
    name: string;
    campaign: string;
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
    totalCost: number;
}

const usedProductsSubSchema = new Schema({
  product: {type: Schema.Types.ObjectId, ref: 'Product'},
  dose: {type: Number, required: false},
  quantity: {type: Number, required: true},
  unit: {type: String, required: true},
  valuePerUnit: {type: Number, required: true}
});

const WorkOrderSchema = new Schema({
    name: {type: String, required: true},
    activity: {type: Schema.Types.ObjectId, ref: 'Activity'},
    campaign: {type: Schema.Types.ObjectId, ref: 'Campaign'},
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
    totalCost: {type: Number, required: true}
});

const WorkOrder = models.WorkOrder || model('WorkOrder', WorkOrderSchema);

export default WorkOrder;