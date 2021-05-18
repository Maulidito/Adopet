const initial = {
  errMessage: "",
  user: {},
};
const reducer = (state = initial, action) => {
  switch (action.type) {
    case "login_success": {
      return {
        ...state,
        user: action.payload,
      };
    }
    case "failed": {
      return { ...state, errMessage: action.payload };
    }
    case "clear_err": {
      return { ...state, errMessage: initial.errMessage };
    }
    case "signout": {
      return { ...state, initial };
    }
    default:
      return state;
  }
};

export default reducer;
