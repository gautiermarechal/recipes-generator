import React from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Button,
  Pressable,
  ScrollView,
} from "react-native";
import { useSelector } from "react-redux";
import { COLORS } from "../libs/constants";
import DurationIcon from "../assets/clock.js";
import ServingsIcon from "../assets/user.js";

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
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.basicInfoContainer}>
          <View style={styles.basicInfoNested}>
            <DurationIcon width={30} height={30} fill={COLORS.black} />
            <Text style={styles.basicTagNested}>{singleRecipe.time} min</Text>
          </View>
          <View style={styles.basicInfoSpan} />
          <View style={styles.basicInfoNested}>
            <ServingsIcon width={30} height={30} fill={COLORS.black} />
            <Text style={styles.basicTagNested}>{singleRecipe.servings}</Text>
          </View>
        </View>
        <View style={styles.sectionContainer}>
          <Text style={styles.title}>Ingredients</Text>
          <View styles={styles.ingredientsList}>
            {singleRecipe.ingredients.map((ingredient) => (
              <View style={styles.listItem} key={ingredient.id}>
                <View style={styles.listStyle} />
                <View style={styles.ingredientTagContainer}>
                  <Text style={styles.ingredientName}>{ingredient.name}</Text>
                  <Text style={styles.ingredientQuantity}>
                    {ingredient.quantity.number}
                    &nbsp;
                    {ingredient.quantity.unit}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        </View>
        <View style={styles.sectionContainer}>
          <Text style={styles.title}>Preparation</Text>
          <View styles={styles.ingredientsList}>
            {singleRecipe.preparation.map((step) => (
              <View style={styles.listPreparationItem} key={step.step_number}>
                <Text style={styles.stepNumber}>{step.step_number}.</Text>
                <View style={styles.preparationStepContainer}>
                  <Text style={styles.preparationStep}>{step.description}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  basicInfoContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  basicInfoNested: {
    flex: 1,
    marginTop: 35,
    alignItems: "center",
    justifyContent: "center",
  },
  basicInfoSpan: {
    width: 50,
    height: 10,
    backgroundColor: COLORS.lightCoral,
  },
  basicTagNested: {
    marginTop: 15,
    fontSize: 20,
    fontWeight: "800",
  },
  container: {
    backgroundColor: COLORS.white,
    display: "flex",
    alignItems: "center",
    height: "auto",
  },
  title: {
    fontSize: 40,
    fontWeight: "600",
    marginBottom: 15,
  },
  sectionContainer: {
    flex: 1,
    alignItems: "flex-start",
    width: "90%",
    padding: 20,
    marginTop: 20,
    marginLeft: 10,
    marginHorizontal: 20,
  },
  ingredientsList: {
    marginTop: 10,
  },
  listItem: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
    marginBottom: 10,
  },
  listPreparationItem: {
    flex: 1,
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 5,
  },
  listStyle: {
    width: 15,
    height: 5,
    backgroundColor: COLORS.lightCoral,
  },
  ingredientName: {
    fontSize: 20,
    fontWeight: "500",
  },
  ingredientQuantity: {
    fontStyle: "italic",
    color: COLORS.grey,
  },
  ingredientTagContainer: {
    marginLeft: 10,
  },
  preparationStepContainer: {
    marginRight: 80,
  },
  preparationStep: {
    lineHeight: 30,
  },
  stepNumber: {
    color: COLORS.lightCoral,
    fontWeight: "800",
    fontSize: 30,
    marginRight: 10,
    marginTop: -5,
  },
});

export default SingleRecipe;
