import React from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  Button,
  Pressable,
} from "react-native";
import { COLORS } from "../libs/constants";
import recipes from "../libs/recipes.json";
import DurationIcon from "../assets/clock.js";
import ServingsIcon from "../assets/user.js";
import { useDispatch } from "react-redux";
import { TouchableOpacity } from "react-native-gesture-handler";
import { createStackNavigator } from "@react-navigation/stack";
import {
  receiveSingleRecipe,
  requestSingleRecipe,
} from "../libs/redux/actions/SingleRecipeActions";

const Stack = createStackNavigator();

const RecipesList = ({ navigation }) => {
  const dispatch = useDispatch();
  return (
    <>
      <View style={styles.container}>
        <FlatList
          data={recipes}
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
    display: "flex",
    alignItems: "center",
    height: "85%",
    marginTop: 20,
  },
  recipeContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "whitesmoke",
    width: "90vw",
    padding: 20,
    margin: 7,
    borderRadius: 7,
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
