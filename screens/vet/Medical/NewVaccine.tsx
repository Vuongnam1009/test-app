import React, { memo } from "react";
import { View, Image } from "react-native";
import {
  TopNavigation,
  useTheme,
  StyleService,
  useStyleSheet,
} from "@ui-kitten/components";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import useLayout from "hooks/useLayout";
import { globalStyle } from "styles/globalStyle";

import Text from "components/Text";
import Content from "components/Content";
import Container from "components/Container";
import NavigationAction from "components/NavigationAction";
import ReadMore from "components/ReadMore";
import { t } from "i18next";
import VaccineOption from "./VaccineOption";
import { useTranslation } from "react-i18next";
import { VetStackParamList } from "navigation/types";

const NewVaccine = memo(() => {
  const { navigate } = useNavigation<NavigationProp<VetStackParamList>>();
  const { height, width, top, bottom } = useLayout();
  const theme = useTheme();
  const styles = useStyleSheet(themedStyles);
  const { t } = useTranslation(["medical", "common"]);

  const _onRequest = () => {
    navigate("MedicalSearch");
  };
  const _onUpload = () => {};
  const _onManual = () => {
    navigate("AddVaccineManual");
  };
  return (
    <Container style={styles.container}>
      <TopNavigation
        accessoryLeft={<NavigationAction />}
        title={t("addVaccines").toString()}
      />
      <Content contentContainerStyle={styles.content} level="2">
        <VaccineOption
          style={styles.request}
          button={{
            title: "Request medical records",
            onPress: _onRequest,
            status: "main",
          }}
          description="Look like we don’t have any records for Sammy yet! You can either request them from your vet via Pet Lover or add the vaccinations manually if you have them on hand.You can either request them from your vet via Pet Lover or add the vaccinations manually if you have them on hand."
        />
        <VaccineOption
          style={styles.upload}
          button={{
            title: "Upload file to Pet Lover",
            onPress: _onUpload,
            status: "success",
          }}
          description="Your file cabinet is empty! Start uploading important documents suck as vet bills, x-ray scans, or other medical record.You can either request them from your vet via Pet Lover or add the vaccinations manually if you have them on hand."
        />
        <VaccineOption
          button={{
            title: "Add Vaccines Manual",
            onPress: _onManual,
            status: "basic",
          }}
          useReadMore={false}
          description="Add the vaccinations manually if you have them on hand."
        />
      </Content>
    </Container>
  );
});

export default NewVaccine;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 16,
    marginTop: 14,
  },
  request: {
    marginBottom: 16,
  },
  upload: {
    marginBottom: 16,
  },
});
