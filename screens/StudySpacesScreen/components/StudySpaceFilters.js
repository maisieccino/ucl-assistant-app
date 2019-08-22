import React from 'react'
import { View, StyleSheet } from 'react-native'
import PropTypes from "prop-types"
import { SearchInput } from '../../../components/Input'

const styles = StyleSheet.create({
  container: {},
})

// eslint-disable-next-line react/prefer-stateless-function
class StudySpaceFilters extends React.Component {
  static propTypes = {
    query: PropTypes.string,
    onChangeQuery: PropTypes.func.isRequired,
  }

  static defaultProps = {
    query: ``,
  }

  // getMatchingStudySpaces = () => {
  //   const { studyspaces } = this.props
  //   studyspaces.sort((s1, s2) => s1.name.localeCompare(s2.name))
  // }

  clearQuery = () => {
    const { onChangeQuery } = this.props
    onChangeQuery(``)
  }

  render() {
    const { query, onChangeQuery } = this.props
    return (
      <View style={styles.container}>
        <SearchInput
          placeholder="Search"
          onChangeQuery={onChangeQuery}
          query={query}
          clear={this.clearQuery}
        />
      </View>
    )
  }
}

export default StudySpaceFilters
