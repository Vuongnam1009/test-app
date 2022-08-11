import React, { memo } from "react";
import * as WebBrowser from "expo-web-browser";

import { View, TouchableOpacity } from "react-native";
import {
  TopNavigation,
  useTheme,
  StyleService,
  useStyleSheet,
  Input,
  Icon,
  Button,
  CheckBox,
} from "@ui-kitten/components";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import useLayout from "hooks/useLayout";
import Text from "components/Text";
import Container from "components/Container";
import NavigationAction from "components/NavigationAction";
import { useTranslation } from "react-i18next";
import BackgroundLogin from "components/BackgroundLogin";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Controller, useForm } from "react-hook-form";
import { RuleConfirmPassword, RuleEmail, RulePassword } from "utils/rules";
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
import { AuthStackParamList } from "navigation/types";
import AdMob from "components/AdMob";

const SecondSignUp = memo(() => {
  const { goBack, navigate } =
    useNavigation<NavigationProp<AuthStackParamList>>();
  const { height, width, top, bottom } = useLayout();
  const theme = useTheme();
  const styles = useStyleSheet(themedStyles);
  const { t } = useTranslation("auth");
  const [agreeTerm, setAgreeTerm] = React.useState(false);
  const handleGoPolicy = React.useCallback(() => {
    WebBrowser.openBrowserAsync(
      "https://timivietnam.github.io/petlover/policy"
    );
  }, []);

  const handleGoTerm = React.useCallback(() => {
    WebBrowser.openBrowserAsync("https://timivietnam.github.io/petlover/term");
  }, []);
  const {
    control,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
      confirm: "",
    },
  });
  const translateEmail = useSharedValue(1);
  const translatePass = useSharedValue(1);
  const translateConfirm = useSharedValue(1);
  const [isInvisible, setIsInvisible] = React.useState<boolean>(true);
  const [canContinue, setCanContinue] = React.useState<boolean>(false);
  React.useEffect(() => {
    if (
      !errors.email &&
      !errors.confirm &&
      !errors.password &&
      getValues("password") !== "" &&
      getValues("confirm") !== "" &&
      agreeTerm === false
    ) {
      setCanContinue(false);
    } else if (
      getValues("password") !== getValues("confirm") &&
      getValues("password") === "" &&
      getValues("confirm") === ""
    ) {
      setCanContinue(false);
    } else {
      setCanContinue(true);
    }
  }, [
    errors.email,
    errors.confirm,
    errors.password,
    setCanContinue,
    getValues("confirm"),
    getValues("email"),
    getValues("password"),
  ]);
  React.useEffect(() => {
    if (getValues("email") === "") {
      translateEmail.value = 1;
    } else {
      translateEmail.value = 0;
    }
    if (getValues("password") === "") {
      translatePass.value = 1;
    } else {
      translatePass.value = 0;
    }
    if (getValues("confirm") === "") {
      translateConfirm.value = 1;
    } else {
      translateConfirm.value = 0;
    }
  }, [
    translateEmail.value,
    getValues("email"),
    translatePass.value,
    getValues("password"),
    translateConfirm.value,
    getValues("confirm"),
    errors,
  ]);
  const emailStyle = useAnimatedStyle(() => {
    const translateY = interpolate(translateEmail.value, [0, 1], [6, 16]);
    const translateX = interpolate(translateEmail.value, [0, 1], [-4, 0]);
    const scale = interpolate(translateEmail.value, [0, 1], [0.85, 1]);
    return {
      position: "absolute",
      zIndex: 10,
      left: 16,
      transform: [{ translateY }, { scale: scale }, { translateX }],
      backgroundColor: "transparent",
    };
  });
  const passStyle = useAnimatedStyle(() => {
    const translateY = interpolate(translatePass.value, [0, 1], [6, 16]);
    const translateX = interpolate(translatePass.value, [0, 1], [-4, 0]);
    const scale = interpolate(translatePass.value, [0, 1], [0.85, 1]);
    return {
      position: "absolute",
      zIndex: 10,
      left: 16,
      transform: [{ translateY }, { scale: scale }, { translateX }],
      backgroundColor: "transparent",
    };
  });
  const confirmStyle = useAnimatedStyle(() => {
    const translateY = interpolate(translateConfirm.value, [0, 1], [6, 16]);
    const translateX = interpolate(translateConfirm.value, [0, 1], [-8, 0]);
    const scale = interpolate(translateConfirm.value, [0, 1], [0.85, 1]);
    return {
      position: "absolute",
      zIndex: 10,
      left: 16,
      transform: [{ translateY }, { scale }, { translateX }],
      backgroundColor: "transparent",
    };
  });

  const handleSuccess = React.useCallback(() => {
    navigate("SuccessSignUp");
  }, []);

  return (
    <Container style={styles.container}>
      <BackgroundLogin text={t("signup")} title={t("monitoring")} img />
      <TopNavigation
        appearance="control"
        accessoryLeft={<NavigationAction />}
      />
      <KeyboardAwareScrollView
        contentContainerStyle={[
          styles.content,
          { marginTop: 173 * (height / 812) },
        ]}
        enableOnAndroid
      >
        <View>
          <Animated.View style={emailStyle}>
            <Text category={"b2-s"} status="placeholder">
              {t("email")}
            </Text>
          </Animated.View>
          <Controller
            name="email"
            rules={RuleEmail}
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                status={errors.email ? "danger" : "basic"}
                onChangeText={onChange}
                value={value}
                onBlur={onBlur}
                size="medium"
                onTouchStart={handleSubmit(() => {})}
                onTouchEnd={handleSubmit(() => {})}
                keyboardType="email-address"
                textStyle={{ paddingTop: getValues("email") === "" ? 0 : 16 }}
                caption={errors.email?.message}
                style={styles.inputBox}
              />
            )}
          />
        </View>
        <View>
          <Animated.View style={passStyle}>
            <Text category={"b2-s"} status="placeholder">
              {t("password")}
            </Text>
          </Animated.View>
          <Controller
            name="password"
            rules={RulePassword}
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                status={errors.password ? "danger" : "basic"}
                onChangeText={onChange}
                value={value}
                secureTextEntry={isInvisible}
                onBlur={onBlur}
                size="medium"
                onTouchStart={handleSubmit(() => {})}
                onTouchEnd={handleSubmit(() => {})}
                keyboardType="email-address"
                textStyle={{
                  paddingTop: getValues("password") === "" ? 0 : 16,
                }}
                caption={errors.password?.message}
                style={styles.inputBox}
                accessoryRight={(props) => (
                  <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={() => setIsInvisible(!isInvisible)}
                  >
                    <Icon
                      {...props}
                      pack="assets"
                      name={!isInvisible ? "eyeOn" : "eyeOff"}
                    />
                  </TouchableOpacity>
                )}
              />
            )}
          />
        </View>
        <View>
          <Animated.View style={[confirmStyle]}>
            <Text category={"b2-s"} status="placeholder">
              {t("confirmPassword")}
            </Text>
          </Animated.View>
          <Controller
            name="confirm"
            rules={RuleConfirmPassword}
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                status={errors.confirm ? "danger" : "basic"}
                onChangeText={onChange}
                value={value}
                onBlur={onBlur}
                secureTextEntry={isInvisible}
                size="medium"
                onTouchStart={handleSubmit(() => {})}
                onTouchEnd={handleSubmit(() => {})}
                keyboardType="email-address"
                textStyle={{
                  paddingTop: getValues("confirm") === "" ? 0 : 16,
                }}
                caption={errors.confirm?.message}
                style={styles.inputBox}
              />
            )}
          />
        </View>
        <CheckBox
          checked={agreeTerm}
          onChange={setAgreeTerm}
          children={() => (
            <Text marginLeft={16} marginTop={12}>
              I agree to the{" "}
              <Text status={"info"} onPress={handleGoTerm}>
                Term of service
              </Text>{" "}
              and{" "}
              <Text status={"info"} onPress={handleGoPolicy}>
                Privacy Policy
              </Text>
            </Text>
          )}
        />
        <Button
          children={t("signup").toString()}
          size="large"
          status="basic"
          style={styles.signup}
          disabled={canContinue}
          onPress={handleSuccess}
        />
        <AdMob marginTop={60} />
      </KeyboardAwareScrollView>
    </Container>
  );
});

export default SecondSignUp;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
  },
  inputPlaceholder: {
    position: "absolute",
    zIndex: 10,
    left: 16,
    top: 8,
  },
  content: {
    paddingHorizontal: 32,
  },
  inputBox: {
    marginBottom: 24,
  },
  signup: {
    marginTop: 8,
  },
});
