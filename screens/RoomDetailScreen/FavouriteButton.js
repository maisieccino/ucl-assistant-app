/* eslint react-native/split-platform-components: 0 */
import React, { Component } from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { Platform, ToastAndroid } from "react-native"
import { FloatingHeartButton } from "../../components/Button"
import { toggleFavourite as toggleFavouriteAction } from "../../actions/roomsActions"

const getUniqueId = (room) => {
  const { roomid, siteid } = room
  if (!roomid || !siteid) {
    return null
  }
  return `${roomid}|${siteid}`
}

class FavouriteButton extends Component {
  static propTypes = {
    toggleFavourite: PropTypes.func,
    room: PropTypes.shape(),
    favourites: PropTypes.arrayOf(PropTypes.string),
  }

  static defaultProps = {
    room: {},
    toggleFavourite: () => { },
    favourites: [],
  }

  static mapStateToProps = (state) => ({
    favourites: state.rooms.favourites,
  })

  static mapDispatchToProps = (dispatch) => ({
    toggleFavourite: (id) => dispatch(toggleFavouriteAction(id)),
  })

  componentDidUpdate(prevProps) {
    const { room, favourites } = this.props
    const id = getUniqueId(room)
    const wasFavourite = prevProps.favourites.includes(id)
    const isFavourite = favourites.includes(id)
    if (!wasFavourite && isFavourite && Platform.OS === `android`) {
      ToastAndroid.show(`Added to favourites`, ToastAndroid.SHORT)
    }
  }

  toggleFavourite = () => {
    const { toggleFavourite, room } = this.props
    const id = getUniqueId(room)
    toggleFavourite(id)
  }

  render() {
    const { room, favourites } = this.props
    const id = getUniqueId(room)
    const isFavourite = favourites.includes(id)
    return (
      <FloatingHeartButton
        active={isFavourite}
        onPress={this.toggleFavourite}
      />
    )
  }
}

export default connect(
  FavouriteButton.mapStateToProps,
  FavouriteButton.mapDispatchToProps,
)(FavouriteButton)
