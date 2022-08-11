import React from "react";
import { StyleSheet, TouchableOpacity, ViewStyle } from "react-native";
import { useTheme, Layout } from "@ui-kitten/components";

import Text from "components/Text";
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

interface Props {
  data: string[];
  style?: ViewStyle;
  disabled?: boolean;
  selectedIndex: number;
  onChange(index: number): void;
}

const TabBarAnimation = ({
  data,
  style,
  selectedIndex,
  disabled,

  onChange,
}: Props) => {
  const theme = useTheme();
  const transX = useSharedValue(0);

  const [widthItem, setWidthItem] = React.useState(0);

  React.useEffect(() => {
    transX.value = widthItem * selectedIndex;
  }, [selectedIndex, transX, widthItem]);
  const backgroundColor = interpolateColor(
    transX.value,
    [0, widthItem * 1],
    ["#FA4169", "#FA4169"]
  );
  const animatedStyles = useAnimatedStyle(() => {
    return {
      backgroundColor: backgroundColor,
      transform: [
        {
          translateX: withSpring(transX.value, {
            stiffness: 150,
            damping: 24,
            restDisplacementThreshold: 10,
          }),
        },
      ],
    };
  });

  return (
    // <View style={{ borderRadius: 99, borderColor: "blue", borderWidth: 1 }}>
    <Layout style={[styles.container, style]}>
      <Animated.View
        style={[
          styles.boxAni,
          animatedStyles,
          { width: `${100 / data.length}%` },
        ]}
        onLayout={({ nativeEvent }) => setWidthItem(nativeEvent.layout.width)}
      />
      {data.map((item, index) => {
        return (
          <TouchableOpacity
            key={index}
            disabled={disabled}
            onPress={() => onChange(index)}
            style={styles.btn}
            activeOpacity={0.7}
          >
            <Text
              uppercase
              category="c4"
              status={selectedIndex === index ? "primary" : "placeholder"}
            >
              {item}
            </Text>
          </TouchableOpacity>
        );
      })}
    </Layout>
    // </View>
  );
};

export default TabBarAnimation;

const styles = StyleSheet.create({
  container: {
    height: 34,
    borderRadius: 99,
    flexDirection: "row",
    overflow: "hidden",
    alignSelf: "center",
    marginHorizontal: 100,
    marginBottom: 16,
    marginTop: 24,
    borderWidth: 1,
    borderColor: "#E5E5E5",
  },
  boxAni: {
    height: 32,
    position: "absolute",
    borderRadius: 24,
  },
  btn: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
