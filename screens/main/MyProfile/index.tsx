import React, { memo } from "react";
import { View, Animated } from "react-native";
import {
  TopNavigation,
  useTheme,
  StyleService,
  useStyleSheet,
  ViewPager,
} from "@ui-kitten/components";
import {
  DrawerActions,
  NavigationProp,
  useNavigation,
} from "@react-navigation/native";
import useLayout from "hooks/useLayout";
import { globalStyle } from "styles/globalStyle";

import Text from "components/Text";
import Container from "components/Container";
import NavigationAction from "components/NavigationAction";
import HeaderProfile from "./Component/HeaderProfile";
import { Images } from "assets/images";
import { RootStackParamList } from "navigation/types";
import PetList from "./Component/PetList";
import FrequencyTab from "components/FrequencyTab";
import ListNewsFeed from "../NewsFeed/ListNewsFeed";
import keyExtractor from "utils/keyExtractor";
import TabPhoto from "./TabPhoto";
import { DATA_PET_RESULT } from "constants/Data";
import FavoriteTab from "./FavoriteTab";

const MyProfile = memo(() => {
  const { goBack, dispatch, navigate } =
    useNavigation<NavigationProp<RootStackParamList>>();
  const { height, width, top, bottom } = useLayout();
  const theme = useTheme();
  const styles = useStyleSheet(themedStyles);

  const _onAdd = () => {};
  const _onMenu = () => dispatch(DrawerActions.openDrawer());
  const _onSetting = () => {
    navigate("Settings");
  };
  const _onFollower = () => {
    navigate("Follower");
  };
  const _onFollowing = () => {
    navigate("Following");
  };

  const [selectIndex, setSelectIndex] = React.useState(0);
  const y = React.useRef(new Animated.Value(0)).current;
  const onScroll = Animated.event([{ nativeEvent: { contentOffset: { y } } }], {
    useNativeDriver: true,
  });
  const input = [0, height * 0.15, height * 0.2, height * 0.25];
  const scale = y.interpolate({
    inputRange: input,
    outputRange: [0, 0.5, 0.9, 1],
    extrapolate: "clamp",
  });
  const transY = y.interpolate({
    inputRange: input,
    outputRange: [1, 1, 0, 0],
    extrapolate: "clamp",
  });
  const opacity = y.interpolate({
    inputRange: input,
    outputRange: [0, 0, 0.8, 1],
    extrapolate: "clamp",
  });
  const renderItem = React.useCallback(() => {
    return (
      <FrequencyTab
        style={styles.tabBar}
        useIcon
        tabs={["tabPost", "tabPhoto", "tabFavorite", "bookmark"]}
        selectedIndex={selectIndex}
        onChange={setSelectIndex}
      />
    );
  }, [selectIndex, setSelectIndex]);
  const renderHeader = React.useCallback(() => {
    return (
      <View>
        <HeaderProfile
          dataUser={DATA_USER}
          _onFollower={_onFollower}
          _onFollowing={_onFollowing}
        />
        <PetList data={DATA_PET_LIST} addPet isUser={true} />
      </View>
    );
  }, []);

  return (
    <Container style={styles.container}>
      <TopNavigation
        accessoryRight={
          <NavigationAction icon="settings" onPress={_onSetting} />
        }
        title={() => (
          <Animated.View
            style={{
              transform: [{ translateY: transY }, { scale: scale }],
              opacity: opacity,
            }}
          >
            <Text center category="b1" marginBottom={8}>
              {DATA_USER.userName}
            </Text>
          </Animated.View>
        )}
        accessoryLeft={<NavigationAction icon="menu" onPress={_onMenu} />}
      />

      <Animated.FlatList
        data={[1]}
        onScroll={onScroll}
        keyExtractor={keyExtractor}
        ListHeaderComponent={renderHeader}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: bottom + 24 }}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
        stickyHeaderIndices={[1]}
        ListFooterComponent={() => {
          const shouldLoadComponent = (index: number) => index === selectIndex;
          return (
            <ViewPager
              selectedIndex={selectIndex}
              style={globalStyle.flexOne}
              swipeEnabled={false}
              onSelect={setSelectIndex}
              shouldLoadComponent={shouldLoadComponent}
            >
              <ListNewsFeed data={DATA} />
              <TabPhoto data={DATA_PHOTO} />
              <FavoriteTab data={DATA_PET_RESULT} />
              <TabPhoto data={DATA_BOOK_MARK} />
            </ViewPager>
          );
        }}
      />
    </Container>
  );
});

export default MyProfile;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
  },
  tabBar: {
    marginTop: 0,
    marginBottom: 0,
    height: 48,
  },
  content: {
    marginTop: 16,
  },
  topText: {
    position: "absolute",
    bottom: -20,
    left: 0,
    alignItems: "center",
    zIndex: 100,
  },
});

const DATA_PHOTO = [
  Images.recent1,
  Images.recent6,
  Images.recent5,
  Images.recent9,
  Images.recent7,
  Images.recent3,
  Images.recent8,
  Images.recent4,
  Images.post1,
  Images.post2,
  Images.post3,
  Images.recent2,
  Images.recent6,
  Images.recent5,
  Images.recent9,
  Images.recent7,
  Images.recent3,
  Images.recent8,
];
const DATA_BOOK_MARK = [
  Images.post1,
  Images.post2,
  Images.post3,
  Images.post4,
  Images.recent1,
  Images.recent2,
  Images.recent3,
  Images.recent4,
  Images.recent5,
  Images.recent6,
  Images.recent8,
  Images.recent9,
  Images.post2,
  Images.post3,
  Images.post4,
  Images.recent1,
  Images.recent2,
  Images.recent3,
  Images.recent4,
  Images.recent4,
  Images.recent5,
  Images.recent6,
  Images.recent8,
];
const DATA_USER = {
  id: 1,
  userName: "Louisa Bradley",
  about: "I’m fashion model & I love Pet!",
  avatar: Images.avatar2,
  numberPost: "245",
  numberFollower: "1,3m",
  numberFollowing: "397",
  messNotRead: 3,
};
const DATA_PET_LIST = [
  { id: 0, name: "Sammy", avatar: Images.pet4 },
  { id: 1, name: "Jame", avatar: Images.pet2 },
];
const DATA = [
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
];
