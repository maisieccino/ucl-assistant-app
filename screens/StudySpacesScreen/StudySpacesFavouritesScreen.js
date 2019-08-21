// @flow
import { Feather } from "@expo/vector-icons"
import moment from "moment"
import PropTypes from "prop-types"
import React, { Component } from "react"
import { momentObj } from "react-moment-proptypes"
import { View, StyleSheet } from "react-native"
import { connect } from "react-redux"
import { fetchSeatInfos, setSearchQuery } from "../../actions/studyspacesActions"
import { Page } from "../../components/Containers"
import Button from "../../components/Button"
import Colors from "../../constants/Colors"
import FavouriteStudySpaces from "./components/FavouriteStudySpaces"
import StudySpacesList from "./StudySpacesListScreen"

const styles = StyleSheet.create({
  favourites: {
    paddingBottom: 20,
  },
  padder: {
    height: 20,
  },
})

const VIEWS = {
  default: `default`,
  all: `all`,
}

class StudySpaceFavouritesScreen extends Component {
  static navigationOptions = {
    header: null,
    title: `Study Spaces`,
    tabBarIcon: ({ focused }) => (
      <Feather
        name="book"
        size={28}
        color={focused ? Colors.pageBackground : Colors.textColor}
      />
    ),
  }

  static propTypes = {
    navigation: PropTypes.shape().isRequired,
    studyspaces: PropTypes.arrayOf(PropTypes.shape()),
    token: PropTypes.string,
    fetchInfo: PropTypes.func,
    lastUpdated: PropTypes.oneOfType([momentObj, PropTypes.string]),
    favouriteSpaces: PropTypes.arrayOf(PropTypes.shape()),
    setQuery: PropTypes.func,
    searchQuery: PropTypes.string,
  }

  static defaultProps = {
    studyspaces: [],
    token: ``,
    fetchInfo: () => { },
    lastUpdated: null,
    favouriteSpaces: [],
    setQuery: () => { },
    searchQuery: ``,
  }

  static mapStateToProps = ({
    studyspaces: {
      studyspaces,
      lastStatusUpdate,
      searchQuery = ``,
      favourites,
    },
    user: {
      token,
    },
  }) => ({
    favouriteSpaces: studyspaces.filter((space) => favourites.includes(space.id)),
    studyspaces: studyspaces.filter((studyspace) => {
      if (searchQuery.length === 0) {
        return true
      }
      return studyspace.name.toLowerCase().includes(searchQuery.toLowerCase())
    }),
    lastUpdated: lastStatusUpdate,
    token,
    searchQuery,
  })

  static mapDispatchToProps = (dispatch) => ({
    fetchInfo: (ids, token) => dispatch(fetchSeatInfos(token, ids)),
    setQuery: (query: String) => dispatch(setSearchQuery(query)),
  })

  constructor(props) {
    super(props)
    this.state = {
      loadedSeatInfo: false,
      lastUpdated: `never`,
      currentView: VIEWS.default,
    }
    this.updateTextInterval = null
  }

  componentDidMount() {
    const { loadedSeatInfo } = this.state
    const { token } = this.props
    if (!loadedSeatInfo && token) {
      this.fetchSeatInfo()
    }
    this.updateTextInterval = setInterval(
      () => this.updateLastUpdatedText(),
      10000,
    )
  }

  componentDidUpdate(prevProps) {
    const { lastUpdated: currentUpdate } = this.props
    if (currentUpdate !== prevProps.lastUpdated) {
      this.updateLastUpdatedText()
    }
  }

  componentWillUnmount() {
    clearInterval(this.updateTextInterval)
  }

  updateLastUpdatedText = () => {
    const { lastUpdated } = this.props
    this.setState({
      lastUpdated: lastUpdated ? moment(lastUpdated).fromNow() : `never`,
    })
  }

  fetchSeatInfo = () => {
    this.setState({ loadedSeatInfo: true }, () => {
      const { studyspaces, fetchInfo, token } = this.props
      const ids = studyspaces.map((space) => space.id)
      setTimeout(() => fetchInfo(ids, token), 500)
    })
  }

  viewStudySpacesList = () => this.setState({ currentView: VIEWS.all })

  renderFavouriteStudySpaces = () => {
    const { lastUpdated } = this.state
    const { navigation, favouriteSpaces } = this.props
    return (
      <>
        <FavouriteStudySpaces
          lastUpdated={lastUpdated}
          favouriteSpaces={favouriteSpaces}
          navigation={navigation}
          style={styles.favourites}
        />
        <Button onPress={this.viewStudySpacesList}>View All</Button>
      </>
    )
  }

  renderStudySpacesList = () => {
    const { lastUpdated } = this.state
    const {
      navigation, studyspaces, setQuery, searchQuery,
    } = this.props
    return (
      <StudySpacesList
        navigation={navigation}
        studyspaces={studyspaces}
        setQuery={setQuery}
        searchQuery={searchQuery}
        lastUpdated={lastUpdated}
      />
    )
  }

  render() {
    const { loadedSeatInfo, currentView } = this.state
    const {
      studyspaces,
      favouriteSpaces,
    } = this.props
    const isLoading = !loadedSeatInfo
      || studyspaces.reduce(
        (res, space) => res || space.isFetchingSeatInfo,
        false,
      )
    return (
      <Page
        mainTabPage
        refreshEnabled
        onRefresh={this.fetchSeatInfo}
        refreshing={isLoading}
      >
        {
          (favouriteSpaces.length > 0 && currentView !== VIEWS.all)
            ? this.renderFavouriteStudySpaces()
            : this.renderStudySpacesList()
        }
        <View style={styles.padder} />
      </Page>
    )
  }
}

export default connect(
  StudySpaceFavouritesScreen.mapStateToProps,
  StudySpaceFavouritesScreen.mapDispatchToProps,
)(StudySpaceFavouritesScreen)
