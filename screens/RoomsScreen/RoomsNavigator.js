import { createStackNavigator } from 'react-navigation'

import EmptyRoomsScreen from './EmptyRoomsScreen'
import RoomsFavouritesScreen from './RoomsFavouritesScreen'
import RoomsSearchScreen from './RoomsSearchScreen'

const RoomsNavigator = createStackNavigator(
  {
    RoomsFavourites: {
      screen: RoomsFavouritesScreen,
    },
    RoomsSearch: {
      screen: RoomsSearchScreen,
    },
    EmptyRooms: {
      screen: EmptyRoomsScreen,
    },
  },
  {
    initialRouteName: `RoomsFavourites`,
    defaultNavigationOptions: () => ({
      headerTitleStyle: {
        fontWeight: `normal`,
        fontFamily: `apercu`,
      },
    }),
  }
)

export default RoomsNavigator
