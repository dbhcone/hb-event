import mongoose, { Schema } from "mongoose";
import { IContactUs } from "../interfaces/contactus.interface";

// Define User Schema
const contactUs_Schema: Schema = new Schema(
  {
    name: { type: String, required: true, min: 8, max: 10 },
    email: { type: String, required: true },
    message: { type: String, required: true, min: 20 },
  },
  { timestamps: true }
);

export default mongoose.model<IContactUs>("Enquiries", contactUs_Schema);
