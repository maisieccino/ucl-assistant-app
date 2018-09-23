import React, { Component } from "react";
import { Image } from "react-native";
import { Feather } from "@expo/vector-icons";
import { TitleText, SubtitleText, CentredText } from "../components/Typography";
import { Page, Horizontal } from "../components/Containers";
import { TextInput } from "../components/Input";
import Colors from "../constants/Colors";
import Styles from "../styles/Containers";

class TimetableScreen extends Component {
  static navigationOptions = {
    header: null,
    tabBarIcon: ({ focused }) => (
      <Feather
        name="map-pin"
        size={28}
        color={focused ? Colors.pageBackground : Colors.textColor}
      />
    ),
  };

  render() {
    if (!__DEV__) {
      return (
        <Page mainTabPage>
          <TitleText>Rooms</TitleText>
          <CentredText>
            This feature is not quite ready yet. Come back soon!
          </CentredText>
          <Horizontal>
            <Image
              source={require("../assets/images/undraw_building_blocks.png")}
              resizeMethod="scale"
              style={[Styles.image]}
              width={150}
              height={150}
              resizeMode="contain"
            />
          </Horizontal>
        </Page>
      );
    }
    return (
      <Page mainTabPage>
        <TitleText>Rooms</TitleText>
        <TextInput placeholder="Search for a room or building name..." />
        <CentredText>Start typing to get search results</CentredText>
        <SubtitleText>Your Favourites</SubtitleText>
        <SubtitleText>In Roberts Building</SubtitleText>
      </Page>
    );
  }
}

export default TimetableScreen;
