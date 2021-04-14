//Import Axios module
// const axios = require('axios');

//Import AdSpace and AboutAudience schemas
const AdSpace = require('../models/adspace');
const AboutAudience = require('../models/aboutaudience');

//===================================================================================================================//
//                                      {All Ad Spaces Endpoint}
//===================================================================================================================//
const allAdSpaces = async (req, res, next)=>{
                try {
                    const allAdSpaces = await AdSpace.find().sort({"ad_space.alexa_rank": 1});

                    res.json({data: allAdSpaces});
                } catch (error) {
                    res.status(404).send({error: message.error});
                }
};


//===================================================================================================================//
//                                      {Ad Space Details Endpoint}
//===================================================================================================================//
const adSpacesDetails = async (req, res, next)=>{
                //Check if the payload is not empty
                if(!req.params) return res.status(404).json({error: "Id is empty"});
                
                try {
                    //Validate
                    
                    const id = req.params.ad_space_id;

                    //Fecth All my ad sapaces
                    const AdsDeTails = await AdSpace.find({"ad_space._id": id});
                    
                    const AudienceDeTails = await AboutAudience.find({"about_audience._id": AdsDeTails[0].ad_space.about_audienceid});
                    //console.log(myAds);
                
                    //Return Data
                    res.json({message: "Ad Space Details", data: {AdsDeTails, AudienceDeTails}});

                } catch (error) {
                    res.status(404).send({error: error});    
                }
};


//Export Modules
module.exports = {
    allAdSpaces, adSpacesDetails
};