import React from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  Pressable,
} from "react-native";
import { COLORS } from "../libs/constants";
import recipesSource from "../libs/recipes.json";
import DurationIcon from "../assets/clock.js";
import ServingsIcon from "../assets/user.js";
import { useDispatch, useSelector } from "react-redux";
import { receiveSingleRecipe } from "../libs/redux/actions/SingleRecipeActions";
import {
  requestRecipes,
  receiveRecipes,
  errorRecipes,
} from "../libs/redux/actions/RecipesActions";

const RecipesList = ({ navigation }) => {
  const dispatch = useDispatch();
  const recipes = useSelector((state) => state.recipes.recipes);
  React.useEffect(() => {
    dispatch(receiveRecipes(recipesSource));
  }, []);
  return (
    <>
      <View style={styles.container}>
        <FlatList
          data={recipes}
          style={styles.list}
          renderItem={({ item }) => (
            <Pressable
              style={styles.recipeContainer}
              onPress={() => {
                dispatch(receiveSingleRecipe(item));
                navigation.setOptions({ title: item.title });
                navigation.navigate("SingleRecipe");
              }}
            >
              <View style={styles.recipeInfo}>
                <Text style={styles.recipeTitle}>{item.title}</Text>
                <View style={styles.characteristicContainer}>
                  <DurationIcon height={15} width={15} fill={COLORS.black} />
                  <Text>{item.time}min</Text>
                </View>
                <View style={styles.characteristicContainer}>
                  <ServingsIcon height={15} width={15} fill={COLORS.black} />
                  <Text>{item.servings}</Text>
                </View>
              </View>
              <Image
                style={styles.recipeImage}
                source={require("../assets/lasagna.jpg")}
              />
            </Pressable>
          )}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    height: null,
    marginTop: 20,
    width: "100%",
  },
  list: {
    flex: 1,
    width: "100%",
  },
  recipeContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: COLORS.white,
    borderStyle: "solid",
    borderWidth: 2,
    borderColor: COLORS.lightCoral,
    padding: 20,
    marginRight: 10,
    marginLeft: 10,
    marginTop: 7,
    marginBottom: 7,
    borderRadius: 10,
  },
  recipeTitle: {
    fontSize: 20,
    fontWeight: "700",
  },
  recipeImage: {
    height: 80,
    width: 80,
    borderRadius: 7,
  },
  recipeInfo: {
    display: "flex",
  },
  characteristicContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
});

export default RecipesList;
