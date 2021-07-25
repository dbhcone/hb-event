import { Document } from "mongoose";

export interface IContactUs extends Document {
  name: string;
  email: string;
  message: string;
  user: string;
}
