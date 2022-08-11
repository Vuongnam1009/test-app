import React, { memo } from "react";
import { View } from "react-native";
import {
  TopNavigation,
  StyleService,
  useStyleSheet,
  Datepicker,
  Icon,
  Input,
} from "@ui-kitten/components";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { globalStyle } from "styles/globalStyle";

import Text from "components/Text";
import Container from "components/Container";
import NavigationAction from "components/NavigationAction";
import { useTranslation } from "react-i18next";
import AnimatedInput from "../RequestMedicalInfo/AnimatedInput";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import dayjs from "utils/dayjs";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Controller, useForm } from "react-hook-form";
import ReminderTime from "./ReminderTime";
import { RootStackParamList } from "navigation/types";

const AddVaccineManual = memo(() => {
  const { navigate } = useNavigation<NavigationProp<RootStackParamList>>();
  const styles = useStyleSheet(themedStyles);
  const { t } = useTranslation(["medical", "common", "vet"]);

  const [vaccineName, setVaccineName] = React.useState("");
  const [date, setDate] = React.useState(new Date());
  const [reminderDate, setReminderDate] = React.useState(new Date());
  const [showTime, setShowTime] = React.useState(false);
  const [reminder, setReminder] = React.useState(true);
  const [alert, setAlert] = React.useState<string>("");
  const [repeat, setRepeat] = React.useState<string>("");
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
  const handleConfirm = (date: React.SetStateAction<Date>) => {
    setDate(date);
    setShowTime(false);
  };
  const handleCancelTime = () => setShowTime(false);
  const _onSave = () => {
    navigate("VetStackNavigator", { screen: "NewVaccine" });
  };

  return (
    <Container style={styles.container}>
      <TopNavigation
        style={styles.topNav}
        accessoryLeft={<NavigationAction />}
        title={t("addVaccineManual").toString()}
        accessoryRight={
          <Text status={"info"} onPress={_onSave}>
            Save
          </Text>
        }
      />
      <KeyboardAwareScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
        extraHeight={120}
        enableOnAndroid
      >
        <AnimatedInput
          value={vaccineName}
          setValue={setVaccineName}
          placeholder="Vaccine Name"
          style={styles.vaccineName}
        />
        <View style={styles.datepicker}>
          <Text
            category="c4"
            status={"placeholder"}
            style={styles.receivedDate}
          >
            Received Date
          </Text>
          <Datepicker
            status="basic"
            /* @ts-ignore */
            placeholder={null}
            onSelect={(nextDate) => {
              setDate(nextDate);
              setShowTime(true);
            }}
            size={"medium"}
            accessoryLeft={(props) => (
              <View
                style={[
                  globalStyle.flexSpaceBetween,
                  globalStyle.alignItemsCenter,
                  globalStyle.flexOne,
                ]}
              >
                <Text category="b1" marginTop={18}>
                  {dayjs(date).format("ddd, MMM DD, YYYY - hh:mm A ")}
                </Text>
                <Icon name="date" pack="assets" />
              </View>
            )}
          />
        </View>
        <Controller
          name="note"
          control={control}
          shouldUnregister
          render={({ field: { onChange, onBlur, value } }) => (
            <View>
              {getValues("note") !== "" ? (
                <Text
                  status={"placeholder"}
                  category="c4"
                  style={styles.placeholderNote}
                >
                  {t("vet:note")}
                </Text>
              ) : null}
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
                textStyle={[
                  styles.textNote,
                  { marginTop: getValues("note") !== "" ? 8 : -4 },
                ]}
                multiline
              />
            </View>
          )}
        />
        <Text category="h4">{t("common:optional")}</Text>
        <ReminderTime
          date={reminderDate}
          setDate={setReminderDate}
          reminder={reminder}
          setReminder={setReminder}
          alert={alert}
          setAlert={setAlert}
          repeat={repeat}
          setRepeat={setRepeat}
        />
      </KeyboardAwareScrollView>

      <DateTimePickerModal
        isVisible={showTime}
        mode={"time"}
        date={date}
        onConfirm={handleConfirm}
        onCancel={handleCancelTime}
      />
    </Container>
  );
});

export default AddVaccineManual;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
    paddingBottom: 0,
  },
  topNav: {
    borderBottomWidth: 1,
    borderBottomColor: "background-basic-color-2",
  },
  content: {
    marginTop: 24,
    paddingHorizontal: 24,
  },
  vaccineName: {
    marginBottom: 24,
  },
  datepicker: {
    marginBottom: 24,
  },
  receivedDate: {
    position: "absolute",
    zIndex: 10,
    left: 16,
    top: 8,
  },
  noteInput: {
    marginBottom: 40,
  },
  placeholderNote: {
    position: "absolute",
    zIndex: 10,
    left: 16,
    top: 8,
  },
  textNote: {
    alignSelf: "flex-start",
  },
});
