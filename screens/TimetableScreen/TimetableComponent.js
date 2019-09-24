import moment from "moment"
import PropTypes from "prop-types"
import React from "react"
import { momentObj } from "react-moment-proptypes"
import {
  Dimensions,
  Image,
  View,
} from "react-native"
import { generate } from "shortid"

import TimetableCard from "../../components/Card/TimetableCard"
import { CentredText, SubtitleText } from "../../components/Typography"
import { AssetManager, Random } from "../../lib"
import Styles from "../../styles/Containers"
import InfiniteHorizontalFlatlist from './InfiniteHorizontalFlatlist'

const relaxIllustration = Random.array([
  AssetManager.undraw.relaxation,
  AssetManager.undraw.chilling,
  AssetManager.undraw.playfulCat,
  AssetManager.undraw.dogWalking,
  AssetManager.undraw.relaxingAtHome,
])

const timetableImageStyle = { height: 200, marginTop: 5 }
const topPadding = { height: 50 }
const { width: windowWidth } = Dimensions.get(`window`)

class TimetableComponent extends React.Component {
  static propTypes = {
    changeDate: PropTypes.func,
    date: momentObj,
    isLoading: PropTypes.bool,
    navigation: PropTypes.shape().isRequired,
    timetable: PropTypes.shape(),
  }

  static defaultProps = {
    changeDate: () => { },
    date: moment(),
    isLoading: false,
    timetable: {},
  }

  renderTimetableCard = (item) => {
    const { date, navigation } = this.props
    const dateISO = date.format(`YYYY-MM-DD`)
    const past = Date.parse(`${dateISO}T${item.end_time}`) - Date.now() < 0
    return (
      <TimetableCard
        moduleName={item.module.name}
        moduleCode={item.module.module_id}
        startTime={`${dateISO} ${item.start_time}`}
        endTime={`${dateISO} ${item.end_time}`}
        location={item.location.name || `TBA`}
        lecturer={item.contact ? item.contact : `Unknown Lecturer`}
        pastEvent={past}
        key={generate()}
        navigation={navigation}
      />
    )
  }

  renderItem = ({ index }) => {
    const { date, timetable } = this.props
    const dateISO = date.clone().add(index - 1, `days`).format(`YYYY-MM-DD`)
    const filteredTimetable = (timetable[dateISO] || {}).timetable || []

    const items = filteredTimetable.sort(
      (a, b) => Date.parse(`${dateISO}T${a.start_time}:00`)
        - Date.parse(`${dateISO}T${b.start_time}:00`),
    )
    const pastItems = items.filter(
      (item) => Date.parse(`${dateISO}T${item.end_time}`) - Date.now() < 0,
    )
    const futureItems = items.filter(
      (item) => Date.parse(`${dateISO}T${item.end_time}`) - Date.now() > 0,
    )
    if (filteredTimetable.length > 0) {
      return (
        <View style={{ width: windowWidth }}>
          {futureItems.map(this.renderTimetableCard)}
          {pastItems.length > 0 && (
            <>
              <SubtitleText>Past Events</SubtitleText>
              {pastItems.map(this.renderTimetableCard)}
            </>
          )}
        </View>
      )
    }

    return (
      <View style={{ width: windowWidth }}>
        <View style={topPadding} />
        <CentredText>
          Nothing scheduled on&nbsp;
          {date.format(`dddd`)}
          . Take it easy!
        </CentredText>
        <Image
          source={relaxIllustration}
          resizeMethod="scale"
          style={[Styles.image, timetableImageStyle]}
          resizeMode="contain"
        />
      </View>
    )
  }

  render() {
    const {
      timetable,
      date,
      isLoading,
      changeDate,
    } = this.props

    const dateISO = date.format(`YYYY-MM-DD`)
    const filteredTimetable = (timetable[dateISO] || {}).timetable || []

    if (isLoading && filteredTimetable.length === 0) {
      return (
        <View>
          <CentredText>Loading timetable...</CentredText>
        </View>
      )
    }

    return (
      <InfiniteHorizontalFlatlist
        renderItem={this.renderItem}
        onScrollBack={() => changeDate(date.clone().subtract(1, `day`))}
        onScrollForward={() => changeDate(date.clone().add(1, `day`))}
      />
    )
  }
}

export default TimetableComponent
