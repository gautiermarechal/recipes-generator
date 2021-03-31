import React from "react";
import { KeyboardAvoidingView } from "react-native";
import { Image } from "react-native";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Button,
  FlatList,
  Pressable,
} from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { useDispatch, useSelector } from "react-redux";
import SearchBar from "../components/SearchBar";
import { COLORS } from "../libs/constants";
import fetchIngredientsSearchApi from "../libs/handlers/fetchIngredientsSearchApi";
import { addSingleIngredient } from "../libs/redux/actions/NewIngredientsActions";

const ManualOption = ({ navigation }) => {
  const dispatch = useDispatch();
  const [clearSearchBar, setClearSearchBar] = React.useState(false);
  const [chooseQuantity, setChooseQuantity] = React.useState(false);
  const [singleIngredientChosen, setSingleIngredientChosen] = React.useState({
    ingredient: {},
    quantity: {
      amount: 0,
      unit: "",
    },
  });
  const ingredientsResults = useSelector(
    (state) => state.ingredientsSearch.ingredients
  );
  const newIngredients = useSelector(
    (state) => state.newIngredients.newIngredients
  );
  const selectedIngredients = useSelector(
    (state) => state.newIngredients.selectedIngredients
  );

  const styles = StyleSheet.create({
    mainContainer: {
      flex: 1,
      marginTop: 40,
      marginRight: 10,
      marginLeft: 10,
      justifyContent: "center",
      alignItems: "center",
    },
    mainTitle: {
      fontSize: 25,
      width: "80%",
      fontWeight: "800",
      textAlign: "center",
    },
    resultFlatList: {
      backgroundColor: COLORS.white,
      borderRadius: 7,
      marginLeft: 6,
      marginRight: 6,
      marginTop: 10,
      marginBottom: 10,
    },
    ingredientContainer: {
      flex: 1,
      flexDirection: "row",
      alignItems: "center",
      margin: 10,
      marginLeft: 20,
      height: 80,
      padding: 5,
      backgroundColor: COLORS.white,
    },
    ingredientContainerActive: {
      flex: 1,
      flexDirection: "row",
      alignItems: "center",
      margin: 10,
      marginLeft: 20,
      height: 80,
      backgroundColor: COLORS.lightCoral,
      padding: 5,
    },
    ingredientImage: {
      height: 40,
      width: 40,
      borderRadius: 7,
    },
    ingredientLabel: {
      marginLeft: 10,
      fontSize: 20,
      flexWrap: "wrap",
    },
    modalTitle: {
      fontSize: 20,
      fontWeight: "800",
      marginTop: 30,
      marginBottom: 20,
    },
    ingredientsList: {
      flex: 1,
    },
    footer: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      height: 70,
    },
    cancelButton: {
      flex: 2,
      justifyContent: "center",
      alignItems: "center",
      padding: 10,
      backgroundColor: COLORS.grey,
      height: "100%",
    },
    confirmButton: {
      flex: 2,
      justifyContent: "center",
      alignItems: "center",
      padding: 10,
      backgroundColor: COLORS.lightCoral,
      height: "100%",
    },
    buttonText: {
      color: COLORS.white,
      fontSize: 20,
    },
    quantityContainer: {
      flex: 1,
      position: "absolute",
      height: "100%",
      width: "100%",
      backgroundColor: COLORS.white,
      display: chooseQuantity ? "flex" : "none",
      alignItems: "center",
      justifyContent: "space-between",
    },
    quantitySubtitle: {
      fontSize: 25,
      marginBottom: 10,
    },
    quantityInputContainer: {
      display: "flex",
      flexDirection: "row",
      marginBottom: 30,
      width: "100%",
      justifyContent: "space-evenly",
    },
    quantityInput: {
      borderBottomWidth: 2,
      borderBottomColor: COLORS.lightCoral,
      width: 50,
    },
    quantityNavigationBack: {
      flex: 3,
      justifyContent: "center",
      alignItems: "center",
      padding: 10,
      backgroundColor: COLORS.lightCoral,
      height: "100%",
    },
    quantityNavigationConfirm: {
      flex: 3,
      justifyContent: "center",
      alignItems: "center",
      padding: 10,
      backgroundColor: COLORS.grey,
      height: "100%",
    },
  });

  return (
    <>
      <View style={styles.mainContainer}>
        <Text style={styles.mainTitle}>Add an ingredient</Text>
        <SearchBar
          searchType="ingredientsAPI"
          onChangeProp={fetchIngredientsSearchApi}
          clear={clearSearchBar}
        />
        {ingredientsResults ? (
          ingredientsResults.length !== 0 ? (
            <FlatList
              data={ingredientsResults}
              style={styles.resultFlatList}
              renderItem={({ item, index }) => (
                <Pressable
                  key={index}
                  style={
                    newIngredients.some(
                      (el) => el.food.foodId === item.food.foodId
                    )
                      ? styles.ingredientContainerActive
                      : styles.ingredientContainer
                  }
                  onPress={() => {
                    dispatch(addSingleIngredient(item));
                    navigation.navigate("AddSingleIngredientScreen");
                  }}
                >
                  <Image
                    source={{ uri: item.food.image }}
                    style={styles.ingredientImage}
                  />
                  <Text style={styles.ingredientLabel}>{item.food.label}</Text>
                </Pressable>
              )}
              keyExtractor={(item, index) => index.toString()}
            />
          ) : null
        ) : null}
        <View style={styles.ingredientsList}>
          {newIngredients.length !== 0 ? (
            <FlatList
              data={newIngredients}
              renderItem={({ item, index }) => (
                <Pressable
                  key={index}
                  style={
                    selectedIngredients.some(
                      (el) => el.food.foodId === item.food.foodId
                    )
                      ? styles.ingredientContainerActive
                      : styles.ingredientContainer
                  }
                  onPress={() => dispatch(toggleSelectIngredient(item))}
                >
                  <Image
                    source={{ uri: item.food.image }}
                    style={styles.ingredientImage}
                  />
                  <Text style={styles.ingredientLabel}>{item.food.label}</Text>
                </Pressable>
              )}
              keyExtractor={(item, index) => index.toString()}
            />
          ) : (
            <Text style={{ marginTop: 50 }}>
              You don't have ingredients yet.
            </Text>
          )}
        </View>
      </View>
    </>
  );
};

export default ManualOption;
