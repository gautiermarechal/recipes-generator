export const requestSearch = () => ({
  type: "REQUEST_SEARCH",
});

export const receiveSearch = (data) => ({
  type: "RECEIVE_SEARCH",
  data: data,
});

export const errorSearch = () => ({
  type: "ERROR_SEARCH",
});
