import db from "../../api/ApiDatabase";

export const onLogin = ({ username, password }, callback) => async (
  dispatch,
  getState
) => {
  return await db(username, password)
    .then((res) => {
      if (res.data.length == 1 && username != "" && password != "") {
        callback(res.data[0]);
        dispatch({ type: "login_succes", payload: "" });
      } else {
        dispatch({
          type: "login_failed",
          payload: "error username dan password",
        });
      }
    })
    .catch((err) => {});
};
