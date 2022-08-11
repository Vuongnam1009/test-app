import React, { memo } from "react";
import { View } from "react-native";
import {
  StyleService,
  useStyleSheet,
  Icon,
  Layout,
} from "@ui-kitten/components";
import { globalStyle } from "styles/globalStyle";

import Text from "components/Text";
import { MedicinesItemProps } from "constants/Types";
import { useTranslation } from "react-i18next";
import useLayout from "hooks/useLayout";

interface Props {
  item: MedicinesItemProps;
}

const MedicinesItem = memo(({ item }: Props) => {
  let { name, timePerDay, type, mg } = item;
  const { t } = useTranslation(["medical", "common"]);
  const { width } = useLayout();
  const styles = useStyleSheet(themedStyles);
  const getIcon = (type: "other" | "oral" | "injection" | string): string => {
    switch (type) {
      case "other":
        return "medicineOther";
      case "oral":
        return "oral";
      case "injection":
        return "injection";
      default:
        return "medicineOther";
    }
  };
  return (
    <Layout style={styles.container} level="1">
      <Icon
        pack="assets"
        name={type ? getIcon(type) : "medicineOther"}
        style={styles.icon}
      />
      <View>
        <Text marginBottom={9}>{name}</Text>
        <View
          style={[globalStyle.flexSpaceBetween, { width: 224 * (width / 375) }]}
        >
          <Text category="b3" status={"placeholder"}>
            {type}
          </Text>
          <View style={globalStyle.flexDirection}>
            <View style={globalStyle.flexDirection}>
              <Layout style={styles.dot} level={"4"} />
              <Text category="b3" status={"placeholder"} marginRight={8}>
                {mg}mg
              </Text>
            </View>
            <View style={globalStyle.flexDirection}>
              <Layout style={styles.dot} level={"4"} />
              <Text category="b3" status={"placeholder"}>
                {timePerDay} {t("timePerDay")}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </Layout>
  );
});

export default MedicinesItem;

const themedStyles = StyleService.create({
  container: {
    padding: 16,
    flexDirection: "row",
    marginBottom: 8,
    borderRadius: 4,
  },
  icon: {
    ...globalStyle.icon24,
    marginRight: 16,
  },
  dot: {
    width: 3,
    height: 3,
    borderRadius: 99,
    marginRight: 8,
    alignSelf: "center",
  },
});
