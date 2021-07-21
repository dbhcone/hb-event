import { Document } from "mongoose";

export interface IContactUs extends Document {
  name: string;
  emaril: string;
  message: string;
  user: string;
}
