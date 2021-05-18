const inital = {
  dataAnimal: [],
  dataSpecies: [],
  pages: 1,
  errMessage: "",
};

const ReducerAnimal = (state = inital, action) => {
  switch (action.type) {
    case "get_animal":
      return action.payload.status
        ? {
            ...state,
            dataAnimal: action.payload.data,
          }
        : {
            ...state,
            dataAnimal: [...state.dataAnimal, ...action.payload.data],
          };

    case "reset": {
      return { inital };
    }
    case "clear_err": {
      return { ...state, errMessage: "" };
    }
    case "failed": {
      return { ...state, errMessage: action.payload, dataAnimal: [] };
    }
    case "get_species": {
      return { ...state, dataSpecies: action.payload };
    }
    default:
      return state;
  }
};

export default ReducerAnimal;
