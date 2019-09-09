// @flow
import React, { Component } from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { View } from "react-native"
import { generate } from "shortid"
import { clearRecents } from "../../actions/roomsActions"
import Button from "../../components/Button"
import { SubtitleText, CentredText } from "../../components/Typography"
import SearchResult from "../../components/SearchResult"

class RecentResults extends Component {
  static propTypes = {
    recents: PropTypes.arrayOf(PropTypes.shape()),
    navigation: PropTypes.shape().isRequired,
    clearRecentRooms: PropTypes.func,
  }

  static defaultProps = {
    recents: [],
    clearRecentRooms: () => { },
  }

  static mapStateToProps = (state) => ({
    recents: state.rooms.recents,
  })

  static mapDispatchToProps = (dispatch) => ({
    clearRecentRooms: () => dispatch(clearRecents()),
  })

  navigateToRoomDetail = (room) => () => {
    const { navigation } = this.props
    navigation.navigate(`RoomDetail`, { room })
  }

  render() {
    const { recents, clearRecentRooms } = this.props
    if (recents.length === 0) {
      return null
    }
    return (
      <View>
        <SubtitleText>Recently Searched</SubtitleText>
        {recents.map((res) => (
          <SearchResult
            key={generate()}
            topText={res.roomname}
            bottomText={res.classification_name}
            type="location"
            buttonText="View"
            onPress={this.navigateToRoomDetail(res)}
          />
        ))}
        {recents.length > 0 ? (
          <Button onPress={clearRecentRooms}>Clear</Button>
        ) : (
            <CentredText>Recent results will appear here.</CentredText>
        )}
      </View>
    )
  }
}

export default connect(
  RecentResults.mapStateToProps,
  RecentResults.mapDispatchToProps,
)(RecentResults)
