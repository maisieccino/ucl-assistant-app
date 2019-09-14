import { Entypo } from "@expo/vector-icons"
import PropTypes from "prop-types"
import React, { Component } from "react"
import ActionButton from "react-native-action-button"

import Colors from "../../../constants/Colors"

class FloatingButton extends Component {
  static propTypes = {
    active: PropTypes.bool,
    onPress: PropTypes.func,
    icon: PropTypes.string.isRequired,
    activeIcon: PropTypes.string.isRequired,
    iconColor: PropTypes.string,
    activeIconColor: PropTypes.string,
    buttonColor: PropTypes.string,
    activeButtonColor: PropTypes.string,
  }

  static defaultProps = {
    active: false,
    onPress: () => { },
    iconColor: Colors.errorColor,
    activeIconColor: Colors.pageBackground,
    buttonColor: Colors.errorColor,
    activeButtonColor: Colors.disabledButtonBackground,
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
