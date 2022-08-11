import React, { memo } from "react";
import { View, ImageRequireSource } from "react-native";
import {
  useTheme,
  StyleService,
  useStyleSheet,
  Layout,
  Avatar,
} from "@ui-kitten/components";
import useLayout from "hooks/useLayout";
import { globalStyle } from "styles/globalStyle";

import Text from "components/Text";
import Content from "components/Content";
import Container from "components/Container";
import { isEmpty } from "lodash";

interface Props {
  id: number;
  avatar: ImageRequireSource;
  name: string;
  time: string;
  mess: string;
  messNotRead?: number;
}
interface ItemProps {
  item: Props;
}

const MessItem = memo(({ item }: ItemProps) => {
  let { avatar, name, time, mess, messNotRead } = item;
  const { height, width, top, bottom } = useLayout();
  const theme = useTheme();
  const styles = useStyleSheet(themedStyles);
  return (
    <View style={styles.container}>
      <Layout style={[styles.item]} level={messNotRead != 0 ? "2" : "1"}>
        <Avatar
          source={avatar}
          size={"huge"}
          /* @ts-ignore */
          style={styles.avatar}
        />
        <View style={globalStyle.alignSelfCenter}>
          <Text marginBottom={8}>
            {name}{" "}
            {messNotRead !== 0 ? <Text children={`(${messNotRead})`} /> : null}
          </Text>
          <Text category="b2-p" lineHeight={17.07}>
            {mess}
          </Text>
        </View>
        <View style={styles.time}>
          <Text category="c4" status="placeholder">
            {time}
          </Text>
        </View>
      </Layout>
    </View>
  );
});

export default MessItem;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
  },
  avatar: {
    marginRight: 16,
  },
  item: {
    flexDirection: "row",
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  time: {
    position: "absolute",
    right: 24,
    top: 16,
  },
});
