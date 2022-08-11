import React, { memo } from "react";
import {
  TopNavigation,
  StyleService,
  useStyleSheet,
  Button,
} from "@ui-kitten/components";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import useLayout from "hooks/useLayout";

import Content from "components/Content";
import Container from "components/Container";
import NavigationAction from "components/NavigationAction";
import AnimatedInput from "./AnimatedInput";
import { useTranslation } from "react-i18next";
import { VetStackParamList } from "navigation/types";

const RequestMedicalInfo = memo(() => {
  const { navigate } = useNavigation<NavigationProp<VetStackParamList>>();

  const { bottom } = useLayout();
  const styles = useStyleSheet(themedStyles);
  const { t } = useTranslation(["medical", "common"]);

  const [street1, setStreet1] = React.useState("");
  const [street2, setStreet2] = React.useState("");
  const [city, setCity] = React.useState("");
  const [state, setState] = React.useState("");
  const [zipCode, setZipCode] = React.useState("");
  const [countries, setCountries] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const _onConfirm = React.useCallback(() => {
    navigate("CheckoutInformation");
  }, []);
  return (
    <Container style={styles.container}>
      <TopNavigation
        accessoryLeft={<NavigationAction />}
        title={t("additionalInfoRequired").toString()}
      />
      <Content contentContainerStyle={styles.content}>
        <AnimatedInput
          value={street1}
          setValue={setStreet1}
          placeholder={t("streetLine1")}
          containerStyle={styles.street1}
          status={"basic"}
          keyboardType="email-address"
        />
        <AnimatedInput
          value={street2}
          setValue={setStreet2}
          placeholder={t("streetLine2")}
          containerStyle={styles.street2}
          status={"basic"}
          keyboardType="email-address"
        />
        <AnimatedInput
          value={city}
          setValue={setCity}
          placeholder={t("city")}
          containerStyle={styles.city}
          status={"basic"}
          keyboardType="email-address"
        />
        <AnimatedInput
          value={state}
          setValue={setState}
          placeholder={t("stateOfProvince")}
          containerStyle={styles.state}
          status={"basic"}
          keyboardType="email-address"
        />
        <AnimatedInput
          value={zipCode}
          setValue={setZipCode}
          placeholder={t("zipCode")}
          containerStyle={styles.zipCode}
          status={"basic"}
          keyboardType="numeric"
        />
        <AnimatedInput
          value={countries}
          setValue={setCountries}
          placeholder={t("countries")}
          containerStyle={styles.zipCode}
          status={"basic"}
          keyboardType="email-address"
        />
        <AnimatedInput
          value={phone}
          setValue={setPhone}
          placeholder={t("phoneNumber")}
          containerStyle={styles.phone}
          status={"basic"}
          keyboardType="numeric"
        />
      </Content>
      <Button
        size={"large"}
        status={"basic"}
        onPress={_onConfirm}
        children={t("confirmInformation").toUpperCase()}
        style={[styles.confirm, { bottom: bottom + 8 }]}
      />
    </Container>
  );
});

export default RequestMedicalInfo;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 24,
  },
  street1: {
    marginBottom: 24,
  },
  street2: {
    marginBottom: 24,
  },
  city: {
    marginBottom: 24,
  },
  state: {
    marginBottom: 24,
  },
  zipCode: {
    marginBottom: 24,
  },
  countries: {
    marginBottom: 24,
  },
  phone: {
    marginBottom: 24,
  },
  confirm: {
    position: "absolute",
    left: 24,
    right: 24,
  },
});
