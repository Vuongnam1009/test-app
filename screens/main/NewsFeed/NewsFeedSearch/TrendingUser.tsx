import React, { memo } from "react";
import { View, ImageRequireSource, ScrollView } from "react-native";
import { StyleService, useStyleSheet, Avatar } from "@ui-kitten/components";
import Content from "components/Content";
import { isEmpty } from "lodash";
import Text from "components/Text";
import { useTranslation } from "react-i18next";

interface Props {
  id: number | string;
  avatar: ImageRequireSource;
}
interface DataProps {
  data: Props[];
}

const TrendingUser = memo(({ data }: DataProps) => {
  const styles = useStyleSheet(themedStyles);
  const { t } = useTranslation(["newsFeed", "common"]);
  return (
    <View style={styles.container}>
      <Text marginLeft={24} capitalize marginBottom={16} uppercase>
        {t("trendingUsers")}
      </Text>
      <Content
        horizontal
        contentContainerStyle={[styles.content, { width: data.length * 84 }]}
      >
        {isEmpty(data)
          ? null
          : data.map((item, i) => {
              return (
                <Avatar
                  source={item.avatar}
                  key={i}
                  size="huge"
                  /* @ts-ignore */
                  style={styles.avatar}
                />
              );
            })}
      </Content>
    </View>
  );
});

export default TrendingUser;

const themedStyles = StyleService.create({
  container: {
    marginTop: 40,
  },
  avatar: {
    marginRight: 24,
  },
  content: {
    marginLeft: 24,
    marginRight: 40,
  },
});
