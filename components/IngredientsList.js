import React from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { COLORS } from "../libs/constants";
import ingredients from "../libs/ingredients.json";
import categories from "../libs/ingredientsCategories.json";

const IngredientsList = () => {
  return (
    <>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.listContainer}>
          {categories.map((category) => (
            <View style={styles.categoryContainer}>
              <View style={styles.hr} />

              <Text style={styles.categoryTitle}>{category.name}</Text>
              {ingredients.filter(
                (el) =>
                  el.category.toLowerCase() === category.name.toLowerCase()
              ).length !== 0 ? (
                ingredients
                  .filter(
                    (el) =>
                      el.category.toLowerCase() === category.name.toLowerCase()
                  )
                  .map((ingredient) => (
                    <View>
                      <Text>{ingredient.name}</Text>
                    </View>
                  ))
              ) : (
                <Text>No Ingredients in this category</Text>
              )}
            </View>
          ))}
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
    padding: 20,
  },
  hr: {
    borderBottomColor: COLORS.lightCoral,
    borderBottomWidth: 3,
  },
});

export default IngredientsList;
