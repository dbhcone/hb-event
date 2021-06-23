import mongoose, { Schema } from "mongoose";
import { IAccount } from "../interfaces/account.interface";

const AccountSchema: Schema = new Schema({
    email: {type: String, required: true, unique: true},
    lastName: {type: String, required: true},
    firstName: {type: String, required: true},
    otherNames: {type: String},
    gender: {type: String},
    mobileNumber: {type: String, required: true},
    address: {type: String},
})

export default mongoose.model<IAccount>('Account', AccountSchema)