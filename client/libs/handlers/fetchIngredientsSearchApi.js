import { receiveIngredientsSearch } from "../redux/actions/IngredientsSearchActions";

const fetchIngredientsSearchApi = (dispatch, text) => {
  fetch(
    `http://192.168.2.53:4000/api/edaman/ingredients?type=ingr&search=${text}`,
    {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    }
  )
    .then((res) => res.json())
    .then((json) => {
      dispatch(
        receiveIngredientsSearch({
          ingredients: json.data.hints,
          recommenderIngredients: [],
        })
      );
    })
    .catch((err) => {
      console.log(err.message);
      throw err;
    });
};

export default fetchIngredientsSearchApi;
