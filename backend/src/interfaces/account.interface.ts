import { Document } from "mongoose";

export interface IAccount extends Document {
  email: string;
  lastName: string;
  firstName: string;
  otherNames?: string;
  gender: string;
  mobileNumber: string;
  address?: string;
}
