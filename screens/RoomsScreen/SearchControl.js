import React, { Component } from "react";
import { View } from "react-native";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { TextInput } from "../../components/Input";
import ApiManager from "../../lib/ApiManager";

class SearchControl extends Component {
  static SEARCH_DELAY = 500;
  static propTypes = {
    token: PropTypes.string,
  };
  static defaultProps = {
    token: "",
  };
  static mapStateToProps = state => ({
    token: state.user.token,
  });
  static mapDispatchToProps = dispatch => ({});
  constructor(props) {
    super(props);
    this.state = {
      query: "",
    };
  }
  onChangeText = (query: String) => {
    clearTimeout(this.searchTimer);
    this.searchTimer = setTimeout(
      () => this.searchRooms(query),
      SearchControl.SEARCH_DELAY,
    );
    this.setState({ query });
  };
  searchRooms = (query: String) => {
    const { token } = this.props;
    ApiManager.rooms.search(token, query);
  };
  render() {
    const { query } = this.state;
    return (
      <View>
        <TextInput
          placeholder="Search for a room or building name..."
          onChangeText={this.onChangeText}
          value={query}
          clearButtonMode="always"
          style={{ flex: 1 }}
        />
      </View>
    );
  }
}

export default connect(
  SearchControl.mapStateToProps,
  SearchControl.mapDispatchToProps,
)(SearchControl);
