import { combineReducers } from "redux";
import CurrentUserReducer from "../reducers/CurrentUserReducer";
import SingleRecipeReducer from "./SingleRecipeReducer";
import RecipesReducer from "./RecipesReducer";
import IngredientsReducer from "./IngredientsReducer";
import SearchReducer from "./SearchReducer";
import IngredientsSearchReducer from "./IngredientsSearchReducer";
import NewIngredientsReducer from "./NewIngredientsReducer";

const reducer = combineReducers({
  currentUser: CurrentUserReducer,
  singleRecipe: SingleRecipeReducer,
  recipes: RecipesReducer,
  ingredients: IngredientsReducer,
  search: SearchReducer,
  ingredientsSearch: IngredientsSearchReducer,
  newIngredients: NewIngredientsReducer,
});

export default reducer;
