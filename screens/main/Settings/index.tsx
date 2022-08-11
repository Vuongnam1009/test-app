import React, { memo } from "react";
import { View, TouchableOpacity } from "react-native";
import {
  TopNavigation,
  StyleService,
  useStyleSheet,
  Icon,
} from "@ui-kitten/components";
import { CommonActions, useNavigation } from "@react-navigation/native";
import useLayout from "hooks/useLayout";
import { globalStyle } from "styles/globalStyle";

import Text from "components/Text";
import Content from "components/Content";
import Container from "components/Container";
import { useTranslation } from "react-i18next";
import NavigationAction from "components/NavigationAction";
import useAuth from "hooks/useAuth";
import { RootStackParamList } from "navigation/types";
import AdMob from "components/AdMob";

interface Props {
  title: string;
  des?: string;
  icon: string;
  onPress?(): void;
  status?: string;
}

const Settings = memo(() => {
  const { goBack, dispatch } = useNavigation();
  const { height, width, top, bottom } = useLayout();
  const styles = useStyleSheet(themedStyles);
  const { t } = useTranslation(["settings", "common"]);
  const { signOut } = useAuth();
  const Item = React.useCallback(
    ({ title, icon, des, onPress, status }: Props) => {
      return (
        <TouchableOpacity
          activeOpacity={0.7}
          style={[
            styles.item,
            {
              alignItems: des ? "flex-start" : "center",
            },
          ]}
          onPress={onPress}
        >
          <Icon
            pack="assets"
            name={icon}
            style={[globalStyle.icon24, globalStyle.marH24]}
          />
          <View>
            <Text status={status}>{title}</Text>
            {des ? (
              <Text status={"info"} marginTop={7}>
                {des}
              </Text>
            ) : null}
          </View>
        </TouchableOpacity>
      );
    },
    []
  );
  const nextScreen = React.useCallback(
    (screenName: keyof RootStackParamList) => {
      const resetAction = CommonActions.reset({
        index: 1,
        routes: [
          {
            name: screenName,
          },
        ],
      });
      dispatch(resetAction);
    },
    []
  );

  const logout = React.useCallback(async () => {
    await signOut();
    nextScreen("Auth");
  }, [signOut]);
  return (
    <Container style={styles.container}>
      <TopNavigation
        style={styles.topNav}
        title={t("title").toString()}
        accessoryLeft={<NavigationAction />}
      />
      <Content contentContainerStyle={styles.content}>
        <Text
          marginLeft={24}
          uppercase
          category="c4"
          fontFamily="Montserrat-Medium"
          fontWeight="500"
          marginBottom={24}
          children={t("general")}
        />
        <Item
          title={t("changeEmail")}
          icon="emailNormal"
          des="lehieuds@gmail.com"
        />
        <Item title={t("changePassword")} icon="lock" />
        <Item title={t("notificationSettings")} icon="tabNotification" />
        <Item title={t("unitSettings")} icon="unit" />
        <AdMob />
        <Text
          marginLeft={24}
          uppercase
          category="c4"
          fontFamily="Montserrat-Medium"
          fontWeight="500"
          marginBottom={24}
          marginTop={16}
          children={t("application")}
        />
        <Item title={t("aboutPetLover")} icon="logo" />
        <Item title={t("policyPetLover")} icon="privacy" />
        <Item title={t("termService")} icon="document" />
        <Item title={t("sendFeedback")} icon="comment" />
        <Item title={t("checkUpdate")} icon="update" />
        <Item
          title={t("common:logout")}
          icon="logout"
          status="danger"
          onPress={logout}
        />
      </Content>
    </Container>
  );
});

export default Settings;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
    paddingBottom: 0,
  },
  topNav: {
    borderBottomWidth: 1,
    borderBottomColor: "background-basic-color-2",
  },
  content: {
    marginTop: 32,
    paddingBottom: 60,
  },
  item: {
    flexDirection: "row",
    marginBottom: 32,
  },
});
