const inital = {
  dataAnimal: [],
  dataSpecies: [],
  pages: 1,
};

const ReducerAnimal = (state = inital, action) => {
  switch (action.type) {
    case "get_animal":
      return action.payload.status
        ? {
            ...state,
            dataAnimal: action.payload.data,
            pages: action.payload.pages,
          }
        : {
            ...state,
            dataAnimal: [...state.dataAnimal, ...action.payload.data],
            pages: action.payload.pages,
          };

    case "reset": {
      return { inital };
    }
    case "get_species": {
      return { ...state, dataSpecies: action.payload };
    }
    default:
      return state;
  }
};

export default ReducerAnimal;
