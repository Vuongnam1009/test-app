import React, { memo } from "react";
import { View, ViewStyle, TouchableOpacity } from "react-native";
import {
  StyleService,
  useStyleSheet,
  Icon,
  Layout,
} from "@ui-kitten/components";
import { globalStyle } from "styles/globalStyle";

import Text from "components/Text";
import { useTranslation } from "react-i18next";
import { VaccineProps } from "constants/Types";

interface DataProps {
  title: string;
  data: VaccineProps[];
  style?: ViewStyle;
  _showMore?(): void;
}

const ListVaccines = memo(({ data, style, title, _showMore }: DataProps) => {
  const styles = useStyleSheet(themedStyles);
  const { t } = useTranslation(["medical", "common"]);

  return (
    <View style={[style, styles.container]}>
      <View style={styles.title}>
        <Text category="h4">{title}</Text>
        <TouchableOpacity
          activeOpacity={0.7}
          style={globalStyle.flexDirection}
          onPress={_showMore}
        >
          <Text status="info" category="c4">
            {t("common:showMore")}
          </Text>
          <Icon pack="assets" name="arrRight" style={globalStyle.icon16} />
        </TouchableOpacity>
      </View>
      {data.map((item, i) => {
        return (
          <Layout key={i} style={styles.item} level={"1"}>
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
                <Icon
                  pack="assets"
                  name="verified"
                  style={globalStyle.icon16}
                />
                <Text status={"success"}>{t("common:verified")}</Text>
              </View>
            ) : null}
          </Layout>
        );
      })}
    </View>
  );
});

export default ListVaccines;

const themedStyles = StyleService.create({
  container: {
    marginBottom: 40,
  },
  title: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
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
