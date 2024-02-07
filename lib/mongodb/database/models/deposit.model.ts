import { Schema, model, models } from "mongoose";

export interface IDeposit {
    _id: string;
    name: string;
    depositLocation: string;
    type: string;
    userId: string;
    orgId: string;
    
}

const DepositSchema = new Schema({
    name: {type: String, required: true},
    depositLocation: {type: String, required: false},
    type: {type: String, required: true},
    userId: {type: String, required: true},
    orgId: {type: String, required: true},
    
});

const Deposit = models.Deposit || model('Deposit', DepositSchema);

export default Deposit;