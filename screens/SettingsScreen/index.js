/* eslint-disable react/no-unused-state */
import React, { Component, Fragment } from "react";
import { Alert, Platform, ToastAndroid, View, Clipboard } from "react-native"; // eslint-disable-line react-native/split-platform-components
import { NavigationActions, StackActions } from "react-navigation";
import PropTypes from "prop-types";
import { Constants, IntentLauncherAndroid } from "expo";
import { connect } from "react-redux";
import {
  TitleText,
  BodyText,
  SubtitleText,
  ButtonText,
} from "../../components/Typography";
import { Page, Horizontal, PaddedIcon } from "../../components/Containers";
import { signOut } from "../../actions/userActions";
import Button, { SmallButton } from "../../components/Button";
import Colors from "../../constants/Colors";
import TextInput from "../../components/Input/TextInput";
import NotificationSwitch from "./NotificationSwitch";
import LiveIndicator from "../StudySpaceDetailScreen/LiveIndicator";
import common from "../../styles/common";

const { version } = require("../../package.json");

class SettingsScreen extends Component {
  static navigationOptions = {
    header: null,
  };

  static propTypes = {
    signOut: PropTypes.func,
    navigation: PropTypes.shape(),
    state: PropTypes.shape(),
  };

  static defaultProps = {
    signOut: () => {},
    navigation: {},
    state: {},
  };

  static mapStateToProps = state => ({
    state,
  });

  static mapDispatchToProps = dispatch => ({
    signOut: () => dispatch(signOut()),
  });

  static launchNotificationSettings() {
    if (Platform.OS === "android") {
      IntentLauncherAndroid.startActivityAsync(
        IntentLauncherAndroid.ACTION_APP_NOTIFICATION_SETTINGS,
        {
          "android.provider.extra.APP_PACKAGE": "me.mbell.uclassistant",
        },
      );
    }
  }

  static releaseChannelStyle = {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  };

  state = {
    isSigningOut: false,
  };

  componentDidUpdate(_, prevState) {
    if (prevState.isSigningOut && this.props.state.user.token === "") {
      if (Platform.OS === "android") {
        ToastAndroid.show(
          "You have successfully signed out",
          ToastAndroid.SHORT,
        );
      }
      const action = StackActions.reset({
        index: 0,
        actions: [NavigationActions.navigate({ routeName: "Splash" })],
      });
      this.props.navigation.dispatch(action);
    }
  }

  signOut() {
    this.props.signOut();
    this.setState({ isSigningOut: true });
  }

  async copyTokenToClipboard() {
    await Clipboard.setString(this.props.state.user.token);
    if (Platform.OS === "android") {
      ToastAndroid.show("Token copied!", ToastAndroid.SHORT);
    } else {
      Alert.alert("Copied", "Token copied to clipboard.");
    }
  }

  render() {
    const { state } = this.props;
    return (
      <Page mainTabPage>
        <TitleText>Settings</TitleText>
        <SubtitleText>Notifications</SubtitleText>
        <NotificationSwitch />
        <Button onPress={() => SettingsScreen.launchNotificationSettings()}>
          Manage Notification Settings
        </Button>
        <SubtitleText>User</SubtitleText>
        <BodyText>Logged in as {state.user.fullName}</BodyText>
        <BodyText>Unique Person Identifier (UPI): {state.user.upi}</BodyText>
        <Button onPress={() => this.signOut()}>
          <Horizontal>
            <PaddedIcon
              name="log-out"
              size={24}
              color={Colors.pageBackground}
            />
            <ButtonText>Sign Out</ButtonText>
          </Horizontal>
        </Button>
        <TitleText>About This App</TitleText>
        <SubtitleText>Version {version}</SubtitleText>
        <Horizontal style={SettingsScreen.releaseChannelStyle}>
          {__DEV__ ? (
            <LiveIndicator>Developer Mode</LiveIndicator>
          ) : (
            <Fragment>
              <BodyText>Release Channel: </BodyText>
              <LiveIndicator>
                {Constants.manifest.releaseChannel || "dev"}
              </LiveIndicator>
            </Fragment>
          )}
        </Horizontal>
        <SubtitleText>Author</SubtitleText>
        <BodyText>Created by Matt Bell, using the UCL API.</BodyText>
        <BodyText>
          Illustrations courtesy of the unDraw project, released under the MIT
          license.
        </BodyText>
        {__DEV__ && (
          <View>
            <TitleText>Dev Stuff</TitleText>
            <SubtitleText>UCL API Token</SubtitleText>
            <Horizontal>
              <TextInput style={common.flex} value={state.user.token} />
              <SmallButton onPress={() => this.copyTokenToClipboard()}>
                Copy
              </SmallButton>
            </Horizontal>
            <SubtitleText>State</SubtitleText>
            <BodyText>{JSON.stringify(state, "\n", 2)}</BodyText>
          </View>
        )}
      </Page>
    );
  }
}

export default connect(
  SettingsScreen.mapStateToProps,
  SettingsScreen.mapDispatchToProps,
)(SettingsScreen);
