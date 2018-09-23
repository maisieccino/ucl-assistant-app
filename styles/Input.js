import { StyleSheet } from "react-native";
import typographyStyle from "./Typography";
import Colors from "../constants/Colors";

export const style = {
  inputFrame: {
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 10,
    paddingRight: 10,
    borderColor: Colors.lightTextColor,
    backgroundColor: Colors.textInputBackground,
    marginTop: 10,
    marginBottom: 10,
    height: 50,
    minWidth: 200,
    borderRadius: 10,
    marginRight: 2,
    marginLeft: 2,
  },
};

export default StyleSheet.create({
  inputFrame: style.inputFrame,
  textInput: StyleSheet.flatten([typographyStyle.bodyText, style.inputFrame]),
});
