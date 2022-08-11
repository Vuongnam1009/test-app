import React, { memo } from "react";
import * as WebBrowser from "expo-web-browser";

import { View, TouchableOpacity } from "react-native";
import {
  TopNavigation,
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
import { Controller, useForm } from "react-hook-form";
import { RuleEmail, RulePassword } from "utils/rules";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import useToggle from "hooks/useToggle";
import { AuthStackParamList, RootStackParamList } from "navigation/types";
import { useTranslation } from "react-i18next";
import BackgroundLogin from "components/BackgroundLogin";
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
import AdMob from "components/AdMob";
const Login = memo(() => {
  const { navigate } = useNavigation<NavigationProp<RootStackParamList>>();
  const { height, width, top, bottom } = useLayout();
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

  const [invisible, setInvisible] = useToggle(true);

  const {
    control,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "lehieuds@gmail.com",
      password: "12345678",
    },
  });
  const translateEmail = useSharedValue(0);
  const translatePass = useSharedValue(0);
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
  }, [
    translateEmail.value,
    getValues("email"),
    translatePass.value,
    getValues("password"),
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
      transform: [{ translateY }, { scale }, { translateX }],
      backgroundColor: "transparent",
    };
  });

  const handleLogin = React.useCallback(() => {
    return navigate("DrawerNavigator", { screen: "Main" });
  }, []);
  const handleRegister = React.useCallback(() => {
    navigate("Auth", { screen: "FirstSignUp" });
  }, []);
  return (
    <Container style={styles.container}>
      <BackgroundLogin text={t("login")} title={t("welcomeBack")} img />
      <TopNavigation
        appearance="control"
        accessoryLeft={<NavigationAction />}
      />
      <KeyboardAwareScrollView
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
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
                status={errors.email ? "warning" : "basic"}
                onChangeText={onChange}
                value={value}
                onBlur={onBlur}
                size="medium"
                onTouchStart={handleSubmit(() => {})}
                onTouchEnd={handleSubmit(() => {})}
                keyboardType="email-address"
                caption={errors.email?.message}
                style={styles.inputBox}
                textStyle={{
                  paddingTop: getValues("email") === "" ? 0 : 16,
                }}
                accessoryRight={(props) =>
                  errors.email ? (
                    <></>
                  ) : (
                    <Icon pack="assets" name="radioActive" />
                  )
                }
              />
            )}
          />
          <View>
            <Animated.View style={passStyle}>
              <Text category={"b2-s"} status="placeholder">
                {t("password")}
              </Text>
            </Animated.View>
            <Controller
              name="password"
              control={control}
              rules={RulePassword}
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  secureTextEntry={invisible}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  value={value}
                  size="medium"
                  status={errors.password ? "warning" : undefined}
                  onTouchStart={handleSubmit(() => {})}
                  onTouchEnd={handleSubmit(() => {})}
                  keyboardType="default"
                  textStyle={{
                    paddingTop: getValues("password") === "" ? 0 : 16,
                  }}
                  caption={errors.password?.message}
                  style={styles.inputBox}
                  accessoryRight={(props) => (
                    <TouchableOpacity
                      activeOpacity={0.7}
                      onPress={setInvisible}
                    >
                      <Icon
                        pack="assets"
                        style={styles.iconEye}
                        name={!invisible ? "eyeOn" : "eyeOff"}
                      />
                    </TouchableOpacity>
                  )}
                />
              )}
            />
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
              size="large"
              status="basic"
              style={styles.login}
              disabled={agreeTerm === false}
              onPress={handleLogin}
            >
              <Text uppercase>{t("login")}</Text>
            </Button>
            <Text category="b2-s" center status="info">
              {t("forgotPass")}
            </Text>
          </View>
        </View>
        <AdMob marginTop={40} />
      </KeyboardAwareScrollView>
      <Text center>
        {t("dontHave")}?{" "}
        <Text status="info" onPress={handleRegister}>
          {t("signup")}
        </Text>
      </Text>
    </Container>
  );
});

export default Login;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
    marginBottom: 8,
  },
  iconEye: {
    tintColor: "text-placeholder-color",
    width: 24,
    height: 24,
  },
  inputBox: {
    marginBottom: 24,
  },
  content: {
    paddingHorizontal: 32,
  },
  login: {
    marginBottom: 40,
    marginTop: 32,
  },
});
