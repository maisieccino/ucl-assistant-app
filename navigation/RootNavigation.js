import { createStackNavigator, createAppContainer } from "react-navigation";

import MainTabNavigator from "./MainTabNavigator";
import SplashScreen from "../screens/SplashScreen";
import TimetableDetailScreen from "../screens/TimetableDetailScreen";
import PersonDetailScreen from "../screens/PersonDetailScreen";
import StudySpaceDetailScreen from "../screens/StudySpaceDetailScreen";
import FAQScreen from "../screens/FAQScreen";
import LiveSeatingMapScreen from "../screens/LiveSeatingMapScreen";
import RoomDetailScreen from "../screens/RoomDetailScreen";

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
    FAQ: {
      screen: FAQScreen,
    },
    LiveSeatingMap: {
      screen: LiveSeatingMapScreen,
    },
    RoomDetailScreen: {
      screen: RoomDetailScreen,
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
