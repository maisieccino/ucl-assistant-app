/* eslint react-native/no-inline-styles: 0 */
import React, { Component } from "react";
import { View, StyleSheet } from "react-native";
import PropTypes from "prop-types";
import moment from "moment";
import { Svg } from "expo";
import { AreaChart, XAxis } from "react-native-svg-charts";
import MapStyles from "../../../styles/Map";
import Colors from "../../../constants/Colors";
import ChartLoading from "./ChartLoading";

const { Defs, G, Line, LinearGradient, Rect, Stop, Text } = Svg;

const styles = StyleSheet.create({
  chart: {
    backgroundColor: Colors.cardBackground,
    height: 200,
  },
});

/* apparently ESLint does not like curried components!! */
/* eslint-disable react/prop-types */

const Gradient = ({ data }) =>
  data.map((_, index) => (
    <Defs key={index}>
      <LinearGradient id="gradient" x1="0%" y="0%" x2="0%" y2="100%">
        <Stop offset="0%" stopColor={Colors.accentColor} stopOpacity={0.8} />
        <Stop offset="100%" stopColor={Colors.accentColor} stopOpacity={0.2} />
      </LinearGradient>
    </Defs>
  ));

const CurrentTimeBar = ({ x, y, width, height, time, occupied }) => (
  <G key="tooltip" x={x(time)}>
    <Rect
      height={height}
      width={width / 24}
      opacity={0.3}
      fill={Colors.graphCurrentTime}
    />
    <Rect
      y={y(occupied)}
      height={height - y(occupied)}
      width={width / 24}
      fill={Colors.graphCurrentTime}
    />
  </G>
);

const CapacityLine = ({ y, capacity, selectedIndex, data }) => (
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
    {selectedIndex !== null ? (
      <React.Fragment>
        <Text
          x={3}
          y={38}
          fill={Colors.textColor}
          fontSize={15}
          key={selectedIndex}
        >
          {moment(selectedIndex, "H").format("h:00a")} -{" "}
          {`${Math.round(data[selectedIndex])} seats occupied`}
        </Text>
      </React.Fragment>
    ) : null}
  </G>
);

const HighlightBar = ({ x, y, width, height, selectedIndex, data }) => (
  <G key="tooltip" x={x(selectedIndex)}>
    <Rect
      height={height}
      width={width / 24}
      opacity={0.3}
      fill={Colors.graphCurrentBar}
    />
    <Rect
      y={y(data[selectedIndex])}
      height={height - y(data[selectedIndex])}
      width={width / 24}
      fill={Colors.graphCurrentBar}
    />
  </G>
);

const CustomGrid = ({ x, data, width, setIndex }) => (
  <G>
    {// Vertical grid
    data.map((val, index) => (
      <Line
        key={index}
        y1="0%"
        y2="100%"
        x1={x(index)}
        x2={x(index)}
        stroke="rgba(0,0,0,0)"
        strokeWidth={width / 24}
        onPress={() => {
          console.log("vertical", index, val);
          setIndex(index);
        }}
      />
    ))}
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
    selectedIndex: null,
  };

  componentDidUpdate(prevProps) {
    const { loading } = this.props;
    if (prevProps.loading && !loading) {
      setTimeout(() => this.setState({ showData: true }), 600);
    }
  }

  formatXLabel = value => {
    const time = value - 1;
    const selectTimes = [2, 8, 14, 20];
    if (selectTimes.includes(time)) {
      return moment(time, "H").format("h:00a");
    }
    // returning an empty or string or null makes the chart
    // makes the chart library think all labels have zero height
    // labels have zero height, so we return this blank character
    // as a workaround to hide labels
    return "⠀";
  };

  render() {
    const { capacity, data, loading, occupied } = this.props;
    const { showData, selectedIndex } = this.state;
    const hour = parseInt(moment().format("HH"), 10);
    // chart library will spleen between a list of 0s and the actual
    // data.
    const graphData = showData ? data : Array.from(Array(24)).map(() => 0);
    return (
      <View style={[MapStyles.wideMap, { height: undefined }]}>
        {loading ? (
          <ChartLoading />
        ) : (
          <React.Fragment>
            <AreaChart
              animate
              animationDuration={500}
              data={graphData}
              showGrid={false}
              gridMin={0}
              gridMax={capacity}
              svg={{
                fill: showData ? "url(#gradient)" : "transparent",
                stroke: showData ? Colors.accentColor : "none",
                strokeWidth: showData ? 2 : 0,
              }}
              style={styles.chart}
            >
              <Gradient />
              <CapacityLine capacity={capacity} selectedIndex={selectedIndex} />
              <CurrentTimeBar
                data={graphData}
                time={showData ? hour : -1}
                occupied={occupied}
              />
              {selectedIndex ? (
                <HighlightBar selectedIndex={selectedIndex} />
              ) : null}
              <CustomGrid
                setIndex={index => this.setState({ selectedIndex: index })}
              />
            </AreaChart>
            <XAxis
              style={{ marginHorizontal: -10, marginTop: 10 }}
              contentInset={{ right: 15 }}
              data={
                showData
                  ? Object.keys(graphData).map(v => Number.parseInt(v, 10))
                  : []
              }
              formatLabel={this.formatXLabel}
              svg={{ fontSize: 16, fill: "black" }}
            />
          </React.Fragment>
        )}
      </View>
    );
  }
}

export default CapacityChart;
