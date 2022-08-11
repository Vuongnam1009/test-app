import React, { memo } from "react";
import { View, Image } from "react-native";
import {
  TopNavigation,
  useTheme,
  StyleService,
  useStyleSheet,
  ViewPager,
  Layout,
} from "@ui-kitten/components";
import { useNavigation } from "@react-navigation/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import useLayout from "hooks/useLayout";
import { globalStyle } from "styles/globalStyle";

import Text from "components/Text";
import Content from "components/Content";
import Container from "components/Container";
import { useTranslation } from "react-i18next";
import NavigationAction from "components/NavigationAction";
import Vaccine from "./Vaccine";
import FrequencyTab from "components/FrequencyTab";

const VaccinesList = memo(() => {
  const { goBack } = useNavigation();
  const { height, width, top, bottom } = useLayout();
  const theme = useTheme();
  const styles = useStyleSheet(themedStyles);
  const { t } = useTranslation(["medical", "common"]);

  const [selectTab, setSelectTab] = React.useState(0);
  return (
    <Container style={styles.container}>
      <TopNavigation
        title={t("vaccinesList").toString()}
        accessoryRight={<NavigationAction icon="chatAdd" />}
        accessoryLeft={<NavigationAction />}
      />
      <FrequencyTab
        tabs={["All", "done", "skipped"]}
        selectedIndex={selectTab}
        onChange={setSelectTab}
        style={styles.tab}
      />
      <ViewPager
        selectedIndex={selectTab}
        onSelect={(index) => setSelectTab(index)}
      >
        <Content contentContainerStyle={styles.pager} level="2">
          {DATA_VACCINES.map((item, i) => {
            return <Vaccine item={item} key={i} style={styles.item} />;
          })}
        </Content>
        <Content contentContainerStyle={styles.pager} level="2">
          {DATA_VACCINES.map((item, i) => {
            return <Vaccine item={item} key={i} style={styles.item} />;
          })}
        </Content>
        <Content contentContainerStyle={styles.pager} level="2">
          {DATA_VACCINES.map((item, i) => {
            return <Vaccine item={item} key={i} style={styles.item} />;
          })}
        </Content>
      </ViewPager>
    </Container>
  );
});

export default VaccinesList;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
  },
  pager: {
    paddingTop: 16,
    paddingBottom: 120,
  },
  item: {
    marginBottom: 16,
    marginHorizontal: 16,
  },
  tab: {
    marginTop: 0,
    height: 44,
    marginBottom: 0,
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
  {
    id: 3,
    name: "Bordetella",
    code: 3289,
    administered: "06/12/2018",
    expired: "06/21/2020",
    verified: false,
    active: true,
  },
  {
    id: 4,
    name: "Bordetella",
    code: 3289,
    administered: "06/12/2018",
    expired: "06/21/2020",
    verified: false,
    active: true,
  },
  {
    id: 5,
    name: "Bordetella",
    code: 3289,
    administered: "06/12/2018",
    expired: "06/21/2020",
    verified: true,
    active: false,
  },
  {
    id: 6,
    name: "Bordetella",
    code: 3289,
    administered: "06/12/2018",
    expired: "06/21/2020",
    verified: true,
    active: true,
  },
  {
    id: 7,
    name: "Bordetella",
    code: 3289,
    administered: "06/12/2018",
    expired: "06/21/2020",
    verified: false,
    active: true,
  },
  {
    id: 8,
    name: "Bordetella",
    code: 3289,
    administered: "06/12/2018",
    expired: "06/21/2020",
    verified: false,
    active: true,
  },
  {
    id: 9,
    name: "Bordetella",
    code: 3289,
    administered: "06/12/2018",
    expired: "06/21/2020",
    verified: false,
    active: true,
  },
  {
    id: 10,
    name: "Bordetella",
    code: 3289,
    administered: "06/12/2018",
    expired: "06/21/2020",
    verified: false,
    active: true,
  },
];
