const intialState = {
  status: "idle",
  ingredients: [],
};

const IngredientsReducer = (state = intialState, action) => {
  switch (action.type) {
    case "REQUEST_INGREDIENTS":
      return { ...state, status: "requested" };
    case "RECEIVE_INGREDIENTS":
      return { ...state, status: "received", ingredients: action.data };
    case "ERROR_INGREDIENTS":
      return { ...state, status: "error" };
    default:
      return state;
  }
};

export default IngredientsReducer;
