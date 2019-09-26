import PropTypes from "prop-types"
import React from 'react'
import { Image, StyleSheet, View } from 'react-native'
import { NavigationActions, StackActions } from "react-navigation"
import { connect } from "react-redux"

import Button from "../../components/Button"
import { Page } from "../../components/Containers"
import {
  BodyText,
  Link,
  TitleText,
} from "../../components/Typography"
import { AnalyticsManager, AssetManager, PushNotificationsManager } from "../../lib"
import Styles from "../../styles/Containers"

const styles = StyleSheet.create({
  container: {
    paddingBottom: 30,
    paddingTop: 30,
  },
  description: {
    marginBottom: 20,
    marginTop: 20,
  },
  notifyImage: {
    height: 200,
    marginTop: 15,
  },
  subdescription: {
    marginBottom: 30,
  },
})

export class NotificationsScreen extends React.Component {
  static navigationOptions = {
    header: null,
  }

  static propTypes = {
    navigation: PropTypes.shape().isRequired,
    token: PropTypes.string,
  }

  static defaultProps = {
    token: ``,
  }

  static mapStateToProps = (state) => ({
    token: state.user.token,
  })

  static mapDispatchToProps = () => ({})

  onEnableNotifications = async () => {
    const { token } = this.props
    AnalyticsManager.logEvent(AnalyticsManager.events.NOTIFICATIONS_ENABLE)
    await PushNotificationsManager.registerForPushNotifications(token)
    this.goHome()
  }

  onSkip = () => {
    AnalyticsManager.logEvent(AnalyticsManager.events.NOTIFICATIONS_SKIP)
    this.goHome()
  }

  goHome = () => {
    const { navigation } = this.props
    const resetAction = StackActions.reset({
      actions: [NavigationActions.navigate({ routeName: `Main` })],
      index: 0,
    })
    navigation.dispatch(resetAction)
  }

  render() {
    return (
      <Page>
        <View style={styles.container}>
          <TitleText>Be Notified</TitleText>
          <Image
            source={AssetManager.undraw.notify}
            resizeMethod="scale"
            style={[Styles.image, styles.notifyImage]}
            resizeMode="contain"
          />
          <View style={styles.description}>
            <BodyText>
              Find out when there&apos;s a new feature on UCL Assistant,&nbsp;
              when your timetable changes, or if there&apos;s an upcoming event that might&nbsp;
              interest you.
            </BodyText>
          </View>
          <View style={styles.subdescription}>
            <BodyText>
              You can disable notifications later at any time.
            </BodyText>
          </View>
          <Button
            onPress={this.onEnableNotifications}
            testID="enable-notifications-button"
          >
            Enable Notifications
          </Button>
          <View style={styles.skip}>
            <Link onPress={this.onSkip}>
              Skip
            </Link>
          </View>
        </View>
      </Page>
    )
  }
}


export default connect(
  NotificationsScreen.mapStateToProps,
  NotificationsScreen.mapDispatchToProps,
)(NotificationsScreen)
