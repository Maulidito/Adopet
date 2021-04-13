const initial = {
  errMessage: "",
};
const reducer = (state = initial, action) => {
  switch (action.type) {
    case "login_succes": {
      const { username, password, callback } = action.payload;
      test = onLogin(username, password, callback);
      console.log(test);

      return { ...state, errMessage: action.payload };
    }
    case "login_failed": {
      return { ...state, errMessage: action.payload };
    }
    default:
      return state;
  }
};

export default reducer;
