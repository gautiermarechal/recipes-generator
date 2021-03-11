//dotenv Import
require("dotenv").config();
//Fetch import
const fetch = require("node-fetch");

//Get Ingredient by search
const getIngredientsBySearch = (req, res) => {
  try {
    const query = req.query;
    let ingredientSearchUrl = "";
    if (query.type === "ingr") {
      ingredientSearchUrl = `ingr=${query.search}`;
    } else {
      ingredientSearchUrl = `upc=${query.search}`;
    }
    const url = `https://api.edamam.com/api/food-database/v2/parser?${ingredientSearchUrl}&app_id=${process.env.APP_ID}&app_key=${process.env.APP_KEY}`;
    fetch(url)
      .then((response) => response.json())
      .then((json) => {
        res.status(200).json({ status: 200, data: json });
      })
      .catch((err) => res.json({ status: 500, message: err.message }));
  } catch (error) {
    res.status(500).json({ status: 500, message: error.message });
  }
};

module.exports = {
  getIngredientsBySearch,
};
