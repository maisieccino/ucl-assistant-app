import { StyleSheet } from "react-native"
import Colors from "../constants/Colors"

const buttonStyle = {
  padding: 8,
  paddingLeft: 16,
  paddingRight: 16,
  borderRadius: 8,
  elevation: 2,
  minHeight: 55,
  minWidth: 150,
  alignItems: `center`,
  justifyContent: `center`,
  flexDirection: `row`,
  shadowColor: Colors.accentColor,
  shadowOffset: { width: 0, height: 2 },
  shadowRadius: 3,
  shadowOpacity: 0.75,
}

export default StyleSheet.create({
  button: StyleSheet.flatten([
    buttonStyle,
    {
      marginTop: 5,
      marginBottom: 5,
    },
  ]),
  buttonWrapper: {
    borderRadius: 8,
    flex: 1,
    justifyContent: `center`,
  },
  disabled: {
    backgroundColor: Colors.disabledButtonBackground,
  },
  roundButton: StyleSheet.flatten([
    buttonStyle,
    {
      minWidth: 55,
      borderRadius: 30,
      alignItems: `center`,
    },
  ]),
  roundButtonWrapper: {
    borderRadius: 100,
    height: 55,
    marginBottom: 5,
    marginTop: 5,
    overflow: `hidden`,
    width: 55,
  },
  smallButton: StyleSheet.flatten([
    buttonStyle,
    {
      marginTop: 5,
      marginBottom: 5,
      minHeight: 30,
      minWidth: 90,
    },
  ]),
})
