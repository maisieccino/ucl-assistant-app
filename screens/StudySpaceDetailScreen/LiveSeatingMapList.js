import React, { Component } from "react";
import { View, StyleSheet } from "react-native";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { SubtitleText } from "../../components/Typography";
import Button from "../../components/Button";
import ApiManager from "../../lib/ApiManager";

const styles = StyleSheet.create({
  liveSeatingMap: {
    marginVertical: 20,
  },
});

class LiveSeatingMapList extends Component {
  static propTypes = {
    token: PropTypes.string,
    survey: PropTypes.shape(),
  };
  static defaultProps = {
    token: "",
    survey: null,
  };

  static mapStateToProps = state => ({
    token: state.user.token,
  });
  static mapDispatchToProps = () => ({});
  render() {
    const { survey } = this.props;
    const hasMaps =
      survey &&
      survey.maps &&
      Array.isArray(survey.maps) &&
      survey.maps.length > 0;
    if (!hasMaps) {
      return null;
    }

    const { maps } = survey;

    return (
      <View style={styles.liveSeatingMap}>
        <SubtitleText>Live Seating Map</SubtitleText>
        {maps.map(map => (
          <Button key={map.id} onPress={this.getLiveSeatMap(map.id)}>
            {map.name}
          </Button>
        ))}
      </View>
    );
  }
}

export default connect(
  LiveSeatingMapList.mapStateToProps,
  LiveSeatingMapList.mapDispatchToProps,
)(LiveSeatingMapList);
