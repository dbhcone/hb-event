//Import @Hapi/Joi
// const Joi, { string } = require('@hapi/joi');
// const Joi = require('@hapi/joi');
import Joi from "@hapi/joi";

//Import Multer
// const multer = require('multer');
import multer from "multer";

//Import path
import path from "path";
// const path = require('path');

// Define Schema
const advertiser_Schema = Joi.object({
  ad_detail: {
    userid: Joi.string().required(),
    advertizer_name: Joi.string().required(),
    advertizer_url: Joi.string().required(),
    price: Joi.number().required(),
    ad_category: Joi.string().required(),
  },
});

const storage = multer.diskStorage({
  // Express.Multer.File
  // (error: Error, destination: string)
  destination: function (req, file, cb) {
    cb(null, "public/adImages");
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});
const upload = multer({
  storage: storage,
});

export { advertiser_Schema, upload };
//Export Schemas
