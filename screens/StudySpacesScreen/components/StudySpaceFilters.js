import React from 'react'
import { View, StyleSheet } from 'react-native'
import PropTypes from "prop-types"
import { SearchInput } from '../../../components/Input'
import { LightButton } from '../../../components/Button'
import { Horizontal } from '../../../components/Containers'

const styles = StyleSheet.create({
  container: {},
})

class StudySpaceFilters extends React.Component {
  static propTypes = {
    query: PropTypes.string,
    onChangeQuery: PropTypes.func.isRequired,
  }

  static defaultProps = {
    query: ``,
  }

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
        <Horizontal>
          <LightButton>Name</LightButton>
          <LightButton>Vacancies</LightButton>
        </Horizontal>
      </View>
    )
  }
}

export default StudySpaceFilters
