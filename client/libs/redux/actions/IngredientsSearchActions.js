export const requestIngredientsSearch = () => ({
  type: "REQUEST_INGREDIENTS_SEARCH",
});

export const receiveIngredientsSearch = (data) => ({
  type: "RECEIVE_INGREDIENTS_SEARCH",
  data: data,
});

export const errorIngredientsSearch = () => ({
  type: "ERROR_INGREDIENTS_SEARCH",
});
