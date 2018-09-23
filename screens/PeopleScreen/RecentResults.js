// @flow
import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { View } from "react-native";
import { generate } from "shortid";
import { clearRecents } from "../../actions/peopleActions";
import Button from "../../components/Button";
import { SubtitleText, CentredText } from "../../components/Typography";
import SearchResult from "../../components/SearchResult";

class RecentResults extends Component {
  static propTypes = {
    recents: PropTypes.arrayOf(PropTypes.shape()),
    navigation: PropTypes.shape().isRequired,
    clearRecents: PropTypes.func,
  };

  static defaultProps = {
    recents: [],
    clearRecents: () => {},
  };

  static mapStateToProps = state => ({
    recents: state.people.recents,
  });

  static mapDispatchToProps = dispatch => ({
    clearRecents: () => dispatch(clearRecents()),
  });

  render() {
    const { navigation, recents } = this.props;
    return (
      <View>
        <SubtitleText>Recently Searched</SubtitleText>
        {recents.map(res => (
          <SearchResult
            key={generate()}
            topText={res.name}
            bottomText={res.department}
            type="person"
            buttonText="View"
            onPress={() => {
              navigation.navigate("PersonDetail", res);
            }}
          />
        ))}
        {recents.length > 0 ? (
          <Button onPress={() => this.props.clearRecents()}>Clear</Button>
        ) : (
          <CentredText>Recent results will appear here.</CentredText>
        )}
      </View>
    );
  }
}

export default connect(
  RecentResults.mapStateToProps,
  RecentResults.mapDispatchToProps,
)(RecentResults);
