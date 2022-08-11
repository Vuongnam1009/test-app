import React, { memo } from "react";
import { View, TouchableOpacity } from "react-native";
import {
  TopNavigation,
  StyleService,
  useStyleSheet,
  Input,
  Button,
  Avatar,
} from "@ui-kitten/components";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import useLayout from "hooks/useLayout";

import Text from "components/Text";
import Container from "components/Container";
import { useTranslation } from "react-i18next";
import { Images } from "assets/images";
import NavigationAction from "components/NavigationAction";
import { Controller, useForm } from "react-hook-form";
import { AuthStackParamList } from "navigation/types";
import BackgroundLogin from "components/BackgroundLogin";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
import { RuleName } from "utils/rules";
import useImagePicker from "hooks/useImagePicker";
import { CameraCapturedPicture } from "expo-camera";

const FirstSignUp = memo(() => {
  const { navigate } = useNavigation<NavigationProp<AuthStackParamList>>();
  const { height } = useLayout();
  const styles = useStyleSheet(themedStyles);
  const { t } = useTranslation(["auth", "common"]);
  const [isFocus, setIsFocus] = React.useState(true);

  const animatedFullName = useSharedValue(0);
  const {
    control,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
    },
  });

  React.useEffect(() => {
    if (getValues("name") == "") {
      animatedFullName.value = 1;
    } else {
      animatedFullName.value = 0;
    }
  }, [getValues("name"), animatedFullName.value]);

  const animatedStyle = useAnimatedStyle(() => {
    const translateY = interpolate(
      animatedFullName.value,
      [0, 1],
      [6, 16],
      Extrapolate.CLAMP
    );
    const translateX = interpolate(
      animatedFullName.value,
      [0, 1],
      [-4, 0],
      Extrapolate.CLAMP
    );
    const scale = interpolate(
      animatedFullName.value,
      [0, 1],
      [0.85, 1],
      Extrapolate.CLAMP
    );
    return {
      position: "absolute",
      zIndex: 10,
      left: 16,
      transform: [{ translateY }, { scale }, { translateX }],
      backgroundColor: "transparent",
    };
  });
  const handleNext = React.useCallback(() => {
    navigate("SecondSignUp");
  }, []);

  const [takePhoto, choosePhoto] = useImagePicker();
  const [image, setImage] = React.useState<CameraCapturedPicture>();
  return (
    <Container style={styles.container}>
      <BackgroundLogin text={t("signUp")} title={t("titleSignUp")} img />
      <TopNavigation
        appearance="control"
        accessoryLeft={<NavigationAction />}
      />
      <KeyboardAwareScrollView
        contentContainerStyle={[
          styles.content,
          { marginTop: 113 * (height / 812) },
        ]}
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={16}
        enableOnAndroid
      >
        <TouchableOpacity
          style={styles.setAvatar}
          activeOpacity={0.54}
          onPress={() => choosePhoto((i) => setImage(i), [1, 1])}
        >
          <Avatar source={image ? image : Images.setAvatar} size="120" />
        </TouchableOpacity>
        <View>
          <Animated.View style={animatedStyle}>
            <Text category={"b2-s"} status="placeholder">
              {t("fullName")}
            </Text>
          </Animated.View>
          <Controller
            name="name"
            rules={RuleName}
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                status={errors.name ? "warning" : "basic"}
                onChangeText={onChange}
                onFocus={() => {
                  setIsFocus(true);
                }}
                value={value}
                onBlur={() => {
                  setIsFocus(false);
                  onBlur();
                }}
                size="medium"
                onTouchStart={handleSubmit(() => {})}
                onTouchEnd={handleSubmit(() => {})}
                keyboardType="email-address"
                textStyle={{
                  paddingTop: getValues("name") !== "" ? 16 : 0,
                }}
                caption={errors.name?.message}
              />
            )}
          />
        </View>
        <Text category="c1" status="placeholder" marginTop={8}>
          {t("desSignUp")}
        </Text>
      </KeyboardAwareScrollView>
      <Button
        size="large"
        status="basic"
        style={styles.next}
        onPress={handleNext}
      >
        <Text uppercase>{t("common:next")}</Text>
      </Button>
    </Container>
  );
});

export default FirstSignUp;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
  },
  setAvatar: {
    alignSelf: "center",
    marginTop: 64,
    marginBottom: 48,
  },
  content: {
    paddingHorizontal: 32,
  },
  next: {
    marginBottom: 8,
    marginHorizontal: 24,
  },
});
