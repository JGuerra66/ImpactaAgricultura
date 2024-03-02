import { Schema, model, models } from "mongoose";

export interface ILabour extends Document {
    _id: string;
    name: string;
    orgId: string;
    userId: string;
}

const LabourSchema = new Schema({
    name: {type: String, required: true},
    orgId: {type: String, required: true},
    userId: {type: String, required: true},
});

const Labour = models.Labour || model('Labour', LabourSchema);

export default Labour;