import React from "react";
import {
  View,
  StyleSheet,
  useWindowDimensions,
  ViewStyle,
  StyleProp,
} from "react-native";
import { useTheme } from "@ui-kitten/components";

import Animated, {
  Extrapolate,
  interpolate,
  interpolateColor,
  useAnimatedStyle,
  useDerivedValue,
} from "react-native-reanimated";

interface DotsProps<T> {
  translationValue: Animated.SharedValue<number>;
  data: Array<T>;
  heightDot?: number;
  style?: StyleProp<ViewStyle>;
  status?: "basic" | "primary" | "white";
}
function DotsIntro<T>({
  data,
  translationValue,
  heightDot = 8,
  style,
}: DotsProps<T>) {
  const theme = useTheme();
  const { width, height } = useWindowDimensions();
  return (
    <View style={[styles.container, style]}>
      {data.map((_, i) => {
        const dotColor = useDerivedValue(() => {
          return interpolateColor(
            translationValue.value,
            [(i - 1) * width, i * width, (i + 1) * width],
            ["transparent", theme["color-red-100"], "transparent"]
          );
        });
        const dotBorder = useDerivedValue(() => {
          return interpolate(
            translationValue.value,
            [(i - 1) * width, i * width, (i + 1) * width],
            [1, 0, 1],
            Extrapolate.CLAMP
          );
        });
        const dotStyle = useAnimatedStyle(() => {
          return {
            backgroundColor: dotColor.value,
            width: 8,
            height: heightDot,
            borderColor: theme["color-primary-200"],
            borderRadius: 99,
            borderWidth: dotBorder.value,
          };
        });
        return (
          <Animated.View key={i.toString()} style={[styles.dot, dotStyle]} />
        );
      })}
    </View>
  );
}

export default DotsIntro;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 8,
    marginHorizontal: 4,
  },
});
