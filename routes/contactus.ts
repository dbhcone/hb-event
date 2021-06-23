import express, { Request, Response } from "express";

import ContactUs from "../models/contactus.model";
import { contactUs_Schema } from "../schema/contactus.schema";

//Import Router
const router = express.Router();

router.post("/contactUs", async (req: Request, res: Response) => {
  try {
    //Validate
    const data = req.body;

    const validation = await contactUs_Schema.validateAsync(data);
    //

    const saveData = await new ContactUs(data).save();
    //console.log(saveData);
    if (saveData) {
      res.send({ message: "successful", data: saveData });
    } else {
      res.status(404).send({ error: "failed" });
    }
  } catch (error) {
    res.status(404).send({ error: error.message });
  }
});

export { router as contactusRouter };
