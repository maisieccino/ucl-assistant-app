import React, { Component } from "react";
import { ActivityIndicator, Platform } from "react-native";
import { propTypes, defaultProps } from "./props";
import ActiveButton from "./ActiveButton";
import DisabledButton from "./DisabledButton";
import { ButtonText, SmallButtonText } from "../Typography";
import Colors from "../../constants/Colors";
import Styles from "../../styles/Button";

class Button extends Component {
  static propTypes = propTypes;
  static defaultProps = defaultProps;

  render() {
    let { children } = this.props;
    const buttonSize = Platform.OS === "android" ? 24 : 1;
    if (this.props.loading) {
      children = (
        <ActivityIndicator size={buttonSize} color={Colors.pageBackground} />
      );
    }
    if (typeof children === "string") {
      children = <ButtonText>{children}</ButtonText>;
    }
    if (this.props.disabled) {
      return <DisabledButton {...this.props}>{children}</DisabledButton>;
    }
    return <ActiveButton {...this.props}>{children}</ActiveButton>;
  }
}

export const SmallButton = props => {
  let { children } = props;
  const buttonSize = Platform.OS === "android" ? 24 : 1;
  if (props.loading) {
    children = (
      <ActivityIndicator size={buttonSize} color={Colors.pageBackground} />
    );
  }
  if (typeof children === "string") {
    children = <SmallButtonText>{children}</SmallButtonText>;
  }
  if (props.disabled) {
    return (
      <DisabledButton {...props} style={Styles.smallButton}>
        {children}
      </DisabledButton>
    );
  }
  return (
    <ActiveButton {...props} style={Styles.smallButton}>
      {children}
    </ActiveButton>
  );
};
SmallButton.propTypes = propTypes;
SmallButton.defaultProps = defaultProps;

export default Button;
export { default as RoundButton } from "./RoundButton";
export { default as FloatingHeartButton } from "./FloatingHeartButton";
