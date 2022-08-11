import React, { memo } from "react";
import { View } from "react-native";
import {
  TopNavigation,
  useTheme,
  StyleService,
  useStyleSheet,
  Layout,
  Button,
} from "@ui-kitten/components";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import useLayout from "hooks/useLayout";

import Text from "components/Text";
import Content from "components/Content";
import Container from "components/Container";
import NavigationAction from "components/NavigationAction";
import BackgroundLogin from "components/BackgroundLogin";
import { useTranslation } from "react-i18next";
import useToggle from "hooks/useToggle";
import SelectGender from "./SelectGender";
import AnimatedAppearance from "components/AnimatedAppearance";
import { NewPetStackParamList } from "navigation/types";

const GenderPet = memo(() => {
  const { navigate } = useNavigation<NavigationProp<NewPetStackParamList>>();
  const { height, width, top, bottom } = useLayout();
  const theme = useTheme();
  const styles = useStyleSheet(themedStyles);
  const { t } = useTranslation(["newPet", "common"]);

  const handleNextStep = React.useCallback(() => {
    navigate("WeightBirthday");
  }, []);
  const [male, setMale] = useToggle(true);
  return (
    <Container style={styles.container}>
      <BackgroundLogin text={t("title")} title={t("gender")} />
      <TopNavigation accessoryLeft={<NavigationAction />} />
      <AnimatedAppearance>
        <Content contentContainerStyle={{ paddingTop: 140 * (height / 812) }}>
          <SelectGender male={male} setMale={setMale} />
          <Layout level="2" style={styles.container}>
            <Text center marginTop={32} marginBottom={40} category="b1">
              {t("neutered")}?
            </Text>
            <View style={[styles.bottom, { marginBottom: height / 2 }]}>
              <Button
                children={t("common:yes").toString()}
                status="main"
                style={styles.yes}
                onPress={handleNextStep}
              />
              <Button
                children={t("common:no").toString()}
                status="basic"
                style={styles.no}
                onPress={handleNextStep}
              />
            </View>
          </Layout>
        </Content>
      </AnimatedAppearance>
    </Container>
  );
});

export default GenderPet;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
  },
  bottom: {
    flexDirection: "row",
    marginHorizontal: 32,
  },
  yes: {
    flex: 1,
    marginRight: 16,
  },
  no: { flex: 1 },
});
