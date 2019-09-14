import React, { Component } from "react"
import { ActivityIndicator, Platform } from "react-native"

import Colors from "../../constants/Colors"
import Styles from "../../styles/Button"
import { ButtonText, SmallButtonText } from "../Typography"
import ActiveButton from "./ActiveButton"
import DisabledButton from "./DisabledButton"
import { defaultProps, propTypes } from "./props"

// eslint-disable-next-line react/prefer-stateless-function
class Button extends Component {
  static propTypes = propTypes;

  static defaultProps = defaultProps;

  render() {
    const { loading, disabled } = this.props
    let { children } = this.props
    const buttonSize = Platform.OS === `android` ? 24 : 1
    if (loading) {
      children = (
        <ActivityIndicator size={buttonSize} color={Colors.pageBackground} />
      )
    }
    if (typeof children === `string`) {
      children = <ButtonText>{children}</ButtonText>
    }
    if (disabled) {
      return <DisabledButton {...this.props}>{children}</DisabledButton>
    }
    return <ActiveButton {...this.props}>{children}</ActiveButton>
  }
}

export const SmallButton = (props) => {
  const { loading, disabled } = props
  let { children } = props
  const buttonSize = Platform.OS === `android` ? 24 : 1
  if (loading) {
    children = (
      <ActivityIndicator size={buttonSize} color={Colors.pageBackground} />
    )
  }
  if (typeof children === `string`) {
    children = <SmallButtonText>{children}</SmallButtonText>
  }
  if (disabled) {
    return (
      <DisabledButton {...props} style={Styles.smallButton}>
        {children}
      </DisabledButton>
    )
  }
  return (
    <ActiveButton {...props} style={Styles.smallButton}>
      {children}
    </ActiveButton>
  )
}
SmallButton.propTypes = propTypes
SmallButton.defaultProps = defaultProps

export default Button
export { default as RoundButton } from "./RoundButton"
export { default as FloatingButton } from "./FloatingButton"
export { default as LightButton } from './LightButton'
