import React from "react";
import { StyleSheet, Text, View, Pressable, Button, Image } from "react-native";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import AddIcon from "../assets/add.js";
import DownArrow from "../assets/down-chevron.js";
import InvoiceIcon from "../assets/invoice.js";
import BarCodeIcon from "../assets/bar-code.js";
import ManuallyIcon from "../assets/up-sign.js";
import { COLORS } from "../libs/constants";
import IngredientsList from "./IngredientsList.js";
import Modal from "react-native-modal";
import SearchBar from "./SearchBar.js";
import fetchIngredientsSearchApi from "../libs/handlers/fetchIngredientsSearchApi.js";
import { useSelector } from "react-redux";

const IngredientsScreen = ({ navigation }) => {
  const [isShown, setIsShown] = React.useState(false);
  const [isModalVisible, setIsModalVisible] = React.useState(false);
  const ingredientsResults = useSelector(
    (state) => state.ingredientsSearch.ingredients
  );

  const toggleDropDown = () => {
    if (isShown) {
      setIsShown(!isShown);
    } else {
      setIsShown(!isShown);
    }
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
    },
    dropdownContainer: {
      display: isShown ? "flex" : "none",
      marginTop: 30,
    },
    dropdownButton: {
      height: 40,
      backgroundColor: COLORS.white,
      margin: 5,
      padding: 10,
      borderRadius: 7,
      justifyContent: "center",
      alignItems: "center",
    },
    titleContainer: {
      display: "flex",
      height: 40,
      marginTop: 30,
    },
    title: {
      fontSize: 30,
      fontWeight: "800",
    },
    buttonContainer: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: COLORS.lightCoral,
      borderRadius: 7,
      width: 100,
      height: 40,
      marginTop: 10,
      marginBottom: 5,
    },
    modalContainer: {
      flex: 1,
      flexDirection: "column",
      backgroundColor: COLORS.white,
      alignItems: "center",
      justifyContent: "center",
    },
    modalTitle: {
      fontSize: 20,
      fontWeight: "800",
    },
    ingredientContainer: {
      flex: 1,
      flexDirection: "row",
      alignItems: "center",
      margin: 10,
      marginLeft: 20,
    },
    ingredientImage: {
      height: 40,
      width: 40,
      borderRadius: 7,
    },
    ingredientLabel: {
      marginLeft: 10,
    },
  });

  return (
    <>
      <View style={styles.container}>
        <View>
          <Modal isVisible={isModalVisible} style={styles.modalContainer}>
            <Text style={styles.modalTitle}>
              Search and choose your ingredients below:
            </Text>
            <SearchBar
              searchType="ingredientsAPI"
              onChangeProp={fetchIngredientsSearchApi}
            />
            <ScrollView>
              {ingredientsResults ? (
                ingredientsResults.length !== 0 ? (
                  ingredientsResults.map((ingredient, index) => {
                    console.log(ingredient);
                    return (
                      <View key={index} style={styles.ingredientContainer}>
                        <Image
                          source={{ uri: ingredient.food.image }}
                          style={styles.ingredientImage}
                        />
                        <Text style={styles.ingredientLabel}>
                          {ingredient.food.label}
                        </Text>
                      </View>
                    );
                  })
                ) : (
                  <Text>No results</Text>
                )
              ) : (
                <Text>Your results</Text>
              )}
            </ScrollView>
            <Button
              title="x"
              onPress={() => setIsModalVisible(!isModalVisible)}
            />
            <Text>Hello</Text>
          </Modal>
        </View>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Ingredients </Text>
        </View>
        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={toggleDropDown}
        >
          {isShown ? (
            <DownArrow width={20} height={20} fill={COLORS.white} />
          ) : (
            <AddIcon width={20} height={20} fill={COLORS.white} />
          )}
        </TouchableOpacity>
        <View style={styles.dropdownContainer}>
          <TouchableOpacity style={styles.dropdownButton}>
            <InvoiceIcon width={20} height={20} fill={COLORS.lightCoral} />
            <Text>Take a photo of your groceries receipt</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.dropdownButton}>
            <BarCodeIcon width={20} height={20} fill={COLORS.lightCoral} />
            <Text>Scan your ingredients barcode</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.dropdownButton}
            onPress={() => setIsModalVisible(!isModalVisible)}
          >
            <ManuallyIcon width={20} height={20} fill={COLORS.lightCoral} />
            <Text>Manually enter your ingredients below</Text>
          </TouchableOpacity>
        </View>
        <IngredientsList />
      </View>
    </>
  );
};

export default IngredientsScreen;
