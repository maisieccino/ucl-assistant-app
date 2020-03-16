import React from "react"
import { TouchableNativeFeedback, View } from "react-native"

import Styles from "../../styles/Button"
import { defaultProps, propTypes } from "./props"

const DisabledButton = ({
  style, children,
}) => (
    <TouchableNativeFeedback
      background={TouchableNativeFeedback.SelectableBackground()}
      useForeground
      style={Styles.buttonWrapper}
      disabled
    >
      <View style={[Styles.button, Styles.disabled, style]}>{children}</View>
    </TouchableNativeFeedback>
)

DisabledButton.propTypes = propTypes
DisabledButton.defaultProps = defaultProps

export default DisabledButton
