import React, { memo } from "react";
import {
  TopNavigation,
  StyleService,
  useStyleSheet,
} from "@ui-kitten/components";
import {
  NavigationProp,
  useNavigation,
  useRoute,
} from "@react-navigation/native";

import Text from "components/Text";
import Content from "components/Content";
import Container from "components/Container";
import { useTranslation } from "react-i18next";
import NavigationAction from "components/NavigationAction";
import AnimatedInput from "screens/vet/Medical/RequestMedicalInfo/AnimatedInput";
import DropDown from "screens/vet/Component/DropDown";
import { NewMedicineNavigationProp, VetStackParamList } from "navigation/types";

const NewMedicine = memo(() => {
  const { navigate, goBack } =
    useNavigation<NavigationProp<VetStackParamList>>();
  const styles = useStyleSheet(themedStyles);
  const { t } = useTranslation(["medical", "common"]);

  const route = useRoute<NewMedicineNavigationProp>();
  const [name, setName] = React.useState(route.params.name);
  const [sideEffect, setSideEffect] = React.useState("");
  const [note, setNote] = React.useState("");
  const [routes, setRoutes] = React.useState("");
  const [unit, setUnit] = React.useState("");
  const [form, setForm] = React.useState("");
  const [dosage, setDosage] = React.useState("");
  const [frequency, setFrequency] = React.useState("");

  const _onSave = () => {
    goBack();
  };
  const _onSetName = React.useCallback(() => {
    navigate("SearchMedicineName");
  }, []);
  return (
    <Container style={styles.container}>
      <TopNavigation
        style={styles.topNav}
        title={t("newMedicines").toString()}
        accessoryLeft={<NavigationAction />}
        accessoryRight={
          <Text status={"info"} onPress={_onSave}>
            {t("common:save")}
          </Text>
        }
      />
      <Content contentContainerStyle={styles.content}>
        <AnimatedInput
          value={name}
          setValue={setName}
          placeholder={t("medicinesName")}
          containerStyle={styles.name}
          onTouchEnd={_onSetName}
        />
        <AnimatedInput
          value={sideEffect}
          setValue={setSideEffect}
          placeholder={t("sideEffect")}
          status={"note"}
          size={"note"}
          multiline
          containerStyle={styles.sideEffect}
        />
        <AnimatedInput
          value={note}
          setValue={setNote}
          placeholder={t("sideEffect")}
          status={"note"}
          size={"note"}
          multiline
          containerStyle={styles.note}
        />
        <Text category="h4">{t("medicineDetail")}</Text>
        <DropDown
          title={t("route")}
          value={routes}
          setValue={setRoutes}
          list={[t("oral"), t("injection"), t("other")]}
        />
        <DropDown
          title={t("unit")}
          value={unit}
          setValue={setUnit}
          list={[t("mg"), t("ml")]}
        />
        <DropDown
          title={t("form")}
          value={form}
          setValue={setForm}
          list={[t("fill")]}
        />
        <DropDown
          title={t("dosage")}
          value={dosage}
          setValue={setDosage}
          list={[t("common:never")]}
        />
        <DropDown
          title={t("frequency")}
          value={frequency}
          setValue={setFrequency}
          list={[t("common:never")]}
        />
      </Content>
    </Container>
  );
});

export default NewMedicine;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
  },
  topNav: {
    borderBottomWidth: 1,
    borderBottomColor: "background-basic-color-2",
  },
  content: {
    marginHorizontal: 24,
    marginTop: 24,
  },
  name: {
    marginBottom: 24,
  },
  sideEffect: {
    marginBottom: 24,
  },
  note: {
    marginBottom: 40,
  },
});
