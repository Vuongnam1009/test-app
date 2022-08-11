import React from "react";
import { LinearGradient, Stop, Defs, Rect } from "react-native-svg";
import { BarChart, Grid } from "react-native-svg-charts";

class GradientRestBar extends React.PureComponent {
  render() {
    const data = [
      0, 160, 150, 155, 140, 110, 150, 90, 80, 60, 0, 44, 88, 120, 86, 50, 20,
      60, 110, 124, 140, 130, 140, 145, 135,
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
          <Stop offset="100%" stopColor="#6266F9" />
          <Stop offset="10%" stopColor="#2D2E3B" />
          <Stop offset="0%" stopColor="#1D1E2C" />
          <Stop offset="12%" stopColor="#1D1E2C" stopOpacity={1} />
        </LinearGradient>
      </Defs>
    );

    return (
      <BarChart
        style={{ height: 160, marginLeft: 16, borderRadius: 99 }}
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

export default GradientRestBar;
