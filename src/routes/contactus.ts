import express, { Request, Response } from "express";

import ContactUs from "../models/contactus.model";
import { contactusValidation } from "../validations/contactus.schema.validate";

//Import Router
const router = express.Router();

router.post("/contactUs", async (req: Request, res: Response) => {
  try {
    //Validate
    const data = req.body;

    const validation = await contactusValidation.validateAsync(data);
    console.log("Validation", validation);
    //
    const newContact = new ContactUs(data);

    const savedData = await newContact.save();
    console.log("Saved Data", savedData);
    if (savedData) {
      res.send({ message: "submitted successfully", data: savedData });
    } else {
      res.status(404).send({ error: "failed" });
    }
  } catch (error) {
    res.status(404).send({ error: error.message });
  }
});

export { router as contactusRouter };
