import { combineReducers } from "redux";
import CurrentUserReducer from "../reducers/CurrentUserReducer";
import SingleRecipeReducer from "./SingleRecipeReducer";
import RecipesReducer from "./RecipesReducer";
import IngredientsReducer from "./IngredientsReducer";
import SearchReducer from "./SearchReducer";

const reducer = combineReducers({
  currentUser: CurrentUserReducer,
  singleRecipe: SingleRecipeReducer,
  recipes: RecipesReducer,
  ingredients: IngredientsReducer,
  search: SearchReducer,
});

export default reducer;
