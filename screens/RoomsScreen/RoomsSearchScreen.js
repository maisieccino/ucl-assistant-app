import PropTypes from "prop-types"
import React, { Component } from "react"

import { Page } from "../../components/Containers"
import { TitleText } from "../../components/Typography"
import RecentResults from "./RecentResults"
import SearchControl from "./SearchControl"

// eslint-disable-next-line react/prefer-stateless-function
class RoomsSearchScreen extends Component {
  static propTypes = {
    navigation: PropTypes.shape().isRequired,
  }

  render() {
    const { navigation } = this.props
    return (
      <Page mainTabPage>
        <TitleText>Rooms</TitleText>
        <SearchControl navigation={navigation} />
        <RecentResults navigation={navigation} />
      </Page>
    )
  }
}

export default RoomsSearchScreen
