//Import Router
const router = require("express").Router();

//Import Ad Model
const Ad = require("../models/ad");

//Pick a random Ad
router.get("/anad", async (req, res) => {
  //
  try {
    // Fetch Random Ad
    const data = await Ad.find().limit(1);
    //console.log(data);

    if (!data) {
      res.send({ error: "Failed to fetch Ad" });
    } else {
      const ad_url = data[0].ad_detail.advertizer_url;
      const ad_image = data[0].ad_detail.ad_image;
      // const image_url = 'http://localhost:3000';
      const image_url = `${process.env.URL}`;
      res.send(`
            <!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN"><HTML><HEAD>
            <META http-equiv=Content-Type content="text/html;"></HEAD>
            <BODY leftmargin="0" marginwidth="0" topmargin="0" marginheight="0"><table border=0 cellpadding=0 cellspacing=0 height=60>
            <tr><td valign="bottom" align="center"><a onmouseover="window.status=' Banner Mart'; return true" onmouseout="window.status=' '; return true" target="_blank" href="https://${ad_url}"><img alt="Banner Mart" border=0 src="${image_url}/${ad_image}" width="468" height="60"></a></td></tr>
            <tr><td valign="top" align="center"></td></tr>
            </table></BODY></HTML>
            `);
    }
  } catch (error) {
    res.status(404).send({ error: error.message });
  }
});

//Export Module
module.exports = router;
