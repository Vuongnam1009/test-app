import React, { memo } from "react";
import { View, TouchableOpacity } from "react-native";
import {
  TopNavigation,
  StyleService,
  useStyleSheet,
  Toggle,
  Layout,
} from "@ui-kitten/components";
import {
  DrawerActions,
  NavigationProp,
  useNavigation,
} from "@react-navigation/native";
import { globalStyle } from "styles/globalStyle";

import Text from "components/Text";
import Content from "components/Content";
import Container from "components/Container";
import { useTranslation } from "react-i18next";
import NavigationAction from "components/NavigationAction";
import { RootStackParamList } from "navigation/types";
import useToggle from "hooks/useToggle";
import AdMob from "components/AdMob";

const Reminder = memo(() => {
  const { goBack, dispatch, navigate } =
    useNavigation<NavigationProp<RootStackParamList>>();
  const styles = useStyleSheet(themedStyles);
  const { t } = useTranslation(["medical", "common"]);

  const [outDateVaccine, setOutDateVaccine] = useToggle(true);
  const [fleaMedicine, setFleaMedicine] = useToggle(false);
  const [feedDinner, setFeedDinner] = useToggle(true);
  const [feedBreakfast, setFeedBreakfast] = useToggle(true);
  const [feedLunch, setFeedLunch] = useToggle(true);

  const _onMenu = React.useCallback(() => {
    dispatch(DrawerActions.openDrawer());
  }, []);
  const _onNewReminder = React.useCallback(() => {
    navigate("VetStackNavigator", { screen: "NewReminder" });
  }, []);
  return (
    <Container style={styles.container}>
      <TopNavigation
        title={t("reminder").toString()}
        accessoryLeft={<NavigationAction icon="menu" onPress={_onMenu} />}
        accessoryRight={
          <NavigationAction icon="chatAdd" onPress={_onNewReminder} />
        }
      />
      <Content contentContainerStyle={styles.content} level="2">
        <Text category="h4" marginBottom={16}>
          {t("systemReminder")}
        </Text>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={setOutDateVaccine}
          style={styles.buttonOutDate}
        >
          <Text>{t("VaccinesNearingExpiry")}</Text>
          <Toggle
            checked={outDateVaccine}
            onChange={setOutDateVaccine}
            status={"success"}
          />
        </TouchableOpacity>
        <Text category="h4" marginBottom={16}>
          {t("customReminders")}
        </Text>
        <Layout style={styles.customReminder}>
          <TouchableOpacity onPress={setFleaMedicine} style={styles.fleaBtn}>
            <View style={globalStyle.flexSpaceBetween}>
              <Text fontFamily="Montserrat-Medium">
                Flea medicine for Sammy
              </Text>
              <Toggle
                checked={fleaMedicine}
                onChange={setFleaMedicine}
                status={"success"}
              />
            </View>
            <Text category="c4" status={"placeholder"} marginBottom={8}>
              Monthly on day 1 at 14:05 PM
            </Text>
            <Text category="b3">Flea medicine for Sammy at Cute Pet Shop</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.btnFeed}
            activeOpacity={0.7}
            onPress={setFeedDinner}
          >
            <View>
              <Text fontFamily="Montserrat-Medium" fontWeight="500">
                {t("feedDinner")}
              </Text>
              <Text category="c4" marginTop={9}>
                Daily at 08:00 PM
              </Text>
            </View>
            <Toggle
              checked={feedDinner}
              onChange={setFeedDinner}
              status={"success"}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.btnFeed}
            activeOpacity={0.7}
            onPress={setFeedBreakfast}
          >
            <View>
              <Text fontFamily="Montserrat-Medium" fontWeight="500">
                {t("feedBreakfast")}
              </Text>
              <Text category="c4" marginTop={9}>
                Daily at 07:00 AM
              </Text>
            </View>
            <Toggle
              checked={feedBreakfast}
              onChange={setFeedBreakfast}
              status={"success"}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.btnLunch}
            activeOpacity={0.7}
            onPress={setFeedLunch}
          >
            <View>
              <Text fontFamily="Montserrat-Medium" fontWeight="500">
                {t("feedLunch")}
              </Text>
              <Text category="c4" marginTop={9}>
                Daily at 12:00 PM
              </Text>
            </View>
            <Toggle
              checked={feedLunch}
              onChange={setFeedLunch}
              status={"success"}
            />
          </TouchableOpacity>
        </Layout>
        <AdMob marginTop={16}/>
      </Content>
    </Container>
  );
});

export default Reminder;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
  },
  content: {
    marginTop: 24,
    paddingHorizontal: 16,
  },
  buttonOutDate: {
    backgroundColor: "background-basic-color-1",
    paddingTop: 18,
    paddingBottom: 16,
    alignItems: "center",
    paddingHorizontal: 16,
    borderRadius: 4,
    ...globalStyle.flexSpaceBetween,
    marginBottom: 40,
    ...globalStyle.shadow,
  },
  customReminder: {
    padding: 16,
    borderRadius: 4,
    ...globalStyle.shadow,
  },
  fleaBtn: {
    borderBottomColor: "background-basic-color-2",
    borderBottomWidth: 1,
    paddingBottom: 16,
  },
  btnFeed: {
    paddingVertical: 16,
    alignItems: "center",
    ...globalStyle.flexSpaceBetween,
    borderBottomColor: "background-basic-color-2",
    borderBottomWidth: 1,
  },
  btnLunch: {
    paddingTop: 16,
    alignItems: "center",
    ...globalStyle.flexSpaceBetween,
  },
});
