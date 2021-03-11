import React from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import { useDispatch, useSelector } from "react-redux";
import { COLORS } from "../libs/constants";
import ingredients from "../libs/ingredients.json";
import categories from "../libs/ingredientsCategories.json";
import SearchBar from "./SearchBar";
import { receiveIngredients } from "../libs/redux/actions/IngredientsActions";
import fetchIngredientsSearchApi from "../libs/handlers/fetchIngredientsSearchApi";
import searchIngredient from "../libs/handlers/searchIngredient";

const IngredientsList = () => {
  const dispatch = useDispatch();
  const ingredientsState = useSelector(
    (state) => state.ingredients.ingredients
  );
  const categoriesState = useSelector((state) => state.ingredients.categories);
  const searchResult = useSelector((state) => state.search.result);

  React.useEffect(() => {
    dispatch(
      receiveIngredients({ ingredients: ingredients, categories: categories })
    );
  }, []);

  return (
    <>
      <ScrollView contentContainerStyle={styles.container}>
        <SearchBar
          ingredients={ingredientsState}
          searchType="ingredientsList"
          onChangeProp={searchIngredient}
        />
        <View style={styles.listContainer}>
          {!searchResult ? (
            categoriesState.map((category) => (
              <View style={styles.categoryContainer} key={category.id}>
                <View style={styles.hr} />

                <Text style={styles.categoryTitle}>{category.name}</Text>
                {ingredientsState.filter(
                  (el) =>
                    el.category.toLowerCase() === category.name.toLowerCase()
                ).length !== 0 ? (
                  ingredientsState
                    .filter(
                      (el) =>
                        el.category.toLowerCase() ===
                        category.name.toLowerCase()
                    )
                    .map((ingredient) => (
                      <View
                        style={styles.ingredientListItem}
                        key={ingredient.id}
                      >
                        <View style={styles.ingredientQuantityContainer}>
                          <TextInput
                            defaultValue={ingredient.quantity.number}
                            style={styles.ingredientQuantityNumber}
                          />
                          <Text style={styles.ingredientQuantityUnit}>
                            {ingredient.quantity.unit}
                          </Text>
                        </View>
                        <Text style={styles.ingredientName}>
                          {ingredient.name}
                        </Text>
                      </View>
                    ))
                ) : (
                  <Text>No Ingredients in this category</Text>
                )}
              </View>
            ))
          ) : searchResult.length !== 0 ? (
            <View>
              {searchResult.map((ingredient) => (
                <View style={styles.ingredientListItem} key={ingredient.id}>
                  <View style={styles.ingredientQuantityContainer}>
                    <TextInput
                      defaultValue={ingredient.quantity.number}
                      style={styles.ingredientQuantityNumber}
                    />
                    <Text style={styles.ingredientQuantityUnit}>
                      {ingredient.quantity.unit}
                    </Text>
                  </View>
                  <Text style={styles.ingredientName}>{ingredient.name}</Text>
                </View>
              ))}
            </View>
          ) : (
            <Text>No ingredients found</Text>
          )}
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  listContainer: {
    marginTop: 20,
  },
  categoryTitle: {
    fontSize: 25,
    fontWeight: "800",
  },
  categoryContainer: {
    // padding: 20,
  },
  hr: {
    borderBottomColor: COLORS.lightCoral,
    borderBottomWidth: 1,
    marginBottom: 20,
    marginTop: 20,
  },
  ingredientListItem: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    marginTop: 15,
    justifyContent: "space-between",
    backgroundColor: COLORS.white,
    padding: 20,
    borderRadius: 7,
  },
  ingredientQuantityContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    width: "50%",
  },
  ingredientQuantityNumber: {
    marginRight: 5,
    fontSize: 30,
    borderBottomWidth: 3,
    borderBottomColor: COLORS.lightCoral,
    width: 60,
    fontWeight: "800",
    color: COLORS.lightCoral,
  },
  ingredientQuantityUnit: {
    fontSize: 20,
    fontStyle: "italic",
    fontWeight: "500",
  },
  ingredientName: {
    fontSize: 20,
    width: "50%",
    textAlign: "right",
  },
});

export default IngredientsList;
