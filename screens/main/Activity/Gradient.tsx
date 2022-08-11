// import React from "react";
// import { StackedBarChart } from "react-native-svg-charts";

// class StackedBarChartExample extends React.PureComponent {
//   render() {
//     const data = [
//       midNight,
//       Time1h,
//       Time2h,
//       Time3h,
//       Time4h,
//       Time5h,
//       Time6h,
//       Time7h,
//       Time8h,
//       Time9h,
//       Time10h,
//       Time11h,
//       Time12h,
//       Time13h,
//       Time14h,
//       Time15h,
//       Time16h,
//       Time17h,
//       Time18h,
//       Time19h,
//       Time20h,
//       Time21h,
//       Time22h,
//       Time23h,
//       Time24h,
//     ];

//     const colors = [
//       "#11D59C",
//       "#5ACB80",
//       "#7FC672",
//       "#B6BB51",
//       "#C3BB58",
//       "#E7B94A",
//       "#F5B744",
//       "#FFA247",
//       "#FE9450",
//       "#FD7159",
//       "#FB5762",
//       "#FA4269",
//     ];
//     return (
//       <StackedBarChart
//         style={{ height: 160 }}
//         keys={["h1", "h2", "h3", "h4", "h5", "h6", "h7", "h8", "h9", "h10"]}
//         colors={colors}
//         strokeColor="blue"
//         data={data}
//         showGrid={false}
//         spacingInner={0.3}
//         contentInset={{ top: 30, bottom: 30 }}
//         {...this.props}
//       />
//     );
//   }
// }

// export default StackedBarChartExample;
// const midNight = {
//   h1: 16,
//   h2: 0,
//   h3: 0,
//   h4: 0,
//   h5: 0,
//   h6: 0,
//   h7: 0,
//   h8: 0,
//   h9: 0,
//   h10: 0,
// };
// const Time1h = {
//   h1: 32,
//   h2: 0,
//   h3: 0,
//   h4: 0,
//   h5: 0,
//   h6: 0,
//   h7: 0,
//   h8: 0,
//   h9: 0,
//   h10: 0,
// };
// const Time2h = {
//   h1: 24,
//   h2: 0,
//   h3: 0,
//   h4: 0,
//   h5: 0,
//   h6: 0,
//   h7: 0,
//   h8: 0,
//   h9: 0,
//   h10: 0,
// };
// const Time3h = {
//   h1: 40,
//   h2: 0,
//   h3: 0,
//   h4: 0,
//   h5: 0,
//   h6: 0,
//   h7: 0,
//   h8: 0,
//   h9: 0,
//   h10: 0,
// };
// const Time4h = {
//   h1: 10,
//   h2: 10,
//   h3: 10,
//   h4: 10,
//   h5: 10,
//   h6: 10,
//   h7: 4,
//   h8: 0,
//   h9: 0,
//   h10: 0,
// };
// const Time5h = {
//   h1: 32,
//   h2: 0,
//   h3: 0,
//   h4: 0,
//   h5: 0,
//   h6: 0,
//   h7: 0,
//   h8: 0,
//   h9: 0,
//   h10: 0,
// };
// const Time6h = {
//   h1: 160,
//   h2: 0,
//   h3: 0,
//   h4: 0,
//   h5: 0,
//   h6: 0,
//   h7: 0,
//   h8: 0,
//   h9: 0,
//   h10: 0,
// };
// const Time7h = {
//   h1: 160,
//   h2: 0,
//   h3: 0,
//   h4: 0,
//   h5: 0,
//   h6: 0,
//   h7: 0,
//   h8: 0,
//   h9: 0,
//   h10: 0,
// };
// const Time8h = {
//   h1: 160,
//   h2: 0,
//   h3: 0,
//   h4: 0,
//   h5: 0,
//   h6: 0,
//   h7: 0,
//   h8: 0,
//   h9: 0,
//   h10: 0,
// };
// const Time9h = {
//   h1: 160,
//   h2: 0,
//   h3: 0,
//   h4: 0,
//   h5: 0,
//   h6: 0,
//   h7: 0,
//   h8: 0,
//   h9: 0,
//   h10: 0,
// };
// const Time10h = {
//   h1: 160,
//   h2: 0,
//   h3: 0,
//   h4: 0,
//   h5: 0,
//   h6: 0,
//   h7: 0,
//   h8: 0,
//   h9: 0,
//   h10: 0,
// };
// const Time11h = {
//   h1: 160,
//   h2: 0,
//   h3: 0,
//   h4: 0,
//   h5: 0,
//   h6: 0,
//   h7: 0,
//   h8: 0,
//   h9: 0,
//   h10: 0,
// };
// const Time12h = {
//   h1: 160,
//   h2: 0,
//   h3: 0,
//   h4: 0,
//   h5: 0,
//   h6: 0,
//   h7: 0,
//   h8: 0,
//   h9: 0,
//   h10: 0,
// };
// const Time13h = {
//   h1: 160,
//   h2: 0,
//   h3: 0,
//   h4: 0,
//   h5: 0,
//   h6: 0,
//   h7: 0,
//   h8: 0,
//   h9: 0,
//   h10: 0,
// };
// const Time14h = {
//   h1: 160,
//   h2: 0,
//   h3: 0,
//   h4: 0,
//   h5: 0,
//   h6: 0,
//   h7: 0,
//   h8: 0,
//   h9: 0,
//   h10: 0,
// };
// const Time15h = {
//   h1: 160,
//   h2: 0,
//   h3: 0,
//   h4: 0,
//   h5: 0,
//   h6: 0,
//   h7: 0,
//   h8: 0,
//   h9: 0,
//   h10: 0,
// };
// const Time16h = {
//   h1: 160,
//   h2: 0,
//   h3: 0,
//   h4: 0,
//   h5: 0,
//   h6: 0,
//   h7: 0,
//   h8: 0,
//   h9: 0,
//   h10: 0,
// };
// const Time17h = {
//   h1: 160,
//   h2: 0,
//   h3: 0,
//   h4: 0,
//   h5: 0,
//   h6: 0,
//   h7: 0,
//   h8: 0,
//   h9: 0,
//   h10: 0,
// };
// const Time18h = {
//   h1: 160,
//   h2: 0,
//   h3: 0,
//   h4: 0,
//   h5: 0,
//   h6: 0,
//   h7: 0,
//   h8: 0,
//   h9: 0,
//   h10: 0,
// };
// const Time19h = {
//   h1: 160,
//   h2: 0,
//   h3: 0,
//   h4: 0,
//   h5: 0,
//   h6: 0,
//   h7: 0,
//   h8: 0,
//   h9: 0,
//   h10: 0,
// };
// const Time20h = {
//   h1: 160,
//   h2: 0,
//   h3: 0,
//   h4: 0,
//   h5: 0,
//   h6: 0,
//   h7: 0,
//   h8: 0,
//   h9: 0,
//   h10: 0,
// };
// const Time21h = {
//   h1: 160,
//   h2: 0,
//   h3: 0,
//   h4: 0,
//   h5: 0,
//   h6: 0,
//   h7: 0,
//   h8: 0,
//   h9: 0,
//   h10: 0,
// };
// const Time22h = {
//   h1: 160,
//   h2: 0,
//   h3: 0,
//   h4: 0,
//   h5: 0,
//   h6: 0,
//   h7: 0,
//   h8: 0,
//   h9: 0,
//   h10: 0,
// };
// const Time23h = {
//   h1: 160,
//   h2: 0,
//   h3: 0,
//   h4: 0,
//   h5: 0,
//   h6: 0,
//   h7: 0,
//   h8: 0,
//   h9: 0,
//   h10: 0,
// };
// const Time24h = {
//   h1: 160,
//   h2: 0,
//   h3: 0,
//   h4: 0,
//   h5: 0,
//   h6: 0,
//   h7: 0,
//   h8: 0,
//   h9: 0,
//   h10: 0,
// };
