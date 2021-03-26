import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  Image,
  FlatList,
  KeyboardAvoidingView,
} from "react-native";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
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
import { useDispatch, useSelector } from "react-redux";
import {
  removeSelectedIngredients,
  selectAll,
  toggleSelectIngredient,
} from "../libs/redux/actions/NewIngredientsActions.js";
import DropDownPicker from "react-native-dropdown-picker";
import Icon from "react-native-vector-icons/Octicons";
import { addIngredient } from "../libs/redux/actions/IngredientsActions.js";

Icon.loadFont();

const IngredientsScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const [isShown, setIsShown] = React.useState(false);
  const [isModalVisible, setIsModalVisible] = React.useState(false);
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
      backgroundColor: COLORS.white,
      justifyContent: "flex-start",
      overflow: "hidden",
      position: "relative",
    },
    modalTitle: {
      fontSize: 20,
      fontWeight: "800",
      marginTop: 30,
      marginLeft: 30,
      marginBottom: 20,
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
    ingredientsChosenButton: {
      bottom: "15%",
      marginRight: 5,
      right: 0,
      position: "absolute",
      backgroundColor: COLORS.lightCoral,
      padding: 10,
      borderRadius: 100,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    ingredientsList: {
      flex: 1,
    },
    resultFlatList: {
      backgroundColor: COLORS.white,
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
      <View style={styles.container}>
        <Modal isVisible={isModalVisible} style={styles.modalContainer}>
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
                    //   onPress={() => {
                    //     if (!newIngredients.includes(item)) {
                    //       dispatch(receiveNewIngredients(item));
                    //       setClearSearchBar(true);
                    //       dispatch(clearResults());
                    //     } else {
                    //       dispatch(removeIngredient(item));
                    //     }
                    //   }
                    // }
                    onPress={() => {
                      setSingleIngredientChosen({
                        ingredient: item,
                        quantity: {
                          amount: 0,
                          unit: "",
                        },
                      });
                      setChooseQuantity(true);
                    }}
                  >
                    <Image
                      source={{ uri: item.food.image }}
                      style={styles.ingredientImage}
                    />
                    <Text style={styles.ingredientLabel}>
                      {item.food.label}
                    </Text>
                  </Pressable>
                )}
                keyExtractor={(item, index) => index.toString()}
              />
            ) : null
          ) : null}
          <Text style={styles.modalTitle}>Your ingredients</Text>
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
                    <Text style={styles.ingredientLabel}>
                      {item.food.label}
                    </Text>
                  </Pressable>
                )}
                keyExtractor={(item, index) => index.toString()}
              />
            ) : (
              <Text>You don't have ingredients yet.</Text>
            )}
          </View>
          <View style={styles.footer}>
            {selectedIngredients.length === 0 ? (
              <>
                <Pressable
                  style={styles.cancelButton}
                  onPress={() => setIsModalVisible(false)}
                >
                  <Text style={styles.buttonText}>Cancel</Text>
                </Pressable>
                <Pressable style={styles.confirmButton}>
                  <Text style={styles.buttonText}>Confirm</Text>
                </Pressable>
              </>
            ) : (
              <>
                <Pressable
                  style={styles.cancelButton}
                  onPress={() => dispatch(removeSelectedIngredients())}
                >
                  <Text style={styles.buttonText}>Remove</Text>
                </Pressable>
                <Pressable
                  style={styles.confirmButton}
                  onPress={() => dispatch(selectAll())}
                >
                  <Text style={styles.buttonText}>Select All</Text>
                </Pressable>
              </>
            )}
          </View>
          <KeyboardAvoidingView
            style={styles.quantityContainer}
            behavior="padding"
          >
            {singleIngredientChosen.ingredient !== {} ? (
              <>
                <Image
                  source={{
                    uri: singleIngredientChosen?.ingredient?.food?.image,
                  }}
                  style={{
                    height: 150,
                    width: 150,
                    borderRadius: 10,
                    marginTop: 60,
                  }}
                />
                <Text
                  style={{
                    fontWeight: "800",
                    fontSize: 35,
                    marginTop: 10,
                    textAlign: "center",
                  }}
                >
                  {singleIngredientChosen?.ingredient?.food?.label}
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
                  <Text style={styles.quantitySubtitle}>Quantity</Text>
                  <View style={styles.quantityInputContainer}>
                    <TextInput
                      keyboardType="numeric"
                      style={styles.quantityInput}
                      returnKeyType="done"
                      returnKeyLabel="Done"
                      onBlur={(text) =>
                        setSingleIngredientChosen({
                          ingredient: singleIngredientChosen.ingredient,
                          quantity: {
                            amount: text,
                            unit: "",
                          },
                        })
                      }
                    />
                    <DropDownPicker
                      items={[
                        {
                          label: "Unit",
                          value: "unit",
                          icon: () => (
                            <Icon name="flag" size={18} color="#900" />
                          ),
                        },
                        { label: "Weight", value: "weight", untouchable: true },
                        { label: "Grams", value: "grams", parent: "weight" },
                        { label: "Ounces", value: "ounces", parent: "weight" },
                        { label: "Cups", value: "cups", parent: "weight" },

                        {
                          label: "Volumes",
                          value: "volumes",
                          untouchable: true,
                        },
                        { label: "Oz", value: "teaspoon", parent: "volume" },
                        { label: "Milliliter", value: "mL", parent: "volume" },
                        { label: "Liter", value: "L", parent: "volume" },
                      ]}
                      defaultValue={"grams"}
                      containerStyle={{ height: 40, width: 100 }}
                      style={{ backgroundColor: COLORS.white, zIndex: 1000 }}
                      itemStyle={{ justifyContent: "flex-start" }}
                      onChangeItem={(item) =>
                        setSingleIngredientChosen({
                          ...singleIngredientChosen,
                          quantity: {
                            ...singleIngredientChosen.quantity,
                            unit: item.value,
                          },
                        })
                      }
                    />
                  </View>
                </View>
                <View style={styles.footer}>
                  <Pressable
                    style={styles.quantityNavigationBack}
                    onPress={() => {
                      setChooseQuantity(false);
                      setSingleIngredientChosen({});
                    }}
                  >
                    <Text style={styles.buttonText}>Back</Text>
                  </Pressable>
                  <Pressable
                    style={styles.quantityNavigationConfirm}
                    onPress={() =>
                      dispatch(addIngredient(singleIngredientChosen))
                    }
                  >
                    <Text style={styles.buttonText}>Add</Text>
                  </Pressable>
                </View>
              </>
            ) : (
              <Text>Loading</Text>
            )}
          </KeyboardAvoidingView>
        </Modal>
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
