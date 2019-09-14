/* eslint react-native/split-platform-components: 0 */
import PropTypes from "prop-types"
import React, { Component } from "react"
import { Platform, ToastAndroid } from "react-native"
import { connect } from "react-redux"

import { toggleFavourite as toggleFavouriteAction } from "../../actions/studyspacesActions"
import { FloatingButton } from "../../components/Button"

class FavouriteButton extends Component {
  static propTypes = {
    toggleFavourite: PropTypes.func,
    id: PropTypes.number,
    favourites: PropTypes.arrayOf(PropTypes.number),
  }

  static defaultProps = {
    id: -1,
    toggleFavourite: () => { },
    favourites: [],
  }

  static mapStateToProps = (state) => ({
    favourites: state.studyspaces.favourites,
  })

  static mapDispatchToProps = (dispatch) => ({
    toggleFavourite: (id) => dispatch(toggleFavouriteAction(id)),
  })

  componentDidUpdate(prevProps) {
    const { id, favourites } = this.props
    const wasFavourite = prevProps.favourites.includes(id)
    const isFavourite = favourites.includes(id)
    if (!wasFavourite && isFavourite && Platform.OS === `android`) {
      ToastAndroid.show(`Added to favourites`, ToastAndroid.SHORT)
    }
  }

  render() {
    const { id, favourites, toggleFavourite } = this.props
    const isFavourite = favourites.includes(id)
    return (
      <FloatingButton
        active={isFavourite}
        onPress={() => toggleFavourite(id)}
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
