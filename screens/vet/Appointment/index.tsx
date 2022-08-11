import React, { memo } from "react";
import { TouchableOpacity } from "react-native";
import {
  TopNavigation,
  StyleService,
  useStyleSheet,
  Icon,
  Layout,
} from "@ui-kitten/components";
import {
  DrawerActions,
  NavigationProp,
  useNavigation,
} from "@react-navigation/native";

import Text from "components/Text";
import Content from "components/Content";
import Container from "components/Container";
import { RootStackParamList } from "navigation/types";
import NextAppointment from "../Component/NextAppointment";
import { DATA_NEXT_APPOINTMENT } from "constants/Data";
import NavigationAction from "components/NavigationAction";
import { useTranslation } from "react-i18next";
import AdMob from "components/AdMob";

const Appointment = memo(() => {
  const { navigate } = useNavigation<NavigationProp<RootStackParamList>>();
  const styles = useStyleSheet(themedStyles);
  const { t } = useTranslation(["vet", "common"]);
  const navigation = useNavigation();

  const _onNewAppointment = React.useCallback(() => {
    navigate("VetStackNavigator", { screen: "NewAppointment" });
  }, []);
  return (
    <Container style={styles.container}>
      <TopNavigation
        accessoryLeft={
          <NavigationAction
            icon="menu"
            onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
          />
        }
        accessoryRight={
          <NavigationAction icon="chatAdd" onPress={_onNewAppointment} />
        }
        title={() => <Text>{t("appointment")}</Text>}
      />
      <Content level="2" contentContainerStyle={styles.content}>
        <NextAppointment
          data={DATA_NEXT_APPOINTMENT}
          title={t("nextAppointment")}
        />
        <AdMob marginTop={16} />
        <Text category="h4" marginTop={40} marginBottom={16}>
          {t("common:other")}
        </Text>
        <Layout level={"1"} style={styles.snoozed}>
          <TouchableOpacity activeOpacity={0.7} style={styles.button}>
            <Icon pack="assets" name="history" />
            <Text status={"info"} marginLeft={16}>
              {t("snoozed")}
            </Text>
          </TouchableOpacity>
        </Layout>
        <Layout level={"1"}>
          <TouchableOpacity activeOpacity={0.7} style={styles.button}>
            <Icon pack="assets" name="completed" />
            <Text status={"info"} center marginLeft={16}>
              {t("completed")}
            </Text>
          </TouchableOpacity>
        </Layout>
      </Content>
    </Container>
  );
});

export default Appointment;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
  },
  content: {
    marginHorizontal: 16,
    paddingBottom: 60,
  },
  button: {
    flexDirection: "row",
    padding: 16,
    alignItems: "center",
  },
  snoozed: {
    marginBottom: 1,
  },
});
