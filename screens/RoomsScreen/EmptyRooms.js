import React from 'react'
import { connect } from "react-redux"
import { ActivityIndicator, View, StyleSheet } from 'react-native'
import PropTypes from "prop-types"
import { generate } from "shortid"
import { SubtitleText, BodyText, CentredText } from "../../components/Typography"
import ApiManager from "../../lib/ApiManager"
import SearchResult from "../../components/SearchResult"

const styles = StyleSheet.create({
  bodyText: {
    marginBottom: 10,
  },
  container: {
    paddingBottom: 20,
  },
  subtitle: {
    marginBottom: 5,
  },
})

class EmptyRooms extends React.Component {
  static propTypes = {
    navigation: PropTypes.shape().isRequired,
    token: PropTypes.string,
  }

  static defaultProps = {
    token: ``,
  }

  static mapStateToProps = (state) => ({
    token: state.user.token,
  })

  constructor() {
    super()
    this.state = {
      emptyRooms: [],
      loadingEmptyRooms: true,
      error: null,
    }
  }

  componentDidMount() {
    this.fetchEmptyRooms()
  }

  fetchEmptyRooms = async () => {
    const { token } = this.props
    try {
      const emptyRooms = await ApiManager.rooms.getEmptyRooms(token)
      this.setState({ emptyRooms, loadingEmptyRooms: false })
    } catch (error) {
      this.setState({ error: error.message })
    }
  }

  navigateToRoomDetail = (room) => () => {
    const { navigation } = this.props
    navigation.navigate(`RoomDetail`, { room })
  }

  renderEmptyRoom = (room = {}) => (
    <SearchResult
      key={generate()}
      topText={room.roomname}
      bottomText={room.classification_name}
      type="location"
      buttonText="View"
      onPress={this.navigateToRoomDetail(room)}
    />
  )

  renderResults = () => {
    const { emptyRooms, loadingEmptyRooms } = this.state
    if (!loadingEmptyRooms && emptyRooms.length === 0) {
      return (
        <CentredText>No empty rooms found :(</CentredText>
      )
    }
    if (!loadingEmptyRooms) {
      return emptyRooms.map(this.renderEmptyRoom)
    }
    return <ActivityIndicator />
  }

  render() {
    const { error } = this.state
    if (error) {
      return <BodyText>{`Could not fetch empty rooms: ${error}`}</BodyText>
    }
    return (
      <View style={styles.container}>
        <SubtitleText style={styles.subtitle}>Empty Rooms</SubtitleText>
        <BodyText style={styles.bodyText}>vacant for the next hour</BodyText>
        {this.renderResults()}
      </View>
    )
  }
}

export default connect(
  EmptyRooms.mapStateToProps,
  () => ({}),
)(EmptyRooms)
