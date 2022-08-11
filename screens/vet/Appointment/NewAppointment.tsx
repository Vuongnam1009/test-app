import React, { memo } from "react";
import { View, TouchableOpacity } from "react-native";
import {
  TopNavigation,
  StyleService,
  useStyleSheet,
  Datepicker,
  Icon,
  Input,
} from "@ui-kitten/components";
import { globalStyle } from "styles/globalStyle";

import Text from "components/Text";
import Content from "components/Content";
import Container from "components/Container";
import NavigationAction from "components/NavigationAction";
import { useTranslation } from "react-i18next";
import dayjs from "utils/dayjs";
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Controller, useForm } from "react-hook-form";
import { RuleName } from "utils/rules";
import useToggle from "hooks/useToggle";
import Optional from "./Optional";

const NewAppointment = memo(() => {
  const styles = useStyleSheet(themedStyles);
  const { t } = useTranslation(["vet", "common"]);

  const [date, setDate] = React.useState(new Date());
  const [showTime, setShowTime] = React.useState(false);
  const [isFocusDoctor, setIsFocusDoctor] = useToggle(true);
  const [isFocusVet, setIsFocusVet] = useToggle(true);
  const [reminder, setReminder] = React.useState(true);

  const animatedDoctorName = useSharedValue(1);
  const animatedVetName = useSharedValue(1);
  const animatedStyle = useAnimatedStyle(() => {
    const translateY = interpolate(
      animatedDoctorName.value,
      [0, 1],
      [4, 18],
      Extrapolate.CLAMP
    );
    const translateX = interpolate(
      animatedDoctorName.value,
      [0, 1],
      [-8, 0],
      Extrapolate.CLAMP
    );
    const scale = interpolate(
      animatedDoctorName.value,
      [0, 1],
      [0.85, 1],
      Extrapolate.CLAMP
    );
    return {
      position: "absolute",
      zIndex: 10,
      left: 16,
      transform: [{ translateY }, { scale }, { translateX }],
      backgroundColor: "transparent",
    };
  });
  const animatedVetStyle = useAnimatedStyle(() => {
    const translateY = interpolate(
      animatedVetName.value,
      [0, 1],
      [4, 18],
      Extrapolate.CLAMP
    );
    const translateX = interpolate(
      animatedVetName.value,
      [0, 1],
      [-8, 0],
      Extrapolate.CLAMP
    );
    const scale = interpolate(
      animatedVetName.value,
      [0, 1],
      [0.85, 1],
      Extrapolate.CLAMP
    );
    return {
      position: "absolute",
      zIndex: 10,
      left: 16,
      transform: [{ translateY }, { scale }, { translateX }],
      backgroundColor: "transparent",
    };
  });

  const {
    control,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm({
    defaultValues: {
      doctorName: "",
      veterinaryName: "",
      note: "",
    },
  });
  React.useEffect(() => {
    if (getValues("doctorName") !== "" && isFocusDoctor) {
      animatedDoctorName.value = 0;
    } else {
      animatedDoctorName.value = 1;
    }
  }, [getValues("doctorName"), animatedDoctorName.value, isFocusDoctor]);
  React.useEffect(() => {
    if (getValues("veterinaryName") !== "" && isFocusVet) {
      animatedVetName.value = 0;
    } else {
      animatedVetName.value = 1;
    }
  }, [getValues("veterinaryName"), animatedVetName.value, isFocusVet]);

  const handleConfirm = (date: React.SetStateAction<Date>) => {
    setDate(date);
    setShowTime(false);
  };
  const handleCancelTime = () => setShowTime(false);
  return (
    <Container style={styles.container}>
      <TopNavigation
        style={styles.topNav}
        accessoryLeft={<NavigationAction />}
        title={() => <Text category="b1">{t("newAppointment")}</Text>}
        accessoryRight={
          <TouchableOpacity activeOpacity={0.7}>
            <Text status={"info"}>{t("common:save")}</Text>
          </TouchableOpacity>
        }
      />
      <Content contentContainerStyle={styles.content}>
        {/* Date and Time */}
        <View>
          <View style={styles.datePlaceholder}>
            <Text category="c4" status={"placeholder"}>
              {t("dateTime")}
            </Text>
          </View>
          <Datepicker
            status="basic"
            /* @ts-ignore */
            placeholder={null}
            onSelect={(nextDate) => {
              setDate(nextDate);
              setShowTime(true);
            }}
            accessoryRight={(props) => (
              <View style={styles.rightDate}>
                <Text center category="b1" marginTop={12}>
                  {dayjs(date).format("ddd, MMM DD, YYYY - hh:mm A ")}
                </Text>
                <Icon {...props} name="date" pack="assets" />
              </View>
            )}
          />
        </View>
        {/* Doctor Name */}
        <View style={styles.doctorName}>
          <Animated.View style={animatedStyle}>
            <Text category={"b2-s"} status="placeholder">
              {t("doctorName")}
            </Text>
          </Animated.View>
          <Controller
            name="doctorName"
            rules={RuleName}
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                status={errors.doctorName ? "warning" : "basic"}
                onChangeText={onChange}
                value={value}
                onFocus={() => {
                  setIsFocusDoctor;
                }}
                onBlur={() => {
                  onBlur();
                  setIsFocusDoctor;
                }}
                size="large"
                onTouchStart={handleSubmit(() => {})}
                onTouchEnd={handleSubmit(() => {})}
                keyboardType="email-address"
                textStyle={{
                  marginTop: getValues("doctorName") === "" ? 0 : 10,
                }}
                caption={errors.doctorName?.message}
              />
            )}
          />
        </View>
        {/* Veterinary Name */}
        <View style={styles.veterinaryName}>
          <Animated.View style={animatedVetStyle}>
            <Text category={"b2-s"} status="placeholder">
              {t("veterinaryName")}
            </Text>
          </Animated.View>
          <Controller
            name="veterinaryName"
            rules={RuleName}
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                status={errors.veterinaryName ? "warning" : "basic"}
                onChangeText={onChange}
                value={value}
                onFocus={() => {
                  setIsFocusVet;
                }}
                onBlur={() => {
                  onBlur();
                  setIsFocusVet;
                }}
                size="large"
                onTouchStart={handleSubmit(() => {})}
                onTouchEnd={handleSubmit(() => {})}
                keyboardType="email-address"
                textStyle={{
                  marginTop: getValues("veterinaryName") === "" ? 0 : 10,
                }}
                caption={errors.veterinaryName?.message}
                accessoryRight={() => {
                  return (
                    <TouchableOpacity style={styles.btnVet} activeOpacity={0.7}>
                      <View style={styles.oval} />
                    </TouchableOpacity>
                  );
                }}
              />
            )}
          />
          <Controller
            name="note"
            control={control}
            shouldUnregister
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                style={styles.note}
                status={errors.note ? "warning" : "basic"}
                onChangeText={onChange}
                value={value}
                onBlur={onBlur}
                placeholder={t("note")}
                textStyle={styles.textNote}
                size="note"
                onTouchStart={handleSubmit(() => {})}
                onTouchEnd={handleSubmit(() => {})}
                keyboardType="email-address"
                caption={errors.note?.message}
                multiline
              />
            )}
          />
        </View>
        <Optional reminder={reminder} setReminder={setReminder} />
      </Content>
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

export default NewAppointment;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
    paddingBottom: 0,
  },
  topNav: {
    borderBottomWidth: 1,
    borderColor: "color-basic-200",
  },
  content: {
    marginTop: 24,
    marginHorizontal: 32,
    paddingBottom: 120,
  },
  datePlaceholder: {
    position: "absolute",
    top: 4,
    left: 16,
    zIndex: 10,
  },
  rightDate: {
    flex: 1,
    ...globalStyle.flexSpaceBetween,
  },
  doctorName: {
    marginVertical: 24,
  },
  veterinaryName: {},
  oval: {
    width: 18,
    height: 18,
    borderWidth: 2,
    borderRadius: 99,
    borderColor: "text-primary-color",
  },
  btnVet: {
    height: 54,
    position: "absolute",
    right: 0,
    alignItems: "center",
    justifyContent: "center",
    width: 52,
    borderTopRightRadius: 4,
    borderBottomRightRadius: 4,
    zIndex: 10,
    backgroundColor: "background-basic-color-4",
  },
  note: {
    marginTop: 24,
    flex: 1,
    height: 120,
    backgroundColor: "background-basic-color-2",
    marginBottom: 48,
  },
  textNote: {
    alignSelf: "flex-start",
  },
});
