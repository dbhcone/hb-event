//Import @Hapi/Joi
const { string } = require('@hapi/joi');
const Joi = require('@hapi/joi');

//Import Multer
const multer = require('multer');

//Import path
const path = require('path');


// Define Schema
const advertiser_Schema = Joi.object({
        ad_detail: {
            userid: Joi.string().required(),
            advertizer_name: Joi.string().required(),
            advertizer_url: Joi.string().required(),
            price: Joi.number().required(),
            ad_category: Joi.string().required()
        },
});

const storage = multer.diskStorage({
        destination: function(req, file, cb) {
            cb(null, "public/adImages");
        },
        filename: function(req, file, cb) {
            cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname));
        }
});
const upload = multer({
    storage: storage
});

//Export Schemas
module.exports = {
    advertiser_Schema, upload
};