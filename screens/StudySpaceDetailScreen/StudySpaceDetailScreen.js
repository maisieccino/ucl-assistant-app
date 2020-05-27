// @flow
import PropTypes from "prop-types"
import React, { Component } from "react"
import { StyleSheet, View } from "react-native"
import { connect } from "react-redux"

import {
  fetchAverages as fetchAveragesAction,
} from "../../actions/studyspacesActions"
import Button from "../../components/Button"
import { Horizontal, Page } from "../../components/Containers"
import LiveIndicator from "../../components/LiveIndicator"
import {
  BodyText,
  InfoText,
  Link,
  SubtitleText,
  TitleText,
} from "../../components/Typography"
import Colors from "../../constants/Colors"
import { LocalisationManager, MapsManager, Shadow } from "../../lib"
import CapacityChart from "./CapacityChart"
// import OpeningHours from "./OpeningHours";
import FavouriteButton from "./FavouriteButton"
import LiveSeatingMapList from "./LiveSeatingMapList"

const busyText = (
  time = 0,
  data = Array.from(Array(24)).map(() => 0),
  occupied = 0,
  capacity = 1,
) => {
  const diff = data[time] - occupied
  const threshold = capacity > 100 ? 0.1 : 0.05
  if (occupied === 0) {
    return `empty`
  }
  if (Math.abs(diff) / capacity < threshold) {
    return `as busy as normal`
  }
  if (diff > 0) {
    return `quieter than usual`
  }
  return `busier than usual`
}

const styles = StyleSheet.create({
  capacityTextStyle: {
    marginBottom: 0,
    marginTop: 5,
  },
  cardHeader: {
    backgroundColor: Colors.cardHeader,
    borderRadius: 10,
    color: Colors.cardBackground,
    marginBottom: 5,
    padding: 20,
    ...Shadow(2),
  },
  cardList: {
    backgroundColor: Colors.cardBackground,
    borderRadius: 10,
    flexDirection: `row`,
    flexWrap: `wrap`,
    marginTop: 5,
    padding: 20,
    ...Shadow(2),
  },
  container: {
    flex: 1,
  },
  facilities: {
    marginBottom: 20,
    marginTop: 10,
  },
  liveIndicator: {
    marginRight: 10,
  },
  liveIndicatorContainer: {
    justifyContent: `flex-start`,
    paddingRight: 40,
  },
  occupancySection: {
    flex: 1,
  },
  padder: {
    height: 80,
  },
  popularTimes: {
    marginTop: 10,
  },
  timezoneInfo: {
    marginBottom: 10,
    marginTop: -10,
  },
})

const hasCoordinates = (coordinates) => (
  coordinates && coordinates.lat && coordinates.lng
  && coordinates.lat.length > 0
  && coordinates.lng.length > 0
)

const hasAddress = (address) => (
  address && Array.isArray(address) && address.length > 0
  && !address.every((part) => part.length === 0)
)

class StudySpaceDetailScreen extends Component {
  static navigationOptions = {
    title: `Study Space Detail`,
  }

  static mapStateToProps = (state) => ({
    studyspaces: state.studyspaces.studyspaces,
    token: state.user.token,
  })

  static mapDispatchToProps = (dispatch) => ({
    fetchAverages: (token, id) => dispatch(fetchAveragesAction(token, id)),
  })

  static propTypes = {
    fetchAverages: PropTypes.func.isRequired,
    /* eslint-disable react/no-unused-prop-types */
    navigation: PropTypes.shape().isRequired,
    route: PropTypes.shape().isRequired,
    /* eslint-enable react/no-unused-prop-types */
    studyspaces: PropTypes.arrayOf(PropTypes.shape()),
    token: PropTypes.string,
  }

  static defaultProps = {
    studyspaces: [],
    token: ``,
  }

  static getDerivedStateFromProps(props, state) {
    if (props.studyspaces && props.studyspaces.length > 0) {
      const space = props.studyspaces.filter((s) => s.id === state.id)[0]
      return { data: space.dailyAverages, space }
    }
    return null
  }

  constructor(props) {
    super(props)
    const { route } = this.props
    const {
      id, name, occupied, total,
    } = route.params
    this.state = {
      data: Array.from(Array(24)).map(() => 0),
      fetchingData: false,
      id,
      name,
      occupied,
      space: {
        isFetchingAverages: false,
      },
      total,
    }
  }

  componentDidMount() {
    const { fetchingData, id } = this.state
    const { token, fetchAverages } = this.props
    if (!fetchingData && token.length > 0) {
      fetchAverages(token, id)
      setTimeout(() => this.setState({ fetchingData: true }), 100)
    }
  }

  navigateToLiveSeatMap = () => {
    const { navigation } = this.props
    const { space } = this.state
    navigation.navigate(`LiveSeatingMap`, { space })
  }

  navigateToLocation = () => {
    const { space: { location } } = this.state
    const { coordinates, address } = location
    if (hasCoordinates(coordinates)) {
      const { lat, lng } = coordinates
      MapsManager.navigateToCoords({ lat, lng })
    } else {
      MapsManager.navigateToAddress(address.join())
    }
  }

  render() {
    const { navigation } = this.props
    const {
      id, name, data, total, occupied, space,
    } = this.state
    const { isFetchingAverages, maps } = space
    const hour = parseInt(
      LocalisationManager.getMoment()
        .format(`HH`),
      10,
    )

    const londonTimeOffset = LocalisationManager.getMoment()
      .utcOffset()
    const localTimeOffset = LocalisationManager.local.getMoment()
      .utcOffset()
    const hoursDifference = (localTimeOffset - londonTimeOffset) / 60
    const timezoneInfo = londonTimeOffset !== localTimeOffset ? (
      <InfoText containerStyle={styles.timezoneInfo}>
        Using London time (
        {hoursDifference > 0
          ? `${hoursDifference}h behind`
          : `${Math.abs(hoursDifference)}h ahead`}
        ).
      </InfoText>
    ) : null

    const { location: { coordinates, address } } = space
    const canNavigateTo = (hasCoordinates(coordinates) && hasAddress(address))

    return (
      <View style={styles.container}>
        <Page>
          <TitleText>{name}</TitleText>
          <Horizontal>
            <View style={styles.occupancySection}>
              <TitleText style={styles.capacityTextStyle}>
                {total - occupied}
              </TitleText>
              <BodyText>Seats Available</BodyText>
            </View>
            <View style={styles.occupancySection}>
              <TitleText style={styles.capacityTextStyle}>
                {occupied}
              </TitleText>
              <BodyText>Seats Occupied</BodyText>
            </View>
          </Horizontal>
          <View style={styles.popularTimes}>
            <SubtitleText>Popular Times</SubtitleText>
            <CapacityChart
              id={id}
              data={data}
              occupied={occupied}
              capacity={total}
              isLoading={isFetchingAverages}
            />
          </View>
          {timezoneInfo}
          <Horizontal style={styles.liveIndicatorContainer}>
            <LiveIndicator style={styles.liveIndicator} />
            <BodyText>
              {LocalisationManager.getMoment()
                .format(`h:mma`)}
              {` - `}
              {busyText(hour, data, occupied, total)}
            </BodyText>
          </Horizontal>
          <LiveSeatingMapList
            style={styles.liveSeatingMapList}
            maps={maps}
            surveyId={id}
            navigation={navigation}
          />
          {/* <SubtitleText>Opening Hours</SubtitleText>
          <OpeningHours /> */}
          <View style={styles.facilities}>
            <SubtitleText style={styles.cardHeader}>Facilities</SubtitleText>
            <View style={styles.cardList}>
              <BodyText>
                See the
              </BodyText>
              <Link href="https://www.ucl.ac.uk/library/opening-hours">
                &nbsp;libraries website&nbsp;
              </Link>
              <BodyText>
                for more information about what facilities are offered.
              </BodyText>
            </View>
          </View>
          {
            canNavigateTo ? (
              <Button onPress={this.navigateToLocation}>
                Directions
              </Button>
            ) : null
          }
          <View style={styles.padder} />
        </Page>
        <FavouriteButton id={id} />
      </View>
    )
  }
}

export default connect(
  StudySpaceDetailScreen.mapStateToProps,
  StudySpaceDetailScreen.mapDispatchToProps,
)(StudySpaceDetailScreen)
