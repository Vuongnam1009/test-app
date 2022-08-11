import React, { memo } from "react";
import { View, Image, ImageRequireSource } from "react-native";
import { StyleService, useStyleSheet } from "@ui-kitten/components";
import useLayout from "hooks/useLayout";

import Text from "components/Text";
import Content from "components/Content";
import { isEmpty } from "lodash";
import { useTranslation } from "react-i18next";

interface Props {
  id: number;
  name: string;
  img: ImageRequireSource;
  typePet: string;
}
interface DataProps {
  data: Props[];
}

const MostPet = memo(({ data }: DataProps) => {
  const { width, height } = useLayout();
  const styles = useStyleSheet(themedStyles);
  const { t } = useTranslation(["newsFeed", "common"]);
  return (
    <View>
      <Text marginLeft={24} marginBottom={16}>
        {t("mostPopularPet")}
      </Text>
      <Content style={styles.container} horizontal>
        {isEmpty(data) ? null : (
          <>
            {data.map((item, i) => {
              return (
                <View key={i} style={styles.item}>
                  <Image
                    source={item.img}
                    style={[
                      {
                        height: 180 * (height / 812),
                        width: (144 * width) / 375,
                        borderRadius: 4,
                      },
                    ]}
                  />
                  <Text marginTop={8} marginBottom={1}>
                    {item.name}
                  </Text>
                  <Text category="c4" status="placeholder">
                    {item.typePet}
                  </Text>
                </View>
              );
            })}
          </>
        )}
      </Content>
    </View>
  );
});

export default MostPet;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
    marginLeft: 24,
  },
  item: {
    marginRight: 24,
  },
});
