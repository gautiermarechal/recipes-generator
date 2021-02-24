import React from "react";
import { View, StyleSheet } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { COLORS } from "../libs/constants";

const SearchBar = () => {
  return (
    <>
      <TextInput
        style={styles.container}
        placeholder="Search your ingredients here"
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    flexDirection: "row",
    backgroundColor: COLORS.white,
    borderRadius: 7,
  },
});

export default SearchBar;
