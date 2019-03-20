/* eslint react-native/no-inline-styles: 0 */
import React, { Component } from "react";
import { View } from "react-native";
import PropTypes from "prop-types";
import moment from "moment";
import { Svg } from "expo";
import { AreaChart } from "react-native-svg-charts";
import MapStyles from "../../../styles/Map";
import TextStyles from "../../../styles/Typography";
import Colors from "../../../constants/Colors";
import ChartLoading from "./ChartLoading";
import { BodyText } from "../../../components/Typography";
import { Horizontal } from "../../../components/Containers";

const { Defs, G, Line, LinearGradient, Rect, Stop, Text } = Svg;

const Gradient = ({ index }) => (
  <Defs key={index}>
    <LinearGradient id="gradient" x1="0%" y="0%" x2="0%" y2="100%">
      <Stop offset="0%" stopColor={Colors.accentColor} stopOpacity={0.8} />
      <Stop offset="100%" stopColor={Colors.accentColor} stopOpacity={0.2} />
    </LinearGradient>
  </Defs>
);
Gradient.propTypes = {
  index: PropTypes.number.isRequired,
};

/* apparently ESLint does not like curried components!! */
/* eslint-disable react/prop-types */
const HighlightBar = (data, time, occupied) => ({ x, y, width, height }) => (
  <G key="tooltip" x={x(time)}>
    <Rect
      height={height}
      width={width / 24}
      opacity={0.3}
      fill={Colors.graphCurrentBar}
    />
    <Rect
      y={y(occupied)}
      height={height - y(occupied)}
      width={width / 24}
      fill={Colors.graphCurrentBar}
    />
  </G>
);

const CapacityLine = capacity => ({ y }) => (
  <G key="capacity" x={0} y={y(capacity) < 0 ? 0 : y(capacity)}>
    <Line
      x1="0%"
      x2="100%"
      y1={0}
      y2={0}
      stroke={Colors.textColor}
      strokeDasharray={[8, 6]}
    />
    <Text x={3} y={18} fill={Colors.textColor} fontSize={15}>
      Capacity{` (${capacity} seats)`}
    </Text>
  </G>
);

/* eslint-enable react/prop-types */

class CapacityChart extends Component {
  static propTypes = {
    data: PropTypes.arrayOf(PropTypes.number),
    occupied: PropTypes.number,
    capacity: PropTypes.number,
    loading: PropTypes.bool,
  };

  static defaultProps = {
    data: [],
    occupied: 0,
    capacity: 500,
    loading: false,
  };

  state = {
    showData: false,
  };

  componentDidUpdate(prevProps) {
    if (prevProps.loading && !this.props.loading) {
      setTimeout(() => this.setState({ showData: true }), 600);
    }
  }

  render() {
    const { capacity, data, loading, occupied } = this.props;
    const { showData } = this.state;
    const hour = parseInt(moment().format("HH"), 10);
    // chart library will spleen between a list of 0s and the actual
    // data.
    const graphData = showData ? data : Array.from(Array(24)).map(() => 0);
    const highlightBar = HighlightBar(
      graphData,
      showData ? hour : -1,
      occupied,
    );
    const line = CapacityLine(capacity);
    return (
      <View style={[MapStyles.wideMap, { height: undefined }]}>
        {loading ? (
          <ChartLoading />
        ) : (
          <AreaChart
            animate
            animationDuration={500}
            contentInset={{ top: 10 }}
            data={graphData}
            showGrid={false}
            gridMin={0}
            gridMax={capacity}
            svg={{
              fill: showData ? "url(#gradient)" : "transparent",
              stroke: showData ? Colors.accentColor : "none",
              strokeWidth: showData ? 2 : 0,
            }}
            style={{
              backgroundColor: Colors.textInputBackground,
              height: 200,
            }}
            extras={[Gradient, line, highlightBar]}
          />
        )}
        <Horizontal
          style={{ justifyContent: "space-between", paddingHorizontal: 2 }}
        >
          <BodyText style={TextStyles.small}>12:00 am</BodyText>
          <BodyText style={TextStyles.small}>6:00 am</BodyText>
          <BodyText style={TextStyles.small}>12:00 pm</BodyText>
          <BodyText style={TextStyles.small}>6:00 pm</BodyText>
          <BodyText style={TextStyles.small}>11:00 pm</BodyText>
        </Horizontal>
      </View>
    );
  }
}

export default CapacityChart;
