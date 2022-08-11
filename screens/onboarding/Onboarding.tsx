import React, { memo } from "react";
import {
  View,
  Image,
  ScrollView,
  NativeSyntheticEvent,
  TouchableOpacity,
  NativeScrollEvent,
} from "react-native";
import { StyleService, useStyleSheet } from "@ui-kitten/components";
import { CommonActions, useNavigation } from "@react-navigation/native";
import useLayout from "hooks/useLayout";
import Text from "components/Text";
import Container from "components/Container";
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedRef,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
} from "react-native-reanimated";
import DotsIntro from "screens/onboarding/DotsIntro";
import FocusAwareStatusBar from "components/FocusAwareStatusBar";
import { DATA_INTRO } from "constants/Data";
import { useTranslation } from "react-i18next";

const Onboarding = memo(() => {
  const { height, width, top, bottom } = useLayout();
  const styles = useStyleSheet(themedStyles);
  const { dispatch } = useNavigation();
  const { t } = useTranslation(["intro", "common"]);

  const scrollRef = useAnimatedRef<ScrollView>();
  const translationX = useSharedValue(0);
  const [getStart, setGetStart] = React.useState(false);

  const scrollHandler = useAnimatedScrollHandler((event) => {
    translationX.value = event.contentOffset.x;
  });

  const activeIndex = useDerivedValue(() => {
    return Math.round(translationX.value / width);
  });
  const onIconPressNext = React.useCallback(() => {
    if (activeIndex.value === DATA_INTRO.length - 1) return;
    scrollRef.current?.scrollTo({ x: width * (activeIndex.value + 1) });
    if (activeIndex.value === DATA_INTRO.length - 2) {
      setGetStart(true);
    }
  }, [activeIndex]);

  const onScrollEnd = React.useCallback(
    (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      let e = event.nativeEvent.targetContentOffset?.x;
      if (e === width * 3 || activeIndex.value === 4) {
        setGetStart(true);
      } else {
        setGetStart(false);
      }
    },
    [getStart, setGetStart, scrollRef]
  );
  const nextScreen = React.useCallback((screenName: string) => {
    const resetAction = CommonActions.reset({
      index: 1,
      routes: [
        {
          name: screenName,
        },
      ],
    });
    dispatch(resetAction);
  }, []);
  const handleStarted = React.useCallback(() => {
    nextScreen("Auth");
  }, []);

  return (
    <Container style={[styles.container]}>
      <FocusAwareStatusBar barStyle="light-content" />
      <Animated.ScrollView
        ref={scrollRef as any}
        scrollEventThrottle={16}
        showsHorizontalScrollIndicator={false}
        horizontal
        snapToInterval={width}
        bounces={false}
        pagingEnabled={false}
        decelerationRate="fast"
        onScroll={scrollHandler}
        style={{ width: width }}
        contentContainerStyle={{ width: width * 4 }}
        onScrollEndDrag={(event) => onScrollEnd(event)}
      >
        {DATA_INTRO.map((i, index) => {
          const styleAni = useAnimatedStyle(() => {
            let input = [(i.id - 1) * width, i.id * width, (i.id + 1) * width];
            const scale = interpolate(
              translationX.value,
              input,
              [1, 1, 1],
              Extrapolate.CLAMP
            );
            return {
              transform: [{ scale: scale }],
            };
          });
          return (
            <Animated.View key={index} style={styleAni}>
              <Image
                source={i.img}
                style={[{ width: width, height: height + top + bottom }]}
              />
              <View
                style={[
                  styles.title,
                  { bottom: bottom + 112 * (height / 812) },
                ]}
              >
                <Text category="h4" status="primary" marginBottom={16}>
                  {i.title}
                </Text>
                <Text category="b2-p" status="primary">
                  {i.des}
                </Text>
              </View>
            </Animated.View>
          );
        })}
      </Animated.ScrollView>
      <View style={[styles.dot, { bottom: bottom + 24, width: width - 64 }]}>
        <DotsIntro data={DATA_INTRO} translationValue={translationX} />
        {getStart === true ? (
          <TouchableOpacity activeOpacity={0.7} onPress={handleStarted}>
            <Text category="b2-s" uppercase status="danger">
              {t("getStart")}
            </Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity activeOpacity={0.7} onPress={onIconPressNext}>
            <Text category="b2-s" uppercase status="primary">
              {t("common:next")}
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </Container>
  );
});

export default Onboarding;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
    paddingTop: 0,
    paddingBottom: 0,
  },
  dot: {
    position: "absolute",
    flexDirection: "row",
    justifyContent: "space-between",
    alignSelf: "center",
  },
  title: {
    position: "absolute",
    left: 0,
    right: 0,
    marginHorizontal: 32,
    zIndex: 20,
  },
});
