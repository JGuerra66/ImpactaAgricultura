import { Schema, model, models, Document } from "mongoose";

export interface IContractor extends Document {
    _id: string;
    name: string;
    userId: string;
    orgId: string;
    
}

const ContractorSchema = new Schema({
    name: {type: String, required: true},   
    userId: {type: String, required: true},
    orgId: {type: String, required: true},
});

const Contractor = models.Contractor || model('Contractor', ContractorSchema);

export default Contractor;