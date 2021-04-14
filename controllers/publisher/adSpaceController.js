//Import Axios module
const axios = require('axios');

//Import alexa-rank-nodejs package
const NodejsAlexaRank = require('alexa-rank-nodejs').default;

//Import publisherSchema Module
const publisherSchema = require('../../schema/publisherSchema');

//Import AdSpace and AboutAudience schemas
const AdSpace = require('../../models/adspace');
const AboutAudience = require('../../models/aboutaudience');
const mongoose = require('mongoose');

//===================================================================================================================//
//                                      {Create Ad Space Endpoint}
//===================================================================================================================//
const createAd = async (req, res, next)=>{
    // console.log(req.file);
    // console.log(req.body);
            //Check if the payload is not empty
            if(!req.body.ad_space) return res.status(404).json({error: "Ad Space object is empty"});

            const adPicDetails = req.file;
            
            try {
                //Validate
                // HINT: ad_space in the body is of type string due to how we are sending both
                // image and json content simultaneously from the frontend.
                // we need to convert the ad_space string back to an object to preceed. 
                let ad_space_str = req.body.ad_space;
                let ad_space_obj = JSON.parse(ad_space_str)

                let body = {...req.body, ad_space: ad_space_obj};
                await publisherSchema.createAdSchema.validateAsync(body);

                // Assign body object to ad_space and hold on
                const ad_space = body.ad_space;

                //Generate ID for Ad Space
                ad_space._id = new mongoose.Types.ObjectId();

                //Insert picture
                ad_space.picture = `adSpaceImages/${adPicDetails.filename}`;

                ad_space.file_type = adPicDetails.mimetype;

                ad_space.originalpicturename = adPicDetails.originalname;

        //===========================================================================
                //AWIS ALEXA API
                const url = process.env.AWIS_ALEXA_API + `${ad_space.website}`;
                // const url = `https://awis.api.alexa.com/api?Action=UrlInfo&Count=10&ResponseGroup=Rank,RankByCountry,UsageStats&Start=1&Output=json&Url=${ad_space.website}`;

                //Fetch Audience data with API and website url
                const fetchData = await axios.get(`${url}`, {headers: { 'Content-Type': 'application/json', "x-api-key": process.env.AWIS_ALEXA_API_x_api_key }});
                const alexaResponse = await fetchData.data.Awis.Results;
        //=============================================================================

        //=============================================================================
                //Check for "KEYWORDS"
                const fetchDetails = await NodejsAlexaRank.siteinfo(`${ad_space.website}`);

                if(fetchDetails.status !== 200) return res.status(404).send({error: `Ad Creation Failed, ${fetchDetails.message}`});
                const fetchResponse = await fetchDetails.data;

                const keywords = fetchResponse.top_keywords;
        //=============================================================================
                
                if(alexaResponse.ResponseStatus.StatusCode === "Forbidden") return res.status(404).send({error: "Ad Creation Failed"});

                const apiData = alexaResponse.Result.Alexa; 
                //console.log(apiData);

                //Destructure Relevant Date
                const { TrafficData: { Rank, RankByCountry: {Country: countries}, UsageStatistics: {UsageStatistic}} } = apiData;
                //====================================================================================
                const countryCodes = [];
            
                    countries.map(country => countryCodes.push(country["@Code"]));
                    
                    const countryCodesString = countryCodes.toString().replace(/,/g, ";");

                    //Fecht COUNTRIES AND THEIR CODES WITH API 
                    const fetchExternalCountryCodes = await axios.get(process.env.COUNTRY_CODE_API + `${countryCodesString}`);
                    // const fetchExternalCountryCodes = await axios.get(`https://restcountries.eu/rest/v2/alpha?codes=${countryCodesString}`);

                    const fetchExternalCountryCodesResult = await fetchExternalCountryCodes.data;
                //=============================================================================================
                    const countryStats = [];

                    const countryPlusCode = [];

                    fetchExternalCountryCodesResult.map(countryInfo =>{
                        if(countryInfo === null){
                            //
                        }else{
                                countryPlusCode.push({name: countryInfo.name, code: countryInfo.alpha2Code});
                        }
                    });
                    //console.log(countryPlusCode);

                    countries.map(initialData =>{
                        countryPlusCode.map(subsequentData =>{
                            if(subsequentData.code === initialData["@Code"]){
                                        countryStats.push({country: subsequentData.name, userpercent: initialData.Contribution.Users});
                            }
                        });
                    });

                //Create Audience object
                const about_audience = {
                                _id: new mongoose.Types.ObjectId(), userid: ad_space.userid, ad_spaceid: ad_space._id,
                                approximate_reach: UsageStatistic[0].Reach.PerMillion.Value, top_keywords: keywords,
                                gender: { women: "", men: "String", other: "String" }, age_range: [], geo_stats: countryStats
                };

                ad_space.alexa_rank = Rank;
                ad_space.impressions = UsageStatistic[0].PageViews.PerMillion.Value;
                ad_space.about_audienceid = about_audience._id;

                //Insert ad_space into the database
                const createAd = await AdSpace({ad_space}).save();

                //Insert Audience data into the database
                const createAudience = AboutAudience({about_audience}).save();

                res.json({message: "Ad Created Successfully"});
                // res.json({message: "Ad Created Successfully", data: countryStats});
                //res.json({message: "Ad Created Successfully", data: {alexaResponse, about_audience}});
                // res.json({message: "Ad Created Successfully", data: about_audience});
                } catch (error) {
                    res.status(404).send({error: error.message});
                }
};

//===================================================================================================================//
//                                      {My Ad Spaces Endpoint}
//===================================================================================================================//
const myAdSpaces = async (req, res, next)=>{
                //Check if the payload is not empty
                if(!req.params) return res.status(404).json({error: "User id is empty"});

                try {
                    //Validate
                    
                    const id = req.params.userid;
                    //console.log(id);
                    //Fecth All my ad spaces
                    const myAds = await AdSpace.find({}, {userid: id, "ad_space.picture": 1, "ad_space.alexa_rank": 1, "ad_space.impressions": 1, 
                                                        "ad_space.status": 1, "ad_space.cost_per_ad": 1, "ad_space.about_audienceid": 1, "ad_space.originalpicturename": 1});
                    //console.log(myAds);
                
                    //Return Data
                    res.send({message: "Fecth Successful", myAds});
                } catch (error) {
                    res.status(404).send({error: message.error});    }
};


//===================================================================================================================//
//                                      {My Ad Spaces Details Endpoint}
//===================================================================================================================//
const myAdSpaceDetails = async (req, res, next)=>{
                //Check if the payload is not empty
                if(!req.params) return res.status(404).json({error: "User id is empty"});

                try {
                    //Validate
                    
                    const id = req.params.ad_space_id;
                    //console.log(id);

                    //Fecth All my ad sapaces
                    const AdsDeTails = await AdSpace.find({_id: id});
                    //console.log(AdsDeTails[0].ad_space.about_audienceid);
                    
                    const AudienceDeTails = await AboutAudience.find({"about_audience._id": AdsDeTails[0].ad_space.about_audienceid});
                    //console.log(myAds);
                    
                    //const dataDet = await AdSpace.find({_id: id}).populate('about_audience.about_audienceid').exec();
                
                    //Return Data
                    //res.send({message: "Ad Space Details", data: {dataDet}});
                    res.send({message: "Ad Space Details", data: {AdsDeTails, AudienceDeTails}});
                } catch (error) {
                    res.status(404).send({error: message.error});    
                }
};


//===================================================================================================================//
//                                      {Delete Ad Space Endpoint}
//===================================================================================================================//
const deleteSpace = async (req, res, next)=>{
                //Check if the payload is not empty
                if(!req.params) return res.status(404).json({error: "Id is empty"});
                //console.log(req.params);

                try {
                    //Validate

                    const ad_space_id = req.params.ad_space_id;
                    const about_audienceid = req.params.about_audienceid;

                    const deleteAudience = await AboutAudience.findOneAndDelete({"about_audience._id": about_audienceid});

                    if(!deleteAudience) res.send({error: "Audience Deletion Failed"});

                    const deleteAdSpace = await AdSpace.findOneAndDelete({_id: ad_space_id});

                    if(!deleteAdSpace) res.send({error: "Ad Space Deletion Failed"});

                    if(deleteAudience && deleteAdSpace){
                        res.send({message: "Ad Space Successfully Deleted!"});
                    }

                } catch (error) {
                    res.status(404).send({error: message.error});
                }
};


//Export Modules
module.exports = {
    createAd, myAdSpaces, myAdSpaceDetails, deleteSpace
};