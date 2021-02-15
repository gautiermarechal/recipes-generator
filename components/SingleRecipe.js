import React from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Button,
  Pressable,
} from "react-native";
import { useSelector } from "react-redux";
import { COLORS } from "../libs/constants";

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
      <View style={styles.container}>
        <View style={styles.ingredientsContainer}>
          <Text style={styles.title}>Ingredients</Text>
          <View
            style={{
              borderBottomColor: "black",
              borderBottomWidth: 1,
            }}
          />
          <View styles={styles.ingredientsList}>
            <FlatList
              data={singleRecipe.ingredients}
              renderItem={({ item }) => (
                <View style={styles.ingredientItem}>
                  <View style={styles.listStyle} />
                  <Text style={styles.ingredientName}>{item.name}</Text>
                </View>
              )}
            />
          </View>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    display: "flex",
    alignItems: "center",
    height: "100%",
  },
  title: {
    fontSize: 40,
    fontWeight: "600",
  },
  ingredientsContainer: {
    display: "flex",
    alignItems: "flex-start",
    width: "90%",
    padding: 20,
    marginLeft: 20,
    marginHorizontal: 20,
  },
  ingredientsList: {
    marginTop: 10,
  },
  ingredientItem: {
    flex: 1,
    flexDirection: "row",
    marginTop: 5,
    marginBottom: 5,
    alignItems: "center",
  },
  listStyle: {
    width: 15,
    height: 15,
    backgroundColor: COLORS.lightCoral,
    borderRadius: 50,
  },
  ingredientName: {
    marginLeft: 10,
  },
});

export default SingleRecipe;
