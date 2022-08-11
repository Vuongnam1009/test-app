import React, { memo } from "react";
import { View, Image } from "react-native";
import {
  TopNavigation,
  useTheme,
  StyleService,
  useStyleSheet,
  ViewPager,
} from "@ui-kitten/components";
import {
  DrawerActions,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import useLayout from "hooks/useLayout";
import { globalStyle } from "styles/globalStyle";

import Text from "components/Text";
import Content from "components/Content";
import Container from "components/Container";
import TabBar from "./TabBar";
import Notifications from "./Notifications";
import Messenger from "./Messenger";
import NavigationAction from "components/NavigationAction";
import { useTranslation } from "react-i18next";
import { NotificationsNavigationProp } from "navigation/types";

const Home = memo(() => {
  const navigation = useNavigation();
  const { height, width, top, bottom } = useLayout();
  const theme = useTheme();
  const styles = useStyleSheet(themedStyles);
  const { t } = useTranslation(["notification", "common"]);

  const route = useRoute<NotificationsNavigationProp>();
  const [activeIndex, setActiveIndex] = React.useState(1);
  React.useEffect(() => {
    if (route.params.activeIndex) {
      setActiveIndex(route.params.activeIndex);
    } else {
      setActiveIndex(0);
    }
  }, [route]);
  return (
    <Container style={styles.container}>
      <TopNavigation
        accessoryLeft={
          <NavigationAction
            icon="menu"
            onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
          />
        }
        title={() => <Text category="b1">{t("title")}</Text>}
      />
      <TabBar
        selectedIndex={activeIndex}
        onChange={setActiveIndex}
        tabs={TABS}
      />
      <ViewPager
        selectedIndex={activeIndex}
        onSelect={setActiveIndex}
        style={globalStyle.flexOne}
      >
        <Notifications />
        <Messenger />
      </ViewPager>
    </Container>
  );
});

export default Home;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
  },
});
const TABS = [
  { id: 0, tab: "Notifications", notRead: 0 },
  { id: 1, tab: "Inbox", notRead: 3 },
];
