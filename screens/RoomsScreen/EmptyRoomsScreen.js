import PropTypes from "prop-types"
import React from 'react'
import { ActivityIndicator, StyleSheet, View } from 'react-native'
import { connect } from "react-redux"
import { generate } from "shortid"

import { Page } from "../../components/Containers"
import SearchResult from "../../components/SearchResult"
import { BodyText, CentredText } from "../../components/Typography"
import ApiManager from "../../lib/ApiManager"

const styles = StyleSheet.create({
  container: {
    paddingBottom: 20,
  },
  subtitle: {
    marginBottom: 10,
  },
})

class EmptyRoomsScreen extends React.Component {
  static navigationOptions = {
    title: `Empty Rooms`,
  }

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
      error: null,
      loadingEmptyRooms: true,
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
      <Page>
        <View style={styles.container}>
          <BodyText style={styles.subtitle}>Rooms vacant for the next hour:</BodyText>
          {this.renderResults()}
        </View>
      </Page>
    )
  }
}

export default connect(
  EmptyRoomsScreen.mapStateToProps,
  () => ({}),
)(EmptyRoomsScreen)
