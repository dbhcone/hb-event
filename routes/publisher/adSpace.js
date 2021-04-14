//Import Router Module
const router = require('express').Router();

//Import adSpaceController Modules
const adSpaceController = require('../../controllers/publisher/adSpaceController');

//Import publisherSchema Module
const publisherSchema = require('../../schema/publisherSchema');

//Import Token
const authToken = require('../../helpers/tokenfunctions');

 const mongoose = require('mongoose');

//===================================================================================================================//
//                                      {Create Ad Space Endpoint}
//===================================================================================================================//
// router.post('/createadspace', authToken.verifyToken, publisherSchema.upload.single('adSpaceImage'), adSpaceController.createAd);
router.post('/createadspace', publisherSchema.upload.single('adSpaceImage'), adSpaceController.createAd);


//===================================================================================================================//
//                                      {My Ad Spaces Endpoint}
//===================================================================================================================//
router.get('/myadspaces/:userid', authToken.verifyToken, adSpaceController.myAdSpaces);

//===================================================================================================================//
//                                      {My Ad Spaces Details Endpoint}
//===================================================================================================================//
 router.get('/myadspacedetails/:ad_space_id', authToken.verifyToken, adSpaceController.myAdSpaceDetails);


//===================================================================================================================//
//                                      {Delete Ad Space Endpoint}
//===================================================================================================================//
 router.get('/deletespace/:ad_space_id/:about_audienceid', authToken.verifyToken, adSpaceController.deleteSpace);

//Testing ID-Generator
router.get('/autoid', (req, res)=>{
    res.send({_id: new mongoose.Types.ObjectId()});
})


module.exports = router;