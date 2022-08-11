import React, { memo } from "react";
import { View, SectionList, TouchableOpacity } from "react-native";
import {
  TopNavigation,
  useTheme,
  StyleService,
  useStyleSheet,
  Input,
} from "@ui-kitten/components";
import {
  useNavigation,
  useRoute,
  NavigationProp,
} from "@react-navigation/native";
import useLayout from "hooks/useLayout";

import Text from "components/Text";
import Container from "components/Container";
import {
  BreedScreenNavigationProp,
  NewPetStackParamList,
} from "navigation/types";
import NavigationAction from "components/NavigationAction";
import BackgroundLogin from "components/BackgroundLogin";
import { useTranslation } from "react-i18next";

const BreedPet = memo(() => {
  const { goBack, navigate } =
    useNavigation<NavigationProp<NewPetStackParamList>>();
  const { height, width, top, bottom } = useLayout();
  const theme = useTheme();
  const styles = useStyleSheet(themedStyles);
  const route = useRoute<BreedScreenNavigationProp>();
  const { t } = useTranslation(["newPet", "common"]);

  const onNext = React.useCallback(() => {
    navigate("GenderPet");
  }, []);
  const Item = React.useCallback(({ title }) => {
    return (
      <TouchableOpacity activeOpacity={0.7} onPress={onNext}>
        <Text marginBottom={32}>{title}</Text>
      </TouchableOpacity>
    );
  }, []);
  const ListHeader = React.useCallback(() => {
    return (
      <View style={{ marginTop: 60 * (height / 812) }}>
        <Text category="h2" marginBottom={40}>
          {route.params.title} {t("breed")}
        </Text>
        <Input placeholder={t("searchBreed")} status="primary" />
        <TouchableOpacity activeOpacity={0.7}>
          <Text style={styles.notSureBtn} status="info">
            {t("notSure")}
          </Text>
        </TouchableOpacity>
      </View>
    );
  }, []);
  return (
    <Container style={styles.container}>
      <TopNavigation
        accessoryLeft={<NavigationAction />}
        style={styles.topNav}
      />
      <BackgroundLogin text={t("title")} />
      <SectionList
        sections={DATA}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={ListHeader}
        contentContainerStyle={[styles.content]}
        keyExtractor={(item, index) => item + index}
        renderItem={({ item }) => <Item title={item} />}
        renderSectionHeader={({ section: { title } }) => (
          <Text marginBottom={32} category="h3" style={styles.title}>
            {title}
          </Text>
        )}
      />
    </Container>
  );
});

export default BreedPet;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
  },
  notSureBtn: {
    textAlign: "right",
    marginVertical: 16,
  },
  content: {
    marginHorizontal: 32,
    marginBottom: 40,
  },
  topNav: {
    zIndex: 10,
  },
  title: {
    backgroundColor: "background-basic-color-1",
  },
});

const DATA = [
  {
    title: "A",
    data: [
      "American Foxhound",
      "Affenpinscher",
      "Afghan Hound",
      "Airedale Terrier",
      "Akita",
      "Alaskan Klee Kai",
      "Alaskan Malamute",
      "American Bulldog",
      "American English Coonhound",
      "American Eskimo Dog",
    ],
  },
  {
    title: "B",
    data: ["Barbet", "Basenji", "Bassador", "Basset House", "Basset Retriever"],
  },
  {
    title: "C",
    data: [
      "Cairn Terrier",
      "Cardigan Welsh Corgi",
      "Cavalier King Charles Spaniel",
      "Cesky Terrier",
      "Chihuahua",
    ],
  },
  {
    title: "D",
    data: [
      "Dandie Dinmont Terrier",
      "Dachshund",
      "Dalmatian",
      "Dandie Dinmont Terrier",
      "Dogue de Bordeaux",
    ],
  },
];
