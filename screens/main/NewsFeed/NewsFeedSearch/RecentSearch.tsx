import React, { memo } from "react";
import { View, TouchableOpacity } from "react-native";
import {
  StyleService,
  useStyleSheet,
  Button,
  Icon,
} from "@ui-kitten/components";
import { globalStyle } from "styles/globalStyle";

import Text from "components/Text";
import Content from "components/Content";
import { useTranslation } from "react-i18next";
import { isEmpty } from "lodash";

interface Props {
  id: number;
  title: string;
}
interface DataProps {
  data: Props[];
}

const RecentSearch = memo(({ data }: DataProps) => {
  const styles = useStyleSheet(themedStyles);
  const { t } = useTranslation(["newsFeed", "common"]);

  const [dataRecent, setDataRecent] = React.useState(data);
  const _onClear = React.useCallback(() => {
    setDataRecent([]);
  }, []);
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text category="c4">{t("recentSearches").toUpperCase()}</Text>
        <TouchableOpacity onPress={_onClear} activeOpacity={0.7}>
          <Text status="info">{t("clearHistory")}</Text>
        </TouchableOpacity>
      </View>
      <Content horizontal>
        {isEmpty(dataRecent)
          ? null
          : dataRecent.map((item, i) => {
              return (
                <View key={i} style={styles.button}>
                  <Button
                    size="medium"
                    status="main"
                    accessoryRight={<Icon pack="assets" name="search" />}
                  />
                  <Text center category="b3" marginTop={8}>
                    {item.title}
                  </Text>
                </View>
              );
            })}
      </Content>
    </View>
  );
});

export default RecentSearch;

const themedStyles = StyleService.create({
  container: {
    marginHorizontal: 24,
    marginBottom: 40,
  },
  header: {
    ...globalStyle.flexSpaceBetween,
    marginBottom: 24,
  },
  button: {
    marginRight: 32,
  },
});
