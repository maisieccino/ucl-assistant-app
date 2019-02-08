import React, { Component } from "react";
import { View } from "react-native";
import { TextInput } from "../../components/Input";

class SearchControl extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: "",
    };
  }
  onChangeText = (query: String) => {
    this.setState({ query }, () => console.log(this.state.query));
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

export default SearchControl;
