//Import Router
const router = require('express').Router();

//Import Ad Model
const Ad = require('../../models/Ad');

//Import Advertizer Schema
const advertizerSchema = require('../../schema/advertizerSchema');

//Import Token Functions
const authToken = require('../../helpers/tokenfunctions');

//===================================================================================================================//
//                                      {Fetch all Ads Endpoint}
//===================================================================================================================//
router.get("/viewallads", async (req, res)=>{
    //
    try {
        //Fetch all ads
        const fetchAds = await Ad.find();

        res.send({message: "Fecth Successful", fetchAds});
    } catch (error) {
        res.status(404).send({error: error.message});
    }
});

//===================================================================================================================//
//                                      {My Ads Endpoint}
//===================================================================================================================//
// router.get("/myads/:user_id", async (req, res)=>{
//     //
//     try {
//         //
//         const user_id = req.params.user_id;

//         const ss = await Ad.find({})
//     } catch (error) {
//         res.status(404).send({error: error.message});
//     }
// });
//===================================================================================================================//
//                                      {Create Ad Endpoint}
//===================================================================================================================//
router.post("/createad", advertizerSchema.upload.single('adImage'), authToken.verifyToken, async (req, res)=>{
   // console.log(req.file);
   // console.log(req.body);

    //Check if the payload is not empty
    if(!req.body.ad_detail) return res.status(404).json({error: "Advertizser object is empty"});

    try {
        //Validate
        await advertizerSchema.advertiser_Schema.validateAsync(req.body);

        const ad_detail = req.body.ad_detail;

        const ad_image_file = req.file;

        ad_detail.ad_image = `adImages/${ad_image_file.filename}`;

        //Create Ad
        const createAdvert = await Ad({ad_detail}).save();

        //
        if(!createAdvert){
            res.send({error: "Ad Creation Failed"});
        }else{
            res.send({message: "successfully created", createAdvert});
        }
    } catch (error) {
     res.status(404).send({error: error.message});   
    }
});

//===================================================================================================================//
//                                      {Update Ad Endpoint}
//===================================================================================================================//
router.patch("/updatead", async (req, res)=>{
    //
})
//===================================================================================================================//
//                                      {Fetch all Ads Endpoint}
//===================================================================================================================//
router.get("/deletead/:ad_id", authToken.verifyToken, async (req, res)=>{
    //
        try {
            //
            const _id = req.params.ad_id;

            const deleteAdvert = await Ad.findOneAndDelete({_id});
            //console.log(deleteAdvert);
            
            if(!deleteAdvert){
                res.send({error: "Deletion Failed"});
            }else{
                res.send({message: "Ad Successfully Deleted"});
            };

        } catch (error) {
            res.status(404).send({error: error.message});
        }
})

module.exports = router;