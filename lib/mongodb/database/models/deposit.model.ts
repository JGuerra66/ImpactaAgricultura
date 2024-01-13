import { Schema, model, models } from "mongoose";

export interface IDeposit {
    _id: string;
    name: string;
    depositLocation: string;
    photo: string;
    type: string;
    creator: {_id: string, firstName: string, lastName: string};
}

const DepositSchema = new Schema({
    name: {type: String, required: true},
    depositLocation: {type: String, required: false},
    photo: {type: String, required: false},
    type: {type: String, required: true},
    creator: {type: Schema.Types.ObjectId, ref: 'User', required: true},
});

const Deposit = models.Deposit || model('Deposit', DepositSchema);

export default Deposit;