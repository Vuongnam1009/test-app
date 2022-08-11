import React, { memo } from "react";
import { View, Image } from "react-native";
import {
  TopNavigation,
  useTheme,
  StyleService,
  useStyleSheet,
} from "@ui-kitten/components";
import { useNavigation } from "@react-navigation/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import useLayout from "hooks/useLayout";
import { globalStyle } from "styles/globalStyle";

import Text from "components/Text";
import Content from "components/Content";
import Container from "components/Container";
import { Images } from "assets/images";
import { Notification_Types_Enum } from "constants/Types";
import NotificationItem from "./NotificationItem";

const Notifications = memo(() => {
  const { goBack } = useNavigation();
  const { height, width, top, bottom } = useLayout();
  const theme = useTheme();
  const styles = useStyleSheet(themedStyles);
  return (
    <View style={styles.container}>
      <Content>
        {DATA.map((item, i) => {
          return <NotificationItem item={item} key={i} />;
        })}
      </Content>
    </View>
  );
});

export default Notifications;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
  },
});
const DATA = [
  {
    id: 0,
    name: "Sandra Minalo",
    notification: "commented on your photo.",
    comment: "So Cute, I love it!!!",
    time: "2m",
    avatar: Images.avatar10,
    photo: Images.recent1,
    type: Notification_Types_Enum.Comment,
    didRead: false,
  },
  {
    id: 1,
    name: "Linnie Lyons",
    notification: "love your comment on your photo.",
    time: "15m",
    avatar: Images.avatar9,
    photo: Images.recent1,
    type: Notification_Types_Enum.Emotion,
    didRead: true,
  },
  {
    id: 2,
    name: "Callie Holland, Emily,",
    notification: "love your photo.",
    time: "3h",
    avatar: Images.avatar4,
    photo: Images.recent1,
    type: Notification_Types_Enum.Emotion,
    didRead: true,
  },
  {
    id: 3,
    name: "Sandra Minalo",
    notification: "started following you.",
    time: "4h",
    avatar: Images.avatar6,
    type: Notification_Types_Enum.Follow,
    didRead: true,
  },
  {
    id: 4,
    name: "Emily Paris",
    notification: "love your comment on your photo.",
    time: "15m",
    avatar: Images.avatar9,
    photo: Images.recent2,
    type: Notification_Types_Enum.Emotion,
    didRead: true,
  },
];
