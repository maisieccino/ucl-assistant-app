
import PropTypes from "prop-types"
import React, { Component } from "react"

import { FloatingButton } from "../../components/Button"
import Colors from "../../constants/Colors"

class SearchButton extends Component {
  static propTypes = {
    navigation: PropTypes.shape().isRequired,
  }

  navigateToRoomSearch = () => {
    const { navigation } = this.props
    navigation.navigate(`RoomsSearch`)
  }

  render() {
    return (
      <FloatingButton
        onPress={this.navigateToRoomSearch}
        icon="magnifying-glass"
        buttonColor={Colors.accentColor}
      />
    )
  }
}

export default SearchButton
