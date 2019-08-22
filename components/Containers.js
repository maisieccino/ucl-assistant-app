/* eslint react/require-default-props: 0 */
import React from "react"
import PropTypes from "prop-types"
import { Feather } from "@expo/vector-icons"
import {
  KeyboardAvoidingView,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  View,
  ViewPropTypes,
  StyleSheet,
} from "react-native"
import Styles from "../styles/Containers"
import Colors from "../constants/Colors"

// const { height, width } = Dimensions.get("window");

/* eslint-disable react/no-unused-prop-types */
const propTypes = {
  children: PropTypes.node,
  style: ViewPropTypes.style,
  refreshEnabled: PropTypes.bool,
  onRefresh: PropTypes.func,
  refreshing: PropTypes.bool,
  mainTabPage: PropTypes.bool,
  safeAreaViewStyle: ViewPropTypes.style,
  keyboardAvoidingViewStyle: ViewPropTypes.style,
  contentContainerStyle: ViewPropTypes.style,
  topColour: PropTypes.string,
  bottomColour: PropTypes.string,
}
/* eslint-enable react/no-unused-prop-types */
const defaultProps = {
  children: ``,
  style: {},
  refreshEnabled: false,
  onRefresh: () => { },
  refreshing: false,
  mainTabPage: false,
  safeAreaViewStyle: {},
  keyboardAvoidingViewStyle: {},
  contentContainerStyle: {},
  topColour: Colors.pageBackground,
  bottomColour: Colors.pageBackground,
}

const pageTopPadding = { height: 10 }

const styles = StyleSheet.create({
  safeAreaViewTop: {
    flex: 0,
  },
})

export const Page = ({
  children,
  style,
  safeAreaViewStyle,
  keyboardAvoidingViewStyle,
  contentContainerStyle,
  refreshEnabled,
  onRefresh,
  refreshing,
  mainTabPage,
  topColour,
  bottomColour,
  ...props
}) => (
    <>
      <SafeAreaView style={[styles.safeAreaViewTop, { backgroundColor: topColour }]} />
      <SafeAreaView style={[
        Styles.pageContainer,
        { backgroundColor: bottomColour },
        safeAreaViewStyle,
      ]}
      >
        <KeyboardAvoidingView
          style={[
            Styles.pageContainer,
            mainTabPage ? Styles.mainTab : null,
            keyboardAvoidingViewStyle,
          ]}
          {...props}
          behavior="padding"
        >
          <ScrollView
            contentContainerStyle={[Styles.pageScrollContent, contentContainerStyle]}
            style={[style, Styles.page, Styles.pageScrollView]}
            refreshControl={
              refreshEnabled ? (
                <RefreshControl
                  enabled={refreshEnabled}
                  onRefresh={onRefresh}
                  refreshing={refreshing}
                />
              ) : null
            }
            keyboardDismissMode="on-drag"
          >
            <View style={pageTopPadding} />
            {children}
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </>
)
Page.propTypes = propTypes
Page.defaultProps = defaultProps

export const PageNoScroll = ({ children, style, ...props }) => (
  <SafeAreaView style={[Styles.pageContainer]}>
    <KeyboardAvoidingView
      style={[Styles.pageContainer, Styles.pageNoScrollContainer]}
      {...props}
      behavior="padding"
    >
      <View style={[Styles.page, style]}>{children}</View>
    </KeyboardAvoidingView>
  </SafeAreaView>
)
PageNoScroll.propTypes = propTypes
PageNoScroll.defaultProps = defaultProps

export const Spacer = () => <View style={Styles.spacer} />

export const Horizontal = ({ children, style }) => (
  <View style={[Styles.horizontal, style]}>{children}</View>
)
Horizontal.propTypes = propTypes
Horizontal.defaultProps = defaultProps

export const PaddedIcon = (props) => (
  <Feather {...props} style={Styles.paddedIcon} />
)
PaddedIcon.propTypes = Feather.propTypes
PaddedIcon.defaultProps = Feather.defaultProps

export const CircularIcon = (props) => (
  <Feather {...props} style={Styles.circularIcon} />
)
CircularIcon.propTypes = Feather.propTypes
CircularIcon.defaultProps = Feather.defaultProps

export default {}
