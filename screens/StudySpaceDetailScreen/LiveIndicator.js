import React from "react";
import PropTypes from "prop-types";
import { LinearGradient } from "expo";
import { BodyText } from "../../components/Typography";
import Colors from "../../constants/Colors";
import Style from "../../styles/Containers";

const LiveIndicator = ({ children }) => (
  <LinearGradient
    colors={[Colors.errorColor, Colors.indicatorOrange]}
    start={[0, 1]}
    end={[1, 0]}
    style={Style.liveIndicator}
  >
    <BodyText style={{ color: Colors.pageBackground }}>{children}</BodyText>
  </LinearGradient>
);

LiveIndicator.propTypes = {
  children: PropTypes.string,
};

LiveIndicator.defaultProps = {
  children: "LIVE",
};

export default LiveIndicator;
