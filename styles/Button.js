import { StyleSheet } from "react-native";
import Colors from "../constants/Colors";

const buttonStyle = {
  padding: 8,
  paddingLeft: 16,
  paddingRight: 16,
  borderRadius: 8,
  elevation: 2,
  minHeight: 55,
  minWidth: 150,
  alignItems: "center",
  justifyContent: "center",
  flexDirection: "row",
  shadowColor: Colors.accentColor,
  shadowOffset: { width: 0, height: 2 },
  shadowRadius: 3,
  shadowOpacity: 0.75,
};

export default StyleSheet.create({
  buttonWrapper: {
    borderRadius: 8,
    flex: 1,
    justifyContent: "center",
  },
  floatingActionButton: {
    position: "absolute",
    bottom: 10,
    right: 10,
    width: 80,
    height: 80,
    backgroundColor: Colors.errorColor,
  },
  roundButtonWrapper: {
    borderRadius: 100,
    width: 55,
    height: 55,
    marginTop: 5,
    marginBottom: 5,
    overflow: "hidden",
  },
  button: StyleSheet.flatten([
    buttonStyle,
    {
      marginTop: 5,
      marginBottom: 5,
    },
  ]),
  smallButton: StyleSheet.flatten([
    buttonStyle,
    {
      marginTop: 5,
      marginBottom: 5,
      minHeight: 30,
      minWidth: 90,
    },
  ]),
  roundButton: StyleSheet.flatten([
    buttonStyle,
    {
      minWidth: 55,
      borderRadius: 30,
      alignItems: "center",
    },
  ]),
  disabled: {
    backgroundColor: Colors.disabledButtonBackground,
  },
});
