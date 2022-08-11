import React from "react";
import { View, Image } from "react-native";
import { StyleService, useStyleSheet } from "@ui-kitten/components";
import useLayout from "hooks/useLayout";
import { globalStyle } from "styles/globalStyle";

import Text from "components/Text";
import { Images } from "assets/images";

interface Props {
  text?: string;
  img?: boolean;
  title?: string;
}

const BackgroundLogin = ({ text, img, title }: Props) => {
  const { height, width, top, bottom } = useLayout();
  const styles = useStyleSheet(themedStyles);
  return (
    <>
      <View style={[styles.container, { width: width, height: height }]}>
        <View style={{ marginTop: top + 77 }}>
          <Text style={styles.text} lineHeight={87} uppercase>
            {text}
          </Text>
          <Text marginLeft={32} style={styles.title} category="h2">
            {title}
          </Text>
        </View>
        {img ? (
          <Image
            source={Images.bgLogin}
            /* @ts-ignore */
            style={[
              { width: width, height: height, ...globalStyle.absoluteBg },
            ]}
          />
        ) : null}
      </View>
    </>
  );
};

export default BackgroundLogin;

const themedStyles = StyleService.create({
  container: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: -10,
  },
  text: {
    fontSize: 72,
    color: "color-basic-200",
    fontWeight: "700",
    fontFamily: "Montserrat-Bold",
    marginLeft: -6,
  },
  title: {
    position: "absolute",
    bottom: 12,
    left: 0,
  },
});
