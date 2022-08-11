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
import MessItem from "./MessItem";

const Messenger = memo(() => {
  const { goBack } = useNavigation();
  const { height, width, top, bottom } = useLayout();
  const theme = useTheme();
  const styles = useStyleSheet(themedStyles);
  return (
    <Content>
      {DATA.map((item, i) => {
        return <MessItem key={i} item={item} />;
      })}
    </Content>
  );
});

export default Messenger;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
  },
});
const DATA = [
  {
    id: 0,
    avatar: Images.avatar1,
    mess: "It's going well! How about you?",
    time: "2m",
    name: "Raymond Tyler",
    messNotRead: 4,
  },
  {
    id: 1,
    avatar: Images.avatar2,
    mess: "I'm a dentist.",
    time: "5m",
    name: "Kyle McKenzie",
    messNotRead: 0,
  },
  {
    id: 2,
    avatar: Images.avatar3,
    mess: "What do you do for a living?",
    time: "Mar 1",
    name: "Linnie Lyons",
    messNotRead: 0,
  },
  {
    id: 3,
    avatar: Images.avatar4,
    mess: "It's going well! How about you?",
    time: "Feb 18",
    name: "Callie Holland",
    messNotRead: 2,
  },
  {
    id: 4,
    avatar: Images.avatar5,
    mess: "It's going well! How about you?",
    time: "Feb 21",
    name: "Mildred Nelson",
    messNotRead: 0,
  },
  {
    id: 5,
    avatar: Images.avatar6,
    mess: "It's going well! How about you?",
    time: "Feb 22",
    name: "Chester Wheeler",
    messNotRead: 0,
  },
  {
    id: 6,
    avatar: Images.avatar7,
    mess: "It's going well! How about you?",
    time: "Feb 25",
    name: "Lelia Sparks",
    messNotRead: 0,
  },
];
