const inital = {
  dataAnimal: [],
};

const ReducerAnimal = (state = inital, action) => {
  switch (action.type) {
    case "get_animal":
      return { ...state, dataAnimal: action.payload };
    default:
      return state;
  }
};

export default ReducerAnimal;
