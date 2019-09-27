import { Feather } from "@expo/vector-icons"
import { Notifications } from "expo"
import * as Permissions from "expo-permissions"
import moment from "moment"
import PropTypes from "prop-types"
import React, { Component } from "react"
import { StyleSheet, View } from "react-native"
import { NavigationActions, StackActions } from "react-navigation"
import { connect } from "react-redux"

import { fetchTimetable as fetchTimetableAction } from "../../actions/timetableActions"
import Button from "../../components/Button"
import { Page } from "../../components/Containers"
import { BodyText, ErrorText, TitleText } from "../../components/Typography"
import { ASSISTANT_API_URL } from "../../constants/API"
import Colors from "../../constants/Colors"
import { TIMETABLE_CACHE_TIME_HOURS } from "../../constants/timetableConstants"
import DateControls from "./DateControls"
import TimetableComponent from "./TimetableComponent"

const styles = StyleSheet.create({
  currentDate: {
    paddingLeft: 20,
    paddingRight: 20,
  },
  jumpToToday: {
    marginLeft: 20,
    marginRight: 20,
  },
  page: {
    paddingBottom: 40,
    paddingLeft: 0,
    paddingRight: 0,
  },
})

class TimetableScreen extends Component {
  static navigationOptions = {
    header: null,
    tabBarIcon: ({ focused }) => (
      <Feather
        name="calendar"
        size={28}
        color={focused ? Colors.pageBackground : Colors.textColor}
      />
    ),
  }

  static propTypes = {
    fetchTimetable: PropTypes.func,
    isFetchingTimetable: PropTypes.bool,
    navigation: PropTypes.shape().isRequired,
    timetable: PropTypes.shape(),
    user: PropTypes.shape(),
  }

  static defaultProps = {
    fetchTimetable: () => { },
    isFetchingTimetable: false,
    timetable: {},
    user: {},
  }

  static mapStateToProps = (state) => ({
    error: state.timetable.error,
    isFetchingTimetable: state.timetable.isFetching,
    timetable: state.timetable.timetable,
    user: state.user,
  })

  static mapDispatchToProps = (dispatch) => ({
    fetchTimetable: (token, date) => dispatch(fetchTimetableAction(token, date)),
  })

  constructor(props) {
    super(props)
    this.state = {
      date: moment().startOf(`day`),
    }
  }

  componentDidMount() {
    const { date } = this.state
    const { user: { token }, fetchTimetable } = this.props
    if (this.loginCheck(this.props) && token !== ``) {
      fetchTimetable(token, date)
    }

    // this.registerForPushNotificationsAsync();
  }

  onDateChanged = async (newDate, forceUpdate = false) => {
    const newDay = newDate.clone().startOf(`day`)
    await this.setState({
      date: newDay,
    })
    const dateString = newDay.format(`YYYY-MM-DD`)

    const { timetable, fetchTimetable, user: { token } } = this.props
    const { date } = this.state

    if (forceUpdate || !timetable[dateString] || !timetable[dateString].lastUpdated) {
      fetchTimetable(token, date)
    } else {
      const diff = moment.duration(
        moment().diff(timetable[dateString].lastUpdated),
      )
      if (diff.asHours() > TIMETABLE_CACHE_TIME_HOURS) {
        fetchTimetable(token, date)
      }
    }
  }

  registerForPushNotificationsAsync = async () => {
    const { status: existingStatus } = await Permissions.getAsync(
      Permissions.NOTIFICATIONS,
    )
    let finalStatus = existingStatus

    // only ask if permissions have not already been determined, because
    // iOS won't necessarily prompt the user a second time.
    if (existingStatus !== `granted`) {
      // Android remote notification permissions are granted during the app
      // install, so this will only ask on iOS
      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS)
      finalStatus = status
    }

    // Stop here if the user did not grant permissions
    if (finalStatus !== `granted`) {
      return
    }

    // Get the token that uniquely identifies this device
    const pushToken = await Notifications.getExpoPushTokenAsync()
    const { user: { token } } = this.props
    try {
      const res = await fetch(`${ASSISTANT_API_URL}/notifications/register`, {
        body: JSON.stringify({ token: pushToken }),
        headers: {
          Accept: `application/json`,
          Authorization: `Bearer ${token}`,
          "Content-Type": `application/json`,
        },
        method: `POST`,
      })
      console.log(await res.text())
    } catch (error) {
      console.log(error.message)
      this.setState({ error: error.message })
    }
  }

  loginCheck = (props) => {
    const { user, navigation } = props
    if (Object.keys(user).length > 0 && user.scopeNumber < 0) {
      const resetAction = StackActions.reset({
        actions: [NavigationActions.navigate({ routeName: `Splash` })],
        index: 0,
      })
      navigation.dispatch(resetAction)
      return false
    }
    return true
  }

  render() {
    const {
      user,
      timetable,
      isFetchingTimetable,
      navigation,
    } = this.props
    const { navigate } = navigation
    const { scopeNumber } = user
    const { date, error } = this.state
    const dateString = date.format(`ddd, Do MMMM`)
    return (
      <Page
        refreshing={isFetchingTimetable}
        onRefresh={() => this.onDateChanged(date, true)}
        refreshEnabled
        mainTabPage
        contentContainerStyle={styles.page}
      >
        {scopeNumber < 0 && (
          <View>
            <BodyText>You are not signed in.</BodyText>
            <Button onPress={() => navigate(`Splash`)}>Sign In</Button>
          </View>
        )}
        {error && error !== `` ? (
          <View>
            <ErrorText>{error}</ErrorText>
          </View>
        ) : null}
        <View style={styles.currentDate}>
          <TitleText>{dateString}</TitleText>
        </View>
        <DateControls date={date} onDateChanged={(d) => this.onDateChanged(d)} />
        <TimetableComponent
          timetable={timetable}
          date={date}
          isLoading={isFetchingTimetable}
          navigation={navigation}
          changeDate={this.onDateChanged}
        />
        {!date.isSame(moment().startOf(`day`)) && (
          <Button onPress={() => this.onDateChanged(moment())} style={styles.jumpToToday}>
            Jump To Today
          </Button>
        )}

        {/* <SubtitleText>Find A Timetable</SubtitleText>
        <TextInput placeholder="Search for a course or module..." /> */}
      </Page>
    )
  }
}

export default connect(
  TimetableScreen.mapStateToProps,
  TimetableScreen.mapDispatchToProps,
)(TimetableScreen)
