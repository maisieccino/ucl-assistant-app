import React, { Component, Fragment } from "react";
import { ActivityIndicator, Alert, Switch } from "react-native";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { registerForNotifications } from "../../actions/notificationsActions";
import { Horizontal } from "../../components/Containers";
import { BodyText, ErrorText } from "../../components/Typography";
import common from "../../styles/common";

class NotificationSwitch extends Component {
  static mapStateToProps = state => ({
    registered: state.notifications.registered,
    changing: state.notifications.stateChanging,
    error: state.notifications.stateChangeError,
    token: state.user.token,
  });

  static mapDispatchToProps = dispatch => ({
    register: token => dispatch(registerForNotifications(token)),
  });

  static propTypes = {
    registered: PropTypes.bool,
    changing: PropTypes.bool,
    error: PropTypes.string,
    register: PropTypes.func,
    token: PropTypes.string,
  };

  static defaultProps = {
    registered: false,
    changing: false,
    error: "",
    register: () => {},
    token: "",
  };

  state = {
    spin: false,
  };

  async onSwitchChange() {
    if (!this.props.registered) {
      await this.setState({ spin: true });
      Alert.alert(
        "Register for notifications?",
        "The only information stored on our servers is a unique key used to send notifications to your device. Are you sure you want to continue?",
        [
          {
            text: "Cancel",
            style: "cancel",
            onPress: () => this.setState({ spin: false }),
          },
          {
            text: "Continue",
            onPress: () => {
              this.setState({ spin: false });
              this.props.register(this.props.token);
            },
          },
        ],
      );
    } else {
      // not yet implemented on API
      this.setState({ spin: false });
      Alert.alert(
        "Can't yet unregister notifications.",
        "Can't yet unregister for notifications.",
      );
    }
  }

  render() {
    const { registered, changing, error } = this.props;
    const { spin } = this.state;
    return (
      <Fragment>
        {error.length > 0 && <ErrorText>Error: {error}</ErrorText>}
        <Horizontal>
          <BodyText style={common.flex}>Enable notifications</BodyText>
          {changing || spin ? (
            <ActivityIndicator />
          ) : (
            <Switch
              onValueChange={b => this.onSwitchChange(b)}
              value={registered}
            />
          )}
        </Horizontal>
      </Fragment>
    );
  }
}

export default connect(
  NotificationSwitch.mapStateToProps,
  NotificationSwitch.mapDispatchToProps,
)(NotificationSwitch);
