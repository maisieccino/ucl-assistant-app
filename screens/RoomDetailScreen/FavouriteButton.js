/* eslint react-native/split-platform-components: 0 */
import PropTypes from "prop-types"
import React, { Component } from "react"
import { Platform, ToastAndroid } from "react-native"
import { connect } from "react-redux"

import { toggleFavourite as toggleFavouriteAction } from "../../actions/roomsActions"
import { FloatingButton } from "../../components/Button"

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
      <FloatingButton
        active={isFavourite}
        onPress={this.toggleFavourite}
        icon="heart"
        activeIcon="heart-outlined"
      />
    )
  }
}

export default connect(
  FavouriteButton.mapStateToProps,
  FavouriteButton.mapDispatchToProps,
)(FavouriteButton)
