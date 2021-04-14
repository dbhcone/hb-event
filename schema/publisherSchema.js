//Import Joi Module
const Joi = require('@hapi/joi');

//Import Multer Package
const multer = require('multer');

//Import Path
const path = require('path');

//Sing Up Schema
const createAdSchema = Joi.object({
            ad_space: {
                userid: Joi.string().required(),
                website: Joi.string().required(),
                category: Joi.string().required(),
                cost_per_ad: Joi.number().required(),
                // file_type: Joi.string(),
                dimension: {
                     width: Joi.string(),
                     height: Joi.string(),
                },
                status: Joi.string().required(),
                // picture: Joi.string(),
                publisher: {
                about_website: Joi.string().required(),
                publisher_name: Joi.string().required(),
                about_publisher: Joi.string().required()
                }
            }
});

//Image Validation Schema
const adSpaceImage = multer({
    limits: {
        fileSize: 1000000
    },fileFilter(req, file, callback){
        // use mimetype instead of file extensions
        if(!file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg")
        return callback(new Error('File format not support'));
        callback(null, true);
    }
});

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        // cb(null, "adSpaceImages");
        // cb(null, "public/assets");
        cb(null, "public/adSpaceImages");
    },
    filename: function(req, file, cb) {
        cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({
    storage: storage
});

//Export Module
module.exports = {
    createAdSchema, adSpaceImage, upload
};