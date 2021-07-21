import axios from "axios";
import { Request, Response } from "express";
import config from "config";
import { Endpoints } from "../services/endpoints";
// const https = require("https");
import https from "https";

const getFileCount = async (req: Request, res: Response) => {
  const token = config.get("DROPBOX_ACCESS_TOKEN");

  try {
    // let response = await 
    axios.post('https://api.dropboxapi.com/2/file_requests/count', null, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }).then((resp)=> {
        res.send(resp.status);
        console.log('status', resp.status);
    }).catch((err)=> {
        res.json(err);
    });
    // res.json({ data: response.data });
  } catch (error) {
    res.status(400).json(error);
  }
};

const getFileCount1 = async (req: Request, res: Response) => {
  const token = config.get("DROPBOX_ACCESS_TOKEN");
  try {
    const request = https.request(
      "https://api.dropboxapi.com/2/file_requests/count",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
      (resp) => {
        console.log("statusCode: ", resp.statusCode);
        console.log("headers: ", resp.headers);

        resp.on("data", (d) => {
          process.stdout.write(d);
          res.json(d);
        });

        resp.on("error", (er) => {
          process.stdout.write("There was an error" + er);
        });
      }
    );

    request.end();
  } catch (error) {
    res.status(400).json(error);
  }
};

export { getFileCount, getFileCount1 };
