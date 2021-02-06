const intialState = {
  status: "idle",
  singleRecipe: {},
};

const SingleRecipeReducer = (state = intialState, action) => {
  switch (action.type) {
    case "REQUEST_SINGLE_RECIPE":
      return { ...state, status: "requested" };
    case "RECEIVE_SINGLE_RECIPE":
      return { ...state, status: "received", singleRecipe: action.data };
    case "ERROR_SINGLE_RECIPE":
      return { ...state, status: "error" };
    default:
      return state;
  }
};

export default SingleRecipeReducer;
