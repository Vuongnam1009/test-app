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
import { globalStyle } from "styles/globalStyle";

import Text from "components/Text";
import Content from "components/Content";
import Container from "components/Container";
import NavigationAction from "components/NavigationAction";
import { useTranslation } from "react-i18next";
import ListVaccines from "../Component/ListVaccines";
import { RootStackParamList } from "navigation/types";
import AdMob from "components/AdMob";

const Medical = memo(() => {
  const styles = useStyleSheet(themedStyles);
  const navigation = useNavigation();
  const { t } = useTranslation(["medical", "common"]);
  const { navigate } = useNavigation<NavigationProp<RootStackParamList>>();

  const _pressOutDate = () => {};
  const _pressDocument = () => {};
  const _addVaccine = () => {
    navigate("VetStackNavigator", { screen: "NewVaccine" });
  };
  const _onShowMore = () => {
    navigate("VetStackNavigator", { screen: "VaccinesList" });
  };
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
          <NavigationAction icon="chatAdd" onPress={_addVaccine} />
        }
        title={() => <Text>{t("medical")}</Text>}
      />
      <Content level="2" contentContainerStyle={styles.content}>
        <ListVaccines
          data={DATA_VACCINES}
          title={t("latestVaccines")}
          _showMore={_onShowMore}
        />
        <AdMob marginBottom={16}/>
        <Text category="h4" marginBottom={16}>
          {t("common:other")}
        </Text>
        <Layout level={"1"} style={styles.outDate}>
          <TouchableOpacity
            activeOpacity={0.7}
            style={styles.button}
            onPress={_pressOutDate}
          >
            <Icon pack="assets" name="history" style={globalStyle.icon24} />
            <Text status={"info"} marginLeft={16} capitalize>
              {t("outdateVaccines")}
            </Text>
          </TouchableOpacity>
        </Layout>
        <Layout level={"1"}>
          <TouchableOpacity
            activeOpacity={0.7}
            style={styles.button}
            onPress={_pressDocument}
          >
            <Icon pack="assets" name="document" style={globalStyle.icon24} />
            <Text status={"info"} center marginLeft={16} capitalize>
              {t("originalHeathDocumentation")}
            </Text>
          </TouchableOpacity>
        </Layout>
      </Content>
    </Container>
  );
});

export default Medical;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
  },
  content: {
    marginHorizontal: 16,
    marginTop: 24,
  },
  outDate: {
    marginBottom: 1,
  },
  button: {
    flexDirection: "row",
    padding: 16,
    alignItems: "center",
  },
});
const DATA_VACCINES = [
  {
    id: 0,
    name: "Rabies",
    code: 6529,
    administered: "05/12/2018",
    expired: "05/21/2020",
    verified: true,
    active: true,
  },
  {
    id: 1,
    name: "Rabies",
    code: 6529,
    administered: "05/12/2018",
    expired: "05/21/2020",
    verified: true,
    active: false,
  },
  {
    id: 2,
    name: "Bordetella",
    code: 3289,
    administered: "06/12/2018",
    expired: "06/21/2020",
    verified: false,
    active: true,
  },
];
