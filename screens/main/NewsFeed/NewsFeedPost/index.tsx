import React, { memo } from "react";
import {
  View,
  Image,
  ImageRequireSource,
  TouchableOpacity,
} from "react-native";
import {
  StyleService,
  useStyleSheet,
  Avatar,
  Layout,
  Icon,
} from "@ui-kitten/components";
import useLayout from "hooks/useLayout";
import { globalStyle } from "styles/globalStyle";

import Text from "components/Text";
import Carousel, { Pagination } from "react-native-snap-carousel";
import keyExtractor from "utils/keyExtractor";
import LikeComment from "./LikeComment";
import { regex } from "utils/regex";

export interface NewFeedPostProps {
  id: number;
  image: ImageRequireSource[];
  userName: string;
  location: string;
  title: string;
  time: string;
  avatar: ImageRequireSource;
}
interface ItemProps {
  item: NewFeedPostProps;
  _onMenu?(): void;
  _onPress?(): void;
  _onProfile?(): void;
}

const NewsFeedPost = memo(
  ({ item, _onMenu, _onPress, _onProfile }: ItemProps) => {
    const { height, width, top, bottom } = useLayout();
    const styles = useStyleSheet(themedStyles);

    const [activeIndex, setActiveIndex] = React.useState(0);
    const refCarousel = React.useRef(null);
    const renderItem = React.useCallback(({ item }) => {
      return (
        <Image
          source={item}
          /* @ts-ignore */
          style={[styles.img, { width: width }]}
        />
      );
    }, []);
    return (
      <Layout style={styles.container}>
        <View style={[globalStyle.flexSpaceBetween, globalStyle.padH16]}>
          <TouchableOpacity
            style={globalStyle.flexDirection}
            onPress={_onProfile}
            activeOpacity={0.7}
          >
            <Avatar
              size="small"
              source={item.avatar}
              /* @ts-ignore */
              style={styles.avatar}
            />
            <View>
              <Text category="b2-s">{item.userName}</Text>
              <Text category="c4" status="placeholder">
                {item.location}
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.7} onPress={_onMenu}>
            <Icon pack="assets" name="menuBlack" />
          </TouchableOpacity>
        </View>
        <View>
          <Carousel
            data={item.image}
            layout="default"
            ref={refCarousel}
            sliderWidth={width}
            enableSnap={true}
            onSnapToItem={(index) => setActiveIndex(index)}
            itemWidth={width}
            renderItem={renderItem}
            firstItem={activeIndex}
            hasParallaxImages={true}
            keyExtractor={keyExtractor}
          />
          <Pagination
            containerStyle={styles.pagination}
            dotStyle={styles.dotStyle}
            inactiveDotStyle={styles.inactiveDotStyle}
            inactiveDotScale={0.9}
            activeDotIndex={activeIndex}
            dotsLength={item.image.length}
          />
          <View style={styles.bottomImg} />
        </View>
        <LikeComment likeNumber={2300} commentNumber={2450} />
        <TouchableOpacity onPress={_onPress}>
          <Text marginHorizontal={16} category="b2-m">
            {item.title.replace(regex, "")}
            <Text>
              {item.title.match(regex)?.map((item, i) => (
                <View key={i}>
                  <Text
                    status="info"
                    marginRight={4}
                    marginTop={2}
                    category="b2-m"
                  >
                    {item}
                  </Text>
                </View>
              ))}
            </Text>
          </Text>
          <Text category="d1" marginLeft={16} uppercase status="placeholder">
            {item.time}
          </Text>
        </TouchableOpacity>
      </Layout>
    );
  }
);

export default NewsFeedPost;

const themedStyles = StyleService.create({
  container: {
    paddingTop: 16,
    paddingBottom: 8,
  },
  avatar: {
    marginRight: 16,
  },
  img: {
    marginTop: 8,
  },
  bottomImg: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,

    elevation: 24,
    backgroundColor: "rgba(29, 30, 44, 0.9)",
    height: 40,
    position: "absolute",
    bottom: 0,
    zIndex: 10,
    left: 0,
    right: 0,
    opacity: 0.01,
  },
  dotStyle: {
    backgroundColor: "color-basic-100",
    width: 6,
    height: 6,
  },
  inactiveDotStyle: {
    backgroundColor: "color-primary-400",
    width: 6,
    height: 6,
  },
  pagination: {
    position: "absolute",
    bottom: 0,
    zIndex: 100,
    alignSelf: "center",
  },
});
