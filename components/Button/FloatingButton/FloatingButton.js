import { Entypo } from "@expo/vector-icons"
import PropTypes from "prop-types"
import React, { Component } from "react"
import ActionButton from "react-native-action-button"

import Colors from "../../../constants/Colors"

class FloatingButton extends Component {
  static propTypes = {
    active: PropTypes.bool,
    activeButtonColor: PropTypes.string,
    activeIcon: PropTypes.string,
    activeIconColor: PropTypes.string,
    buttonColor: PropTypes.string,
    icon: PropTypes.string,
    iconColor: PropTypes.string,
    onPress: PropTypes.func,
  }

  static defaultProps = {
    active: false,
    activeButtonColor: Colors.disabledButtonBackground,
    activeIcon: `heart`,
    activeIconColor: Colors.errorColor,
    buttonColor: Colors.errorColor,
    icon: `heart-outlined`,
    iconColor: Colors.pageBackground,
    onPress: () => { },
  }

  renderIcon = () => {
    const {
      active,
      activeIcon,
      icon,
      iconColor,
      activeIconColor,
    } = this.props
    return (
      <Entypo
        name={active ? activeIcon : icon}
        size={24}
        color={active ? activeIconColor : iconColor}
      />
    )
  }

  render() {
    const {
      active,
      onPress,
      activeButtonColor,
      buttonColor,
    } = this.props
    return (
      <ActionButton
        buttonColor={
          active ? activeButtonColor : buttonColor
        }
        position="right"
        onPress={onPress}
        fixNativeFeedbackRadius
        buttonText="Favourite"
        renderIcon={this.renderIcon}
      />
    )
  }
}

export default FloatingButton
