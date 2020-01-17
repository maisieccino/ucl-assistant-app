import PropTypes from "prop-types"
import React from 'react'
import { StyleSheet, View } from 'react-native'

import { LightButton } from '../../../components/Button'
import { Horizontal } from '../../../components/Containers'
import { SearchInput } from '../../../components/Input'
import { WORKSPACES_SORT_TYPES } from '../../../constants/studyspacesConstants'

const styles = StyleSheet.create({
  container: {},
  sortToggle: {
    marginRight: 20,
  },
  sortTogglesContainer: {
    justifyContent: `flex-start`,
    marginBottom: 10,
    marginTop: 10,
  },
})

class StudySpaceFilters extends React.Component {
  static propTypes = {
    onChangeQuery: PropTypes.func.isRequired,
    query: PropTypes.string,
    sortType: PropTypes.string.isRequired,
    updateSortType: PropTypes.func.isRequired,
  }

  static defaultProps = {
    query: ``,
  }

  clearQuery = () => {
    const { onChangeQuery } = this.props
    onChangeQuery(``)
  }

  sortByName = () => {
    const { updateSortType } = this.props
    return updateSortType(WORKSPACES_SORT_TYPES.NAME)
  }

  sortByVacancies = () => {
    const { updateSortType } = this.props
    return updateSortType(WORKSPACES_SORT_TYPES.VACANCIES)
  }

  render() {
    const { query, onChangeQuery, sortType } = this.props
    return (
      <View style={styles.container}>
        <SearchInput
          placeholder="Search"
          onChangeQuery={onChangeQuery}
          query={query}
          clear={this.clearQuery}
        />
        <Horizontal style={styles.sortTogglesContainer}>
          <LightButton
            active={sortType === WORKSPACES_SORT_TYPES.NAME}
            onPress={this.sortByName}
            style={styles.sortToggle}
          >
            Name
          </LightButton>
          <LightButton
            active={sortType === WORKSPACES_SORT_TYPES.VACANCIES}
            onPress={this.sortByVacancies}
            style={styles.sortToggle}
          >
            Vacancies
          </LightButton>
        </Horizontal>
      </View>
    )
  }
}

export default StudySpaceFilters
