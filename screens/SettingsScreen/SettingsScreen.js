/* eslint-disable react/no-unused-state */
import React, { Component } from "react"
import {
  Alert,
  Platform,
  View,
  Clipboard,
  StyleSheet,
  Linking,
} from "react-native"
import { NavigationActions, StackActions } from "react-navigation"
import PropTypes from "prop-types"
import * as IntentLauncherAndroid from "expo-intent-launcher"
import { StoreReview } from "expo"
import Constants from "expo-constants"
import { connect } from "react-redux"
import {
  TitleText,
  BodyText,
  SubtitleText,
  ButtonText,
  Link,
} from "../../components/Typography"
import { Page, Horizontal, PaddedIcon } from "../../components/Containers"
import { signOut as signOutAction } from "../../actions/userActions"
import Button, { SmallButton } from "../../components/Button"
import Colors from "../../constants/Colors"
import TextInput from "../../components/Input/TextInput"
// import NotificationSwitch from "./NotificationSwitch"
import LiveIndicator from "../../components/LiveIndicator"
import common from "../../styles/common"
import { AnalyticsManager, MailManager } from "../../lib"

const { version } = require(`../../package.json`)

const styles = StyleSheet.create({
  faqButton: {
    marginBottom: 10,
  },
  feedbackButton: {
    alignSelf: `flex-start`,
  },
  // notificationSettingsButton: {
  //   marginTop: 10,
  // },
  section: {
    marginBottom: 15,
    marginTop: 15,
  },
  textWithUpperMargin: {
    marginTop: 10,
  },
})

class SettingsScreen extends Component {
  static navigationOptions = {
    header: null,
  }

  static propTypes = {
    signOut: PropTypes.func,
    navigation: PropTypes.shape(),
    user: PropTypes.shape(),
  }

  static defaultProps = {
    signOut: () => { },
    navigation: {},
    user: {},
  }

  static mapStateToProps = (state) => ({
    user: state.user,
  })

  static mapDispatchToProps = (dispatch) => ({
    signOut: () => dispatch(signOutAction()),
  })

  static launchNotificationSettings() {
    // note that this will only work on standalone apps
    // because the bundleIdentifier/packageName will
    // only be used when an APK/IPA is built
    if (Platform.OS === `android`) {
      IntentLauncherAndroid.startActivityAsync(
        IntentLauncherAndroid.ACTION_APP_NOTIFICATION_SETTINGS,
        {
          "android.provider.extra.APP_PACKAGE":
            Constants.manifest.android.package,
        },
      )
    } else {
      // is iOS
      Linking.openURL(
        `app-settings://notification/${Constants.manifest.ios.bundleIdentifier}`,
      )
    }
  }

  static releaseChannelStyle = {
    flexDirection: `row`,
    justifyContent: `flex-start`,
    alignItems: `center`,
    marginBottom: 10,
  }

  constructor() {
    super()
    this.state = {
      isSigningOut: false,
    }
  }

  componentDidUpdate(_, prevState) {
    const { user, navigation } = this.props
    if (prevState.isSigningOut && user.token === ``) {
      const action = StackActions.reset({
        index: 0,
        actions: [NavigationActions.navigate({ routeName: `Splash` })],
      })
      navigation.dispatch(action)
    }
  }

  signOut = () => {
    const { signOut } = this.props
    signOut()
    this.setState({ isSigningOut: true })
  }

  navigateToFAQs = () => {
    const { navigation } = this.props
    navigation.navigate(`FAQ`)
    AnalyticsManager.logEvent(AnalyticsManager.event.SETTINGS_VIEW_FAQS)
  }

  copyTokenToClipboard = async () => {
    const { user: { token } } = this.props
    await Clipboard.setString(token)
    Alert.alert(`Copied`, `Token copied to clipboard.`)
  }

  giveFeedback = () => {
    const { user: { upi } } = this.props
    const { deviceName, platform, manifest: { releaseChannel } } = Constants
    MailManager.composeAsync({
      recipients: [`isd.apiteam@ucl.ac.uk`],
      subject: `Feedback about UCL Assistant`,
      body: `I've been using UCL Assistant and I just wanted to tell you ... \n\n`
        + `Technical Information\n${JSON.stringify({
          deviceName,
          platform,
          releaseChannel,
          upi,
        }, null, 2)}`,
    })
    AnalyticsManager.logEvent(AnalyticsManager.event.SETTINGS_GIVE_FEEDBACK)
  }

  rateApp = () => {
    const isSupported = StoreReview.isSupported()
    if (isSupported) {
      StoreReview.requestReview()
    }
    AnalyticsManager.logEvent(AnalyticsManager.event.SETTINGS_RATE_APP, { isSupported })
  }

  render() {
    const { user } = this.props
    return (
      <Page mainTabPage>
        <TitleText>Settings</TitleText>
        {/* <View>
          <SubtitleText>Notifications</SubtitleText>
          <NotificationSwitch />
          <Button
            onPress={() => SettingsScreen.launchNotificationSettings()}
            style={styles.notificationSettingsButton}
          >
            Manage Notification Settings
          </Button>
        </View> */}
        {/* <View style={styles.section}>
          <SubtitleText>Default Screen</SubtitleText>
          <BodyText>Set the default screen that shows when you open the app</BodyText>
          <Picker
            // selectedValue={this.state.language}
            // style={{height: 50, width: 100}}
            // onValueChange={(itemValue, itemIndex) =>
            //   this.setState({language: itemValue})
            // }
            >
            <Picker.Item label="Timetable" value="timetable" />
            <Picker.Item label="Study Spaces" value="studyspaces" />
          </Picker>
        </View> */}
        <View style={styles.section}>
          <SubtitleText>User</SubtitleText>
          <BodyText>
            {`Logged in as ${user.fullName}`}
          </BodyText>
          <BodyText>
            {`Unique Person Identifier (UPI): ${user.upi}`}
          </BodyText>
          <Button onPress={this.signOut}>
            <Horizontal>
              <PaddedIcon
                name="log-out"
                size={24}
                color={Colors.pageBackground}
              />
              <ButtonText>Sign Out</ButtonText>
            </Horizontal>
          </Button>
        </View>
        <View style={styles.section}>
          <TitleText>About This App</TitleText>
          <Button onPress={this.navigateToFAQs} style={styles.faqButton}>
            Frequently Asked Questions
          </Button>
          <BodyText>
            {`Version: ${version}`}
          </BodyText>
          <Horizontal style={SettingsScreen.releaseChannelStyle}>
            {__DEV__ ? (
              <LiveIndicator>Developer Mode</LiveIndicator>
            ) : (
                <>
                  <BodyText>Release Channel: </BodyText>
                  <LiveIndicator>
                    {Constants.manifest.releaseChannel || `dev`}
                  </LiveIndicator>
                </>
            )}
          </Horizontal>
          <Link href="https://github.com/uclapi/ucl-assistant-app">
            Source Code
          </Link>
          <Button
            style={styles.feedbackButton}
            onPress={this.giveFeedback}
          >
            Send Us Feedback
          </Button>
          {/* <Horizontal>
            <Button onPress={this.rateApp}>
              Rate Us
            </Button>
          </Horizontal> */}
        </View>
        <View style={styles.section}>
          <SubtitleText>Author</SubtitleText>
          <BodyText>
            Created by Matt Bell (class of 2018) using the&nbsp;
            <Link href="https://uclapi.com">UCL API</Link>
            .
          </BodyText>
          <BodyText style={styles.textWithUpperMargin}>
            Currently managed by the UCL API Team: a group of students working
            together within ISD to improve UCL by building a platform on top of
            {` UCL's `}
            digital services for students.
          </BodyText>
          <BodyText style={styles.textWithUpperMargin}>
            Illustrations courtesy of the unDraw project, released under the MIT
            license.
          </BodyText>
        </View>
        {__DEV__ && (
          <View style={styles.section}>
            <TitleText>Dev Stuff</TitleText>
            <SubtitleText>UCL API Token</SubtitleText>
            <Horizontal>
              <TextInput style={common.flex} value={user.token} />
              <SmallButton onPress={this.copyTokenToClipboard}>
                Copy
              </SmallButton>
            </Horizontal>
            <SubtitleText>State</SubtitleText>
            <BodyText>{JSON.stringify(user, `\n`, 2)}</BodyText>
          </View>
        )}
      </Page>
    )
  }
}

export default connect(
  SettingsScreen.mapStateToProps,
  SettingsScreen.mapDispatchToProps,
)(SettingsScreen)
