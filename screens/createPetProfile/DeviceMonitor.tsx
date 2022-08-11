import React, { memo } from "react";
import { Image, TouchableOpacity } from "react-native";
import {
  TopNavigation,
  StyleService,
  useStyleSheet,
  Button,
} from "@ui-kitten/components";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import useLayout from "hooks/useLayout";

import Text from "components/Text";
import Content from "components/Content";
import Container from "components/Container";
import BackgroundLogin from "components/BackgroundLogin";
import { useTranslation } from "react-i18next";
import NavigationAction from "components/NavigationAction";
import { Images } from "assets/images";
import { RootStackParamList } from "navigation/types";

const DeviceMonitor = memo(() => {
  const { navigate } = useNavigation<NavigationProp<RootStackParamList>>();
  const { height, width, top, bottom } = useLayout();
  const styles = useStyleSheet(themedStyles);
  const { t } = useTranslation("newPet");

  const handleToHome = React.useCallback(() => {
    navigate("DrawerNavigator");
  }, []);
  return (
    <Container style={styles.container}>
      <BackgroundLogin text={t("title")} title={t("deviceMonitor")} />
      <TopNavigation accessoryLeft={<NavigationAction />} />
      <Content contentContainerStyle={[{ paddingTop: 140 * (height / 812) }]}>
        <Image
          source={Images.art}
          /* @ts-ignore */
          style={styles.img}
        />
        <Text marginTop={40} marginBottom={17} center>
          {t("titleTracking")}
        </Text>
        <Button
          children={t("addTrackBtn").toString().toUpperCase()}
          status="basic"
          style={styles.btnAdd}
        />
        <TouchableOpacity activeOpacity={0.7} onPress={handleToHome}>
          <Text center underline>
            {t("doitLater")}
          </Text>
        </TouchableOpacity>
      </Content>
    </Container>
  );
});

export default DeviceMonitor;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
  },
  img: {
    alignSelf: "center",
  },
  btnAdd: {
    marginBottom: 32,
    marginHorizontal: 32,
    flex: 1,
  },
});
