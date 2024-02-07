import { Schema, model, models } from "mongoose";

export interface IProductUnit {
    _id: string;
    name: string;
    userId: string;
    orgId: string;

}

const ProductUnitSchema = new Schema({
    name: {type: String, required: true},
    userId: {type: String, required: true},
    orgId: {type: String, required: true}
});

const ProductUnit = models.ProductUnit || model('ProductUnit', ProductUnitSchema);

export default ProductUnit;