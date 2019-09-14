
import React, { Component } from "react"

import { FloatingButton } from "../../components/Button"

class SearchButton extends Component {
  navigateToRoomSearch = () => { }

  render() {
    return (
      <FloatingButton
        onPress={this.navigateToRoomSearch}
      />
    )
  }
}

export default SearchButton
