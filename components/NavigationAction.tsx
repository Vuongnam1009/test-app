import React, { memo } from "react";
import {
  ColorValue,
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
} from "react-native";
import { useTheme, Icon, TopNavigationAction } from "@ui-kitten/components";
import { useNavigation } from "@react-navigation/native";

import Text from "./Text";

import { EvaStatus } from "@ui-kitten/components/devsupport";

interface NavigationActionProps {
  icon?: string;
  iconColor?: string;
  marginTop?: number;
  marginBottom?: number;
  marginLeft?: number;
  marginRight?: number;
  marginHorizontal?: number;
  marginVertical?: number;
  backgroundColor?: string | ColorValue;
  onPress?: () => void;
  title?: string;
  titleStatus?: EvaStatus | "body" | "white";
  status?: "basic" | "primary" | "transparent";
  size?: "giant" | "large" | "medium" | "small";
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
}

const NavigationAction = memo(
  ({
    marginTop,
    marginBottom,
    marginLeft,
    marginRight,
    marginHorizontal,
    marginVertical,
    onPress,
    iconColor,
    icon,
    title,
    size = "large",
    status = "basic",
    titleStatus,
    disabled,
    backgroundColor,
    style,
  }: NavigationActionProps) => {
    const themes = useTheme();

    const { goBack } = useNavigation();
    const _onPress = React.useCallback(() => {
      if (onPress) {
        onPress && onPress();
      } else {
        goBack();
      }
    }, [onPress, goBack]);

    const getBackgroundColor = (
      status: "basic" | "primary" | "transparent"
    ): string => {
      switch (status) {
        case "basic":
          return themes["background-basic-color-1"];

        case "primary":
          return themes["background-basic-color-2"];
        case "transparent":
          return "transparent";
        default:
          return themes["background-basic-color-1"];
      }
    };
    const getIconColor = (
      status: "basic" | "primary" | "transparent"
    ): string => {
      switch (status) {
        case "basic":
          return themes["text-basic-color"];
        case "primary":
          return themes["text-primary-color"];
        case "transparent":
          return themes["text-primary-color"];
        default:
          return themes["text-basic-color"];
      }
    };

    const getSize = (size: "giant" | "large" | "medium" | "small"): number => {
      switch (size) {
        case "giant":
          return 48;
        case "large":
          return 40;
        case "medium":
          return 32;
        case "small":
          return 28;
        default:
          return 40;
      }
    };

    const getSizeIcon = (
      size: "giant" | "large" | "medium" | "small"
    ): number => {
      switch (size) {
        case "giant":
          return 24;
        case "large":
          return 24;
        case "medium":
          return 24;
        case "small":
          return 16;
        default:
          return 16;
      }
    };
    const getBorder = (
      size: "giant" | "large" | "medium" | "small"
    ): number => {
      switch (size) {
        case "giant":
          return 16;
        case "large":
          return 12;
        case "medium":
          return 12;
        case "small":
          return 8;
        default:
          return 12;
      }
    };

    return title ? (
      <TouchableOpacity
        disabled={disabled}
        activeOpacity={0.7}
        onPress={_onPress}
      >
        <Text category="h4" status={titleStatus}>
          {title}
        </Text>
      </TouchableOpacity>
    ) : (
      <TopNavigationAction
        onPress={_onPress}
        disabled={disabled}
        activeOpacity={0.7}
        style={[
          styles.container,
          style,
          {
            marginBottom: marginBottom,
            marginTop: marginTop,
            marginLeft: marginLeft,
            marginRight: marginRight,
            marginHorizontal: marginHorizontal,
            marginVertical: marginVertical,
            height: getSize(size),
            width: getSize(size),
            borderRadius: getBorder(size),
            backgroundColor: backgroundColor || getBackgroundColor(status),
          },
        ]}
        icon={(props) => (
          <Icon
            {...props}
            pack="assets"
            name={icon || "back"}
            style={[
              {
                height: getSizeIcon(size),
                width: getSizeIcon(size),
              },
              { tintColor: iconColor || getIconColor(status) },
            ]}
          />
        )}
      />
    );
  }
);

export default NavigationAction;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
});
