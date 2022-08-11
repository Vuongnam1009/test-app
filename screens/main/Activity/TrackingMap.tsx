import React, { memo } from "react";
import { View, Image, TouchableOpacity } from "react-native";
import { StyleService, useStyleSheet, Icon } from "@ui-kitten/components";

import useLayout from "hooks/useLayout";
import Text from "components/Text";
import { Images } from "assets/images";
import { useTranslation } from "react-i18next";

interface Props {
  petName: string;
  location: string;
  onPress?(): void;
}

const TrackingMap = memo(({ onPress, petName, location }: Props) => {
  const { height, width, top, bottom } = useLayout();
  const styles = useStyleSheet(themedStyles);
  const { t } = useTranslation(["activity", "common"]);
  return (
    <View style={styles.container}>
      <Image
        source={Images.mapSammy}
        style={{ width: width, height: 133 * (height / 812) }}
      />
      <View style={[styles.mapView, { width: width - 32 }]}>
        <Text status={"primary"} category="c4" marginTop={12} capitalize>
          {petName} {t("lastLocation")}
        </Text>
        <Text status={"primary"} marginTop={4}>
          {location}
        </Text>
      </View>
      <TouchableOpacity
        style={styles.button}
        activeOpacity={0.7}
        onPress={onPress}
      >
        <Icon pack="assets" name="direction" style={styles.icon} />
        <Text status={"primary"} uppercase>
          {t("common:go")}
        </Text>
      </TouchableOpacity>
    </View>
  );
});

export default TrackingMap;

const themedStyles = StyleService.create({
  container: {
    justifyContent: "center",
  },
  icon: {
    width: 16,
    height: 16,
  },
  mapView: {
    backgroundColor: "rgba(30, 31, 32, 0.86)",
    height: 61,
    alignSelf: "center",
    marginHorizontal: 16,
    position: "absolute",
    borderRadius: 4,
    paddingLeft: 16,
  },
  button: {
    position: "absolute",
    right: 16,
    width: 58,
    height: 61,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "text-info-color",
  },
});
