const intialState = {
  status: "idle",
  chosenIngredients: [],
  ingredients: [],
};

const IngredientsSearchReducer = (state = intialState, action) => {
  switch (action.type) {
    case "REQUEST_INGREDIENTS_SEARCH":
      return { ...state, status: "requested" };
    case "RECEIVE_INGREDIENTS_SEARCH":
      return {
        ...state,
        status: "received",
        ingredients: action.data.ingredients,
        chosenIngredients: action.data.chosenIngredients,
      };
    case "CLEAR_RESULTS":
      return {
        ...state,
        status: "idle",
        ingredients: [],
      };
    case "ERROR_INGREDIENTS_SEARCH":
      return { ...state, status: "error" };
    default:
      return state;
  }
};

export default IngredientsSearchReducer;
