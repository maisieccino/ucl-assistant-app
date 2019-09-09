// @flow
import React, { Component } from "react"
import { View, StyleSheet, ActivityIndicator } from "react-native"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { SearchInput } from "../../components/Input"
import { CentredText } from "../../components/Typography"
import SearchResult from "../../components/SearchResult"
import ApiManager from "../../lib/ApiManager"
import { addRecent } from "../../actions/roomsActions"

const styles = StyleSheet.create({
  container: {
    paddingBottom: 20,
  },
})

const MIN_QUERY_LENGTH = 4

class SearchControl extends Component {
  static SEARCH_DELAY = 500;

  static propTypes = {
    token: PropTypes.string,
    navigation: PropTypes.shape().isRequired,
    addRecentRoom: PropTypes.func,
  }

  static defaultProps = {
    token: ``,
    addRecentRoom: () => { },
  }

  static mapStateToProps = (state) => ({
    token: state.user.token,
  })

  static mapDispatchToProps = (dispatch) => ({
    addRecentRoom: (room) => dispatch(addRecent(room)),
  })

  constructor(props) {
    super(props)
    this.state = {
      query: ``,
      error: null,
      isSearching: false,
      searchResults: [],
    }
  }

  componentDidMount() {
    const { navigation } = this.props
    this.subscriptions = [
      navigation.addListener(`didFocus`, this.componentDidFocus),
    ]
    this.componentDidFocus({ state: navigation.state })
  }

  componentWillUnmount() {
    this.subscriptions.forEach((sub) => sub.remove())
  }

  componentDidFocus = (payload) => {
    const { query } = this.state
    const queryExists = this.queryExists(payload.state)
    if (queryExists && query !== payload.state.params.query) {
      this.setState({ query: payload.state.params.query })
      this.searchRooms(payload.state.params.query, true)
    }
  };

  queryExists = (navigationState) => navigationState
    && navigationState.params
    && navigationState.params.query
    && navigationState.params.query.length > 0;

  onChangeText = (query: String) => {
    if (query.length >= MIN_QUERY_LENGTH) {
      clearTimeout(this.searchTimer)
      this.searchTimer = setTimeout(
        () => this.searchRooms(query),
        SearchControl.SEARCH_DELAY,
      )
    }
    this.setState({ query })
  }

  searchRooms = async (query: String, autoNavigate = false) => {
    const { token } = this.props
    try {
      this.setState({ isSearching: true })
      const results = await ApiManager.rooms.search(token, query)
      if (autoNavigate && results.length === 1) {
        this.navigateToRoomDetail(results[0])()
      }
      this.setState({ searchResults: results, isSearching: false })
    } catch (error) {
      this.setState({ error: error.message, isSearching: false })
    }
  }

  navigateToRoomDetail = (room) => () => {
    const { navigation, addRecentRoom } = this.props
    addRecentRoom(room)
    navigation.navigate(`RoomDetail`, { room })
  }

  clear = () => this.setState({ query: ``, searchResults: [] })

  renderSearchResult = (searchResult) => (
    <SearchResult
      key={searchResult.roomid}
      topText={searchResult.roomname}
      bottomText={searchResult.classification_name}
      type="location"
      buttonText="View"
      onPress={this.navigateToRoomDetail(searchResult)}
    />
  )

  renderStatusText = () => {
    const { query, searchResults } = this.state
    if (query.length === 0) {
      return <CentredText>Start typing to get search results</CentredText>
    }
    if (query.length < MIN_QUERY_LENGTH && searchResults.length === 0) {
      return <CentredText>Please enter a few more characters</CentredText>
    }
    if (query.length > 0 && searchResults.length === 0) {
      return <CentredText>No results found.</CentredText>
    }
    return null
  }

  render() {
    const {
      query, error, isSearching, searchResults,
    } = this.state
    return (
      <View style={styles.container}>
        <SearchInput
          placeholder="Search for a room or building name..."
          onChangeQuery={this.onChangeText}
          query={query}
          clear={this.clear}
        />
        {error ? (
          <CentredText>
            {`Error! ${error} `}
          </CentredText>
        ) : null}
        {isSearching ? <ActivityIndicator /> : null}
        {this.renderStatusText()}
        {searchResults.map(this.renderSearchResult)}
      </View>
    )
  }
}

export default connect(
  SearchControl.mapStateToProps,
  SearchControl.mapDispatchToProps,
)(SearchControl)
