import React from "react"
import PropTypes from "prop-types"
import {
  ViewPropTypes, FlatList, View, StyleSheet,
} from "react-native"
import { momentObj } from "react-moment-proptypes"

import { BodyText } from "../../../components/Typography"
import StudySpaceResult from "./StudySpaceResult"

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
  flatList: {
    paddingTop: 10,
  },
})

const FavouriteStudySpaces = ({
  favouriteSpaces,
  navigation,
  style,
  lastUpdated,
}) => (
    <View style={[styles.container, style]}>
      <BodyText>{`Last updated: ${lastUpdated}`}</BodyText>
      <FlatList
        contentContainerStyle={styles.flatList}
        data={favouriteSpaces}
        keyExtractor={(item) => `${item.id}`}
        renderItem={({ item }) => (
          <StudySpaceResult navigation={navigation} id={item.id} />
        )}
      />
    </View>
)

FavouriteStudySpaces.propTypes = {
  favouriteSpaces: PropTypes.arrayOf(PropTypes.shape()),
  navigation: PropTypes.shape(),
  style: ViewPropTypes.style,
  lastUpdated: PropTypes.oneOfType([momentObj, PropTypes.string]),
}

FavouriteStudySpaces.defaultProps = {
  favouriteSpaces: [],
  navigation: { navigate: () => { } },
  style: {},
  lastUpdated: null,
}

export default FavouriteStudySpaces
