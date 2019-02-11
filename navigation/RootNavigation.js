import { createStackNavigator, createAppContainer } from "react-navigation";

import MainTabNavigator from "./MainTabNavigator";
import SplashScreen from "../screens/SplashScreen";
import TimetableDetailScreen from "../screens/TimetableDetailScreen";
import PersonDetailScreen from "../screens/PersonDetailScreen";
import StudySpaceDetailScreen from "../screens/StudySpaceDetailScreen";
import StudySpaceAboutScreen from "../screens/StudySpaceAboutScreen";
import LiveSeatingMapScreen from "../screens/LiveSeatingMapScreen";

const RootStackNavigator = createStackNavigator(
  {
    Splash: {
      screen: SplashScreen,
    },
    Main: {
      screen: MainTabNavigator,
      navigationOptions: {
        header: null,
      },
    },
    TimetableDetail: {
      screen: TimetableDetailScreen,
    },
    PersonDetail: {
      screen: PersonDetailScreen,
    },
    StudySpaceDetail: {
      screen: StudySpaceDetailScreen,
    },
    StudySpaceAbout: {
      screen: StudySpaceAboutScreen,
    },
    LiveSeatingMap: {
      screen: LiveSeatingMapScreen,
    },
  },
  {
    defaultNavigationOptions: () => ({
      headerTitleStyle: {
        fontWeight: "normal",
        fontFamily: "apercu",
      },
    }),
  },
);

export default createAppContainer(RootStackNavigator);
