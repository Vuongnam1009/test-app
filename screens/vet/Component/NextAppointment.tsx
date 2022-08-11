import React, { memo } from "react";
import { View, ViewStyle } from "react-native";
import { StyleService, useStyleSheet, Layout } from "@ui-kitten/components";
import { globalStyle } from "styles/globalStyle";

import Text from "components/Text";
import { isEmpty } from "lodash";
import LoadingIndicator from "components/LoadingIndicator";

interface Props {
  id: number;
  title: string;
  time: string;
  color: string;
}
interface DataProps {
  data: Props[];
  title: string;
  style?: ViewStyle;
}

const NextAppointment = memo(({ data, title, style }: DataProps) => {
  const styles = useStyleSheet(themedStyles);
  return (
    <View style={[styles.container, style]}>
      <Text category="h4" marginBottom={18}>
        {title}
      </Text>
      {isEmpty(data) ? (
        <LoadingIndicator size={"giant"} status={"danger"} />
      ) : (
        <View style={{}}>
          {data.map((item, i) => {
            return (
              <Layout style={styles.item} level={"1"} key={i}>
                <View
                  style={{
                    backgroundColor: item.color,
                    borderRadius: 99,
                    ...globalStyle.icon16,
                    marginRight: 16,
                  }}
                />
                <View>
                  <Text marginBottom={8} category="c4" uppercase>
                    {item.time}
                  </Text>
                  <Text>{item.title}</Text>
                </View>
              </Layout>
            );
          })}
        </View>
      )}
    </View>
  );
});

export default NextAppointment;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
    marginTop: 32,
  },
  item: {
    padding: 16,
    flexDirection: "row",
    marginBottom: 8,
    borderRadius: 4,
  },
});
