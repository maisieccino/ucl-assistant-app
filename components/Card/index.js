import React, { Component } from "react";
import {
  Platform,
  TouchableNativeFeedback,
  TouchableOpacity,
  View,
} from "react-native";
import PropTypes from "prop-types";
import { BodyText, CardTitleText } from "../Typography";
import Style from "../../styles/Containers";

export const Wrapper = ({ children, onPress }) =>
  Platform.OS === "android" ? (
    <TouchableNativeFeedback onPress={onPress}>
      {children}
    </TouchableNativeFeedback>
  ) : (
    <TouchableOpacity onPress={onPress}>{children}</TouchableOpacity>
  );

Wrapper.propTypes = {
  children: PropTypes.node,
  onPress: PropTypes.func,
};

Wrapper.defaultProps = {
  children: "",
  onPress: () => {},
};

class Card extends Component {
  static propTypes = {
    children: PropTypes.node,
    title: PropTypes.string,
    onPress: PropTypes.func,
    old: PropTypes.bool,
  };

  static defaultProps = {
    children: "",
    title: "",
    onPress: () => {},
    old: false,
  };

  render() {
    let { children } = this.props;
    const { title, old } = this.props;
    if (typeof children === "string") {
      children = <BodyText>{children}</BodyText>;
    }
    return (
      <Wrapper onPress={this.props.onPress}>
        <View style={old ? Style.oldCard : Style.card}>
          {title && <CardTitleText>{title}</CardTitleText>}
          {children}
        </View>
      </Wrapper>
    );
  }
}

export default Card;
