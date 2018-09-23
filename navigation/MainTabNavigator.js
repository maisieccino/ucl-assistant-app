/* eslint react/prop-types: 0 */
import React from "react";
import { Platform } from "react-native";
import { Feather } from "@expo/vector-icons";
import { createBottomTabNavigator } from "react-navigation";
import Colors from "../constants/Colors";

import TimetableScreen from "../screens/TimetableScreen";
import StudySpacesScreen from "../screens/StudySpacesScreen";
import PeopleScreen from "../screens/PeopleScreen";
import RoomsScreen from "../screens/RoomsScreen";
import SettingsScreen from "../screens/SettingsScreen";

const screens = {
  Timetable: {
    screen: TimetableScreen,
  },
  StudySpaces: {
    screen: StudySpacesScreen,
  },
  People: {
    screen: PeopleScreen,
  },
  Rooms: {
    screen: RoomsScreen,
  },
  Settings: {
    screen: SettingsScreen,
  },
};

export default createBottomTabNavigator(screens, {
  navigationOptions: ({ navigation }) => ({
    tabBarIcon: ({ focused }) => {
      const { routeName } = navigation.state;
      let iconName;
      switch (routeName) {
        case "Timetable":
          iconName = "calendar";
          break;
        case "StudySpaces":
          iconName = "book";
          break;
        case "People":
          iconName = "users";
          break;
        case "Rooms":
          iconName = "map-pin";
          break;
        case "Settings":
          iconName = "settings";
          break;
        default:
          iconName = "info";
      }
      return (
        <Feather
          name={iconName}
          size={28}
          color={focused ? Colors.pageBackground : Colors.textColor}
        />
      );
    },
  }),
  // initialRouteName: __DEV__ ? "Storybook" : "Timetable",
  initialRouteName: "Timetable",
  tabBarPosition: "bottom",
  animationEnabled: true,
  swipeEnabled: false,
  tabBarOptions: {
    activeTintColor: Colors.pageBackground,
    activeBackgroundColor: "rgba(27,153,139,0.7)",
    inactiveBackgroundColor: `rgba(206,208,217,${
      Platform.OS === "ios" ? "0.1" : "0.4"
    })`,
    inactiveTintColor: Colors.textColor,
    tabStyle: {
      paddingTop: 5,
      paddingBottom: 5,
    },
    labelStyle: {
      fontFamily: "apercu",
    },
    style: {
      height: 60,
      backgroundColor: "rgba(255,255,255,0)",
      position: "absolute",
      left: 0,
      right: 0,
      bottom: 0,
    },
    bottomNavigationOptions: {
      labelColor: Colors.pageBackground,
      backgroundColor: Colors.accentColor,
      rippleColor: Colors.pageBackground,
    },
  },
});
