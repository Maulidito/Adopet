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
      return { ...state, ...initial };
    }
    case "AddLiked": {
      const array = [...state.user.liked, action.payload];
      const userTemp = { ...state.user, liked: array };

      return { ...state, user: userTemp };
    }
    case "unlike": {
      return { ...state, ...user, liked: action.payload };
    }
    default:
      return state;
  }
};

export default reducer;
