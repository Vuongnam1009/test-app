import React, { memo } from "react";
import { View, ImageBackground } from "react-native";
import { StyleService, useStyleSheet } from "@ui-kitten/components";
import useLayout from "hooks/useLayout";
import { Images } from "assets/images";

const BackgroundDrawer = memo(() => {
  const { height, width, top, bottom } = useLayout();
  const styles = useStyleSheet(themedStyles);
  return (
    <View
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: width,
        height: height,
      }}
    >
      <ImageBackground
        source={Images.fIntro}
        style={{
          width: width,
          height: height,
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: -10,
        }}
      />
      <View
        style={{
          backgroundColor: "rgba(29, 30, 44, 0.8)",
          width: width,
          height: height,
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: -10,
        }}
      />
    </View>
  );
});

export default BackgroundDrawer;

const themedStyles = StyleService.create({
  container: {},
});
