import React from 'react'
import {
  View, StyleSheet, TouchableOpacity, ViewPropTypes,
} from 'react-native'
import PropTypes from "prop-types"
import { SmallButtonText } from '../../Typography'
import Colors from '../../../constants/Colors'

const styles = StyleSheet.create({
  active: {
    backgroundColor: Colors.accentColor,
  },
  activeText: {
    color: Colors.pageBackground,
  },
  lightButton: {
    backgroundColor: Colors.pageBackground,
    borderColor: Colors.textColor,
    borderRadius: 8,
    borderWidth: StyleSheet.hairlineWidth,
    paddingHorizontal: 20,
    paddingVertical: 5,
  },
  text: {
    color: Colors.textColor,
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
            <SmallButtonText
              style={[
                styles.text,
                active ? styles.activeText : {},
              ]}
            >
              {children}
            </SmallButtonText>
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
