import React from "react";
import { View, TouchableOpacity } from "react-native";
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
  PanGestureHandlerProps,
} from "react-native-gesture-handler";
import {
  useTheme,
  Avatar,
  Icon,
  StyleService,
  useStyleSheet,
  Layout,
} from "@ui-kitten/components";
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  useDerivedValue,
  withTiming,
  interpolate,
  interpolateColor,
} from "react-native-reanimated";
import useLayout from "hooks/useLayout";

import Text from "components/Text";
import AnimatedAppearance from "components/AnimatedAppearance";
import { PetResultItem } from "../../NewsFeed/NewsFeedSearch/AboutResults";
import { globalStyle } from "styles/globalStyle";
import { t } from "i18next";

interface FavoriteItemProps
  extends Pick<PanGestureHandlerProps, "simultaneousHandlers"> {
  item: PetResultItem;
  index?: number;
  _onUnlike?(): void;
  disable?: boolean;
}

const FavoriteItem = ({
  item,
  index,
  _onUnlike,
  disable,
  simultaneousHandlers,
}: FavoriteItemProps) => {
  const { id, avatar, adopt, name, typePet, type, breed }: PetResultItem = item;
  const theme = useTheme();
  const styles = useStyleSheet(themedStyles);

  const { width } = useLayout();

  const TRANSLATE_X_THRESHOLD = width * 0.25;

  const scrollX = useSharedValue(0);

  const panGesture = useAnimatedGestureHandler<PanGestureHandlerGestureEvent>({
    onStart: (event, ctx: any) => {
      // must fix
      ctx.startX = scrollX.value;
    },
    onActive: (event, ctx: any) => {
      // must fix
      scrollX.value = event.translationX;
      let x = ctx.startX + event.translationY;
      const swipeRight = scrollX.value < -TRANSLATE_X_THRESHOLD / 2;
      if (x < swipeRight) {
        scrollX.value = withTiming(-TRANSLATE_X_THRESHOLD);
      } else {
        scrollX.value = withTiming(0);
      }
    },
    onEnd: (event, ctx: any) => {
      // must fix
      const swipeRight = scrollX.value < -TRANSLATE_X_THRESHOLD / 1.5;
      if (swipeRight) {
        scrollX.value = withTiming(-TRANSLATE_X_THRESHOLD);
      } else {
        scrollX.value = withTiming(0);
      }
    },
  });

  const rStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateX: scrollX.value,
      },
    ],
  }));

  const leftColor = useDerivedValue(() => {
    return interpolateColor(
      scrollX.value,
      [-width * 0.25, 0, width * 0.25],
      ["#F7F7FB", "#FFFFFF", "#F7F7FB"]
    );
  });

  const backgroundColor = useAnimatedStyle(() => {
    return {
      backgroundColor: leftColor.value,
    };
  });

  const right = useAnimatedStyle(() => {
    const trans = interpolate(
      scrollX.value,
      [0, -width * 0.25],
      [width * 0.25, 0]
    );
    const opacity = interpolate(scrollX.value, [0, -width * 0.25], [0, 1]);

    return {
      transform: [
        {
          translateX: trans,
        },
      ],
      opacity: opacity,
      backgroundColor: "#FA4169",
    };
  });

  return (
    <AnimatedAppearance index={index}>
      <Animated.View style={styles.container}>
        <Animated.View style={[styles.content, backgroundColor]}>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={_onUnlike}
            style={styles.leftBox}
          >
            <Animated.View style={[styles.right, right]}>
              <Icon pack="assets" name="dislike" style={[styles.icon]} />
              <Text marginLeft={8} center marginTop={9} status={"primary"}>
                {t("common:unlike")}
              </Text>
            </Animated.View>
          </TouchableOpacity>
        </Animated.View>
        <PanGestureHandler
          simultaneousHandlers={simultaneousHandlers}
          onGestureEvent={disable ? undefined : panGesture}
        >
          <Animated.View style={[styles.task, rStyle, { width: width }]}>
            <View
              style={[globalStyle.flexDirection, globalStyle.alignItemsCenter]}
            >
              {avatar && <Avatar source={avatar} size={"huge"} />}
              <View>
                <View style={[globalStyle.flexDirection, { marginBottom: 5 }]}>
                  <Text marginLeft={16}>{`${name} `}</Text>
                  {adopt ? (
                    <View style={styles.rowAndCenter}>
                      <Icon
                        pack="assets"
                        name="loveActive"
                        style={styles.love}
                      />
                      <Text status={"danger"} center category="c4">
                        Adopt
                      </Text>
                    </View>
                  ) : null}
                </View>
                <View>
                  <View style={globalStyle.flexDirection}>
                    {typePet ? (
                      <Text
                        marginLeft={16}
                        category="c4"
                        status={"placeholder"}
                      >
                        {typePet}
                      </Text>
                    ) : null}
                    {breed ? (
                      <View
                        style={[
                          globalStyle.flexDirection,
                          globalStyle.alignItemsCenter,
                        ]}
                      >
                        <Layout style={styles.dot} />
                        <Text category="c4" status={"placeholder"}>
                          {breed}
                        </Text>
                      </View>
                    ) : null}
                  </View>
                </View>
              </View>
            </View>
          </Animated.View>
        </PanGestureHandler>
      </Animated.View>
    </AnimatedAppearance>
  );
};

export default FavoriteItem;

const themedStyles = StyleService.create({
  container: {
    width: "100%",
    alignItems: "center",
  },
  content: {
    height: "100%",
    position: "absolute",
    right: 0,
    left: 0,
    flexDirection: "row",
    overflow: "hidden",
  },
  task: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 24,
  },
  right: {
    alignItems: "center",
    justifyContent: "center",
    width: 72,
    height: 72,
  },
  leftBox: {
    alignItems: "flex-end",
    justifyContent: "center",
    flex: 1,
  },
  icon: {
    width: 20,
    height: 20,
  },
  rowAndCenter: {
    flexDirection: "row",
    alignItems: "center",
  },
  love: {
    tintColor: "text-danger-color",
    width: 12,
    height: 12,
    marginRight: 4,
  },
  dot: {
    width: 4,
    height: 4,
    borderRadius: 99,
    marginLeft: 12,
    marginRight: 8,
    backgroundColor: "text-placeholder-color",
    opacity: 0.5,
  },
});
