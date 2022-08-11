import React, { memo } from "react";
import { View, StyleProp, ViewStyle } from "react-native";
import { useTheme } from "@ui-kitten/components";
import { Skeleton } from "@motify/skeleton";

interface Props {
  style?: StyleProp<ViewStyle>;
  width?: number;
  height?: number;
  marginLeft?: number;
  marginRight?: number;
  marginTop?: number;
  marginBottom?: number;
  marginVertical?: number;
  marginHorizontal?: number;
  center?: boolean;
  type?: number | "square" | "round";
}

const SkeletonItem = memo(
  ({
    style,
    width,
    height,
    marginLeft,
    marginRight,
    marginBottom,
    marginHorizontal,
    marginTop,
    marginVertical,
    type = "round",
    center,
  }: Props) => {
    const theme = useTheme();
    return (
      <View
        style={[
          style,
          {
            marginRight: marginRight,
            marginLeft: marginLeft,
            marginHorizontal: marginHorizontal,
            marginTop: marginTop,
            marginBottom: marginBottom,
            marginVertical: marginVertical,
            alignSelf: center ? "center" : "auto",
          },
        ]}
      >
        <Skeleton
          colors={["rgba(245, 247, 245, 1)", "rgba(235, 234, 242, 1)"]}
          height={height}
          width={width}
          radius={type}
          transition={{
            translateX: {
              type: "timing",
              duration: 700,
            },
          }}
        />
      </View>
    );
  }
);

export default SkeletonItem;
