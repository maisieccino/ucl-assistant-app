import { Feather } from "@expo/vector-icons"
import PropTypes from "prop-types"
import React from 'react'
import { Image, StyleSheet, View } from 'react-native'
import { connect } from "react-redux"

import Button from "../../components/Button"
import { Page } from "../../components/Containers"
import { BodyText, SubtitleText } from "../../components/Typography"
import Colors from "../../constants/Colors"
import { AssetManager } from '../../lib'
import Styles from "../../styles/Containers"
import SearchButton from './SearchButton'

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  emptyImage: {
    height: 200,
    marginTop: 25,
  },
  emptyRoomsButton: {
    marginTop: 25,
  },
})

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
    favouriteRooms: PropTypes.arrayOf(PropTypes.shape()),
    navigation: PropTypes.shape().isRequired,
  }

  static defaultProps = {
    favouriteRooms: [],
  }

  static mapStateToProps = (state) => ({
    favouriteRooms: state.rooms.favourites,
  })

  renderSuggestion = () => (
    <View style={styles.suggestion}>
      <BodyText>
        Mark a room as one of your favourite rooms and&nbsp;
        it will appear here for easy reference
      </BodyText>
      <Image
        source={AssetManager.undraw.scrumBoard}
        resizeMethod="scale"
        style={[Styles.image, styles.emptyImage]}
        resizeMode="contain"
      />
    </View>
  )

  renderFavouriteStudySpaces = () => null

  render() {
    const { navigation, favouriteRooms } = this.props
    return (
      <View style={styles.container}>
        <Page mainTabPage>
          <SubtitleText>Your Favourites</SubtitleText>
          {
            (favouriteRooms.length > 0)
              ? this.renderFavouriteStudySpaces()
              : this.renderSuggestion()
          }
          <Button
            style={styles.emptyRoomsButton}
          >
            Find Empty Room
          </Button>
        </Page>
        <SearchButton navigation={navigation} />
      </View>
    )
  }
}

export default connect()(RoomsFavouritesScreen)
