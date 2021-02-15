import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import { COLORS } from "../libs/constants";
import RecipesList from "./RecipesList";

const RecipesScreen = ({ navigation }) => {
  return (
    <>
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Recipes</Text>
        </View>
        <RecipesList navigation={navigation} />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    width: null,
    backgroundColor: COLORS.blueWhite,
  },
  titleContainer: {
    display: "flex",
    height: 30,
    marginTop: 30,
  },
  title: {
    fontSize: 30,
    fontWeight: "800",
  },
});

export default RecipesScreen;
