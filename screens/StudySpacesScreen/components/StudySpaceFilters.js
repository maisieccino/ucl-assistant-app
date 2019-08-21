import React from 'react'
import { View, StyleSheet } from 'react-native'
import PropTypes from "prop-types"
import { TextInput } from '../../../components/Input'

const styles = StyleSheet.create({
  container: {},
  textInput: {},
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

  render() {
    // generic searchfield component?
    const { query, onChangeQuery } = this.props
    return (
      <View style={styles.container}>
        <TextInput
          placeholder="Search"
          onChangeText={onChangeQuery}
          value={query}
          clearButtonMode="always"
          style={styles.textInput}
        />
      </View>
    )
  }
}

export default StudySpaceFilters
