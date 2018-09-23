import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { Feather } from "@expo/vector-icons";
import moment from "moment";
import Card from "./";
import { BodyText } from "../Typography";

const TimetableCard = ({
  moduleName,
  moduleCode,
  startTime,
  endTime,
  location,
  lecturer,
  navigation,
  pastEvent,
}) => {
  const start = moment(startTime).format("HH:mma");
  const end = moment(endTime).format("HH:mma");
  return (
    <Card
      old={pastEvent}
      title={moduleCode}
      onPress={() => {
        console.log("Attempting to navigate...");
        navigation.navigate("TimetableDetail", {
          date: moment(startTime).format("YYYY-MM-DD"),
          time: moment(startTime).format("HH:mm"),
          module: moduleName,
          code: moduleCode,
        });
      }}
    >
      <BodyText>{moduleName}</BodyText>
      <BodyText>
        <Feather name="clock" /> {start} - {end}
      </BodyText>
      {!pastEvent && (
        <Fragment>
          <BodyText>
            <Feather name="map-pin" /> {location}
          </BodyText>
          <BodyText>
            <Feather name="user" />{" "}
            {lecturer === "unknown" ? "Unknown Lecturer" : lecturer}
          </BodyText>
        </Fragment>
      )}
    </Card>
  );
};

TimetableCard.propTypes = {
  moduleName: PropTypes.string,
  moduleCode: PropTypes.string,
  pastEvent: PropTypes.bool,
  startTime: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  endTime: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  location: PropTypes.string,
  lecturer: PropTypes.string,
  navigation: PropTypes.shape().isRequired,
};

TimetableCard.defaultProps = {
  moduleName: "",
  moduleCode: "ABCD123D",
  pastEvent: false,
  startTime: moment().toISOString(),
  endTime: moment().toISOString(),
  location: "TBC",
  lecturer: "Unknown Lecturer",
};

export default TimetableCard;
