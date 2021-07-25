import mongoose, { Schema } from "mongoose";
import { IEvent, EventSession } from "../interfaces/event.interface";

const EventSchema: Schema = new Schema({
  owner: { type: Schema.Types.ObjectId, required: true },
  name: { type: String, required: true },
  theme: { type: String },
  // sessions: [],
  frontImage: { type: String },
  photos: [{ type: String }],
  description: { type: String, required: true },
});

export default mongoose.model<IEvent>("Events", EventSchema);
