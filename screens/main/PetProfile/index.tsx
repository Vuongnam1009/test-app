import React, { memo } from "react";
import { View } from "react-native";
import {
  TopNavigation,
  StyleService,
  useStyleSheet,
  Layout,
  Avatar,
  Button,
  Modal,
  Input,
} from "@ui-kitten/components";
import { useNavigation, useRoute } from "@react-navigation/native";
import useLayout from "hooks/useLayout";
import { globalStyle } from "styles/globalStyle";

import Text from "components/Text";
import Container from "components/Container";
import { PetProfileNavigationProp } from "navigation/types";
import FocusAwareStatusBar from "components/FocusAwareStatusBar";
import NavigationAction from "components/NavigationAction";
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
import { Images } from "assets/images";
import { useTranslation } from "react-i18next";
import ReadMore from "components/ReadMore";
import Monitor from "./Monitor";
import PetInformation from "./PetInfomation";
import useModal from "hooks/useModal";
import Header from "./Header";
import { Controller, useForm } from "react-hook-form";

const PetProfile = memo(() => {
  const { goBack } = useNavigation();
  const { height, width, top, bottom } = useLayout();
  const styles = useStyleSheet(themedStyles);
  const { t } = useTranslation(["profile", "common"]);

  const { modalRef, hide, show } = useModal();

  const route = useRoute<PetProfileNavigationProp>();
  let data = route.params.data;
  let isUser = route.params.isUser;
  let aboutPet =
    "Our Best Friend, the Dog, has been around for thousands of years. When man learned to harness dogs for his use, there began. Of all the domesticated animals, dogs serve the widest array of roles: protector, helper, lifesaver, and companion. Dogs are incredible friends to people, and they’ve been companions through centuries.";

  const {
    control,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm({
    defaultValues: {
      range: "",
    },
  });
  const [range, setRange] = React.useState("");
  const _onRange = React.useCallback(() => {
    setRange(getValues("range"));
  }, [getValues("range")]);

  const translationY = useSharedValue(0);
  const scrollHandler = useAnimatedScrollHandler((event) => {
    translationY.value = event.contentOffset.y;
  });
  const style = useAnimatedStyle(() => {
    const heightAnim = interpolate(
      translationY.value,
      [-100, 0],
      [height / 2.4 + 100, height / 2.4],
      Extrapolate.CLAMP
    );
    return {
      position: "absolute",
      left: 0,
      width: width,
      resizeMode: "cover",
      height: heightAnim,
      top: 0,
    };
  });
  const styleHeader = useAnimatedStyle(() => {
    const input = [0, height * 0.25, height * 0.3, height * 0.35];
    const scale = interpolate(translationY.value, input, [0, 0, 1, 1]);
    const transY = interpolate(
      translationY.value,
      input,
      [1, 1, 0, 0],
      Extrapolate.CLAMP
    );
    const opacity = interpolate(
      translationY.value,
      input,
      [0, 0, 0.8, 1],
      Extrapolate.CLAMP
    );

    return {
      opacity: opacity,
      transform: [{ scale }, { translateY: transY }],
    };
  });

  const _onEdit = () => {};
  return (
    <Container style={[styles.container]}>
      <FocusAwareStatusBar barStyle="light-content" />
      <View style={{ marginTop: top }}>
        <Animated.Image
          source={Images.bgProfile}
          style={style}
          resizeMode="cover"
        />
        <TopNavigation
          appearance={"control"}
          accessoryLeft={<NavigationAction status="transparent" />}
          title={() => (
            <Animated.View style={[styleHeader, globalStyle.flexDirection]}>
              <Avatar source={data.avatar} size={"small"} />
              <Text marginLeft={8} status={"primary"} category="os2">
                {data.name}
              </Text>
            </Animated.View>
          )}
          accessoryRight={
            <NavigationAction
              icon={"edit"}
              status="transparent"
              onPress={_onEdit}
            />
          }
        />
        <Animated.ScrollView
          scrollEventThrottle={16}
          onScroll={scrollHandler}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={[
            styles.content,
            {
              paddingBottom: 260 * (height / 812),
            },
          ]}
          style={{
            paddingTop: 168 * (height / 812),
          }}
        >
          <Header avatar={data.avatar} name={data.name} isUser={isUser} />
          <View style={styles.middle}>
            <Text
              uppercase
              category="c4"
              fontFamily="Montserrat-Medium"
              fontWeight="500"
              marginBottom={16}
              children={`${t("about")} ${data.name}`}
            />
            <ReadMore category="b3">{aboutPet}</ReadMore>
          </View>
          {isUser ? (
            <Monitor data={DATA_MONITOR} _onChange={show} range={range} />
          ) : null}
          <PetInformation data={DATA_PET_INFORMATION} isUser={isUser} />
        </Animated.ScrollView>
      </View>
      <Modal
        ref={modalRef}
        onBackdropPress={hide}
        backdropStyle={styles.backDropStyle}
        style={{ flex: 1 }}
      >
        <Layout style={styles.modal}>
          <Text category="b1" marginHorizontal={24} marginBottom={24}>
            Change Safe Range Radius
          </Text>
          <Controller
            name="range"
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                status={errors.range ? "warning" : "basic"}
                onChangeText={onChange}
                autoFocus
                value={value}
                onBlur={onBlur}
                size="large"
                onTouchStart={handleSubmit(() => {})}
                onTouchEnd={handleSubmit(() => {})}
                keyboardType="numeric"
                textStyle={styles.textInput}
                caption={errors.range?.message}
              />
            )}
          />
          <Button
            children={t("common:ok").toUpperCase()}
            size={"large"}
            status={"basic"}
            style={styles.btnOk}
            onPress={_onRange}
          />
        </Layout>
      </Modal>
    </Container>
  );
});

export default PetProfile;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
    backgroundColor: "color-primary-100",
    paddingBottom: 0,
    paddingTop: 0,
  },
  content: {
    borderTopRightRadius: 28,
    borderTopLeftRadius: 28,
    backgroundColor: "background-basic-color-1",
  },
  middle: {
    marginHorizontal: 24,
    marginTop: 24,
  },
  backDropStyle: {
    backgroundColor: "rgba(30, 31, 32, 0.86)",
  },
  modal: {
    padding: 24,
    borderRadius: 20,
  },
  btnOk: {
    marginTop: 32,
  },
  textInput: {
    textAlign: "center",
  },
});
const DATA_PET_INFORMATION = {
  type: "Dog",
  breed: "Corgi",
  gender: "male",
  sterilization: "Unneutered",
  weight: 32,
  birthday: "Mar 20, 2018",
};
// time is sec
const DATA_MONITOR = {
  activity: 88488,
  rest: 84456,
  distance: 234.1,
  kcal: 12.4,
};
