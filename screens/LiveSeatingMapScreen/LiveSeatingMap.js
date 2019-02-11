import React from "react";
import { WebView, StyleSheet, Dimensions } from "react-native";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { WORKSPACES_URL } from "../../constants/API";

const { width: windowWidth } = Dimensions.get("window");

const styles = StyleSheet.create({
  webview: {
    height: windowWidth,
    width: windowWidth,
  },
});

const LiveSeatingMap = ({ surveyId, mapId, token }) =>
  surveyId && mapId ? (
    <WebView
      source={{
        uri: `${WORKSPACES_URL}/getliveimage/map.svg?survey_id=${surveyId}&map_id=${mapId}`,
        headers: {
          authorization: `Bearer ${token}`,
          "uclapi-workspaces-version": "1",
        },
      }}
      style={styles.webview}
    />
  ) : null;

LiveSeatingMap.propTypes = {
  surveyId: PropTypes.number,
  mapId: PropTypes.number,
  token: PropTypes.string,
};

LiveSeatingMap.defaultProps = {
  surveyId: null,
  mapId: null,
  token: "",
};

LiveSeatingMap.mapStateToProps = state => ({
  token: state.user.token,
});

export default connect(LiveSeatingMap.mapStateToProps)(LiveSeatingMap);
