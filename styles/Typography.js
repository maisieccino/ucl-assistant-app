import { StyleSheet } from "react-native";
import Color from "../constants/Colors";

export const style = StyleSheet.create({
  baseStyle: {
    fontFamily: "apercu",
    color: Color.textColor,
    fontSize: 16,
    marginTop: 1,
    marginBottom: 1,
  },
  title: {
    fontFamily: "apercu-bold",
    fontSize: 35,
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 28,
    marginTop: 8,
    marginBottom: 2,
  },
  cardTitle: {
    color: Color.accentColor,
    marginTop: 0,
    marginBottom: 0,
  },
  buttonText: {
    color: Color.pageBackground,
    fontSize: 20,
    textAlign: "center",
  },
  smallButtonText: {
    fontSize: 16,
    flex: 1,
  },
  centredText: {
    textAlign: "center",
    color: Color.lightTextColor,
    marginTop: 5,
    marginBottom: 5,
  },
  searchResultTopText: {
    fontFamily: "apercu-bold",
    marginBottom: 0,
  },
  searchResultBottomText: {
    marginTop: 0,
    fontStyle: "italic",
    color: Color.lightTextColor,
  },
  infoTextContainer: {
    marginTop: 5,
  },
  informational: {
    marginTop: -1,
    flex: 1,
    marginLeft: 5,
  },
  errorText: {
    color: Color.errorColor,
  },
  warningText: {
    color: Color.warningColor,
  },
  infoText: {
    color: Color.infoColor,
  },
});

export default StyleSheet.create({
  titleText: StyleSheet.flatten([style.baseStyle, style.title]),
  subtitleText: StyleSheet.flatten([
    style.baseStyle,
    style.title,
    style.subtitle,
  ]),
  bodyText: StyleSheet.flatten([style.baseStyle]),
  centredText: StyleSheet.flatten([style.baseStyle, style.centredText]),
  buttonText: StyleSheet.flatten([style.baseStyle, style.buttonText]),
  smallButtonText: StyleSheet.flatten([
    style.baseStyle,
    style.buttonText,
    style.smallButtonText,
  ]),
  cardTitle: StyleSheet.flatten([
    style.baseStyle,
    style.title,
    style.subtitle,
    style.cardTitle,
  ]),
  cardTitleRect: {
    backgroundColor: Color.accentColor,
    width: 30,
    height: 5,
    marginLeft: 2,
    marginBottom: 5,
  },
  searchResultTopText: StyleSheet.flatten([
    style.baseStyle,
    style.searchResultTopText,
  ]),
  searchResultBottomText: StyleSheet.flatten([
    style.baseStyle,
    style.searchResultBottomText,
  ]),
  errorText: StyleSheet.flatten([
    style.baseStyle,
    style.informational,
    style.errorText,
  ]),
  warningText: StyleSheet.flatten([
    style.baseStyle,
    style.informational,
    style.warningText,
  ]),
  infoText: StyleSheet.flatten([
    style.baseStyle,
    style.informational,
    style.infoText,
  ]),
  infoTextContainer: StyleSheet.flatten([style.infoTextContainer]),
  bold: {
    fontWeight: "bold",
  },
  small: {
    fontSize: 12,
  },
});
