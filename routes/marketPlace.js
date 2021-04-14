//Import Router Module
const router = require('express').Router();

//Import marketPlaceController Moddule
const marketPlaceController = require('../controllers/marketPlaceController');

//===================================================================================================================//
//                                      {All Ad Spaces Endpoint}
//===================================================================================================================//
router.get('/alladspaces', marketPlaceController.allAdSpaces);


//===================================================================================================================//
//                                      {Ad Space Details Endpoint}
//===================================================================================================================//
router.get('/adspacesdetails/:ad_space_id', marketPlaceController.adSpacesDetails);


//export Module
module.exports = router;