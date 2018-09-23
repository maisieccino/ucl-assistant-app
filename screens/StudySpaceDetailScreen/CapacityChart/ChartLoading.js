/* eslint react-native/no-inline-styles: 0 */
import React, { Component } from "react";
import { View } from "react-native";
import { DangerZone } from "expo";
import Colors from "../../../constants/Colors";
import { BodyText } from "../../../components/Typography";

const { Lottie } = DangerZone;

class ChartLoading extends Component {
  state = {
    animation: null,
  };

  componentDidMount() {
    this.playAnimation();
  }
  playAnimation = () => {
    if (!this.state.animation) {
      this.loadAnimation();
    } else {
      this.animation.reset();
      this.animation.play();
    }
  };

  loadAnimation = () => {
    const animation = require("../../../assets/animations/bar-chart.json");

    this.setState({ animation }, this.playAnimation);
  };

  render() {
    return (
      <View
        style={{
          height: 200,
          backgroundColor: Colors.textInputBackground,
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        {this.state.animation && (
          <Lottie
            ref={animation => {
              this.animation = animation;
            }}
            loop
            style={{ width: 200, height: 200 }}
            source={this.state.animation}
          />
        )}
        <BodyText style={{ position: "relative", bottom: 75 }}>
          Loading chart...
        </BodyText>
      </View>
    );
  }
}

export default ChartLoading;
