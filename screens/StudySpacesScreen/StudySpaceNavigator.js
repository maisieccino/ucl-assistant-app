import { createStackNavigator } from 'react-navigation'

import StudySpacesFavouritesScreen from './StudySpacesFavouritesScreen'
import StudySpacesListScreen from './StudySpacesListScreen'

const StudySpaceNavigator = createStackNavigator(
  {
    StudySpacesFavourites: {
      screen: StudySpacesFavouritesScreen,
    },
    StudySpacesList: {
      screen: StudySpacesListScreen,
    },
  },
  {
    initialRouteName: `StudySpacesFavourites`,
    defaultNavigationOptions: () => ({
      headerTitleStyle: {
        fontWeight: `normal`,
        fontFamily: `apercu`,
      },
    }),
  }
)

export default StudySpaceNavigator
