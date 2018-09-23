import React, { Component } from "react";
import { View } from "react-native";
import { Feather } from "@expo/vector-icons";
import Colors from "../constants/Colors";
import StorybookUI from "../storybook";
import Styles from "../styles/Containers";

class StorybookScreen extends Component {
  static navigationOptions = {
    header: null,
    title: "Components",
    tabBarIcon: ({ focused }) => (
      <Feather
        name="layers"
        size={28}
        color={focused ? Colors.pageBackground : Colors.textColor}
      />
    ),
  };

  render() {
    return (
      <View style={[Styles.pageScrollContainer, Styles.mainTabPage]}>
        <StorybookUI />
      </View>
    );
  }
}

export default StorybookScreen;
