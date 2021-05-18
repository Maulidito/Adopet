import DataAnimal from "../../api/ApiDatabase";

export const getAnimalData = (page, refresh, callback, filter) => async (
  dispatch,
  getState
) => {
  await DataAnimal.get(
    filter ? `animals/search/available/${filter.toLowerCase()}` : "animals/",
    {
      params: { limit: 20, page: page },
    }
  )
    .then(({ data }) => {
      const { pages } = data.meta;
      if (pages == 0) throw "failed";
      if (pages < page) throw "End";

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

      dispatch({
        type: "get_animal",
        payload: { status: refresh, data: dataFinalAnimal },
      });
    })
    .catch((err) => {
      console.log(err, filter);
      dispatch({ type: err, payload: "Not Found" });
    });
  callback();
};

//const getdata = async()=>{}

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
        ori: attributes.original ? attributes.original.url : null,
        small: attributes.small ? attributes.small.url : null,
      });
    }
  });

  return dataReturn;
};

export const resetAnimalData = () => (dispatch) => {
  dispatch({ type: "reset" });
};

export const getSpeciesAnimal = (callback) => async (dispatch) => {
  await DataAnimal.get("animals/species", { params: { limit: 100 } })
    .then(({ data: { data } }) => {
      let species = [];
      species = data.map(({ attributes }) => {
        return attributes.plural;
      });

      dispatch({ type: "get_species", payload: species });
      callback();
    })
    .catch((err) => {
      console.log(err, "erer");
    });
};

export const clear_err = () => (dispatch) => {
  dispatch({ type: "clear_err" });
};

// export const filterSpecies = (species) => async (dispatch) => {
//   await DataAnimal.get();
// };

const checkData = (value) => (value ? value.data : []);
