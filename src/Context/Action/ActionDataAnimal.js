import DataAnimal from "../../api/ApiDatabase";
import { firebase } from "../../firebase/firebaseConfig";

export const getAnimalData =
  (page, refresh, callback, filter) => async (dispatch, getState) => {
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

        const dataFinalAnimal = processGetData(data);

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

export const LikeAnimal =
  (uidUsers, liked, idAnimal) => async (dispatch, getState) => {
    const { user } = getState().Reducer;
    const userData = await firebase.default
      .firestore()
      .collection("users")
      .doc(uidUsers);

    user.liked = [...user.liked, idAnimal];
    await userData
      .update({ liked: [...liked, idAnimal] })
      .then((res) => {
        dispatch({ type: "AddLiked", payload: user });
      })
      .catch((err) => {
        console.log(err);
      });
  };

export const unlikeAnimal = (uidUsers, liked, idAnimal) => async (dispatch) => {
  const userData = await firebase.default
    .firestore()
    .collection("users")
    .doc(uidUsers);

  liked.splice(liked.indexOf(idAnimal), 1);

  await userData
    .update({ liked })
    .then((res) => {
      dispatch({ type: "unliked", payload: liked });
    })
    .catch((err) => {
      console.log(err);
    });
};

export const processGetData = (data) => {
  const { included } = data;
  const dataDetail = data.data;
  const dataFinalAnimal = [];
  dataDetail.map(({ attributes, id, relationships } = val, index) => {
    let { name, descriptionText, sex, colorDetails, ageString } = attributes;

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
  return dataFinalAnimal;
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
        ori: attributes.original ? attributes.original.url : null,
        small: attributes.small ? attributes.small.url : null,
      });
    }
  });

  return dataReturn;
};

export const getLikedAnimal = async (liked) => {
  return await DataAnimal.get(`animals/${liked}`);
};

const checkData = (value) => (value ? value.data : []);
