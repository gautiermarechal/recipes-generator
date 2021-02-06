export const requestSingleRecipe = () => ({
  type: "REQUEST_SINGLE_RECIPE",
});

export const receiveSingleRecipe = (data) => ({
  type: "RECEIVE_SINGLE_RECIPE",
  data: data,
});

export const errorSingleRecipe = () => ({
  type: "ERROR_SINGLE_RECIPE",
});
