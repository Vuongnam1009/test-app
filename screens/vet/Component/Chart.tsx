import React from "react";
import { StyleProp, ViewStyle, View, TouchableOpacity } from "react-native";
import {
  useTheme,
  StyleService,
  useStyleSheet,
  Icon,
} from "@ui-kitten/components";
import useLayout from "hooks/useLayout";
import Text from "components/Text";
import { VictoryArea, VictoryChart, VictoryScatter } from "victory-native";
import { globalStyle } from "styles/globalStyle";

interface Props {
  x: number;
  y: number;
  date?: string;
}
interface ItemProps {
  data: Props[];
  haveRightArrow?: boolean;
  style?: StyleProp<ViewStyle>;
  title: string;
  strokeColor: string;
  lastData: { x: number; y: number };
  onUpdate(): void;
}
const Data_Weight = [
  { x: 1, y: 40 },
  { x: 2, y: 90 },
  { x: 3, y: 100 },
  { x: 4, y: 80 },
  { x: 5, y: 60 },
  { x: 6, y: 130 },
];
const LAST_DATA = Data_Weight[Data_Weight.length - 1];
const Chart = ({
  data = Data_Weight,
  style,
  lastData = LAST_DATA,
  title,
  onUpdate,
}: ItemProps) => {
  const { height, width, top, bottom } = useLayout();
  const theme = useTheme();
  const styles = useStyleSheet(themedStyles);
  let xDot = lastData.x;
  let yDot = lastData.y;
  return (
    <View style={[style]}>
      <TouchableOpacity
        style={styles.titleChart}
        activeOpacity={0.7}
        onPress={onUpdate}
      >
        <Text category="b1" center status={"primary"}>
          {title}
        </Text>
        <Icon pack="assets" name="circle" style={styles.circle} />
      </TouchableOpacity>
      <View>
        <View
          style={{
            position: "absolute",
            bottom: 8,
            left: 0,
            right: 0,
            top: 16,
            justifyContent: "space-between",
          }}
        >
          {DATA.map((item, i) => {
            return (
              <View key={i} style={styles.lineWeight}>
                <Text style={styles.text} status={"primary"}>
                  {item.title}
                </Text>
              </View>
            );
          })}
        </View>
        <VictoryChart
          maxDomain={{ y: 200 }}
          width={width - 80}
          height={213 * (812 / height)}
          padding={{ left: -1, bottom: -1, right: 4, top: 0 }}
        >
          <VictoryArea
            data={data}
            animate={{
              duration: 2000,
              onLoad: { duration: 1000 },
            }}
            interpolation={"basis"}
            style={{
              data: {
                stroke: "#FFFFFF",
                strokeWidth: 2,
                fill: "transparent",
              },
            }}
          />
          <VictoryScatter
            data={[{ x: xDot - 0.05, y: yDot - 2 }]}
            size={6}
            style={{
              data: {
                fill: "#6266F9",
                stroke: "#FFFFFF",
                strokeWidth: 2,
              },
            }}
            animate={{
              duration: 2000,
              onLoad: { duration: 4000 },
            }}
          />
        </VictoryChart>
      </View>
      <View style={[globalStyle.flexSpaceBetween]}>
        {DATA_TIME.map((item, i) => {
          return (
            <View key={i}>
              <Text status={"primary"} category="c4">
                {item.title}
              </Text>
            </View>
          );
        })}
      </View>
    </View>
  );
};

export default Chart;

const themedStyles = StyleService.create({
  titleChart: {
    flexDirection: "row",
  },
  circle: {
    width: 20,
    height: 20,
    marginLeft: 8,
  },
  text: {
    fontSize: 8,
    lineHeight: 10,
  },
  lineWeight: {
    paddingBottom: 4,
    borderBottomWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.24)",
  },
});
const DATA = [
  { id: 0, title: "40" },
  { id: 1, title: "20" },
  { id: 2, title: "0" },
];
const DATA_TIME = [
  { id: 0, title: "Apr 2" },
  { id: 1, title: "Apr 16" },
  { id: 2, title: "May 07" },
  { id: 3, title: "Jul 20" },
];
