import React, { Component } from "react";
import { ActivityIndicator, Platform } from "react-native";
import { Feather } from "@expo/vector-icons";
import { propTypes, defaultProps } from "./props";
import ActiveButton from "./ActiveButton";
import DisabledButton from "./DisabledButton";
import Colors from "../../../constants/Colors";

class Button extends Component {
  static propTypes = propTypes;
  static defaultProps = defaultProps;

  render() {
    const { icon } = this.props;
    const buttonSize = Platform.OS === "android" ? 24 : 16;
    let child = (
      <Feather size={buttonSize} name={icon} color={Colors.pageBackground} />
    );
    if (this.props.loading) {
      child = (
        <ActivityIndicator size={buttonSize} color={Colors.pageBackground} />
      );
    }
    if (this.props.disabled) {
      return <DisabledButton {...this.props}>{child}</DisabledButton>;
    }
    return <ActiveButton {...this.props}>{child}</ActiveButton>;
  }
}

export default Button;
