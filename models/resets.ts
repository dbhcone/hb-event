//Import Mongoose Module
import mongoose, {Schema} from 'mongoose';

//Define Password Reset Schema
const reset_Schema = new Schema(
    { 
        email: String, 
        temp_token: String
    }
);

//Initialize Schema
export default mongoose.model('Reset', reset_Schema);
