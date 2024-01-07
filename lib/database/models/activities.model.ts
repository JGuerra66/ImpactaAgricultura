import { Schema, model, models } from "mongoose";

export interface IActivity extends Document {
    _id: string;
    name: string;
}

const ActivitySchema = new Schema({
    name: {type: String, required: true},  
});

const Activity = models.Activity || model('Activity', ActivitySchema);

export default Activity;