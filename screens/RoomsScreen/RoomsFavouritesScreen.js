import { Feather } from "@expo/vector-icons"
import React from 'react'

import Button from "../../components/Button"
import { Page } from "../../components/Containers"
import { SubtitleText } from "../../components/Typography"
import Colors from "../../constants/Colors"

class RoomsFavouritesScreen extends React.Component {
  static navigationOptions = {
    header: null,
    tabBarIcon: ({ focused }) => (
      <Feather
        name="map-pin"
        size={28}
        color={focused ? Colors.pageBackground : Colors.textColor}
      />
    ),
  }

  render() {
    return (
      <Page mainTabPage>
        <SubtitleText>Your Favourites</SubtitleText>
        <Button>Find Empty Room</Button>
      </Page>
    )
  }
}

export default RoomsFavouritesScreen
