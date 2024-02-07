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


//agregar id de organizacion fecha de ultima modificacion y fecha de creacion y id de usuario que actualizo ultimo
// ver accesos de usuarios por medio de orgId + userId y su rol