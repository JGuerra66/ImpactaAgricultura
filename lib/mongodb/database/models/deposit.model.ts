import { Schema, model, models } from "mongoose";

export interface IDeposit {
    _id: string;
    name: string;
    depositLocation: string;
    photo: string;
    type: string;
}

const DepositSchema = new Schema({
    name: {type: String, required: true},
    depositLocation: {type: String, required: true},
    photo: {type: String, required: false},
    type: {type: String, required: true},
});

const Deposit = models.Deposit || model('Deposit', DepositSchema);

export default Deposit;