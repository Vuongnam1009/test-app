import React, { memo } from "react";
import { StyleProp, TextStyle } from "react-native";
import { Text, TextProps } from "@ui-kitten/components";
import { EvaStatus } from "@ui-kitten/components/devsupport";

export interface MyTextProps extends TextProps {
  style?: StyleProp<TextStyle>;
  category?:
    | "os1"
    | "os2"
    | "h1"
    | "h2"
    | "h3"
    | "h4"
    | "b1"
    | "b2-p"
    | "b2-m"
    | "b2-s"
    | "b3"
    | "c1"
    | "c2"
    | "c3"
    | "c4"
    | "d1";
  status?: EvaStatus | "primary";
  children?: any;
  marginLeft?: number;
  marginRight?: number;
  marginTop?: number;
  marginBottom?: number;
  marginVertical?: number;
  marginHorizontal?: number;
  opacity?: number;
  maxWidth?: number;
  fontSize?: number;
  lineHeight?: number;
  uppercase?: boolean;
  lowercase?: boolean;
  capitalize?: boolean;
  none?: boolean;
  left?: boolean;
  right?: boolean;
  center?: boolean;
  underline?: boolean;
  fontFamily?:
    | "Montserrat-Regular"
    | "Montserrat-Medium"
    | "Oswald-Regular"
    | "Montserrat-Bold";
  bold?: boolean;
  italic?: boolean;
  fontWeight?:
    | "bold"
    | "normal"
    | "100"
    | "200"
    | "300"
    | "400"
    | "500"
    | "600"
    | "700"
    | "800"
    | "900";
}
const getLineHeight = (
  category:
    | "os1"
    | "os2"
    | "h1"
    | "h2"
    | "h3"
    | "h4"
    | "b1"
    | "b2-p"
    | "b2-m"
    | "b2-s"
    | "b3"
    | "c1"
    | "c2"
    | "c3"
    | "c4"
    | "d1"
): number => {
  switch (category) {
    case "os1":
      return 53.35;
    case "os2":
      return 26.68;
    case "h1":
      return 53.35;
    case "h2":
      return 29.26;
    case "h3":
      return 24.38;
    case "h4":
      return 21.94;
    case "b1":
      return 19.5;
    case "b2-p":
      return 24;
    case "b2-m":
      return 20.75;
    case "b2-s":
      return 17.07;
    case "b3":
      return 15.85;
    case "c1":
      return 20;
    case "c2":
      return 18;
    case "c3":
      return 16;
    case "c4":
      return 14.63;
    case "d1":
      return 12.19;
    default:
      return 17.07;
  }
};
const getFont = (
  category:
    | "h1"
    | "h2"
    | "os1"
    | "os2"
    | "h3"
    | "h4"
    | "b1"
    | "b2-p"
    | "b2-m"
    | "b2-s"
    | "b3"
    | "c1"
    | "c2"
    | "c3"
    | "c4"
    | "d1"
): string => {
  switch (category) {
    case "os1":
      return "Oswald-Regular";
    case "os2":
      return "Oswald-Regular";
    case "h1":
      return "Montserrat-Medium";
    case "h2":
      return "Montserrat-Medium";
    case "h3":
      return "Montserrat-Medium";
    case "h4":
      return "Montserrat-Medium";
    case "b1":
      return "Montserrat-Medium";
    case "b2-p":
      return "Montserrat-Regular";
    case "b2-m":
      return "Montserrat-Regular";
    case "b2-s":
      return "Montserrat-Regular";
    case "b3":
      return "Montserrat-Regular";
    case "c1":
      return "Montserrat-Regular";
    case "c2":
      return "Montserrat-Regular";
    case "c3":
      return "Montserrat-Regular";
    case "c4":
      return "Montserrat-Regular";
    case "d1":
      return "Montserrat-Regular";
    default:
      return "Montserrat-Regular";
  }
};
export default memo(
  ({
    marginLeft,
    marginRight,
    marginTop,
    marginBottom,
    marginVertical,
    marginHorizontal,
    opacity,
    uppercase,
    lowercase,
    capitalize,
    none,
    left,
    lineHeight,
    right,
    center,
    underline,
    bold,
    italic,
    category = "b2-s",
    status = "basic",
    fontFamily,
    children,
    maxWidth,
    style,
    fontWeight,
    ...rest
  }: MyTextProps) => {
    let textAlign: "left" | "center" | "right" | "auto" | "justify" | "left";

    left
      ? (textAlign = "left")
      : right
      ? (textAlign = "right")
      : center
      ? (textAlign = "center")
      : (textAlign = "left");

    let textTransform: "uppercase" | "lowercase" | "capitalize" | "none";

    uppercase
      ? (textTransform = "uppercase")
      : lowercase
      ? (textTransform = "lowercase")
      : capitalize
      ? (textTransform = "capitalize")
      : none
      ? (textTransform = "none")
      : (textTransform = "none");

    let textDecorationLine:
      | "none"
      | "underline"
      | "line-through"
      | "underline line-through";
    underline
      ? (textDecorationLine = "underline")
      : (textDecorationLine = "none");

    let fontStyle: "normal" | "italic";
    italic ? (fontStyle = "italic") : (fontStyle = "normal");

    return (
      <Text
        category={category}
        status={status}
        style={[
          {
            marginLeft: marginLeft,
            marginRight: marginRight,
            marginTop: marginTop,
            marginBottom: marginBottom,
            marginVertical: marginVertical,
            marginHorizontal: marginHorizontal,
            opacity: opacity,
            textAlign: textAlign,
            maxWidth: maxWidth,
            lineHeight: lineHeight || getLineHeight(category),
            textTransform: textTransform,
            textDecorationLine: textDecorationLine,
            fontStyle: fontStyle,
            fontWeight: fontWeight,
            fontFamily: fontFamily ? fontFamily : getFont(category),
          },
          style,
        ]}
        {...rest}
      >
        {children}
      </Text>
    );
  }
);
