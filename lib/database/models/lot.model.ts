import { Schema, model, models } from "mongoose";

export interface ILot extends Document {
    _id: string;
    name: string;
    deposit: {_id: string, name: string};
    kmzFile: string;

}

const LotSchema = new Schema({
    name: {type: String, required: true},
    deposit: {type: Schema.Types.ObjectId, ref: 'Deposit', required: true},
    kmzFile: {type: String, required: false},
});

const Lot = models.Lot || model('Lot', LotSchema);

export default Lot;