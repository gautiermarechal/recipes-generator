import { receiveSearch } from "../redux/actions/SearchActions";

const searchIngredient = (ingredients, dispatch, search) => {
  if (search !== "") {
    dispatch(
      receiveSearch(
        ingredients.filter((el) =>
          el.name.toLowerCase().includes(search.toLowerCase())
        )
      )
    );
  } else {
    dispatch(receiveSearch(null));
  }
};

export default searchIngredient;
