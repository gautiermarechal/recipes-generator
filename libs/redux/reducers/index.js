import { combineReducers } from "redux";
import CurrentUserReducer from "../reducers/CurrentUserReducer";
import SingleRecipeReducer from "./SingleRecipeReducer";

const reducer = combineReducers({
  currentUser: CurrentUserReducer,
  singleRecipe: SingleRecipeReducer,
});

export default reducer;
