import React from "react"
import { TextInput } from "react-native"
import styles from "../../../styles/Input"
import Colors from "../../../constants/Colors"

const TextInputComponent = ({ style, ...otherProps }) => (
  <TextInput
    {...otherProps}
    underlineColorAndroid="transparent"
    style={[styles.textInput, style]}
    placeholderTextColor={Colors.lightTextColor}
  />
)
TextInputComponent.propTypes = TextInput.propTypes
TextInputComponent.defaultProps = TextInput.defaultProps

export default TextInputComponent
