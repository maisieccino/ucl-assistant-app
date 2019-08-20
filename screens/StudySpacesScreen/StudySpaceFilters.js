import React from 'react'
import { View, StyleSheet } from 'react-native'
import PropTypes from "prop-types"
import { TextInput } from '../../components/Input'

const styles = StyleSheet.create({
  container: {},
  textInput: {},
})

class StudySpaceFilters extends React.Component {
  static propTypes = {
    query: PropTypes.string,
  }

  static defaultProps = {
    query: ``,
  }

  render() {
    const { query } = this.props
    return (
      <View style={styles.container}>
        <TextInput
          placeholder="Search"
          onChangeText={text => this.onQueryChange(text)}
          value={query}
          clearButtonMode="always"
          style={styles.textInput}
        />
      </View>
    )
  }
}

export default StudySpaceFilters
