import React, { memo } from "react";
import { View, TouchableOpacity } from "react-native";
import {
  TopNavigation,
  StyleService,
  useStyleSheet,
  Icon,
  RangeDatepicker,
  CalendarRange,
} from "@ui-kitten/components";
import { useNavigation } from "@react-navigation/native";
import { globalStyle } from "styles/globalStyle";

import Text from "components/Text";
import Content from "components/Content";
import Container from "components/Container";
import { useTranslation } from "react-i18next";
import NavigationAction from "components/NavigationAction";
import AnimatedInput from "../Medical/RequestMedicalInfo/AnimatedInput";
import DropDown from "../Component/DropDown";
import Animated, {
  Easing,
  interpolate,
  useAnimatedStyle,
  useDerivedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import dayjs from "utils/dayjs";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import AdMob from "components/AdMob";

const NewReminder = memo(() => {
  const { goBack } = useNavigation();
  const styles = useStyleSheet(themedStyles);
  const { t } = useTranslation(["medical", "common"]);

  const [remindTo, setRemindTo] = React.useState("");
  const [note, setNote] = React.useState("");
  const [howOften, setHowOften] = React.useState("");
  const [type, setType] = React.useState("");
  const [range, setRange] = React.useState<CalendarRange<Date>>({});
  const [showDatePicker, setShowDatePicker] = React.useState(false);
  const [time, setTime] = React.useState(range.startDate);
  const [showTime, setShowTime] = React.useState(false);
  const refDate = React.useRef<RangeDatepicker>(null);

  const progress = useDerivedValue(
    () =>
      showDatePicker === true
        ? withSpring(0)
        : withTiming(1, { duration: 550, easing: Easing.ease }),
    [showDatePicker]
  );
  const rotateZ = useDerivedValue(() => {
    return withTiming(progress.value ? 0 : -90, {
      duration: 150,
      easing: Easing.ease,
    });
  });

  React.useEffect(() => {
    if (showDatePicker) {
      refDate.current?.focus();
    }
  }, [showDatePicker, refDate]);

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
  const handleConfirm = React.useCallback((date) => {
    setTime(date);
    setShowTime(false);
  }, []);
  const handleCancelTime = () => setShowTime(false);
  return (
    <Container style={styles.container}>
      <TopNavigation
        style={styles.topNav}
        title={t("newReminder").toString()}
        accessoryRight={
          <Text status={"info"} onPress={goBack}>
            {t("common:save")}
          </Text>
        }
        accessoryLeft={<NavigationAction />}
      />
      <Content contentContainerStyle={[styles.content]}>
        <AnimatedInput
          placeholder={t("remindMeTo")}
          value={remindTo}
          setValue={setRemindTo}
          containerStyle={styles.remindToInput}
        />
        <AnimatedInput
          placeholder={t("noteForReminder")}
          value={note}
          setValue={setNote}
          size="note"
          containerStyle={styles.note}
        />
        <Text category="h4" marginLeft={24} marginBottom={24}>
          {t("reminderDetails")}
        </Text>
        <DropDown
          title={t("howOften")}
          value={howOften}
          marginLeft={24}
          setValue={setHowOften}
          list={[t("everyDay"), t("aWeek"), t("threeDay"), t("vet:once")]}
        />
        <View style={{ marginHorizontal: 40 }}>
          <RangeDatepicker
            ref={refDate}
            /* @ts-ignore */
            placeholder={null}
            style={styles.rangeDate}
            range={range}
            placement={"bottom end"}
            onSelect={(nextRange) => setRange(nextRange)}
            onFocus={() => setShowDatePicker(true)}
            onBlur={() => setShowDatePicker(false)}
            controlStyle={styles.controlReminder}
          />
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => {
              setShowDatePicker(true);
            }}
          >
            <Animated.View style={[styles.rightDate]}>
              <Text marginLeft={-16}>{t("onWhichDay")}</Text>
              <View style={globalStyle.flexDirection}>
                <Text marginRight={8} status={"info"}>
                  {dayjs(range.startDate).format("MMM DD - ")}
                  {dayjs(range.endDate).format("MMM DD,YYYY")}
                </Text>
                <Animated.View style={styleIconDrop}>
                  <Icon
                    pack="assets"
                    name="arrRight"
                    style={globalStyle.icon16}
                  />
                </Animated.View>
              </View>
            </Animated.View>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => {
            setShowTime(true);
          }}
        >
          <DropDown
            title={t("whatTime")}
            value={dayjs(time).format("HH:MM A")}
            marginLeft={24}
            setValue={setType}
            list={[]}
            disable
          />
        </TouchableOpacity>
        <DropDown
          title={t("whatTypeIsThis")}
          value={type}
          marginLeft={24}
          setValue={setType}
          list={[t("health"), t("medicines"), t("feed")]}
        />
        <AdMob  marginTop={16}/>
      </Content>
      <DateTimePickerModal
        isVisible={showTime}
        mode={"time"}
        date={time}
        onConfirm={handleConfirm}
        onCancel={handleCancelTime}
      />
    </Container>
  );
});

export default NewReminder;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
  },
  topNav: {
    borderBottomWidth: 1,
    borderColor: "background-basic-color-2",
  },
  content: {
    marginTop: 24,
    paddingBottom: 40,
  },
  remindToInput: {
    marginHorizontal: 24,
    marginBottom: 24,
  },
  note: {
    marginHorizontal: 24,
    marginBottom: 40,
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
  rangeDate: {
    position: "absolute",
    backgroundColor: "red",
    zIndex: -10,
    height: 0,
    left: -8,
    alignItems: "center",
    width: 0,
  },
});
