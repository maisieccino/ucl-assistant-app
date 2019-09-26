/* eslint class-methods-use-this: 0 */
import { Feather } from "@expo/vector-icons"
import moment from "moment"
import PropTypes from "prop-types"
import React, { Component } from "react"
import { View } from "react-native"
import { NavigationActions, StackActions } from "react-navigation"
import { connect } from "react-redux"

import { fetchTimetable as fetchTimetableAction } from "../../actions/timetableActions"
import Button from "../../components/Button"
import { Page } from "../../components/Containers"
import { BodyText, ErrorText, TitleText } from "../../components/Typography"
import Colors from "../../constants/Colors"
import { TIMETABLE_CACHE_TIME_HOURS } from "../../constants/timetableConstants"
import DateControls from "./DateControls"
import TimetableComponent from "./TimetableComponent"

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
    /* eslint-disable react/no-unused-prop-types */
    navigation: PropTypes.shape().isRequired,
    /* eslint-enable react/no-unused-prop-types */
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
  }

  async onDateChanged(newDate, forceUpdate = false) {
    const newDay = newDate.startOf(`day`)
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

  loginCheck(props) {
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
        <TitleText>{dateString}</TitleText>
        <DateControls date={date} onDateChanged={(d) => this.onDateChanged(d)} />
        <TimetableComponent
          timetable={timetable}
          date={date}
          isLoading={isFetchingTimetable}
          navigation={navigation}
        />
        {!date.isSame(moment().startOf(`day`)) && (
          <Button onPress={() => this.onDateChanged(moment())}>
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
