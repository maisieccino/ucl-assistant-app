import React from 'react'
import { FlatList, StyleSheet } from 'react-native'
import { generate } from "shortid"
import PropTypes from "prop-types"
import { momentObj } from "react-moment-proptypes"
import memoize from "memoize-one"
import {
  BodyText,
  ErrorText,
  SubtitleText,
} from "../../components/Typography"
import StudySpaceSearchResult from "./components/StudySpaceResult"
import StudySpaceFilters from './components/StudySpaceFilters'

const styles = StyleSheet.create({
  flatList: {
    paddingVertical: 20,
  },
})

class StudySpacesList extends React.Component {
  static propTypes = {
    navigation: PropTypes.shape().isRequired,
    studyspaces: PropTypes.arrayOf(PropTypes.shape()),
    setQuery: PropTypes.func,
    searchQuery: PropTypes.string,
    lastUpdated: PropTypes.oneOfType([momentObj, PropTypes.string]),
  }

  static defaultProps = {
    studyspaces: [],
    lastUpdated: null,
    setQuery: () => { },
    searchQuery: ``,
  }

  static findErrorneousSpaces = (spaces) => spaces.filter(
    (space) => typeof space.fetchSeatInfoError === `string`
      && space.fetchSeatInfoError !== ``,
  )

  memoizeErrorneousSpaces = memoize(StudySpacesList.findErrorneousSpaces)

  render() {
    const {
      navigation,
      studyspaces,
      setQuery,
      searchQuery,
      lastUpdated,
    } = this.props
    const errorneousSpaces = this.memoizeErrorneousSpaces(studyspaces)
    return (
      <>
        <SubtitleText>All Study Spaces</SubtitleText>
        {errorneousSpaces.length < 5 ? (
          errorneousSpaces.map((space) => (
            <ErrorText key={generate()}>
              Error fetching
              {` `}
              {` `}
              {` `}
              {space.name}
              {` `}
              {` `}
              {` `}
              {space.fetchSeatInfoError}
            </ErrorText>
          ))
        ) : (
            <ErrorText>Looks like there was an error trying to fetch live seating info.</ErrorText>
        )}

        <StudySpaceFilters
          query={searchQuery}
          onChangeQuery={setQuery}
        />

        <BodyText>
          Last updated:
          {` `}
          {lastUpdated}
        </BodyText>

        <FlatList
          data={studyspaces}
          contentContainerStyle={styles.flatList}
          keyExtractor={(item) => `${item.id}`}
          initialNumToRender={30}
          renderItem={({ item }) => (
            <StudySpaceSearchResult navigation={navigation} id={item.id} />
          )}
        />
      </>
    )
  }
}

export default StudySpacesList
