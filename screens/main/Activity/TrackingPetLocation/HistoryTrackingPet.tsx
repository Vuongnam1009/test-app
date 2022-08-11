import React, { memo } from "react";
import { View, Image, TouchableOpacity } from "react-native";
import {
  TopNavigation,
  useTheme,
  StyleService,
  useStyleSheet,
  Layout,
  Avatar,
  Icon,
} from "@ui-kitten/components";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import useLayout from "hooks/useLayout";
import { globalStyle } from "styles/globalStyle";

import Text from "components/Text";
import Content from "components/Content";
import Container from "components/Container";
import { useTranslation } from "react-i18next";
import { Images } from "assets/images";
import { ActivityStackParamList } from "navigation/types";
import NavigationAction from "components/NavigationAction";

const HistoryTrackingPet = memo(() => {
  const { navigate } = useNavigation<NavigationProp<ActivityStackParamList>>();
  const { height, width, top, bottom } = useLayout();
  const theme = useTheme();
  const styles = useStyleSheet(themedStyles);
  const { t } = useTranslation(["activity", "common"]);

  const _onChat = () => navigate("ChatScreen");
  return (
    <Container style={styles.container}>
      <TopNavigation
        style={styles.top}
        title={() => <Text category="b1">{t("historyTracking")}</Text>}
        accessoryLeft={<NavigationAction />}
      />
      <Content contentContainerStyle={styles.content}>
        <Layout
          style={[
            styles.line,
            {
              height:
                276 * (height / 812) * DATA_HISTORY.length -
                184 * (height / 812),
            },
          ]}
          level={"2"}
        />
        {DATA_HISTORY.map((item, i) => {
          return (
            <View style={styles.item} key={i}>
              <Layout style={styles.dot} />
              <View>
                <View>
                  <Text category="c2" status={"placeholder"}>
                    {item.time.toUpperCase()}
                  </Text>
                  <Text category="b2-m" marginBottom={16} maxWidth={width - 72}>
                    {item.title}
                  </Text>
                </View>
                <View
                  style={{
                    ...globalStyle.alignItemsCenter,
                    ...globalStyle.flexSpaceBetween,
                    width: width - 74,
                    marginBottom: 16,
                  }}
                >
                  <View style={globalStyle.flexDirection}>
                    <Avatar
                      source={item.avatar}
                      /* @ts-ignore */
                      style={styles.avatar}
                    />
                    <View>
                      <Text marginBottom={1}>{item.name}</Text>
                      <Text category="b3" status={"placeholder"}>
                        {item.type}
                      </Text>
                    </View>
                  </View>
                  <TouchableOpacity activeOpacity={0.7} onPress={_onChat}>
                    <Icon pack="assets" name="comment" />
                  </TouchableOpacity>
                </View>
                <Image
                  source={item.image}
                  style={{ width: width - 72, height: 150 * (height / 812) }}
                />
              </View>
            </View>
          );
        })}
      </Content>
    </Container>
  );
});

export default HistoryTrackingPet;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
    paddingLeft: 18,
    paddingRight: 22,
    paddingBottom: 0,
  },
  content: {
    paddingVertical: 24,
  },
  item: {
    flexDirection: "row",
    marginBottom: 40,
  },
  avatar: {
    marginRight: 16,
  },
  dot: {
    ...globalStyle.icon8,
    backgroundColor: "text-danger-color",
    borderRadius: 99,
    marginTop: 5,
    marginRight: 24,
  },
  top: {
    borderBottomColor: "color-basic-200",
    borderBottomWidth: 1,
  },
  line: {
    width: 1,
    position: "absolute",
    top: 32,
    left: 3,
  },
});
const DATA_HISTORY = [
  {
    id: 0,
    name: "Annie Tran",
    avatar: Images.avatar1,
    type: "Animal Shelter",
    time: "Jul 19, 2021",
    title: "Just found Sammy at 2458 Prospect Ave, Brooklyn, NY 11226",
    image: Images.map1,
  },
  {
    id: 1,
    name: "Jim Baldwin",
    avatar: Images.avatar2,
    type: "Cat Owner",
    time: "Jul 20, 2021",
    title: "Found Sammy at 446 Avenue O, Brooklyn, NY 11230",
    image: Images.map2,
  },
  {
    id: 2,
    name: "Taylor Swift",
    avatar: Images.avatar3,
    type: "Dog Owner",
    time: "Jul 20, 2021",
    title: "Found Sammy at 446 Avenue O, Brooklyn, NY 11230",
    image: Images.map2,
  },
  {
    id: 2,
    name: "Adele Laurie",
    avatar: Images.avatar4,
    type: "Bird Owner",
    time: "Jul 14, 2021",
    title: "Found Sammy at 446 Avenue O, Brooklyn, NY 11230",
    image: Images.map1,
  },
];
