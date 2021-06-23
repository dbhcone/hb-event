import { Document } from "mongoose";
import { IUser } from "./user.interface";



export interface IEvent extends Document {
    owner: IUser['_id'];
    name: string;
    theme?: string;
    sessions: EventSession[];
    frontImage: string;
    photos?: string[];
    description: string;
}

export class EventSession {
    date: string;
    timeStart: string;
    timeEnd: string;
    details: string;
}
