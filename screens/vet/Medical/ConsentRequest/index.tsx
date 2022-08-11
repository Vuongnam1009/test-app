import React, { memo } from "react";
import { View, Image } from "react-native";
import {
  TopNavigation,
  useTheme,
  StyleService,
  useStyleSheet,
  Layout,
  Input,
  Button,
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
import InformationCard from "./InfomationCard";
import ReadMore from "components/ReadMore";
import AnimatedInput from "../RequestMedicalInfo/AnimatedInput";
import { Controller, useForm } from "react-hook-form";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const ConsentRequest = memo(() => {
  const { goBack } = useNavigation();
  const { height, width, top, bottom } = useLayout();
  const theme = useTheme();
  const styles = useStyleSheet(themedStyles);
  const { t } = useTranslation(["medical", "vet", "common"]);

  const {
    control,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm({
    defaultValues: {
      note: "",
    },
  });
  const [note, setNote] = React.useState("");
  return (
    <Container style={styles.container}>
      <TopNavigation
        title={t("consentRequest").toString()}
        accessoryLeft={<NavigationAction />}
      />
      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
        extraScrollHeight={150 * (height / 812)}
        enableOnAndroid
      >
        <InformationCard
          style={styles.card}
          name="Jackson Maxwell"
          location="510 E 62nd St, New York, NY 10065"
          email="lehieuds@gmail.com"
          phoneNumber={3504836643}
          petName="Sammy"
          petType="Dog"
          breed="Affenwich"
        />
        <Layout style={styles.note} level={"1"}>
          <ReadMore children="I hereby certify that I am the owner (Pet Owner) of the above-described pet. Further, I hereby request and authorize Vet to release the requested medical information for my pet to Pet Lover." />
          <Text marginTop={24} marginBottom={8}>
            {t("addNoteForVet")}
          </Text>
          <Controller
            name="note"
            control={control}
            shouldUnregister
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                style={styles.noteInput}
                onChangeText={onChange}
                value={value}
                onBlur={onBlur}
                placeholder={t("vet:note")}
                size="note"
                onTouchStart={handleSubmit(() => {})}
                onTouchEnd={handleSubmit(() => {})}
                keyboardType="email-address"
                caption={errors.note?.message}
                textStyle={{ alignSelf: "flex-start" }}
                multiline
              />
            )}
          />
        </Layout>
      </KeyboardAwareScrollView>
      <Button
        children={t("submitRequest").toUpperCase()}
        status={"basic"}
        style={[styles.submitBtn, { bottom: bottom + 8 }]}
      />
    </Container>
  );
});

export default ConsentRequest;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
  },
  information: {
    padding: 16,
    paddingBottom: 24,
  },
  content: {
    paddingTop: 16,
    backgroundColor: "background-basic-color-2",
  },
  card: {
    marginBottom: 16,
  },
  note: {
    padding: 16,
    paddingBottom: 24,
    marginHorizontal: 16,
    ...globalStyle.shadow,
    borderRadius: 4,
  },
  noteInput: {},
  submitBtn: {
    position: "absolute",
    left: 24,
    right: 24,
  },
});
