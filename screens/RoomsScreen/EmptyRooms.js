import React from 'react'
import { connect } from "react-redux"
import { View } from 'react-native'
import PropTypes from "prop-types"
import { SubtitleText, BodyText } from "../../components/Typography"
import ApiManager from "../../lib/ApiManager"

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
    }
  }

  componentDidMount() {
    this.fetchEmptyRooms()
  }

  fetchEmptyRooms = async () => {
    const { token } = this.props
    const emptyRooms = await ApiManager.rooms.getEmptyRooms(token)
    console.log(emptyRooms)
  }

  render() {
    return (
      <View>
        <SubtitleText>Empty Rooms</SubtitleText>
        <BodyText>vacant for the next hour</BodyText>
      </View>
    )
  }
}

export default connect(
  EmptyRooms.mapStateToProps,
  () => ({}),
)(EmptyRooms)
