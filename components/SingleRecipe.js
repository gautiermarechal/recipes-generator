import React from "react";
import { StyleSheet, Text, View, FlatList, Button } from "react-native";
import { useSelector } from "react-redux";

const SingleRecipe = ({ navigation }) => {
  const singleRecipe = useSelector((state) => state.singleRecipe.singleRecipe);
  React.useEffect(() => {
    if (!singleRecipe) {
      return;
    }

    navigation.setOptions({ title: singleRecipe.title });
  }, [singleRecipe]);
  return (
    <>
      <View style={styles.container}></View>
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
});

export default SingleRecipe;
