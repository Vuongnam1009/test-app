import React, { memo } from "react";
import { View, TouchableOpacity, ViewStyle } from "react-native";
import { StyleService, useStyleSheet, Icon } from "@ui-kitten/components";
import { globalStyle } from "styles/globalStyle";

import Text from "components/Text";
import Animated, {
  Easing,
  interpolate,
  measure,
  runOnUI,
  useAnimatedRef,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import useLayout from "hooks/useLayout";
interface Props {
  title: string;
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  list: string[];
  style?: ViewStyle;
  marginRight?: number;
  marginLeft?: number;
  disable?: boolean;
}

const DropDown = memo(
  ({
    list,
    value,
    title,
    setValue,
    marginLeft,
    marginRight,
    style,
    disable,
  }: Props) => {
    const styles = useStyleSheet(themedStyles);
    const { width } = useLayout();
    const aref = useAnimatedRef<View>();
    const open = useSharedValue(false);
    const progress = useDerivedValue(() =>
      open.value ? withSpring(1) : withTiming(0)
    );
    const height = useSharedValue(0);

    const styleAnimated = useAnimatedStyle(() => ({
      height: height.value * progress.value + 1,
      opacity: progress.value === 0 ? 0 : 1,
      overflow: "scroll",
    }));

    const rotateZ = useDerivedValue(() => {
      return withTiming(progress.value ? 0 : -90, {
        duration: 150,
        easing: Easing.ease,
      });
    });
    const styleIconDrop = useAnimatedStyle(() => {
      const translateX = interpolate(progress.value, [0, 1], [0, 0]);
      return {
        transform: [
          { rotateZ: `${rotateZ.value}deg` },
          {
            translateX: withTiming(translateX, {
              duration: 150,
              easing: Easing.ease,
            }),
          },
        ],
      };
    });

    const _onPress = React.useCallback((string) => {
      setValue(string);
      handleDrop();
    }, []);
    const handleDrop = React.useCallback(() => {
      if (height.value === 0) {
        runOnUI(() => {
          "worklet";
          height.value = measure(aref).height;
        })();
      }
      open.value = !open.value;
    }, []);
    return (
      <>
        <TouchableOpacity
          activeOpacity={0.54}
          onPress={handleDrop}
          disabled={disable}
          style={[
            styles.button,
            { width: width - 32 },
            style,
            { marginRight: marginRight, marginLeft: marginLeft },
          ]}
        >
          <View style={[globalStyle.flexSpaceBetween, globalStyle.padV24]}>
            <Text>{title}</Text>
            <View style={[globalStyle.flexDirection, globalStyle.padH32]}>
              <Text center marginRight={8} status={"info"}>
                {value || list[0]}
              </Text>
              <Animated.View style={styleIconDrop}>
                <Icon pack="assets" name="arrDown" style={styles.arrDown} />
              </Animated.View>
            </View>
          </View>
        </TouchableOpacity>
        <Animated.ScrollView
          style={styleAnimated}
          scrollEventThrottle={16}
          showsVerticalScrollIndicator={false}
          scrollEnabled={false}
        >
          <View
            ref={aref}
            onLayout={({
              nativeEvent: {
                layout: { height: h },
              },
            }) => console.log({ h })}
          >
            <>
              {list.map((item, i) => {
                return (
                  <TouchableOpacity
                    onPress={() => _onPress(item)}
                    key={i}
                    style={{
                      alignSelf: "flex-end",
                      width: "50%",
                      ...globalStyle.shadow,
                      backgroundColor: "#FAFAFA",
                      marginVertical: 6,
                      borderRadius: 4,
                      borderWidth: 1,
                      borderColor: "#6266F9",
                      marginRight: 24,
                    }}
                  >
                    <Text center marginVertical={16} status={"info"}>
                      {item}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </>
          </View>
        </Animated.ScrollView>
      </>
    );
  }
);

export default DropDown;

const themedStyles = StyleService.create({
  button: {
    borderBottomWidth: 1,
    borderBottomColor: "background-basic-color-2",
  },
  arrDown: {
    width: 16,
    height: 16,
  },
  alert: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 24,
    borderBottomColor: "background-basic-color-2",
    borderBottomWidth: 1,
    paddingRight: 32,
  },
  content: {
    width: 120,
  },
});
