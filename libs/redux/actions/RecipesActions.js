export const requestRecipes = () => ({
  type: "REQUEST_RECIPES",
});

export const receiveRecipes = (data) => ({
  type: "RECEIVE_RECIPES",
  data: data,
});

export const errorRecipes = () => ({
  type: "ERROR_RECIPES",
});
