import React, { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { COLORS } from "../libs/constants";
import SearchIcon from "../assets/magnifying-glass.js";
import { useDispatch, useSelector } from "react-redux";
import searchIngredient from "../libs/handlers/searchIngredient";
import fetchIngredientsSearchApi from "../libs/handlers/fetchIngredientsSearchApi";

const SearchBar = ({ ingredients, searchType, onChangeProp }) => {
  const dispatch = useDispatch();
  const [onChange, setOnChange] = useState(() => onChangeProp);
  const [placeholder, setPlaceholder] = useState("");

  useEffect(() => {
    if (searchType === "ingredientsList") {
      setPlaceholder("Search your ingredients here:");
    } else if (searchType === "ingredientsAPI") {
      setPlaceholder("Search any ingredients to add here");
    } else {
      setPlaceholder("");
    }
  });
  return (
    <>
      <View style={styles.container}>
        <SearchIcon
          width={20}
          height={20}
          fill={COLORS.grey}
          style={styles.searchIcon}
        />
        <TextInput
          style={styles.searchBar}
          placeholder={placeholder}
          onChangeText={
            ingredients
              ? (text) => onChange(ingredients, dispatch, text)
              : (text) => onChange(dispatch, text)
          }
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.white,
    padding: 20,
    borderRadius: 7,
    marginTop: 10,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchBar: {
    backgroundColor: COLORS.white,
    borderRadius: 7,
    height: 20,
    width: "80%",
  },
});

export default SearchBar;
