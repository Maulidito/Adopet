import React from "react";
import axios from "axios";

import GetApiKey from "./ApiKeyRescueGroup";

export default axios.create({
  baseURL: "https://api.rescuegroups.org/v5/public/animals/",
  headers: GetApiKey(),
});