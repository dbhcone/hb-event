import { POST } from "./request";
import { Endpoints } from "./endpoints";
import config from "config";
import axios from "axios";

const fileCount = () => {
  const token = config.get("DROPBOX_ACCESS_TOKEN");
  //   return POST(Endpoints.file_count, { Authorization: `Bearer ${token}` });
  return axios.post(Endpoints.file_count,'', {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
};

export { fileCount };
