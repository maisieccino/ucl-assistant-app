import React from "react";
import { TouchableNativeFeedback, View } from "react-native";
import Styles from "../../../styles/Button";
import { propTypes, defaultProps } from "./props";

const Button = ({ onPress, styles, children, disabled }) => (
  <TouchableNativeFeedback
    background={TouchableNativeFeedback.SelectableBackground()}
    onPress={e => onPress(e)}
    useForeground
    style={Styles.buttonWrapper}
    disabled={disabled}
  >
    <View style={[Styles.roundButton, Styles.disabled, styles]}>
      {children}
    </View>
  </TouchableNativeFeedback>
);

Button.propTypes = propTypes;
Button.defaultProps = defaultProps;

export default Button;
