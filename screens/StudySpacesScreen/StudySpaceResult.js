import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { generate } from "shortid";
import SearchResult from "../../components/SearchResult";
import Colors from "../../constants/Colors";

const StudySpaceResult = ({
  name,
  onPress,
  occupied,
  capacity,
  fetchingSeatInfo,
}) => {
  const occupation = occupied / capacity;
  let capacityString = "Unable to get data";
  let indicatorColor = Colors.textInputBackground;
  if (capacity > 0) {
    switch (true) {
      case occupation > 0.9:
        capacityString = "Very busy right now";
        indicatorColor = Colors.indicatorRed;
        break;
      case occupation > 0.65:
        capacityString = "Quite busy right now";
        indicatorColor = Colors.indicatorOrange;
        break;
      case occupation > 0.5:
        capacityString = "A little busy right now";
        indicatorColor = Colors.indicatorYellow;
        break;
      case occupation > 0.2:
        capacityString = "Rather quiet right now";
        indicatorColor = Colors.indicatorLime;
        break;
      default:
        capacityString = "Very quiet right now";
        indicatorColor = Colors.indicatorGreen;
    }
  }
  return (
    <SearchResult
      key={generate()}
      topText={name}
      bottomText={capacityString}
      type="location"
      buttonText="View"
      indicator
      indicatorLoading={fetchingSeatInfo}
      indicatorColor={indicatorColor}
      onPress={onPress}
    />
  );
};

StudySpaceResult.propTypes = {
  onPress: PropTypes.func,
  name: PropTypes.string,
  occupied: PropTypes.number,
  capacity: PropTypes.number,
  fetchingSeatInfo: PropTypes.bool,
};

StudySpaceResult.defaultProps = {
  onPress: () => {},
  name: "Study Space Name",
  occupied: 0,
  capacity: 0,
  fetchingSeatInfo: false,
};

const ConnectedStudySpaceResult = ({ id, studyspaces, navigation }) => {
  const space = studyspaces.filter(x => x.id === id)[0];
  return (
    <StudySpaceResult
      {...space}
      onPress={() =>
        navigation.navigate("StudySpaceDetail", {
          id: space.id,
          name: space.name,
          occupied: space.occupied,
          capacity: space.capacity,
        })
      }
    />
  );
};

ConnectedStudySpaceResult.propTypes = {
  id: PropTypes.number.isRequired,
  studyspaces: PropTypes.arrayOf(PropTypes.shape()),
  navigation: PropTypes.shape().isRequired,
};

ConnectedStudySpaceResult.defaultProps = {
  studyspaces: [],
};

ConnectedStudySpaceResult.mapStateToProps = state => ({
  studyspaces: state.studyspaces.studyspaces,
});

export default connect(ConnectedStudySpaceResult.mapStateToProps)(
  ConnectedStudySpaceResult,
);
