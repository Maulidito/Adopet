import React from "react";
import axios from "axios";
import GetApiKey from "./ApiKeyRescueGroup";

async function ApiDatabase(user, pass) {
  return await axios.get(
    `https://5ff7c7d610778b001704277d.mockapi.io/api/v1/users?username=${user}&password=${pass}`
  );
}

export const getAnimalData = async (dataAnimal, setDataAnimal, animating) => {
  return await axios
    .get("https://api.rescuegroups.org/v5/public/animals/?limit=100", {
      headers: GetApiKey(),
    })
    .then((response) => {
      response.data.data.map((val, i) => {
        dataAnimal.push({
          id: String(i),
          name: val.attributes.name,
          sex: val.attributes.sex,
          desc: val.attributes.descriptionText,
          image: val.attributes.pictureThumbnailUrl,
        });
      });
      animating();
      setDataAnimal(dataAnimal);
    })
    .catch((error) => {
      console.log(error);
    });
};

export default ApiDatabase;
