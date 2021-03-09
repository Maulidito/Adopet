import React from "react";
import axios from "axios";

async function ApiDatabase(user, pass) {
  return await axios
    .get(
      `https://5ff7c7d610778b001704277d.mockapi.io/api/v1/users?username=${user}&password=${pass}`
    )
    .then((res) => res)
    .catch((err) => err);
}

export default ApiDatabase;
