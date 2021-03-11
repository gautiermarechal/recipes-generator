//Router
const router = require("express").Router();

//User imports

//Ingredients imports
const { getIngredientsBySearch } = require("./handlers/ingredients");
//ROUTES

//USER ROUTES

//INGREDIENTS ROUTES
router.get("/api/edaman/ingredients", getIngredientsBySearch);

module.exports = router;
