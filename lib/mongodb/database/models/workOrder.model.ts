import { Schema, model, models } from "mongoose";

export interface usedProductsSubSchema {
    product: {_id: string, name: string, category: string, unit: string};
    quantity: number;
}

export interface IWorkOrder extends Document {
    _id: string;
    name: string;
    activity: {_id: string, name: string};
    labour: {_id: string, name: string};
    date: Date;
    status: string;
    lot: {_id: string, name: string};
    usedProducts: [usedProductsSubSchema];
    deposit: {_id: string, name: string};
}

const usedProductsSubSchema = new Schema({
    product: {type: Schema.Types.ObjectId, ref: 'Product'},
    quantity: {type: Number, required: true},
});

const WorkOrderSchema = new Schema({
    name: {type: String, required: true},
    activity: {type: Schema.Types.ObjectId, ref: 'Activity'},
    labour: {type: Schema.Types.ObjectId, ref: 'Labour'},
    date: {type: Date, required: true},
    status: {type: String, required: true},
    lot: {type: Schema.Types.ObjectId, ref: 'Lot'},
    usedProducts: [usedProductsSubSchema],
    deposit: {type: Schema.Types.ObjectId, ref: 'Deposit'},
});

const WorkOrder = models.WorkOrder || model('WorkOrder', WorkOrderSchema);

export default WorkOrder;