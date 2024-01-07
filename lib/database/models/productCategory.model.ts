import { Schema, model, models } from "mongoose";

export interface IProductCategory {
    _id: string;
    name: string;

}

const ProductCategorySchema = new Schema({
    name: {type: String, required: true},
});

const ProductCategory = models.ProductCategory || model('ProductCategory', ProductCategorySchema);

export default ProductCategory;