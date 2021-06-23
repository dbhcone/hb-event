import mongoose, {Schema} from 'mongoose';
import { IUser } from '../interfaces/user.interface';

const UserSchema: Schema = new Schema({
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    role: {type: String, required: true, default: 'subscriber'}
});



export default mongoose.model<IUser>('User', UserSchema)