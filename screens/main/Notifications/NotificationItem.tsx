import React, { memo } from "react";
import { View, Image, ImageRequireSource } from "react-native";
import {
  useTheme,
  StyleService,
  useStyleSheet,
  Avatar,
  Layout,
  Button,
} from "@ui-kitten/components";
import { useNavigation } from "@react-navigation/native";
import useLayout from "hooks/useLayout";
import { globalStyle } from "styles/globalStyle";

import Text from "components/Text";
import { Notification_Types_Enum } from "constants/Types";
import { useTranslation } from "react-i18next";

interface Props {
  id: number;
  name: string | string[];
  photo?: ImageRequireSource;
  avatar: ImageRequireSource;
  notification?: string;
  comment?: string;
  time: string;
  type: Notification_Types_Enum;
  didRead: boolean;
}
interface ItemProps {
  item: Props;
}

const NotificationItem = memo(({ item }: ItemProps) => {
  let { name, photo, time, notification, type, didRead, avatar, comment } =
    item;
  const { goBack } = useNavigation();
  const { height, width, top, bottom } = useLayout();
  const theme = useTheme();
  const styles = useStyleSheet(themedStyles);
  const { t } = useTranslation(["notification", "common"]);
  return (
    <Layout style={styles.container} level={didRead ? "1" : "2"}>
      <View style={globalStyle.flexSpaceBetween}>
        <View style={globalStyle.flexDirection}>
          <Avatar
            size={"small"}
            source={avatar}
            /* @ts-ignore */
            style={styles.avatar}
          />
          <View>
            <Text
              maxWidth={
                type === Notification_Types_Enum.Follow
                  ? 193 * (width / 375)
                  : 238 * (width / 375)
              }
            >
              {name}{" "}
              <Text category="b2-p" lineHeight={17.07}>
                {notification}
              </Text>
              <Text category="c4" status={"placeholder"}>
                {time}
              </Text>
            </Text>
            {comment ? <Text children={`"${comment}"`} marginTop={10} /> : null}
          </View>
        </View>
        {photo ? (
          <Image
            source={photo}
            /* @ts-ignore */
            style={styles.photo}
          />
        ) : null}
        {type === Notification_Types_Enum.Follow ? (
          <Button
            style={styles.btnFollow}
            size={"tiny"}
            children={t("common:follow").toString()}
            status={"danger"}
          />
        ) : null}
      </View>
    </Layout>
  );
});

export default NotificationItem;

const themedStyles = StyleService.create({
  container: {
    paddingVertical: 16,
    paddingLeft: 24,
    paddingRight: 16,
  },
  avatar: {
    marginRight: 16,
  },
  photo: {
    width: 40,
    height: 40,
    position: "absolute",
    top: 0,
    right: 0,
  },
  btnFollow: {
    alignSelf: "flex-end",
  },
});
