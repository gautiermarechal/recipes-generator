const intialState = {
  status: "idle",
  categories: [],
  ingredients: [],
};

const IngredientsReducer = (state = intialState, action) => {
  switch (action.type) {
    case "REQUEST_INGREDIENTS":
      return { ...state, status: "requested" };
    case "RECEIVE_INGREDIENTS":
      return {
        ...state,
        status: "received",
        ingredients: action.data.ingredients,
        categories: action.data.categories,
      };
    case "ERROR_INGREDIENTS":
      return { ...state, status: "error" };
    case "ADD_INGREDIENT":
      return { ...state, ingredients: [action.data, ...state.ingredients] };
    default:
      return state;
  }
};

export default IngredientsReducer;
