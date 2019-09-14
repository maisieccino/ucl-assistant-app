import { Feather } from "@expo/vector-icons"
import PropTypes from "prop-types"
import React from 'react'
import { View } from 'react-native'

import Button from "../../components/Button"
import { Page } from "../../components/Containers"
import { SubtitleText } from "../../components/Typography"
import Colors from "../../constants/Colors"
import SearchButton from './SearchButton'

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

  static propTypes = {
    navigation: PropTypes.shape().isRequired,
  }

  render() {
    const { navigation } = this.props
    return (
      <View>
        <Page mainTabPage>
          <SubtitleText>Your Favourites</SubtitleText>
          <Button>Find Empty Room</Button>
        </Page>
        <SearchButton navigation={navigation} />
      </View>
    )
  }
}

export default RoomsFavouritesScreen
