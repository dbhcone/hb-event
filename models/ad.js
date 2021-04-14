//Import Mongoose
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

//Define Schema
const ad_Schema = mongoose.Schema({
    ad_detail: {
            userid: {type: Schema.Types.ObjectId, ref: 'Users'},
            advertizer_name: String,
            advertizer_url: String,
            price: Number,
            ad_category: String,
            ad_image: String
        }
});

//Initialize Schema
const Ad = mongoose.model('Ad', ad_Schema);

//Export Schema
module.exports = Ad;