import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import IngredientsScreen from "../components/IngredientsScreen";
import { COLORS } from "../libs/constants";
import ManualOption from "./ManualOption";
import AddSingleIngredientScreen from "./AddSingleIngredientScreen";

const Stack = createStackNavigator();

const IngredientsNavigator = () => {
  return (
    <>
      <Stack.Navigator>
        <Stack.Screen
          name="IngredientsScreen"
          component={IngredientsScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ManualOption"
          component={ManualOption}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="AddSingleIngredientScreen"
          component={AddSingleIngredientScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </>
  );
};

export default IngredientsNavigator;
