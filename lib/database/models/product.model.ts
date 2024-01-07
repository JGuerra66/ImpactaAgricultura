import { Schema, model, models } from "mongoose";

export interface IProduct extends Document {
    _id: string;
    name: string;
    description: string;
    photo: string;
    price: number;
    unit: {_id: string, name: string};
    category: {_id: string, name: string};
}

const ProductSchema = new Schema({
    name: {type: String, required: true},
    description: {type: String, required: true},
    photo: {type: String, required: false},
    price: {type: Number, required: true},
    unit: {type: Schema.Types.ObjectId, ref: 'ProductUnit', required: true},
    category: {type: Schema.Types.ObjectId, ref: 'ProductCategory', required: true},
});

const Product = models.Product || model('Product', ProductSchema);

export default Product;