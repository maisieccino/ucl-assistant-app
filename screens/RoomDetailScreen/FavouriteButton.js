import PropTypes from "prop-types"
import React, { Component } from "react"
import { connect } from "react-redux"

import { toggleFavourite as toggleFavouriteAction } from "../../actions/roomsActions"
import { FloatingButton } from "../../components/Button"
import { getRoomUniqueId } from '../../reducers/roomsReducer'

class FavouriteButton extends Component {
  static propTypes = {
    favourites: PropTypes.arrayOf(PropTypes.shape()),
    room: PropTypes.shape(),
    toggleFavourite: PropTypes.func,
  }

  static defaultProps = {
    favourites: [],
    room: {},
    toggleFavourite: () => { },
  }

  static mapStateToProps = (state) => ({
    favourites: state.rooms.favourites,
  })

  static mapDispatchToProps = (dispatch) => ({
    toggleFavourite: (room) => dispatch(toggleFavouriteAction(room)),
  })

  toggleFavourite = () => {
    const { toggleFavourite, room } = this.props
    toggleFavourite(room)
  }

  isFavourite = () => {
    const { room, favourites } = this.props
    return favourites.some((fav) => getRoomUniqueId(fav) === getRoomUniqueId(room))
  }

  render() {
    return (
      <FloatingButton
        active={this.isFavourite()}
        onPress={this.toggleFavourite}
        icon="heart-outlined"
        activeIcon="heart"
      />
    )
  }
}

export default connect(
  FavouriteButton.mapStateToProps,
  FavouriteButton.mapDispatchToProps,
)(FavouriteButton)
