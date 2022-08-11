import React, { memo } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import MainBottomTab from "./MainBottomTab";
import { RootStackParamList } from "./types";

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
import useLayout from "hooks/useLayout";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import useModal from "hooks/useModal";
import ModalConfirm from "components/ModalConfirm";
import { Images } from "assets/images";
import Text from "components/Text";

const Stack = createStackNavigator();

const DrawerMainStack = memo(() => {
  const { height, bottom } = useLayout();
  const isDrawerVisible = useDrawerStatus();
  const AniValue = useSharedValue(0);
  const theme = useTheme();
  const { navigate } = useNavigation<NavigationProp<RootStackParamList>>();
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
      <TouchableOpacity
        onPress={() => navigate("NewPostStack", { screen: "ChoosePhoto" })}
        style={[styles.newPost, { bottom: bottom }]}
      />
      <Stack.Navigator>
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name={"MainBottomTab"}
          component={MainBottomTab}
        />
      </Stack.Navigator>

      <ModalConfirm
        ref={modalRef}
        title={"Appointment!"}
        description={
          <View>
            <Text category="b2-p" center>
              You have an appointment with
            </Text>
            <Text category="b2-p" center status={"danger"}>
              Dr. Manhattan, Today 16:45
            </Text>
          </View>
        }
        avatar={Images.pet4}
        buttonAbove={{ title: "Snooze", onPress: hide }}
        buttonBelow={{
          title: <Text underline>I Got It!</Text>,
          status: "transparent",
          onPress: hide,
        }}
      />
    </Animated.View>
  );
});

export default DrawerMainStack;

const styles = StyleSheet.create({
  newPost: {
    position: "absolute",
    bottom: 30,
    width: 40,
    zIndex: 100,
    height: 40,
    alignSelf: "center",
  },
  profile: {},
});
