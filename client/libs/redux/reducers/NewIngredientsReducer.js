const intialState = {
  status: "idle",
  newIngredients: [],
  selectedIngredients: [],
  singleIngredient: {},
};

const NewIngredientsReducer = (state = intialState, action) => {
  switch (action.type) {
    case "REQUEST_NEW_INGREDIENTS":
      return { ...state, status: "requested" };
    case "RECEIVE_NEW_INGREDIENTS":
      return {
        ...state,
        status: "received",
        newIngredients: [...state.newIngredients, action.data],
      };
    case "REMOVE_INGREDIENT":
      const removeIndex = state.newIngredients.indexOf(action.data);
      if (removeIndex > -1) {
        state.newIngredients.splice(removeIndex, 1);
      }
      return {
        ...state,
        status: "received",
        newIngredients: [...state.newIngredients],
      };
    case "REMOVE_SELECTED_INGREDIENTS":
      state.selectedIngredients.forEach((item) => {
        const removeIndex = state.newIngredients.indexOf(item);
        if (removeIndex > -1) {
          state.newIngredients.splice(removeIndex, 1);
        }
      });
      return {
        ...state,
        newIngredients: [...state.newIngredients],
      };
    case "SELECT_ALL":
      if (
        state.newIngredients.length === state.selectedIngredients.length &&
        state.newIngredients.every(
          (el, index) => el === state.selectedIngredients[index]
        )
      ) {
        return {
          ...state,
          selectedIngredients: [],
        };
      } else {
        return {
          ...state,
          selectedIngredients: [...state.newIngredients],
        };
      }

    case "TOGGLE_SELECT_INGREDIENT":
      if (state.selectedIngredients.includes(action.data)) {
        const toggleIndex = state.selectedIngredients.indexOf(action.data);
        if (toggleIndex > -1) {
          state.selectedIngredients.splice(toggleIndex, 1);
          return {
            ...state,
            selectedIngredients: [...state.selectedIngredients],
          };
        }
      } else {
        return {
          ...state,
          selectedIngredients: [...state.selectedIngredients, action.data],
        };
      }
    case "ERROR_NEW_INGREDIENTS":
      return { ...state, status: "error" };

    case "ADD_SINGLE_INGREDIENT":
      return { ...state, singleIngredient: action.data };
    case "REMOVE_SINGLE_INGREDIENT":
      return { ...state, singleIngredient: {} };
    case "ADD_AMOUNT_QUANTITY_SINGLE_INGREDIENT":
      return {
        ...state,
        singleIngredient: {
          ...state.singleIngredient,
          quantity: { ...state.singleIngredient.quantity, amount: action.data },
        },
      };
    case "ADD_UNIT_QUANTITY_SINGLE_INGREDIENT":
      return {
        ...state,
        singleIngredient: {
          ...state.singleIngredient,
          quantity: { ...state.singleIngredient.quantity, unit: action.data },
        },
      };
    default:
      return state;
  }
};

export default NewIngredientsReducer;
