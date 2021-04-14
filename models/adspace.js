//Import Mongoose Module
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

//Define Temp Accounts Schema
const ad_space_schema = Schema({
    ad_space: {
                    _id: Schema.Types.ObjectId,
                    userid: {type: Schema.Types.ObjectId, ref: 'Users'},
                    about_audienceid: {type: Schema.Types.ObjectId, ref: 'AboutAudience'},
                    category: String,
                    website: String,
                    cost_per_ad: Number,
                    file_type: String,
                    dimension: {
                    width: String,
                    height: String
                    },
                    alexa_rank: String,
                    impressions: String,
                    status: String,
                    picture: String,
                    originalpicturename: String,
                    publisher: {
                        about_website: String,
                        publisher_name: String,
                        about_publisher: String
                    }
             }
});

//Initialize Schem
const AdSpace = mongoose.model('AdSpace', ad_space_schema);

//Expert schema
module.exports = AdSpace;