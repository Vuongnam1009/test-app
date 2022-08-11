import React, { memo } from "react";
import { ViewStyle } from "react-native";
import {
  StyleService,
  useStyleSheet,
  Input,
  InputProps,
} from "@ui-kitten/components";

import Text from "components/Text";
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";

export interface MyInputProps extends InputProps {
  containerStyle?: ViewStyle;
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
}
const AnimatedInput = memo(
  ({
    value,
    status,
    autoFocus,
    containerStyle,
    size = "large",
    onTouchEnd,
    onTouchStart,
    keyboardType,
    textStyle,
    caption,
    placeholder,
    style,
    setValue,
    multiline,
    onFocus,
    ...rest
  }: MyInputProps) => {
    const styles = useStyleSheet(themedStyles);
    const animated = useSharedValue(0);
    const [isFocus, setIsFocus] = React.useState(false);
    const refInput = React.useRef<Input>(null);
    React.useEffect(() => {
      if (value !== "" && isFocus === true) {
        animated.value = 1;
      } else {
        animated.value = 0;
      }
    }, [value, animated.value]);

    const animatedStyle = useAnimatedStyle(() => {
      const translateY = interpolate(
        animated.value,
        [1, 0],
        [4, 18],
        Extrapolate.CLAMP
      );
      const translateX = interpolate(
        animated.value,
        [1, 0],
        [-5, 0],
        Extrapolate.CLAMP
      );
      const scale = interpolate(
        animated.value,
        [1, 0],
        [0.85, 1.01],
        Extrapolate.CLAMP
      );
      return {
        position: "absolute",
        zIndex: 10,
        left: 16,
        transform: [{ translateY }, { scale }, { translateX }],
        backgroundColor: "transparent",
      };
    });
    return (
      <Animated.View style={containerStyle}>
        <Animated.View style={animatedStyle}>
          <Text
            category={"b2-s"}
            status="placeholder"
            onPress={() => {
              refInput.current?.focus();
            }}
          >
            {placeholder}
          </Text>
        </Animated.View>
        <Input
          {...rest}
          ref={refInput}
          status={status}
          onChangeText={(prv) => setValue(prv)}
          autoFocus={autoFocus}
          value={value}
          onFocus={() => {
            setIsFocus(true);
          }}
          onBlur={() => setIsFocus(false)}
          size={size}
          style={style}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
          keyboardType={keyboardType}
          textStyle={[
            textStyle,
            {
              marginTop: value === "" ? -4 : 16,
              fontFamily: "Montserrat-Medium",
            },
          ]}
          multiline={multiline}
          caption={caption}
        />
      </Animated.View>
    );
  }
);

export default AnimatedInput;

const themedStyles = StyleService.create({
  container: {},
});
