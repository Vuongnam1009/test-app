import React, { memo } from "react";
import {
  View,
  ScrollView,
  ViewStyle,
  Image,
  TextInput,
  Animated,
} from "react-native";
import { useTheme, StyleService, useStyleSheet } from "@ui-kitten/components";
import useLayout from "hooks/useLayout";
import Text from "components/Text";
import { Images } from "assets/images";
interface Props {
  //Container style
  style?: ViewStyle;
  // Component's width
  widthComponent?: number;
  //Component's height
  heightComponent?: number;
  // Vertical mode
  vertical?: boolean;
  // Minimum value of the ruler
  minimum?: number;
  // Maximum value of the ruler
  maximum?: number;
  // Each segment's width
  segmentWidth?: number;
  // Each segment's space
  segmentSpacing?: number;
  // Color of indicator
  indicatorColor?: string;
  // Indicator's width
  indicatorWidth?: number;
  // Indicator's height
  indicatorHeight?: number;
  // Indicator's space from bottom
  indicatorBottom?: number;
  // Step
  step?: number;
  // Steps color
  stepColor?: string;
  // Steps height
  stepHeight?: number;
  // Normal lines color
  normalColor?: string;
  // Normal lines height
  normalHeight?: number;
  // Background color
  backgroundColor?: string;
  // Number's font family
  numberFontFamily?: string;
  // Number's size
  numberSize?: number;
  // Number's color
  numberColor?: string;
  // Unit
  unit?: string;
  // Unit's space from bottom
  unitBottom?: number;
  // Unit's font family
  unitFontFamily?: string;
  // Unit's color
  unitColor?: string;
  // Unit's size
  unitSize?: number;
  // On value change
  onChangeValue?: () => {};
}
const RulerWeight = memo(
  ({
    widthComponent,
    heightComponent = 812,
    backgroundColor = "#FFFFFF",
    normalColor = "#999999",
    normalHeight = 20,
    numberFontFamily,
    numberSize = 40,
    numberColor = "#000000",
    vertical = false,
    maximum = 100,
    minimum = 0,
    step = 10,
    stepColor = "white",
    stepHeight = 20,
    segmentSpacing = 0,
    segmentWidth = 2,
    style,
    indicatorWidth = 100,
    indicatorBottom = 20,
    indicatorColor = "green",
    indicatorHeight = 100,
    unit = "lbs",
    unitBottom = 812 * 0.027,
    unitColor = "#888888",
    unitSize = 16,
    unitFontFamily,
  }: Props) => {
    const { height, width, top, bottom } = useLayout();
    const theme = useTheme();
    const styles = useStyleSheet(themedStyles);

    const scrollX = new Animated.Value(0);
    const scrollRef = React.useRef<ScrollView>(null);
    const textInputRef = React.useRef<TextInput>(null);
    const [lbs, setLbs] = React.useState<number>(0);

    const data = [...Array(maximum - minimum + 1).keys()].map(
      (i) => i + minimum
    );
    let snapSegment = segmentWidth + segmentSpacing;
    let spaceWidth = (width - segmentWidth) / 2;
    let rulerWidth = width - segmentWidth + (maximum - minimum) * snapSegment;

    const RenderRuler = React.useCallback(() => {
      return (
        <View
          style={{
            width: rulerWidth,
            flexDirection: "row",
            justifyContent: "flex-start",
            alignItems: "flex-end",
            alignSelf: "flex-end",
            backgroundColor: backgroundColor,
          }}
        >
          {/* Spacer */}
          <View
            style={{
              width: spaceWidth,
            }}
          />
          {/* Ruler */}

          {data.map((i) => {
            return (
              <View
                key={i}
                style={{
                  backgroundColor: i % step === 0 ? stepColor : normalColor,
                  height: i % step === 0 ? stepHeight : normalHeight,
                  width: segmentWidth,
                  marginRight: segmentSpacing,
                  alignSelf: "flex-start",
                  marginBottom: 10,
                }}
              />
            );
          })}
        </View>
      );
    }, []);

    React.useEffect(() => {
      scrollX.addListener(({ value }) => {
        if (textInputRef && textInputRef.current) {
          textInputRef.current.setNativeProps({
            text: `${(value / snapSegment + minimum).toFixed(0)}`,
          });
          setLbs(value / snapSegment + minimum);
        } else {
        }
      });
    }, [scrollX, scrollRef, textInputRef]);

    return (
      <View
        style={[
          style,
          {
            flex: 1,
            backgroundColor,
            width: widthComponent,
            height: heightComponent,
            transform: vertical ? [{ rotate: "-90deg" }] : undefined,
          },
        ]}
      >
        <View style={[styles.fadeView, { left: 0 }]} />
        <View style={[styles.fadeView, { right: 0 }]} />
        <Animated.ScrollView
          ref={scrollRef}
          horizontal
          contentContainerStyle={{
            justifyContent: "flex-start",
          }}
          bounces={false}
          showsHorizontalScrollIndicator={false}
          scrollEventThrottle={16}
          snapToInterval={snapSegment}
          onScroll={Animated.event(
            [
              {
                nativeEvent: {
                  contentOffset: { x: scrollX },
                },
              },
            ],
            { useNativeDriver: true }
          )}
        >
          <RenderRuler />
        </Animated.ScrollView>
        {/* Number && Unit */}
        <View
          style={{
            width: indicatorWidth,
            justifyContent: "center",
            alignItems: "center",
            position: "absolute",
            bottom: indicatorBottom,
            left: (width - indicatorWidth) / 2,
          }}
          pointerEvents="none"
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "flex-start",
              transform: vertical ? [{ rotate: "90deg" }] : undefined,
              width: 120,
            }}
          >
            {/* Number */}
            <TextInput
              ref={textInputRef}
              style={styles.input}
              defaultValue={minimum.toString()}
            />
            {/* Unit */}
            <Text
              lineHeight={35.57}
              fontSize={unitSize ? unitSize : 24}
              marginBottom={unitBottom ? unitBottom : undefined}
              style={[
                styles.unit,
                {
                  color: theme["text-basic-color"] || unitColor,
                  fontFamily: unitFontFamily
                    ? unitFontFamily
                    : "Oswald-Regular",
                  alignSelf: "flex-end",
                  marginLeft: 4,
                },
              ]}
            >
              {unit}
            </Text>
          </View>
          <Text
            fontSize={14}
            lineHeight={21}
            marginBottom={16}
            style={styles.kg}
          >
            ~{(lbs * 0.45359237).toFixed(1)}kg
          </Text>
          {/* Indicator */}
          {/* <View
            style={{
              height: indicatorHeight,
              backgroundColor: indicatorColor,
              width: segmentWidth,
            }}
          /> */}
          <Image source={Images.arrWeight} style={{}} />
        </View>
      </View>
    );
  }
);

export default RulerWeight;

const themedStyles = StyleService.create({
  container: {},
  unit: {
    fontSize: 24,
    fontFamily: "Oswald-Regular",
  },
  input: {
    fontSize: 72,
    fontFamily: "Oswald-Regular",
    color: "text-danger-color",
  },
  kg: {
    fontFamily: "Oswald-Regular",
  },
  fadeView: {
    opacity: 0.65,
    backgroundColor: "#FFFFFF",
    height: 240,
    width: 32,
    position: "absolute",
    top: 0,
    zIndex: 10,
  },
});
