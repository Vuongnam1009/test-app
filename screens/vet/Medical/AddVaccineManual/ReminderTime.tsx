import React, { memo } from "react";
import { View, TouchableOpacity } from "react-native";
import {
  StyleService,
  useStyleSheet,
  Toggle,
  Datepicker,
  Icon,
} from "@ui-kitten/components";
import useLayout from "hooks/useLayout";
import { globalStyle } from "styles/globalStyle";

import Text from "components/Text";
import dayjs from "utils/dayjs";
import { t } from "i18next";
import Animated, {
  useDerivedValue,
  withSpring,
  withTiming,
  useAnimatedStyle,
  interpolate,
  Easing,
} from "react-native-reanimated";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import DropDown from "screens/vet/Component/DropDown";

interface Props {
  ref: any;
  date: Date;
  setDate: React.Dispatch<React.SetStateAction<Date>>;
  reminder: boolean;
  setReminder: React.Dispatch<React.SetStateAction<boolean>>;
  alert: string;
  setAlert: React.Dispatch<React.SetStateAction<string>>;
  repeat: string;
  setRepeat: React.Dispatch<React.SetStateAction<string>>;
}

const ReminderTime = memo(
  ({
    ref,
    date,
    setDate,
    reminder,
    setReminder,
    alert,
    setAlert,
    repeat,
    setRepeat,
  }: Props) => {
    const { height, width, top, bottom } = useLayout();
    const styles = useStyleSheet(themedStyles);

    const [showReminder, setShowReminder] = React.useState(false);
    const [showTime, setShowTime] = React.useState(false);

    const onCheckedChange = React.useCallback((reminder) => {
      setReminder(!reminder);
    }, []);
    const progress = useDerivedValue(
      () =>
        showReminder === true
          ? withSpring(0)
          : withTiming(1, { duration: 550, easing: Easing.ease }),
      [showReminder]
    );
    const rotateZ = useDerivedValue(() => {
      return withTiming(progress.value ? 0 : 90, {
        duration: 150,
        easing: Easing.ease,
      });
    });

    const styleIconDrop = useAnimatedStyle(() => {
      const translateX = interpolate(progress.value, [0, 1], [0, 0]);
      return {
        transform: [
          { rotateZ: `${rotateZ.value}deg` },
          {
            translateX: withTiming(translateX, {
              duration: 150,
              easing: Easing.ease,
            }),
          },
        ],
      };
    });

    const handleConfirm = (date: React.SetStateAction<Date>) => {
      setDate(date);
      setShowTime(false);
    };
    const handleCancelTime = () => setShowTime(false);
    return (
      <View style={styles.container}>
        <TouchableOpacity
          activeOpacity={0.7}
          style={[styles.toggleReminder, { width: width - 32 }]}
          onPress={() => onCheckedChange(reminder)}
        >
          <Text fontFamily="Montserrat-Medium">{t("vet:reminder")}</Text>
          <Toggle
            style={styles.toggle}
            status={"success"}
            checked={reminder}
            onChange={() => onCheckedChange(reminder)}
          />
        </TouchableOpacity>

        <Datepicker
          /* @ts-ignore */
          placeholder={null}
          onSelect={(nextDate) => {
            setDate(nextDate);
            setShowTime(true);
          }}
          onFocus={() => setShowReminder(true)}
          onBlur={() => setShowReminder(false)}
          controlStyle={styles.controlReminder}
          accessoryRight={() => (
            <View style={styles.rightDate}>
              <Text marginLeft={-16}>{t("common:reminderTime")}</Text>
              <View style={globalStyle.flexDirection}>
                <Text marginRight={8} status={"info"}>
                  {dayjs(date).format("MMM DD,YYYY - ")}
                  {dayjs(date).format("A") === "AM"
                    ? dayjs(date).format("hh:mm")
                    : `${parseInt(dayjs(date).format("hh")) + 12}:${dayjs(
                        date
                      ).format("mm")}`}
                </Text>
                <Animated.View style={styleIconDrop}>
                  <Icon
                    pack="assets"
                    name="arrRight"
                    style={globalStyle.icon16}
                  />
                </Animated.View>
              </View>
            </View>
          )}
        />
        <DropDown
          value={alert}
          title="Alert"
          setValue={setAlert}
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
        <DateTimePickerModal
          isVisible={showTime}
          mode={"time"}
          date={date}
          onConfirm={handleConfirm}
          onCancel={handleCancelTime}
        />
      </View>
    );
  }
);

export default ReminderTime;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
    paddingBottom: 40,
  },
  toggle: {
    marginRight: 32,
  },
  toggleReminder: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomColor: "background-basic-color-2",
    borderBottomWidth: 1,
    paddingVertical: 24,
  },
  controlReminder: {
    backgroundColor: "background-basic-color-1",
    borderBottomWidth: 1,
    borderColor: "background-basic-color-2",
  },
  rightDate: {
    flex: 1,
    ...globalStyle.flexSpaceBetween,
    paddingVertical: 20,
  },
});
