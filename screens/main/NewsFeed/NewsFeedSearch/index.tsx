import React, { memo } from "react";
import { View, Keyboard } from "react-native";
import {
  StyleService,
  useStyleSheet,
  Input,
  Icon,
  ViewPager,
} from "@ui-kitten/components";
import { useNavigation } from "@react-navigation/native";

import Text from "components/Text";
import Content from "components/Content";
import Container from "components/Container";
import { useTranslation } from "react-i18next";
import RecentSearch from "./RecentSearch";
import MostPet from "./MostPet";
import TrendingUser from "./TrendingUser";
import RecentShot from "./RecentShot";
import { Controller, useForm } from "react-hook-form";
import useLayout from "hooks/useLayout";
import FrequencyTab from "components/FrequencyTab";
import AboutResults from "./AboutResults";
import { globalStyle } from "styles/globalStyle";
import {
  DATA_PET_RESULT,
  DATA_PEOPLE_RESULT,
  DATA_TAG_RESULT,
  DATA_MOST_PET,
  DATA_RECENT,
  DATA_RECENT_SHOT,
  DATA_TRENDING_USER,
} from "constants/Data";

const NewsFeedSearch = memo(() => {
  const { goBack } = useNavigation();
  const styles = useStyleSheet(themedStyles);
  const { height } = useLayout();
  const { t } = useTranslation(["newsFeed", "common"]);

  const [isSearch, setIsSearch] = React.useState(false);
  const [activeIndex, setActiveIndex] = React.useState(0);
  const [valueInput, setValueInput] = React.useState("");
  const {
    control,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm({
    defaultValues: {
      search: "",
    },
  });
  const _onCancel = React.useCallback(() => {
    if (isSearch) {
      setIsSearch(false);
    } else {
      goBack();
    }
  }, [isSearch]);
  return (
    <Container style={[styles.container]}>
      <View style={[styles.topView]}>
        <Controller
          name="search"
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              accessoryLeft={<Icon pack="assets" name="search" />}
              status="transparent"
              style={styles.input}
              onChange={onChange}
              onChangeText={(value) => {
                setIsSearch(true);
                setValueInput(value);
              }}
              value={valueInput}
              onBlur={onBlur}
              placeholder={t("searchPlaceholder")}
            />
          )}
        />
        <Text marginLeft={16} onPress={_onCancel}>
          {t("common:Cancel")}
        </Text>
      </View>
      {isSearch ? (
        <>
          <FrequencyTab
            tabs={["Top", "People", "Pet", "Tags"]}
            selectedIndex={activeIndex}
            onChange={setActiveIndex}
          />
          <ViewPager
            style={globalStyle.flexOne}
            shouldLoadComponent={(index) => index === activeIndex}
            selectedIndex={activeIndex}
            onSelect={setActiveIndex}
          >
            <AboutResults data={DATA_PET_RESULT} />
            <AboutResults data={DATA_PEOPLE_RESULT} />
            <AboutResults data={DATA_PET_RESULT} showAdopt />
            <AboutResults data={DATA_TAG_RESULT} />
          </ViewPager>
        </>
      ) : (
        <Content contentContainerStyle={styles.content}>
          <RecentSearch data={DATA_RECENT} />
          <MostPet data={DATA_MOST_PET} />
          <TrendingUser data={DATA_TRENDING_USER} />
          <RecentShot data={DATA_RECENT_SHOT} />
        </Content>
      )}
    </Container>
  );
});

export default NewsFeedSearch;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
    paddingBottom: 0,
  },
  input: {
    flex: 1,
  },
  topView: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 24,
    marginTop: 8,
  },
  content: {
    marginTop: 32,
    paddingBottom: 120,
  },
});
