import React from "react";
import PropTypes from "prop-types";
import { FlatList, View, StyleSheet } from "react-native";
import { connect } from "react-redux";
import { CentredText, SubtitleText } from "../../components/Typography";
import StudySpaceResult from "./StudySpaceResult";

const styles = StyleSheet.create({
  flatList: {
    paddingTop: 10,
  },
});

const FavouriteStudySpaces = ({
  favourites,
  studyspaces,
  navigation,
  style,
}) => {
  const spaces = studyspaces.filter(space => favourites.includes(space.id));
  return (
    <View style={style}>
      <SubtitleText>Your Favourites</SubtitleText>
      {spaces.length > 0 ? (
        <FlatList
          contentContainerStyle={styles.flatList}
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
    </View>
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
