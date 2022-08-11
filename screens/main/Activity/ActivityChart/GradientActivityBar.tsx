import React from "react";
import { LinearGradient, Stop, Defs } from "react-native-svg";
import { BarChart, Grid } from "react-native-svg-charts";

class GradientActivityBar extends React.PureComponent {
  render() {
    const data = [
      0, 32, 32, 32, 40, 64, 43, 80, 88, 112, 144, 160, 128, 96, 48, 80, 112,
      144, 104, 64, 32, 32, 32, 32, 160,
    ];

    const Gradient = () => (
      <Defs key={"gradient"}>
        <LinearGradient
          id={"gradient"}
          x1={"0%"}
          y1={"0%"}
          x2={"0%"}
          y2={"100%"}
        >
          <Stop offset="100%" stopColor="#1bd499" />
          {/* <Stop offset="90%" stopColor="#20d397" />
          <Stop offset="80%" stopColor="#2bd293" />
          <Stop offset="75%" stopColor="#2bd293" />
          <Stop offset="70%" stopColor="#2bd293" />
          <Stop offset="65%" stopColor="#2bd293" />
          <Stop offset="60%" stopColor="#2bd293" /> */}
          {/* <Stop offset="55%" stopColor="#60cb7e" /> */}
          {/* <Stop offset="50%" stopColor="#60cb7e" />
          <Stop offset="45%" stopColor="#a2c265" />
          <Stop offset="30%" stopColor="#d4bb51" />
          <Stop offset="25%" stopColor="#cbbc55" />
          <Stop offset="20%" stopColor="#fbb642" /> */}
          <Stop offset="10%" stopColor="#fd8153" />
          <Stop offset="0%" stopColor="#fb4867" />
        </LinearGradient>
      </Defs>
    );

    return (
      <BarChart
        style={{ height: 160, marginLeft: 16 }}
        data={data}
        spacingInner={0.75}
        spacingOuter={0.3}
        svg={{
          fill: "url(#gradient)",
          x: -16,
          strokeDashoffset: 99,
          strokeWidth: 4,
          strokeOpacity: 0.8,
          stroke: "url(#gradient)",
          strokeLinejoin: "round",
        }}
      >
        <Gradient />
      </BarChart>
    );
  }
}

export default GradientActivityBar;
