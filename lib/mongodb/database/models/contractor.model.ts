import { Schema, model, models, Document } from "mongoose";

export interface IContractor extends Document {
    _id: string;
    name: string;
    contractorLocation: string; 
    photo: string;
}

const ContractorSchema = new Schema({
    name: {type: String, required: true},
    contractorLocation: {type: String, required: true}, 
    photo: {type: String, required: false},   
});

const Contractor = models.Contractor || model('Contractor', ContractorSchema);

export default Contractor;