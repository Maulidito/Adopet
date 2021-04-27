import DataAnimal from "../../api/ApiDatabase";

export const getAnimalData = (countData, callback) => (dispatch) => {
  DataAnimal.get("", { params: { limit: countData } })
    .then(({ data }) => {
      const { included } = data;
      const dataDetail = data.data;
      const dataFinalAnimal = [];
      dataDetail.map(({ attributes, id, relationships } = val, index) => {
        let {
          name,
          descriptionText,
          sex,
          colorDetails,
          ageString,
        } = attributes;

        let { locations, orgs, pictures } = relationships;

        locations = checkData(locations);
        orgs = checkData(orgs);
        pictures = checkData(pictures);

        dataFinalAnimal.push({
          id: id,
          name: name,
          description: descriptionText,
          sex: sex,
          color: colorDetails,
          age: ageString,

          dataPictures: getDetailData(pictures, included, "pictures"),
          dataOrgs: getDetailData(orgs, included, "orgs"),
          dataLocations: getDetailData(locations, included, "locations"),
        });
      });

      dispatch({ type: "get_animal", payload: dataFinalAnimal });
      callback();
    })
    .catch((err) => {
      console.log(err);
    });
};

const getDetailData = (pictureID, included, dataName) => {
  let dataReturn = [];

  pictureID.map((val) => {
    const { attributes } = included.find(({ id }) => {
      return val.id === id;
    });
    if (dataName != "pictures") {
      dataReturn = attributes;
    } else {
      dataReturn.push({
        ori: attributes.original.url,
        small: attributes.small.url,
      });
    }
  });

  return dataReturn;
};

const checkData = (value) => (value ? value.data : []);
