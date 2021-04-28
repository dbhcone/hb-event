//Import ContactUs
const ContactUs = require("../models/contactus");

//Import Router
const router = require("express").Router();

//Import Contact Us Schema
const theContact = require("../schema/contactUsSchema");

router.post("/contactUs", async (req, res) => {
  try {
    //Validate
    await theContact.contactUs_Schema.validateAsync(req.body);
    //
    const data = req.body;

    const saveData = await ContactUs(data).save();
    //console.log(saveData);
    if (saveData) {
      res.send({ message: "successful" });
    } else {
      res.status(404).send({ error: "failed" });
    }
  } catch (error) {
    res.status(404).send({ error: error.message });
  }
});

//Export Router
module.exports = router;
