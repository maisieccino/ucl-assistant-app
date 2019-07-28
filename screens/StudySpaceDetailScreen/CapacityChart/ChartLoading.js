/* eslint react-native/no-inline-styles: 0 */
import React, { Component } from "react";
import { View } from "react-native";
import Colors from "../../../constants/Colors";
import { BodyText } from "../../../components/Typography";
import Lottie from "lottie-react-native";

class ChartLoading extends Component {
  state = {
    animation: null,
  };

  componentDidMount() {
    this.playAnimation();
  }

  playAnimation = () => {
    const { animation } = this.state;
    if (!animation) {
      this.loadAnimation();
    } else {
      this.animationRef.reset();
      this.animationRef.play();
    }
  };

  loadAnimation = () => {
    const animation = require("../../../assets/animations/bar-chart.json");

    this.setState({ animation }, this.playAnimation);
  };

  render() {
    const { animation } = this.state;
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
        {animation && (
          <Lottie
            ref={animRef => {
              this.animationRef = animRef;
            }}
            loop
            style={{ width: 200, height: 200 }}
            source={animation}
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
