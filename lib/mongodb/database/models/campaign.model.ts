import { Schema, model, models } from "mongoose";

export interface ICampaign extends Document {
    _id: string;
    campaignName: string;
    orgId: string;
    userId: string;
}

const CampaignSchema = new Schema({
    campaignName: {type: String, required: true},
    orgId: {type: String, required: true},
    userId: {type: String, required: true},
});

const Campaign = models.Campaign || model('Campaign', CampaignSchema);

export default Campaign;