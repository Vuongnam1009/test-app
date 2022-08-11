import React, { memo } from "react";
import { Image } from "react-native";
import {
  useTheme,
  StyleService,
  useStyleSheet,
  Button,
} from "@ui-kitten/components";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import useLayout from "hooks/useLayout";
import * as WebBrowser from "expo-web-browser";

import Text from "components/Text";
import Content from "components/Content";
import Container from "components/Container";
import { Images } from "assets/images";
import { AuthStackParamList } from "navigation/types";
import { useTranslation } from "react-i18next";
import AdMob from "components/AdMob";

const Auth = memo(() => {
  const { navigate } = useNavigation<NavigationProp<AuthStackParamList>>();
  const { height, width, top, bottom } = useLayout();
  const theme = useTheme();
  const styles = useStyleSheet(themedStyles);
  const { t } = useTranslation("auth");

  const handleLogin = React.useCallback(() => {
    navigate("Login");
  }, []);
  const handleCreate = React.useCallback(() => {
    navigate("FirstSignUp");
  }, []);
  const handleFacebook = React.useCallback(() => {}, []);
  const handleGoPolicy = React.useCallback(() => {
    WebBrowser.openBrowserAsync(
      "https://timivietnam.github.io/petlover/policy"
    );
  }, []);

  const handleGoTerm = React.useCallback(() => {
    WebBrowser.openBrowserAsync("https://timivietnam.github.io/petlover/term");
  }, []);
  return (
    <Container style={styles.container}>
      <Image
        source={Images.bgLogin}
        /* @ts-ignore */
        style={[{ width: width, height: height }, styles.bgImg]}
      />
      <Content contentContainerStyle={{ marginTop: 136 * (height / 812) }}>
        <Image
          source={Images.logo}
          /* @ts-ignore */
          style={[styles.logo, { marginBottom: 146 * (height / 812) }]}
        />
        <Button
          size="large"
          status="facebook"
          style={styles.facebook}
          onPress={handleFacebook}
        >
          {t("loginFb").toString()}
        </Button>
        <Button
          size="large"
          status="basic"
          style={styles.createAccount}
          onPress={handleCreate}
        >
          {t("createAccount").toString()}
        </Button>

        <Text category="b2-s" center marginBottom={16}>
          {t("alreadyHaveAccount")}{" "}
          <Text category="b2-s" status="info" onPress={handleLogin} capitalize>
            {t("login")}
          </Text>
        </Text>
        <AdMob />
      </Content>
      <Text center marginHorizontal={32} category="c1">
        {t("description1")}
        <Text status="info" category="c1" onPress={handleGoTerm}>
          {t("termsOfService")}
        </Text>
        {t("description2")}
        <Text status="info" category="c1" onPress={handleGoPolicy}>
          {" "}
          {t("privacy")}
        </Text>
      </Text>
    </Container>
  );
});

export default Auth;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
  },
  bgImg: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    zIndex: -10,
  },
  logo: {
    alignSelf: "center",
  },
  facebook: {
    marginHorizontal: 32,
    marginBottom: 24,
  },
  createAccount: {
    marginHorizontal: 32,
    marginBottom: 40,
  },
});
