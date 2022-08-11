import React, { memo } from "react";
import { StyleSheet } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";

import { useDrawerStatus } from "@react-navigation/drawer";
import Animated, {
  Easing,
  Extrapolate,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { useTheme } from "@ui-kitten/components";
import useModal from "hooks/useModal";
import VetBottomTab from "./VetBottomTab";

const Stack = createStackNavigator();

const DrawerMainStack = memo(() => {
  const isDrawerVisible = useDrawerStatus();
  const AniValue = useSharedValue(0);
  const theme = useTheme();
  const { modalRef, hide, show } = useModal();

  React.useEffect(() => {
    if (isDrawerVisible === "open") {
      AniValue.value = 1;
    } else {
      AniValue.value = 0;
      setTimeout(() => {
        show();
      }, 1200);
      clearTimeout();
    }
  }, [isDrawerVisible, AniValue]);

  const animatedStyle = useAnimatedStyle(() => {
    let input = [0, 1];
    let Clamp = Extrapolate.CLAMP;
    let duration = { duration: 550, easing: Easing.circle };
    const scale = interpolate(AniValue.value, input, [1, 0.82], Clamp);
    const moveX = interpolate(AniValue.value, input, [0, -16], Clamp);
    const borderWidth = interpolate(AniValue.value, input, [0, 6.5], Clamp);
    const borderRadius = interpolate(AniValue.value, input, [0, 24], Clamp);
    return {
      flex: 1,
      transform: [
        { scale: withTiming(scale, duration) },
        { translateX: moveX },
      ],
      borderWidth: withTiming(borderWidth, duration),
      borderRadius: withTiming(borderRadius, duration),
      borderColor: theme["background-basic-color-1"],
      backgroundColor: theme["background-basic-color-1"],
      ...StyleSheet.flatten,
    };
  });
  return (
    <Animated.View style={animatedStyle}>
      <Stack.Navigator>
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name={"VetBottomTab"}
          component={VetBottomTab}
        />
      </Stack.Navigator>
    </Animated.View>
  );
});

export default DrawerMainStack;

const styles = StyleSheet.create({});
