import React from "react";
import { StyleSheet, Text, View, TextInput } from "react-native";

const IngredientsScreen = ({ navigation }) => {
  return (
    <>
      <View style={styles.container}>
        <Text>Ingredients</Text>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
  },
});

export default IngredientsScreen;
