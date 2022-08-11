import React, { memo } from "react";
import { View } from "react-native";
import {
  TopNavigation,
  StyleService,
  useStyleSheet,
} from "@ui-kitten/components";
import {
  DrawerActions,
  useNavigation,
  NavigationProp,
} from "@react-navigation/native";
import useLayout from "hooks/useLayout";

import Text from "components/Text";
import Content from "components/Content";
import Container from "components/Container";
import NavigationAction from "components/NavigationAction";
import { useTranslation } from "react-i18next";
import SlideStory from "./SlideStory";
import SkeletonNewFeed from "./NewsFeedPost/SkeletonNewFeed";
import ListNewsFeed from "./ListNewsFeed";
import { DATA_STORY, DATA_USER } from "constants/Data";
import { RootStackParamList } from "navigation/types";
import { Images } from "assets/images";
import AdMob from "components/AdMob";

const NewFeed = memo(() => {
  const { height, width, top, bottom } = useLayout();
  const styles = useStyleSheet(themedStyles);
  const { t } = useTranslation("newsFeed");
  const { navigate } = useNavigation<NavigationProp<RootStackParamList>>();
  const navigation = useNavigation();

  const [dataStory, setDataStory] = React.useState(DATA_STORY);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    if (isLoading) {
      setTimeout(() => {
        setIsLoading(false);
      }, 3000);
    }
    clearTimeout();
  }, [dataStory, setIsLoading, isLoading]);
  const OpenDraw = React.useCallback(() => {
    navigation.dispatch(DrawerActions.openDrawer());
  }, []);
  const _onSearch = React.useCallback(() => {
    navigate("ActivityStack", { screen: "NewsFeedSearch" });
  }, []);
  return (
    <Container style={[styles.container]} level="1">
      <TopNavigation
        title={
          <Text category="b1" center>
            {t("title")}
          </Text>
        }
        accessoryLeft={<NavigationAction icon="menu" onPress={OpenDraw} />}
        accessoryRight={<NavigationAction icon="search" onPress={_onSearch} />}
      />
      <Content
        level="2"
        contentContainerStyle={{ paddingBottom: bottom + 60 }}
        scrollEnabled={!isLoading}
      >
        {isLoading ? (
          <SkeletonNewFeed />
        ) : (
          <View>
            <SlideStory data={dataStory} dataUser={DATA_USER} />
            <ListNewsFeed data={DATA} />
          </View>
        )}
        <AdMob marginTop={16} />
      </Content>
    </Container>
  );
});

export default NewFeed;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
    paddingBottom: 0,
  },
});
const DATA = [
  {
    id: 0,
    avatar: Images.avatar3,
    userName: "Emily Collins",
    location: "Riverside",
    image: [Images.post1, Images.post2, Images.post3, Images.post4],
    likedNumber: 2300,
    commentNumber: 320,
    title: "My Daughter & Puppy!😊 What do you think? #puppy #sleeping",
    time: "20 minutes ago",
  },
  {
    id: 1,
    avatar: Images.avatar4,
    userName: "Isabelle Fuhrman",
    location: "Riverside",
    image: [Images.post3, Images.post1, Images.post2, Images.post4],
    likedNumber: 5300,
    commentNumber: 320,
    title: "My Daughter & Puppy!😊 What do you think? #beauty #puppy #sleeping",
    time: "40 minutes ago",
  },
  {
    id: 2,
    avatar: Images.avatar5,
    userName: "Charlie Puth",
    location: "Northside",
    image: [Images.post4, Images.post1, Images.post3, Images.post2],
    likedNumber: 3200,
    commentNumber: 421,
    title: "My Daughter & Puppy!😊 What do you think? #puppy #sleeping",
    time: "10 minutes ago",
  },
];
