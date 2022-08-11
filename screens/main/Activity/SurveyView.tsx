import React, { memo } from "react";
import { View } from "react-native";
import { StyleService, useStyleSheet } from "@ui-kitten/components";
import { globalStyle } from "styles/globalStyle";

import Text from "components/Text";

interface Props {
  rest?: boolean;
  burnKCal?: number;
  deepTime?: string;
  distance?: string;
}

const SurveyView = memo(({ rest, burnKCal, deepTime, distance }: Props) => {
  const styles = useStyleSheet(themedStyles);
  return (
    <View style={styles.container}>
      {!rest ? (
        <View>
          <View style={globalStyle.flexSpaceBetween}>
            <View style={globalStyle.flexDirection}>
              <Text style={styles.bigText}>8</Text>
              <Text style={styles.text}>h</Text>
              <Text style={styles.bigText}>24</Text>
              <Text style={styles.text}>m</Text>
            </View>
            <View style={globalStyle.flexDirection}>
              <Text style={styles.bigText}>{burnKCal}</Text>
              <Text style={styles.text}>kcal</Text>
            </View>
            <View style={globalStyle.flexDirection}>
              <Text style={styles.bigText}>{distance}</Text>
              <Text style={styles.text}>km</Text>
            </View>
          </View>
          <View style={globalStyle.flexSpaceBetween}>
            <Text category="c4" status={"placeholder"}>
              Activity
            </Text>
            <Text category="c4" status={"placeholder"}>
              Burn
            </Text>
            <Text category="c4" status={"placeholder"}>
              Distance
            </Text>
          </View>
        </View>
      ) : (
        <View>
          <View style={[globalStyle.flexSpaceBetween]}>
            <View style={globalStyle.flexDirection}>
              <Text style={styles.bigText}>8</Text>
              <Text style={styles.text}>h</Text>
              <Text style={styles.bigText}>24</Text>
              <Text style={styles.text}>m</Text>
            </View>
            <View style={globalStyle.flexDirection}>
              <Text style={styles.bigText}>{burnKCal}</Text>
              <Text style={styles.text}>kcal</Text>
            </View>
            <View style={globalStyle.flexDirection}>
              <Text style={styles.bigText}>11</Text>
              <Text style={styles.text}>h</Text>
              <Text style={styles.bigText}>27</Text>
              <Text style={styles.text}>m</Text>
            </View>
          </View>
          <View style={globalStyle.flexSpaceBetween}>
            <Text category="c4" status={"placeholder"}>
              Rest
            </Text>
            <Text category="c4" status={"placeholder"}>
              Burn
            </Text>
            <Text category="c4" status={"placeholder"}>
              Deep
            </Text>
          </View>
        </View>
      )}
    </View>
  );
});

export default SurveyView;

const themedStyles = StyleService.create({
  container: {
    paddingHorizontal: 16,
  },
  text: {
    fontFamily: "Oswald-Regular",
    fontSize: 18,
    lineHeight: 38.68,
    fontWeight: "400",
    alignSelf: "flex-end",
  },
  bigText: {
    fontFamily: "Oswald-Regular",
    fontSize: 36,
    lineHeight: 53.35,
    fontWeight: "400",
  },
});
