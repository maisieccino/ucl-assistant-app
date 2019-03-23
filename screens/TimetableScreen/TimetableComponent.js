import React, { Fragment } from "react";
import { Image, View } from "react-native";
import PropTypes from "prop-types";
import { momentObj } from "react-moment-proptypes";
import moment from "moment";
import { generate } from "shortid";
import TimetableCard from "../../components/Card/TimetableCard";
import { CentredText, SubtitleText } from "../../components/Typography";
import Styles from "../../styles/Containers";

const mapToCards = (timetableItems, date, navigation, past = false) =>
  timetableItems.map(item => (
    <TimetableCard
      moduleName={item.module.name}
      moduleCode={item.module.module_id}
      startTime={`${date} ${item.start_time}`}
      endTime={`${date} ${item.end_time}`}
      location={item.location.name || "TBA"}
      lecturer={item.contact ? item.contact : "Unknown Lecturer"}
      pastEvent={past}
      key={generate()}
      navigation={navigation}
    />
  ));

const timetableImageStyle = { marginTop: 5, height: 200 };
const topPadding = { height: 50 };

const TimetableComponent = ({ timetable, date, isLoading, navigation }) => {
  const dateISO = date.format("YYYY-MM-DD");
  const filteredTimetable = (timetable[dateISO] || {}).timetable || [];

  if (isLoading && filteredTimetable.length === 0) {
    return (
      <View>
        <CentredText>Loading timetable...</CentredText>
      </View>
    );
  }

  const items = filteredTimetable.sort(
    (a, b) =>
      Date.parse(`${dateISO}T${a.start_time}:00`) -
      Date.parse(`${dateISO}T${b.start_time}:00`),
  );
  const pastItems = mapToCards(
    items.filter(
      item => Date.parse(`${dateISO}T${item.end_time}`) - Date.now() < 0,
    ),
    dateISO,
    navigation,
    true,
  );
  const futureItems = mapToCards(
    items.filter(
      item => Date.parse(`${dateISO}T${item.end_time}`) - Date.now() > 0,
    ),
    dateISO,
    navigation,
  );
  if (filteredTimetable.length > 0) {
    return (
      <View>
        {futureItems}
        {pastItems.length > 0 && (
          <Fragment>
            <SubtitleText>Past Events</SubtitleText>
            {pastItems}
          </Fragment>
        )}
      </View>
    );
  }
  return (
    <View>
      <View style={topPadding} />
      <CentredText>
        Nothing scheduled on {date.format("dddd")}. Take it easy!
      </CentredText>
      <Image
        source={require("../../assets/images/undraw_relaxation.png")}
        resizeMethod="scale"
        style={[Styles.image, timetableImageStyle]}
        resizeMode="contain"
      />
    </View>
  );
};

TimetableComponent.propTypes = {
  timetable: PropTypes.shape(),
  date: momentObj,
  isLoading: PropTypes.bool,
  navigation: PropTypes.shape().isRequired,
};

TimetableComponent.defaultProps = {
  timetable: {},
  date: moment(),
  isLoading: false,
};

export default TimetableComponent;
