import React, { Component } from "react";
import PropTypes from "prop-types";
import { Feather } from "@expo/vector-icons";
import { TitleText } from "../../components/Typography";
import { Page } from "../../components/Containers";
import Colors from "../../constants/Colors";

import SearchControl from "./SearchControl";
import RecentResults from "./RecentResults";

class PeopleScreen extends Component {
  static navigationOptions = {
    header: null,
    tabBarIcon: ({ focused }) => (
      <Feather
        name="users"
        size={28}
        color={focused ? Colors.pageBackground : Colors.textColor}
      />
    ),
  };

  static mapStateToProps = state => ({
    searchResults: state.people.searchResults,
    isSearching: state.people.isSearching,
  });

  static propTypes = {
    navigation: PropTypes.shape().isRequired,
  };

  render() {
    const { navigation } = this.props;
    return (
      <Page mainTabPage>
        <TitleText>People</TitleText>
        <SearchControl navigation={navigation} />
        <RecentResults navigation={navigation} />
      </Page>
    );
  }
}

export default PeopleScreen;
