import React, { memo } from "react";
import { StyleService, useStyleSheet, Layout } from "@ui-kitten/components";
import Text from "components/Text";
import { View } from "react-native";
import { globalStyle } from "styles/globalStyle";
import GradientActivityBar from "./GradientActivityBar";
import SurveyView from "../SurveyView";
import AdMob from "components/AdMob";

interface DotColor {
  color: string;
  title: string;
}

const ActivityChart = memo(() => {
  const styles = useStyleSheet(themedStyles);
  const DotCatalog = React.useCallback(({ color, title }: DotColor) => {
    return (
      <View style={[globalStyle.flexDirection, globalStyle.alignItemsCenter]}>
        <View style={[{ backgroundColor: color }, styles.dot]} />
        <Text category="c4" marginLeft={8}>
          {title}
        </Text>
      </View>
    );
  }, []);
  return (
    <Layout style={styles.container}>
      <GradientActivityBar />
      <View style={styles.time}>
        <Text category="c4">00:00</Text>
        <Text category="c4">12:00</Text>
        <Text category="c4">24:00</Text>
      </View>
      <View style={styles.catalog}>
        <DotCatalog color="#FA4169" title="High" />
        <DotCatalog color="#FFB540" title="Moderate" />
        <DotCatalog color="#06D6A0" title="Light" />
      </View>
      <SurveyView burnKCal={436} distance={"11.5"} />
      <AdMob marginTop={24} />
    </Layout>
  );
});

export default ActivityChart;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
  },
  catalog: {
    ...globalStyle.flexSpaceBetween,
    marginHorizontal: 52,
    marginTop: 16,
    marginBottom: 24,
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
