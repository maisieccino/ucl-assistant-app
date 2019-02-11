import React, { Component } from "react";
import { Image } from "react-native";
import { Feather } from "@expo/vector-icons";
import PropTypes from "prop-types";
import { TitleText, CentredText } from "../../components/Typography";
import { Page, Horizontal } from "../../components/Containers";
import Colors from "../../constants/Colors";
import Styles from "../../styles/Containers";
import SearchControl from "./SearchControl";

class RoomsScreen extends Component {
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

  static propTypes = {
    navigation: PropTypes.shape().isRequired,
  };

  render() {
    const { navigation } = this.props;
    return (
      <Page mainTabPage>
        <TitleText>Rooms</TitleText>
        <SearchControl navigation={navigation} />
      </Page>
    );
  }
}

export default RoomsScreen;
