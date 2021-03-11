const intialState = {
  status: "idle",
  recommendedIngredients: [],
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
        recommendedIngredients: action.data.ingredients,
      };
    case "ERROR_INGREDIENTS_SEARCH":
      return { ...state, status: "error" };
    default:
      return state;
  }
};

export default IngredientsSearchReducer;
