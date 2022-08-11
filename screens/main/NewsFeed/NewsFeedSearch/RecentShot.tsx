import React, { memo } from "react";
import { View, Image, ImageRequireSource } from "react-native";
import { StyleService, useStyleSheet } from "@ui-kitten/components";
import useLayout from "hooks/useLayout";

import Text from "components/Text";
import Content from "components/Content";
import { useTranslation } from "react-i18next";
import { isEmpty } from "lodash";

interface Props {
  id: number;
  img: ImageRequireSource;
}

interface DataProps {
  data: Props[];
}

const RecentShot = memo(({ data }: DataProps) => {
  const { width } = useLayout();
  const styles = useStyleSheet(themedStyles);
  const { t } = useTranslation(["newsFeed", "common"]);

  const wImg = (width - 2) / 3;
  return (
    <View style={styles.container}>
      <Text uppercase marginLeft={24} marginBottom={16}>
        {t("recentShots")}
      </Text>
      <Content>
        <View style={styles.content}>
          {isEmpty(data)
            ? null
            : data.map((item, i) => {
                return (
                  <Image
                    source={item.img}
                    key={i}
                    style={{ width: wImg, height: wImg }}
                  />
                );
              })}
        </View>
      </Content>
    </View>
  );
});

export default RecentShot;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
    marginTop: 40,
  },
  content: {
    flexWrap: "wrap",
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
