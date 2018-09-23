/* eslint react-native/no-inline-styles: 0 */
import React from "react";
import PropTypes from "prop-types";
import { ActivityIndicator, View } from "react-native";
import Styles from "../../styles/Containers";
import Colors from "../../constants/Colors";

const Indicator = ({ color, loading }) => {
  const children = loading ? <ActivityIndicator size={8} /> : null;
  return (
    <View
      style={[
        Styles.circle,
        {
          backgroundColor: loading ? Colors.textInputBackground : color,
          position: "absolute",
          left: 44,
          top: 40,
        },
      ]}
    >
      {children}
    </View>
  );
};

Indicator.propTypes = {
  color: PropTypes.string,
  loading: PropTypes.bool,
};
Indicator.defaultProps = {
  color: Colors.textInputBackground,
  loading: false,
};
export default Indicator;
