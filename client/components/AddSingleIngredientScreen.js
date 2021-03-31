import React, { useState } from "react";
import { KeyboardAvoidingView } from "react-native";
import { Image } from "react-native";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Pressable,
  FlatList,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { COLORS } from "../libs/constants";
import { addAmountQuantitySingleIngredient } from "../libs/redux/actions/NewIngredientsActions";
import DownArrowIcon from "../assets/down-arrow.js";

const AddSingleIngredientScreen = () => {
  const singleIngredientChosen = useSelector(
    (state) => state.newIngredients.singleIngredient
  );

  const [selectedUnit, setSelectedUnit] = useState({
    label: "Grams",
    value: "grams",
  });

  const units = [
    {
      label: "Grams",
      value: "grams",
    },
    {
      label: "Ounces",
      value: "ounces",
    },
    {
      label: "Teaspoon",
      value: "teaspoon",
    },
    {
      label: "Tablespoon",
      value: "tablespoon",
    },
    {
      label: "Cups",
      value: "cups",
    },
    {
      label: "Liter",
      value: "liter",
    },
    {
      label: "Milliliter",
      value: "milliliter",
    },
    {
      label: "Unit",
      value: "unit",
    },
  ];

  const [openDropdown, setOpenDropdown] = useState(false);

  const dispatch = useDispatch();

  const styles = StyleSheet.create({
    quantityContainer: {
      flex: 1,
      height: "100%",
      width: "100%",
      backgroundColor: COLORS.white,
      alignItems: "center",
      justifyContent: "center",
    },
    quantitySubtitle: {
      fontSize: 15,
      marginBottom: 40,
    },
    quantityInputContainer: {
      display: "flex",
      flexDirection: "row",
      marginBottom: 90,
      width: "100%",
      justifyContent: "space-evenly",
      alignItems: "center",
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
    dropdownButtonContainer: {
      display: "flex",
      flexDirection: "row",
    },
    dropdownButton: {
      display: "flex",
      flexDirection: "row",
      marginRight: 10,
      alignItems: "center",
      justifyContent: "center",
    },
    dropdownMenu: {
      display: openDropdown ? "flex" : "none",
      position: "absolute",
      width: 100,
      backgroundColor: COLORS.white,
    },
    dropdownItem: {
      marginTop: 5,
      marginBottom: 5,
    },
  });

  return (
    <>
      <KeyboardAvoidingView
        style={styles.quantityContainer}
        behavior="position"
      >
        {singleIngredientChosen ? (
          <>
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Image
                source={{
                  uri: singleIngredientChosen?.food?.image,
                }}
                style={{
                  height: 150,
                  width: 150,
                  borderRadius: 10,
                  marginTop: 60,
                }}
              />
            </View>

            <Text
              style={{
                fontWeight: "800",
                fontSize: 35,
                marginTop: 10,
                textAlign: "center",
              }}
            >
              {singleIngredientChosen?.food?.label}
            </Text>
            <View
              style={{
                flex: 1,
                width: "100%",
                justifyContent: "center",
                alignItems: "center",
                marginTop: 30,
              }}
            >
              <Text style={styles.quantitySubtitle}>Enter Quantity:</Text>
              <View style={styles.quantityInputContainer}>
                <TextInput
                  keyboardType="numeric"
                  style={styles.quantityInput}
                  returnKeyType="done"
                  returnKeyLabel="Done"
                  onBlur={(text) =>
                    dispatch(addAmountQuantitySingleIngredient(text))
                  }
                />
                <View style={styles.dropdownButtonContainer}>
                  <Pressable
                    style={styles.dropdownButton}
                    onPress={() => setOpenDropdown(!openDropdown)}
                  >
                    <Text>{selectedUnit.label}</Text>
                    <DownArrowIcon
                      width={20}
                      height={20}
                      fill={COLORS.lightCoral}
                    />
                  </Pressable>
                  <FlatList
                    style={styles.dropdownMenu}
                    data={units}
                    keyExtractor={(item) => item.label}
                    renderItem={({ item }) => (
                      <>
                        <Pressable
                          key={item.value}
                          style={styles.dropdownItem}
                          onPress={() => {
                            setSelectedUnit(item);
                            setOpenDropdown(false);
                          }}
                        >
                          <Text>{item.label}</Text>
                        </Pressable>
                        <View
                          style={{
                            borderBottomColor: COLORS.lightCoral,
                            borderBottomWidth: 1,
                          }}
                        />
                      </>
                    )}
                  />
                </View>
              </View>
            </View>
          </>
        ) : (
          <Text>Loading</Text>
        )}
      </KeyboardAvoidingView>
    </>
  );
};

export default AddSingleIngredientScreen;
