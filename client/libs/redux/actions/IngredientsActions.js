export const requestIngredients = () => ({
  type: "REQUEST_INGREDIENTS",
});

export const receiveIngredients = (data) => ({
  type: "RECEIVE_INGREDIENTS",
  data: data,
});

export const errorIngredients = () => ({
  type: "ERROR_INGREDIENTS",
});
