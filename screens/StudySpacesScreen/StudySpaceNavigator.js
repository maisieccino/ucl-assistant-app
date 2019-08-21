import { createStackNavigator } from 'react-navigation'
import StudySpacesListScreen from './StudySpacesListScreen'
import StudySpacesFavouritesScreen from './StudySpacesFavouritesScreen'

const RootStackNavigator = createStackNavigator(
  {
    StudySpacesFavourites: {
      screen: StudySpacesFavouritesScreen,
    },
    StudySpacesList: {
      screen: StudySpacesListScreen,
    },
  },
  {
    defaultNavigationOptions: () => ({
      headerTitleStyle: {
        fontWeight: `normal`,
        fontFamily: `apercu`,
      },
    }),
  }
)

export default RootStackNavigator
