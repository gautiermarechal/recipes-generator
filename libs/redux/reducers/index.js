import { combineReducers } from "redux";
import CurrentUserReducer from "../reducers/CurrentUserReducer";
import SingleRecipeReducer from "./SingleRecipeReducer";
import RecipesReducer from "./RecipesReducer";
import IngredientsReducer from "./IngredientsReducer";

const reducer = combineReducers({
  currentUser: CurrentUserReducer,
  singleRecipe: SingleRecipeReducer,
  recipes: RecipesReducer,
  ingredients: IngredientsReducer,
});

export default reducer;
