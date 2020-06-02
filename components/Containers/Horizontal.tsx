import React from 'react'
import { StyleSheet, View, ViewStyle } from 'react-native'

const styles = StyleSheet.create({
  horizontal: {
    alignItems: `center`,
    flexDirection: `row`,
    justifyContent: `center`,
  },
})

interface Props {
  style?: ViewStyle,
  children: React.ReactNode,
}

const Horizontal: React.FC<Props> = ({ children, style }) => (
  <View style={[styles.horizontal, style]}>{children}</View>
)

export default Horizontal
