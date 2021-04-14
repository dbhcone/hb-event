//Import Mongoose Module
const mongoose = require('mongoose');

//
const Schema = mongoose.Schema;

//Define Temp Accounts Schema
const about_audience_schema = Schema({
    about_audience: {
                        _id: Schema.Types.ObjectId,
                        userid: {type: Schema.Types.ObjectId, ref: 'Users'},
                        ad_spaceid: {type: Schema.Types.ObjectId, ref: 'AdSpace'},
                        approximate_reach: String,
                        gender: {
                        women: String,
                        men: String,
                        other: String
                        },
                        age_range: Array,
                        geo_stats: [{
                            country: String, 
                            userpercent: String
                        }],
                        top_keywords: Array
                 }
});

//Initialize Schem
const AboutAudience = mongoose.model('AboutAudience', about_audience_schema);

//Export Module
module.exports = AboutAudience;