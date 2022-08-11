import React, { memo } from "react";
import {
  TopNavigation,
  useTheme,
  StyleService,
  useStyleSheet,
  ViewPager,
} from "@ui-kitten/components";
import { NavigationProp, useNavigation } from "@react-navigation/native";

import Content from "components/Content";
import Container from "components/Container";
import FrequencyTab from "components/FrequencyTab";
import { useTranslation } from "react-i18next";
import NavigationAction from "components/NavigationAction";
import MedicinesItem from "../MedicinesItem";
import { VetStackParamList } from "navigation/types";

const MedicinesList = memo(() => {
  const { navigate } = useNavigation<NavigationProp<VetStackParamList>>();
  const theme = useTheme();
  const styles = useStyleSheet(themedStyles);
  const { t } = useTranslation(["medical", "common"]);

  const [activeTab, setActiveTab] = React.useState(0);
  return (
    <Container style={styles.container}>
      <TopNavigation
        title={t("medicinesList").toString()}
        accessoryLeft={<NavigationAction />}
        accessoryRight={
          <NavigationAction
            icon="chatAdd"
            onPress={() => navigate("NewMedicine", { name: "" })}
          />
        }
      />
      <FrequencyTab
        tabs={["all", "taken", "skipped"]}
        selectedIndex={activeTab}
        onChange={setActiveTab}
        style={styles.tab}
      />
      <ViewPager selectedIndex={activeTab} onSelect={(i) => setActiveTab(i)}>
        <Content level="2" contentContainerStyle={styles.content}>
          {DATA_ALL.map((item, i) => {
            return <MedicinesItem item={item} key={i} />;
          })}
        </Content>
        <Content level="2" contentContainerStyle={styles.content}>
          {DATA_ALL.map((item, i) => {
            return <MedicinesItem item={item} key={i} />;
          })}
        </Content>
        <Content level="2" contentContainerStyle={styles.content}>
          {DATA_ALL.map((item, i) => {
            return <MedicinesItem item={item} key={i} />;
          })}
        </Content>
      </ViewPager>
    </Container>
  );
});

export default MedicinesList;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
  },
  tab: {
    height: 44,
    marginTop: 0,
    marginBottom: 0,
  },
  content: {
    marginHorizontal: 24,
    marginTop: 16,
  },
});
const DATA_ALL = [
  {
    id: 0,
    name: "Acepromazine",
    type: "injection",
    mg: 5.26,
    timePerDay: 2,
  },
  {
    id: 1,
    name: "Amitriptyline",
    type: "oral",
    mg: 5.26,
    timePerDay: 3,
  },
  {
    id: 2,
    name: "Ammonium Chloride",
    type: "other",
    mg: 5.26,
    timePerDay: 4,
  },
  {
    id: 3,
    name: "Advantage",
    type: "injection",
    mg: 5.26,
    timePerDay: 2,
  },
  {
    id: 4,
    name: "Amlodipine Besylate",
    type: "oral",
    mg: 5.26,
    timePerDay: 4,
  },
  {
    id: 5,
    name: "Amoxicillin",
    type: "other",
    mg: 5.26,
    timePerDay: 3,
  },
  {
    id: 6,
    name: "Ampicillin",
    type: "injection",
    mg: 5.26,
    timePerDay: 4,
  },
  {
    id: 7,
    name: "Antacids",
    type: "oral",
    mg: 5.26,
    timePerDay: 5,
  },
];
