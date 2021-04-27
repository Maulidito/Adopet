import Db from "../../database/LinkDatabase";
import AsyncStorage from "@react-native-async-storage/async-storage";
export const onLogin = (data, callback) => async (dispatch, getState) => {
  return await Db.post("/signin", data)
    .then(async ({ data }) => {
      const dataUser = await getDataUser(data.token);

      dispatch({
        type: "login_success",
        payload: { token: data.token, user: dataUser.data },
      });
      await AsyncStorage.setItem("auth", data.token);
      callback();
    })
    .catch((err) => {
      dispatch({
        type: "failed",
        payload: `Problem ${err}`,
      });
    });
};

export const onSignup = (data, callback) => async (dispatch, getState) => {
  return await Db.post("/signup", data)
    .then((res) => {
      dispatch({
        type: "signup_success",
        payload: "username and password already exist",
      });
      callback();
    })
    .catch((err) => {
      dispatch({
        type: "failed",
        payload: `Problem ${err}`,
      });
    });
};

export const clearErrorMessage = () => (dispatch) => {
  dispatch({ type: "clear_err" });
};

const getDataUser = (token) => {
  return Db.get("/", {
    headers: { authorization: token },
  });
};

export const tryLocalSign = (callback, callbackLogin) => (dispatch) => {
  AsyncStorage.getItem("auth")
    .then(async (res) => {
      if (!res) {
        return callbackLogin();
      }

      const dataUser = await getDataUser(res);

      dispatch({
        type: "login_success",
        payload: { token: res, user: dataUser.data },
      });
      return callback();
    })
    .catch((err) => {
  
      dispatch({ type: "failed", payload: `Problem ${err}` });
      callbackLogin();
    });
};

export const signout = (callback) => async (dispatch) => {
  await AsyncStorage.removeItem("auth").then(() => {
    dispatch({ type: "signout" });
    callback();
  });
};
