import React, { Component } from "react"
import { Image, StyleSheet } from 'react-native'
import { connect } from "react-redux"
import PropTypes from "prop-types"
import { Feather } from "@expo/vector-icons"
import { TitleText } from "../../components/Typography"
import { Page } from "../../components/Containers"
import Colors from "../../constants/Colors"
import { AssetManager } from "../../lib"
import Styles from "../../styles/Containers"

import SearchControl from "./SearchControl"
import RecentResults from "./RecentResults"

const styles = StyleSheet.create({
  emptyImage: {
    height: 200,
    marginTop: 25,
  },
})

class PeopleScreen extends Component {
  static navigationOptions = {
    header: null,
    tabBarIcon: ({ focused }) => (
      <Feather
        name="users"
        size={28}
        color={focused ? Colors.pageBackground : Colors.textColor}
      />
    ),
  }

  static propTypes = {
    recents: PropTypes.arrayOf(PropTypes.shape()),
    navigation: PropTypes.shape().isRequired,
    isSearching: PropTypes.bool,
    searchResults: PropTypes.arrayOf(PropTypes.shape()),
  }

  static defaultProps = {
    recents: [],
    isSearching: false,
    searchResults: false,
  }

  static mapStateToProps = (state) => ({
    recents: state.people.recents,
    searchResults: state.people.searchResults,
    isSearching: state.people.isSearching,
  })

  render() {
    const {
      navigation,
      recents,
      isSearching,
      searchResults,
    } = this.props
    return (
      <Page mainTabPage>
        <TitleText>People</TitleText>
        <SearchControl navigation={navigation} />
        <RecentResults navigation={navigation} />
        {
          (
            recents.length === 0
            && searchResults.length === 0
            && !isSearching
          ) ? (
              <Image
                source={AssetManager.undraw.peopleSearch}
                resizeMethod="scale"
                style={[Styles.image, styles.emptyImage]}
                resizeMode="contain"
              />
            ) : null
        }
      </Page>
    )
  }
}

export default connect(
  PeopleScreen.mapStateToProps,
  () => ({})
)(PeopleScreen)
