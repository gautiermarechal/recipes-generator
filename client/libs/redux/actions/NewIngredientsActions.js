export const requestNewIngredients = () => ({
  type: "REQUEST_NEW_INGREDIENTS",
});

export const receiveNewIngredients = (data) => ({
  type: "RECEIVE_NEW_INGREDIENTS",
  data: data,
});

export const removeIngredient = (data) => ({
  type: "REMOVE_INGREDIENT",
  data: data,
});

export const removeSelectedIngredients = () => ({
  type: "REMOVE_SELECTED_INGREDIENTS",
});

export const errorNewIngredients = () => ({
  type: "ERROR_NEW_INGREDIENTS",
});

export const selectAll = () => ({
  type: "SELECT_ALL",
});

export const toggleSelectIngredient = (data) => ({
  type: "TOGGLE_SELECT_INGREDIENT",
  data: data,
});
