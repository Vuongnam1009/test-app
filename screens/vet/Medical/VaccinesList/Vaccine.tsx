import React, { memo } from "react";
import { View, ViewStyle } from "react-native";
import {
  StyleService,
  useStyleSheet,
  Layout,
  Icon,
} from "@ui-kitten/components";
import { globalStyle } from "styles/globalStyle";

import Text from "components/Text";
import { useTranslation } from "react-i18next";
import { VaccineProps } from "constants/Types";
interface Props {
  item: VaccineProps;
  style?: ViewStyle;
}
const Vaccine = memo(({ item, style }: Props) => {
  const styles = useStyleSheet(themedStyles);
  const { t } = useTranslation(["medical", "common"]);
  return (
    <Layout style={[styles.item, style]} level={"1"}>
      <View style={globalStyle.flexDirection}>
        <Icon
          pack="assets"
          name={item.active ? "medicineActive" : "medicineInactive"}
        />
        <View style={styles.titleItem}>
          <View style={globalStyle.flexDirection}>
            <Text fontFamily="Montserrat-Medium">{item.name}</Text>
            <Text marginLeft={4} status={"placeholder"}>
              (#{item.code})
            </Text>
          </View>
          <Text category="c4" marginVertical={4} status={"placeholder"}>
            {t("administered")} {item.administered}
          </Text>
          <Text category="c4" marginVertical={4} status={"placeholder"}>
            {t("expired")} {item.expired}
          </Text>
        </View>
      </View>
      {item.verified === true ? (
        <View style={globalStyle.flexDirection}>
          <Icon pack="assets" name="verified" style={globalStyle.icon16} />
          <Text status={"success"}>{t("common:verified")}</Text>
        </View>
      ) : null}
    </Layout>
  );
});

export default Vaccine;

const themedStyles = StyleService.create({
  item: {
    padding: 16,
    borderRadius: 4,
    marginBottom: 8,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  titleItem: {
    marginLeft: 16,
  },
});
