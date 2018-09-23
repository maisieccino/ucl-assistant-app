import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { FlatList } from "react-native";
import { connect } from "react-redux";
import { CentredText, SubtitleText } from "../../components/Typography";
import StudySpaceResult from "./StudySpaceResult";

const FavouriteStudySpaces = ({ favourites, studyspaces, navigation }) => {
  const spaces = studyspaces.filter(space => favourites.includes(space.id));
  return (
    <Fragment>
      <SubtitleText>Your Favourites</SubtitleText>
      {spaces.length > 0 ? (
        <FlatList
          data={spaces}
          keyExtractor={item => `${item.id}`}
          renderItem={({ item }) => (
            <StudySpaceResult navigation={navigation} id={item.id} />
          )}
        />
      ) : (
        <CentredText>
          You currently have no favourites study spaces. Use the heart button to
          add favourites!
        </CentredText>
      )}
    </Fragment>
  );
};

FavouriteStudySpaces.propTypes = {
  favourites: PropTypes.arrayOf(PropTypes.number),
  studyspaces: PropTypes.arrayOf(PropTypes.shape()),
  navigation: PropTypes.shape(),
};

FavouriteStudySpaces.defaultProps = {
  favourites: [],
  studyspaces: [],
  navigation: { navigate: () => {} },
};

const mapStateToProps = state => ({
  favourites: state.studyspaces.favourites,
  studyspaces: state.studyspaces.studyspaces,
});

export default connect(mapStateToProps)(FavouriteStudySpaces);
