import React, { memo } from "react";
import { View, TouchableOpacity } from "react-native";
import {
  TopNavigation,
  StyleService,
  Input,
  useStyleSheet,
  Button,
  Avatar,
} from "@ui-kitten/components";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import useLayout from "hooks/useLayout";

import Text from "components/Text";
import Content from "components/Content";
import Container from "components/Container";
import NavigationAction from "components/NavigationAction";
import BackgroundLogin from "components/BackgroundLogin";
import { useTranslation } from "react-i18next";
import { Images } from "assets/images";
import { Controller, useForm } from "react-hook-form";
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
import { NewPetStackParamList } from "navigation/types";
import useImagePicker from "hooks/useImagePicker";
import { CameraCapturedPicture } from "expo-camera";

const AddNewPet = memo(() => {
  const { navigate } = useNavigation<NavigationProp<NewPetStackParamList>>();
  const { height } = useLayout();
  const styles = useStyleSheet(themedStyles);
  const { t } = useTranslation(["newPet", "common"]);

  const {
    control,
    handleSubmit,
    register,
    getValues,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
    },
  });
  const animatedFullName = useSharedValue(0);
  const petNameStyle = useAnimatedStyle(() => {
    const translateY = interpolate(
      animatedFullName.value,
      [0, 1],
      [8, 18],
      Extrapolate.EXTEND
    );
    const translateX = interpolate(
      animatedFullName.value,
      [0, 1],
      [-6, 0],
      Extrapolate.EXTEND
    );
    const scale = interpolate(
      animatedFullName.value,
      [0, 1],
      [0.86, 1],
      Extrapolate.EXTEND
    );
    return {
      position: "absolute",
      zIndex: 10,
      left: 18,
      top: 0,
      transform: [{ translateY }, { translateX }, { scale }],
      backgroundColor: "transparent",
    };
  });
  React.useEffect(() => {
    if (getValues("name") != "") {
      animatedFullName.value = 0;
    } else {
      animatedFullName.value = 1;
    }
  }, [getValues("name"), animatedFullName.value, petNameStyle]);

  const handleNext = React.useCallback(() => {
    navigate("TypePet");
  }, []);

  const [takePhoto, choosePhoto] = useImagePicker();
  const [image, setImage] = React.useState<CameraCapturedPicture>();
  return (
    <Container style={styles.container}>
      <BackgroundLogin text={t("title")} title={t("petNameAvatar")} />
      <TopNavigation
        accessoryLeft={<NavigationAction />}
        style={styles.topNav}
      />
      <Content
        contentContainerStyle={[
          styles.content,
          { marginTop: 141 * (height / 812) },
        ]}
      >
        <TouchableOpacity
          style={styles.setAvatar}
          activeOpacity={0.54}
          onPress={() => choosePhoto((i) => setImage(i), [1, 1])}
        >
          <Avatar source={image ? image : Images.petAvatar} size="120" />
        </TouchableOpacity>
        <View>
          <Animated.View style={petNameStyle}>
            <Text category={"b2-s"} status="placeholder">
              {t("petName")}
            </Text>
          </Animated.View>
          <Controller
            name="name"
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                {...register("name", {
                  required: "Need correct name",
                  minLength: 3,
                  maxLength: 12,
                  pattern: /[A-Za-z]{3}/,
                })}
                status={errors.name ? "danger" : "basic"}
                onChangeText={onChange}
                value={value}
                onBlur={onBlur}
                size="medium"
                onTouchStart={handleSubmit(() => {})}
                onTouchEnd={handleSubmit(() => {})}
                keyboardType="email-address"
                textStyle={{
                  paddingTop: getValues("name") === "" ? 0 : 16,
                }}
                caption={errors.name?.message}
              />
            )}
          />
        </View>
      </Content>
      <Button status="basic" onPress={handleNext}>
        {t("common:next").toString().toUpperCase()}
      </Button>
    </Container>
  );
});

export default AddNewPet;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
    paddingHorizontal: 32,
    marginBottom: 8,
  },
  content: {},
  setAvatar: {
    alignSelf: "center",
    marginBottom: 32,
  },
  topNav: {
    marginLeft: -32,
  },
});
