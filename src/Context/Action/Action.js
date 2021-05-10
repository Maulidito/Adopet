import { firebase } from "../../firebase/firebaseConfig";

export const onLogin = (data, callback) => async (dispatch, getState) => {
  const { username, password } = data;

  await firebase.default
    .auth()
    .signInWithEmailAndPassword(username, password)
    .then(({ user }) => {
      dispatch({
        type: "login_success",
        payload: user,
      });
      callback();
    })
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
      return userData;
    })
    .catch((err) => {
      dispatch({
        type: "failed",
        payload: `Problem ${err}`,
      });
    });

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

export const signout = (callback) => async (dispatch) => {
  await firebase.default
    .auth()
    .signOut()
    .then(() => {
      callback();
      dispatch({ type: "signout" });
    })
    .catch((err) => {
      console.log(err);
    });
};
