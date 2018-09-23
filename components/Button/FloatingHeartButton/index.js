/* eslint react-native/no-color-literals: 0 */
/* eslint react-native/no-inline-styles: 0 */
import React, { Component } from "react";
import PropTypes from "prop-types";
import { Entypo } from "@expo/vector-icons";
import ActionButton from "react-native-action-button";
import Colors from "../../../constants/Colors";

class FloatingHeartButton extends Component {
  static propTypes = {
    active: PropTypes.bool,
    onPress: PropTypes.func,
  };

  static defaultProps = {
    active: false,
    onPress: () => {},
  };

  render() {
    const { active, onPress } = this.props;
    return (
      <ActionButton
        buttonColor={
          active ? Colors.disabledButtonBackground : Colors.errorColor
        }
        onPress={onPress}
        fixNativeFeedbackRadius
        buttonText="Favourite"
        renderIcon={() => (
          <Entypo
            name={active ? "heart" : "heart-outlined"}
            size={24}
            color={active ? Colors.errorColor : Colors.pageBackground}
          />
        )}
      />
    );
  }
}

export default FloatingHeartButton;
