import React, { memo } from "react";
import { View, TouchableOpacity } from "react-native";
import { StyleService, useStyleSheet, Toggle } from "@ui-kitten/components";
import useLayout from "hooks/useLayout";

import Text from "components/Text";
import DropDown from "../Component/DropDown";
import { useTranslation } from "react-i18next";

interface Props {
  reminder: boolean;
  setReminder: React.Dispatch<React.SetStateAction<boolean>>;
}

const Optional = memo(({ reminder, setReminder }: Props) => {
  const { height, width, top, bottom } = useLayout();
  const styles = useStyleSheet(themedStyles);
  const { t } = useTranslation(["vet", "common"]);

  const [alert, setAlert] = React.useState<string>("");
  const [repeat, setRepeat] = React.useState<string>("");
  const onCheckedChange = React.useCallback((reminder) => {
    setReminder(!reminder);
  }, []);

  return (
    <View style={styles.container}>
      <Text category="h4">{t("optional")}</Text>
      <TouchableOpacity
        activeOpacity={0.7}
        style={[styles.toggleReminder, { width: width - 32 }]}
        onPress={() => onCheckedChange(reminder)}
      >
        <Text fontFamily="Montserrat-Medium">{t("reminder")}</Text>
        <Toggle
          style={styles.toggle}
          status={"success"}
          checked={reminder}
          onChange={() => onCheckedChange(reminder)}
        />
      </TouchableOpacity>
      <DropDown
        value={alert}
        setValue={setAlert}
        title="Alert"
        list={[
          `1 ${t("hour before")}`,
          `30 ${t("min before")}`,
          `15 ${t("min before")}`,
          `10 ${t("min before")}`,
        ]}
      />
      <DropDown
        value={repeat}
        setValue={setRepeat}
        title="Repeat"
        list={[
          t("never"),
          t("once"),
          t("twice"),
          t("thrice"),
          `4 ${t("times")}`,
          `5 ${t("times")}`,
          `10 ${t("times")}`,
        ]}
      />
    </View>
  );
});

export default Optional;

const themedStyles = StyleService.create({
  container: {},
  toggle: {
    marginRight: 32,
  },
  toggleReminder: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 24,
    borderBottomColor: "background-basic-color-2",
    borderBottomWidth: 1,
  },
});
