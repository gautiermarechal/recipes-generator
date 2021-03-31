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
      // display: chooseQuantity ? "flex" : "none",
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
            onPress={() => navigation.navigate("ManualOption")}
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
