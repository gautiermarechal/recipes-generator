import React from "react";
import { StyleSheet, Text, View, TextInput, Button } from "react-native";
//Navigation Imports
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

//Icons Imports
import Icon from "react-native-vector-icons/FontAwesome";
import RecipesBookIcon from "./assets/recipe-book.js";
import IngredientsIcon from "./assets/harvest.js";

//Components Imports
import RecipesScreen from "./components/RecipesScreen";
import IngredientsScreen from "./components/IngredientsScreen";
import { COLORS } from "./libs/constants";
import configureStore from "./libs/redux/store";
import { Provider } from "react-redux";
import SingleRecipe from "./components/SingleRecipe.js";
import RecipesNavigator from "./components/RecipesNavigator.js";

//Redux store
const store = configureStore();

//Main Navigation Components
const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Tab.Navigator
          initialRouteName="Home"
          tabBarOptions={{
            inactiveTintColor: COLORS.grey,
            activeTintColor: COLORS.white,
            activeBackgroundColor: COLORS.lightCoral,
          }}
        >
          <Tab.Screen
            name="Recipes"
            component={RecipesNavigator}
            options={({ navigation }) => ({
              tabBarLabel: "Recipes",
              tabBarIcon: () => (
                <RecipesBookIcon width={30} height={30} fill={COLORS.white} />
              ),
              headerRight: () => {
                return (
                  <Button
                    title="Account"
                    onPress={() => {
                      navigation.navigate("Account");
                    }}
                  />
                );
              },
            })}
          />
          <Tab.Screen
            name="Ingredients"
            component={IngredientsScreen}
            options={{
              tabBarLabel: "Ingredients",
              tabBarIcon: ({ color }) => (
                <IngredientsIcon height={30} width={30} fill={COLORS.black} />
              ),
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.blueWhite,
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
  },
  input: {
    height: "20%",
    width: "40%",
  },
  bottomTab: {
    height: 50,
    backgroundColor: COLORS.lightCoral,
  },
});
