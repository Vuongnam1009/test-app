import React, { memo } from "react";
import { StyleService, useStyleSheet, Layout } from "@ui-kitten/components";
import Text from "components/Text";
import { View } from "react-native";
import { globalStyle } from "styles/globalStyle";
import GradientRestBar from "./GradientRestBar";
import SurveyView from "../SurveyView";
import AdMob from "components/AdMob";

interface DotColor {
  color: string;
  title: string;
  marginRight?: number;
  marginLeft?: number;
}

const RestingChart = memo(() => {
  const styles = useStyleSheet(themedStyles);
  const DotCatalog = React.useCallback(
    ({ color, title, marginRight, marginLeft }: DotColor) => {
      return (
        <View
          style={[
            globalStyle.flexDirection,
            globalStyle.alignItemsCenter,
            {
              marginRight: marginRight,
              marginLeft: marginLeft,
            },
          ]}
        >
          <View style={[{ backgroundColor: color }, styles.dot]} />
          <Text category="c4" marginLeft={8}>
            {title}
          </Text>
        </View>
      );
    },
    []
  );
  return (
    <Layout style={styles.container}>
      <GradientRestBar />
      <View style={styles.time}>
        <Text category="c4">00:00</Text>
        <Text category="c4">12:00</Text>
        <Text category="c4">24:00</Text>
      </View>
      <View style={styles.catalog}>
        <DotCatalog color="#1D1E2C" title="Deep" marginRight={52} />
        <DotCatalog color="#6266F9" title="Light" />
      </View>
      <SurveyView burnKCal={128} rest />
      <AdMob marginTop={24} />
    </Layout>
  );
});

export default RestingChart;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
  },
  catalog: {
    ...globalStyle.flexSpaceBetween,
    marginTop: 16,
    marginBottom: 24,
    alignSelf: "center",
  },
  time: {
    ...globalStyle.flexSpaceBetween,
    paddingHorizontal: 16,
    marginTop: 8,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 99,
  },
});
