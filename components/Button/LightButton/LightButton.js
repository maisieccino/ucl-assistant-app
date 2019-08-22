import React from 'react'
import {
  View, StyleSheet, TouchableOpacity, ViewPropTypes,
} from 'react-native'
import PropTypes from "prop-types"
import { ButtonText } from '../../Typography'
import Colors from '../../../constants/Colors'

const styles = StyleSheet.create({
  active: {
    backgroundColor: Colors.accentColor,
  },
  lightButton: {
    backgroundColor: Colors.pageBackground,
    borderColor: Colors.textColor,
    borderWidth: StyleSheet.hairlineWidth,
  },
})

const LightButton = ({
  onPress,
  style,
  children,
  active,
}) => (
    <TouchableOpacity
      style={style}
      onPress={(e) => setTimeout(onPress, 200, e)}
    >
      <View style={[styles.lightButton, active ? styles.active : {}]}>
        {
          (typeof children === `string`) ? (
            <ButtonText>{children}</ButtonText>
          ) : children
        }
      </View>
    </TouchableOpacity>
)

LightButton.propTypes = {
  onPress: PropTypes.func,
  active: PropTypes.bool,
  style: ViewPropTypes.style,
  children: PropTypes.node,
}

LightButton.defaultProps = {
  onPress: () => { },
  style: {},
  children: ``,
  active: false,
}


export default LightButton
