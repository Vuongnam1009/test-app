import React, { memo } from "react";
import { View, ImageRequireSource, TouchableOpacity } from "react-native";
import {
  StyleService,
  useStyleSheet,
  Avatar,
  Layout,
  Icon,
} from "@ui-kitten/components";
import Text from "components/Text";
import { NavigationProp, useNavigation } from "@react-navigation/core";
import { RootStackParamList } from "navigation/types";
import { useTranslation } from "react-i18next";
import Content from "components/Content";

interface Props {
  id: number;
  avatar: ImageRequireSource;
  userName: string;
  isLive?: boolean;
}
interface SlideStoryProps {
  data?: Props[];
  dataUser?: Props;
}

const SlideStory = memo(({ data = [], dataUser }: SlideStoryProps) => {
  const styles = useStyleSheet(themedStyles);
  const { navigate } = useNavigation<NavigationProp<RootStackParamList>>();

  const { t } = useTranslation(["newsFeed", "common"]);
  const AddStory = React.useCallback(() => {
    navigate("ActivityStack", { screen: "NewStory" });
  }, []);
  return (
    <Content horizontal>
      <View style={styles.content}>
        <TouchableOpacity
          style={styles.storyView}
          activeOpacity={0.7}
          onPress={AddStory}
        >
          <Avatar
            source={dataUser?.avatar}
            size="huge"
            /* @ts-ignore */
            style={styles.avatar}
          />
          <Text category="c4" numberOfLines={1}>
            {t("urStory")}
          </Text>
          <Icon pack="assets" name="addStory" style={styles.addStory} />
        </TouchableOpacity>
        {data.map((item, i) => {
          return (
            <View key={i} style={styles.storyView}>
              {item.isLive ? (
                <Layout level="7" style={styles.liveView}>
                  <Layout style={styles.dot} />
                  <Text status="primary" style={styles.live}>
                    LIVE
                  </Text>
                </Layout>
              ) : null}
              <Avatar
                source={item.avatar}
                size="huge"
                /* @ts-ignore */
                style={styles.avatar}
              />
              <Text category="c4" center numberOfLines={1} maxWidth={58}>
                {item.userName}
              </Text>
            </View>
          );
        })}
      </View>
    </Content>
  );
});

export default SlideStory;

const themedStyles = StyleService.create({
  content: {
    flexDirection: "row",
    paddingTop: 12,
    paddingBottom: 8,
    marginLeft: 16,
  },
  storyView: {
    marginRight: 24,
  },
  avatar: {
    alignSelf: "center",
    marginBottom: 8,
  },
  item: {
    marginLeft: 24,
  },
  live: {
    fontSize: 8,
    lineHeight: 9.75,
    marginLeft: 4,
  },
  liveView: {
    position: "absolute",
    zIndex: 10,
    paddingHorizontal: 4,
    paddingVertical: 1,
    bottom: 20,
    left: 10,
    borderRadius: 99,
    flexDirection: "row",
    alignItems: "center",
  },
  addStory: {
    position: "absolute",
    right: 2,
    bottom: 20,
    width: 16,
    height: 16,
  },
  dot: {
    width: 4,
    height: 4,
    borderRadius: 99,
  },
});
