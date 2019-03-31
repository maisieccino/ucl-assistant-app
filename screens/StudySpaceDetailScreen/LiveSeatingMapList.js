// @flow
import React, { Component } from "react";
import { View, StyleSheet } from "react-native";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { SubtitleText, BodyText } from "../../components/Typography";
import Colors from "../../constants/Colors";
import Shadow from "../../lib/Shadow";

const styles = StyleSheet.create({
  liveSeatingMap: {
    marginVertical: 20,
  },
  cardHeader: {
    backgroundColor: Colors.cardHeader,
    color: Colors.cardBackground,
    marginBottom: 5,
    padding: 20,
    borderRadius:10,
    ...Shadow(2),
  },
  cardList: {
    backgroundColor: Colors.cardBackground,
    marginTop: 5,
    padding: 20,
    borderRadius:10,
    ...Shadow(2),
  },
});

class LiveSeatingMapList extends Component {
  static propTypes = {
    maps: PropTypes.arrayOf(PropTypes.shape()),
  };
  static defaultProps = {
    maps: [],
  };

  static mapStateToProps = (state: Object) => ({
    token: state.user.token,
  });
  static mapDispatchToProps = () => ({});

  renderMapInfo = ({ id, name, total, occupied }) => (
    <BodyText key={id}>
      {name}: {total - occupied} seats free (total: {total})
    </BodyText>
  );

  render() {
    const { maps } = this.props;
    const hasMaps = maps && Array.isArray(maps) && maps.length > 1;
    // No breakdown needed if there is only one map in the survey
    // the map data == the survey data
    if (!hasMaps) {
      return null;
    }

    const mapsList = maps.map(this.renderMapInfo);

    return (
      <View style={styles.liveSeatingMap}>
        <SubtitleText style={styles.cardHeader}>Breakdown</SubtitleText>
        <View style={styles.cardList}>{mapsList}</View>
      </View>
    );
  }
}

export default connect(
  LiveSeatingMapList.mapStateToProps,
  LiveSeatingMapList.mapDispatchToProps,
)(LiveSeatingMapList);
