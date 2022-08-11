import React, { memo } from "react";
import { View, TouchableOpacity } from "react-native";
import {
  TopNavigation,
  useTheme,
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
import useLayout from "hooks/useLayout";
import { globalStyle } from "styles/globalStyle";

import Text from "components/Text";
import Content from "components/Content";
import Container from "components/Container";
import { useTranslation } from "react-i18next";
import MedicinesItem from "./MedicinesItem";
import { RootStackParamList } from "navigation/types";
import NavigationAction from "components/NavigationAction";
import AdMob from "components/AdMob";

const Medicines = memo(() => {
  const { navigate, dispatch } =
    useNavigation<NavigationProp<RootStackParamList>>();
  const { height, width, top, bottom } = useLayout();
  const theme = useTheme();
  const styles = useStyleSheet(themedStyles);
  const { t } = useTranslation(["medical", "common"]);

  const _showMore = () => {
    navigate("VetStackNavigator", { screen: "MedicinesList" });
  };
  const _onAdd = () => {
    /* @ts-ignore */
    navigate("VetStackNavigator", { screen: "NewMedicine", params: "" });
  };
  return (
    <Container style={styles.container}>
      <TopNavigation
        title={t("medicines").toString()}
        accessoryRight={<NavigationAction icon="chatAdd" onPress={_onAdd} />}
        accessoryLeft={
          <NavigationAction
            icon="menu"
            onPress={() => dispatch(DrawerActions.openDrawer())}
          />
        }
      />
      <Content level="2" contentContainerStyle={styles.content}>
        <View style={styles.lastMedicine}>
          <Text category="h4">{t("latestMedicines")}</Text>
          <TouchableOpacity
            style={globalStyle.flexDirection}
            onPress={_showMore}
          >
            <Text category="c4" status={"info"} marginLeft={4}>
              {t("common:showMore")}
            </Text>
            <Icon pack="assets" name="arrRight" style={globalStyle.icon16} />
          </TouchableOpacity>
        </View>
        <View>
          {DATA_LATEST.map((item, i) => {
            return <MedicinesItem item={item} key={i} />;
          })}
        </View>
        <Text category="h4" marginTop={32} marginBottom={16}>
          {t("common:other")}
        </Text>
        <Layout style={styles.other}>
          <View style={[globalStyle.flexDirection, { paddingVertical: 16 }]}>
            <Icon
              pack="assets"
              name="medicineSkipped"
              style={styles.iconOther}
            />
            <Text status={"info"} fontFamily="Montserrat-Medium">
              {t("medicinesSkipped")}
            </Text>
          </View>
          <Layout level={"2"} style={styles.line} />
          <View style={[globalStyle.flexDirection, { paddingVertical: 16 }]}>
            <Icon
              pack="assets"
              name="medicineTakken"
              style={styles.iconOther}
            />
            <Text status={"info"} fontFamily="Montserrat-Medium">
              {t("medicinesTaken")}
            </Text>
          </View>
        </Layout>
        <AdMob marginTop={16}/>
      </Content>
    </Container>
  );
});

export default Medicines;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
  },
  lastMedicine: {
    ...globalStyle.flexSpaceBetween,
    alignItems: "center",
    marginBottom: 16,
  },
  other: {
    borderRadius: 4,
  },
  content: {
    marginHorizontal: 16,
    marginTop: 24,
  },
  iconOther: {
    ...globalStyle.icon24,
    marginHorizontal: 16,
  },
  line: {
    height: 1,
  },
});
const DATA_LATEST = [
  {
    id: 0,
    name: "Benadryl for Dogs and Cats",
    type: "injection",
    mg: 5.26,
    timePerDay: 2,
  },
  {
    id: 1,
    name: "Cyproheptadine",
    type: "oral",
    mg: 5.26,
    timePerDay: 3,
  },
  {
    id: 2,
    name: "Acepromazine",
    type: "other",
    mg: 5.26,
    timePerDay: 4,
  },
];
