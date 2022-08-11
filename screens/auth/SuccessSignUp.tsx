import React, { memo } from "react";
import { Image } from "react-native";
import { StyleService, useStyleSheet, Button } from "@ui-kitten/components";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import useLayout from "hooks/useLayout";

import Text from "components/Text";
import Content from "components/Content";
import Container from "components/Container";
import BackgroundLogin from "components/BackgroundLogin";
import { Images } from "assets/images";
import { useTranslation } from "react-i18next";
import { RootStackParamList } from "navigation/types";

const SuccessSignUp = memo(() => {
  const { navigate } = useNavigation<NavigationProp<RootStackParamList>>();
  const { height, width, top, bottom } = useLayout();
  const styles = useStyleSheet(themedStyles);
  const { t } = useTranslation("auth");

  const imgWidthHeight = 120 * (width / 375);

  const handleComplete = React.useCallback(() => {}, []);
  const handleAddPet = React.useCallback(() => {
    navigate("NewPet", { screen: "AddNewPet" });
  }, []);
  return (
    <Container style={styles.container}>
      <BackgroundLogin img />
      <Content
        contentContainerStyle={[
          styles.content,
          { paddingTop: 180 * (width / 375) },
        ]}
      >
        <Image
          source={Images.success}
          style={{
            width: imgWidthHeight,
            height: imgWidthHeight,
            alignSelf: "center",
          }}
        />
        <Text category="h3" center marginTop={32} marginBottom={120}>
          {t("titleSignUp")}
        </Text>
        <Button
          children={t("completeProfile").toString()}
          status="main"
          style={styles.complete}
          onPress={handleComplete}
          activeOpacity={0.7}
        />
        <Button
          children={t("addNewPet").toString()}
          status="basic"
          onPress={handleAddPet}
          activeOpacity={0.7}
        />
      </Content>
    </Container>
  );
});

export default SuccessSignUp;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 32,
  },
  complete: {
    marginBottom: 24,
  },
});
