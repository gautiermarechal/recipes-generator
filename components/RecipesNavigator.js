import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import RecipesScreen from "./RecipesScreen";
import SingleRecipe from "./SingleRecipe";
import { COLORS } from "../libs/constants";

const Stack = createStackNavigator();

const RecipesNavigator = ({ navigation }) => {
  return (
    <>
      <Stack.Navigator>
        <Stack.Screen
          name="RecipesScreen"
          component={RecipesScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SingleRecipe"
          component={SingleRecipe}
          options={({ route }) => ({
            title: route.params?.title,
            headerStyle: {
              backgroundColor: COLORS.lightCoral,
              height: 80,
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "800",
              fontSize: 30,
              textAlign: "center",
            },
            headerBackTitle: "",
          })}
        />
      </Stack.Navigator>
    </>
  );
};

const styles = StyleSheet.create({});

export default RecipesNavigator;
