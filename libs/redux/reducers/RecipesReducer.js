const intialState = {
  status: "idle",
  recipes: [],
};

const RecipesReducer = (state = intialState, action) => {
  switch (action.type) {
    case "REQUEST_RECIPES":
      return { ...state, status: "requested" };
    case "RECEIVE_RECIPES":
      return { ...state, status: "received", recipes: action.data };
    case "ERROR_RECIPES":
      return { ...state, status: "error" };
    default:
      return state;
  }
};

export default RecipesReducer;
