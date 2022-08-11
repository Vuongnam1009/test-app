import React, { memo } from "react";
import {
  TopNavigation,
  useTheme,
  StyleService,
  useStyleSheet,
  Input,
  Button,
  Datepicker,
} from "@ui-kitten/components";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import useLayout from "hooks/useLayout";

import Text from "components/Text";
import Content from "components/Content";
import Container from "components/Container";
import BackgroundLogin from "components/BackgroundLogin";
import { useTranslation } from "react-i18next";
import RulerWeight from "./RulerWeight";
import NavigationAction from "components/NavigationAction";
import { NewPetStackParamList } from "navigation/types";
import { View } from "react-native";
import dayjs from "dayjs";

const WeightBirthday = memo(() => {
  const { navigate, goBack } =
    useNavigation<NavigationProp<NewPetStackParamList>>();
  const { height, width, top, bottom } = useLayout();
  const theme = useTheme();
  const styles = useStyleSheet(themedStyles);
  const { t } = useTranslation(["newPet", "common"]);
  const [date, setDate] = React.useState<Date>();

  const handleComplete = React.useCallback(() => {
    navigate("DeviceMonitor");
  }, []);
  return (
    <Container style={styles.container}>
      <TopNavigation accessoryLeft={<NavigationAction />} />
      <BackgroundLogin
        text={t("title")}
        title={`${t("birthday")} & ${t("weight")}`}
      />
      <Content style={[styles.content, { marginTop: 140 * (height / 812) }]}>
        <Datepicker
          status="basic"
          /* @ts-ignore */
          placeholder={null}
          style={styles.date}
          onSelect={(nextDate) => {
            setDate(nextDate);
          }}
          accessoryRight={(props) => (
            <View>
              {date !== undefined ? (
                <Text center category="b1">
                  {dayjs(date).format("dddd, MM/DD/YYYY")}
                </Text>
              ) : (
                <Text status={"placeholder"}>What is Your Pet Birthday?</Text>
              )}
            </View>
          )}
        />
        <Text marginTop={80} center marginHorizontal={32}>
          {t("howMuchWeight")}
        </Text>
        <RulerWeight
          widthComponent={width}
          heightComponent={220 * (height / 812)}
          vertical={false}
          minimum={0}
          maximum={200}
          segmentWidth={2}
          segmentSpacing={10}
          step={10}
          stepColor="#DADADA"
          stepHeight={24}
          normalColor="#DADADA"
          normalHeight={14}
          unit="Lbs"
        />
      </Content>
      <Button
        children={t("completeProfile").toString().toUpperCase()}
        status="basic"
        style={styles.btnComplete}
        onPress={handleComplete}
      />
    </Container>
  );
});

export default WeightBirthday;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
  },
  content: {},
  date: {
    marginHorizontal: 32,
  },
  btnComplete: {
    marginHorizontal: 24,
    marginBottom: 8,
  },
});
