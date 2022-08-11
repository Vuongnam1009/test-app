import React, { memo } from "react";
import { View, Image, TouchableOpacity } from "react-native";
import {
  TopNavigation,
  useTheme,
  StyleService,
  useStyleSheet,
  Layout,
  Icon,
  Button,
} from "@ui-kitten/components";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import useLayout from "hooks/useLayout";
import { globalStyle } from "styles/globalStyle";

import Text from "components/Text";
import Content from "components/Content";
import Container from "components/Container";
import { VetStackParamList } from "navigation/types";
import NavigationAction from "components/NavigationAction";
import { useTranslation } from "react-i18next";
import HospitalResult from "screens/vet/Component/HospitalResult";
import useToggle from "hooks/useToggle";

const CheckoutInformation = memo(() => {
  const { navigate } = useNavigation<NavigationProp<VetStackParamList>>();
  const { height, width, top, bottom } = useLayout();
  const theme = useTheme();
  const { t } = useTranslation(["medical", "common"]);
  const styles = useStyleSheet(themedStyles);

  const [optionFull, setOptionFull] = useToggle(false);
  return (
    <Container style={styles.container}>
      <TopNavigation
        accessoryLeft={<NavigationAction />}
        title={t("checkoutInformation").toString()}
      />
      <Content level="2" contentContainerStyle={styles.content}>
        <Text category="h4" marginLeft={16} marginBottom={16}>
          {t("urSelectVets")}
        </Text>
        {DATA_VET.map((item, i) => {
          return (
            <HospitalResult
              item={item}
              onPress={() => null}
              disable
              key={i}
              style={styles.itemVet}
            />
          );
        })}
        <Text category="h4" marginTop={40} marginBottom={18} marginLeft={16}>
          {t("whatRecord")}
        </Text>
        <Layout style={styles.basic}>
          <Icon pack="assets" name="active" style={styles.active} />
          <Text
            status={"danger"}
            marginBottom={9}
            fontFamily="Montserrat-Medium"
          >
            {t("basicRecord")}
          </Text>
          <View style={globalStyle.flexDirection}>
            <Icon pack="assets" name="recordPrice" style={globalStyle.icon16} />
            <Text status={"danger"} marginLeft={8}>
              {t("common:free")}
            </Text>
          </View>

          <Text category="b3" marginTop={8}>
            Perfect for proof of vaccination at the groomer…
          </Text>
        </Layout>
        <TouchableOpacity activeOpacity={0.7} onPress={setOptionFull}>
          <Layout style={styles.full}>
            {optionFull ? (
              <Icon pack="assets" name="active" style={styles.active} />
            ) : null}

            <Text fontFamily="Montserrat-Medium" marginBottom={9}>
              {t("fullMedicalHistory")}
            </Text>
            <View style={globalStyle.flexDirection}>
              <Icon
                pack="assets"
                name="recordPrice"
                style={globalStyle.icon16}
              />
              <Text status={"danger"} marginLeft={8}>
                $9.99 + $4.99 per additional vet
              </Text>
            </View>
            <Text category="b3" marginTop={8}>
              Make sure you have all the records the vet has on file in case of
              any emergency.
            </Text>
          </Layout>
        </TouchableOpacity>
      </Content>
      <Button
        children={t("common:continue").toUpperCase()}
        status={"basic"}
        style={[styles.continue, { bottom: bottom + 8 }]}
      />
    </Container>
  );
});

export default CheckoutInformation;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
  },
  content: {
    marginTop: 24,
  },
  itemVet: {
    marginHorizontal: 16,
  },
  basic: {
    padding: 16,
    marginHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: "background-basic-color-2",
  },
  full: {
    marginHorizontal: 16,
    padding: 16,
  },
  active: {
    ...globalStyle.icon24,
    position: "absolute",
    top: 0,
    right: 0,
  },
  continue: {
    position: "absolute",
    left: 24,
    right: 24,
  },
});
const DATA_VET = [
  {
    id: 0,
    title: "Banfield Pet Hospital",
    location: "632 Broadway, New York, NY 10012",
    phone: 8083553305,
  },
  {
    id: 1,
    title: "Uptown Veterinary Associates",
    location: "510 E 62nd St, New York, NY 10065",
    phone: 5878414264,
  },
];
