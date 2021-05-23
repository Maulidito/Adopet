import { firebase } from "../../firebase/firebaseConfig";

export const onLogin = (data, callback) => async (dispatch, getState) => {
  const { username, password } = data;

  const uid = await firebase.default
    .auth()
    .signInWithEmailAndPassword(username, password)
    .catch((err) => {
      dispatch({ type: "failed", payload: `Problem ${err}` });
    });
};

export const onSignup = (data, callback) => async (dispatch, getState) => {
  const user = await firebase.default
    .auth()
    .createUserWithEmailAndPassword(data.username, data.password)
    .then((res) => {
      const { uid } = res.user;

      const userData = { ...data, uid: uid };
      delete userData.password;
      return userData;
    })
    .catch((err) => {
      dispatch({
        type: "failed",
        payload: `Problem ${err}`,
      });
    });

    firebase.default.auth().
  user
    ? await firebase.default
        .firestore()
        .collection("users")
        .doc(user.uid)
        .set(user)
        .then(() => {
          callback();
        })
        .catch((err) => {
          dispatch({
            type: "failed",
            payload: `Problem ${err}`,
          });
        })
    : null;
};

export const clearErrorMessage = () => (dispatch) => {
  dispatch({ type: "clear_err" });
};

export const tryLocalSign = (callback, callbackLogin) => async (dispatch) => {
  //Tempat mengatur account login dan logout
  const userRef = firebase.default.firestore().collection("users");
  await firebase.default.auth().onAuthStateChanged(async (user) => {
    if (user) {
      await userRef
        .doc(user.uid)
        .get()
        .then((res) => {
          const userData = res.data();

          dispatch({
            type: "login_success",
            payload: userData,
          });
          callback();
        })
        .catch((err) => {
          dispatch({ type: "failed", payload: `Problem ${err}` });
        });
    } else {
      callbackLogin();
    }
  });
};

export const signout = () => async (dispatch) => {
  await firebase.default
    .auth()
    .signOut()
    .then(() => {
      dispatch({ type: "signout" });
    })
    .catch((err) => {
      console.log(err);
    });
};

export const onEdit = (user, callback) => async (dispatch) => {
  await firebase.default
    .firestore()
    .collection("users")
    .doc(user.uid)
    .set(user)
    .then(() => {
      dispatch({ type: "login_success", payload: user });
      callback();
    })
    .catch((err) => {
      console.log("error onEdit", err);
    });

  firebase.default.auth().has;
};
