const intialState = {
  status: "idle",
  result: null,
};

const SearchReducer = (state = intialState, action) => {
  switch (action.type) {
    case "REQUEST_SEARCH":
      return { ...state, status: "requested" };
    case "RECEIVE_SEARCH":
      return {
        ...state,
        status: "received",
        result: action.data,
      };
    case "ERROR_SEARCH":
      return { ...state, status: "error" };
    default:
      return state;
  }
};

export default SearchReducer;
