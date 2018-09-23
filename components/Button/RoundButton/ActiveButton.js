import React from "react";
import { LinearGradient } from "expo";
import {
  Platform,
  TouchableNativeFeedback,
  TouchableOpacity,
  View,
} from "react-native";
import Colors from "../../../constants/Colors";
import Styles from "../../../styles/Button";
import { propTypes, defaultProps } from "../props";

const transparent = {
  backgroundColor: "transparent",
};

const Wrapper = ({ children, onPress, disabled }) =>
  Platform.OS === "android" ? (
    <View style={Styles.roundButtonWrapper}>
      <TouchableNativeFeedback
        background={TouchableNativeFeedback.Ripple(
          Colors.accentColorLight,
          true,
        )}
        onPress={e => setTimeout(onPress, 200, e)}
        useForeground
        disabled={disabled}
      >
        {children}
      </TouchableNativeFeedback>
    </View>
  ) : (
    <TouchableOpacity style={transparent} onPress={onPress} disabled={disabled}>
      {children}
    </TouchableOpacity>
  );

Wrapper.propTypes = propTypes;
Wrapper.defaultProps = defaultProps;

const Button = ({ onPress, styles, children, disabled }) => (
  <Wrapper onPress={onPress} disabled={disabled}>
    <LinearGradient
      colors={[Colors.accentColor, Colors.buttonBackground]}
      style={[Styles.roundButton, styles]}
      start={[0, 1]}
      end={[1, 0]}
    >
      {children}
    </LinearGradient>
  </Wrapper>
);

Button.propTypes = propTypes;
Button.defaultProps = defaultProps;

export default Button;
