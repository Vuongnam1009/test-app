import React, { memo } from "react";
import { View, TouchableOpacity, SectionList } from "react-native";
import {
  useTheme,
  StyleService,
  useStyleSheet,
  Icon,
  Input,
  Button,
} from "@ui-kitten/components";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import useLayout from "hooks/useLayout";
import { globalStyle } from "styles/globalStyle";

import Text from "components/Text";
import Container from "components/Container";
import { useTranslation } from "react-i18next";
import ResultVaccineItem from "./ResultVaccineItem";
import { VetStackParamList } from "navigation/types";
import { MedicinesItemProps } from "constants/Types";

const SearchMedicineName = memo(() => {
  const theme = useTheme();
  const { navigate } = useNavigation<NavigationProp<VetStackParamList>>();
  const styles = useStyleSheet(themedStyles);
  const { t } = useTranslation(["medical", "common"]);
  const { bottom } = useLayout();

  const [value, setValue] = React.useState("");
  const _onClear = React.useCallback(() => {
    setValue("");
  }, []);
  const [listSelected, setListSelected] = React.useState<
    Array<MedicinesItemProps>
  >([]);
  const [route, setRoute] = React.useState("");

  const _addItem = React.useCallback(
    (item) => {
      setListSelected((prev) => {
        let arr = [...prev];
        arr.push(item);
        return arr;
      });
    },
    [listSelected]
  );

  const _removeItem = React.useCallback(
    (item) => {
      let arr = listSelected.filter((e) => e !== item);
      setListSelected(arr);
    },
    [listSelected]
  );
  React.useEffect(() => {
    let arr = listSelected.map((item) => {
      return item["name"];
    });
    setRoute(arr.join(", "));
  }, [listSelected]);
  const _onDone = React.useCallback(() => {
    navigate("NewMedicine", { name: route });
  }, [route]);
  return (
    <Container style={styles.container}>
      <View style={styles.topNav}>
        <Input
          value={value}
          style={styles.input}
          onChangeText={(text) => setValue(text)}
          placeholder={t("medicineName").toString()}
          accessoryLeft={() => (
            <Icon
              pack="assets"
              name="search"
              style={[globalStyle.icon16, { marginLeft: 6 }]}
            />
          )}
          accessoryRight={() => (
            <TouchableOpacity onPress={_onClear}>
              <Icon
                pack="assets"
                name="close"
                style={[globalStyle.icon16, { marginRight: 6 }]}
              />
            </TouchableOpacity>
          )}
        />
        <Text marginLeft={16}>{t("common:cancel")}</Text>
      </View>
      <SectionList
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
        sections={DATA}
        keyExtractor={(item, index) => item.name + index}
        renderItem={({ item }) => {
          return (
            <ResultVaccineItem
              item={item}
              onPress={() => {
                const result = listSelected.find(
                  ({ name }) => name === item.name
                );
                if (result !== undefined) {
                  _removeItem(item);
                } else {
                  _addItem(item);
                }
              }}
            />
          );
        }}
        renderSectionHeader={({ section: { title } }) => {
          return (
            <Text category="h3" marginLeft={24} marginBottom={32}>
              {title}
            </Text>
          );
        }}
      />

      <View style={[styles.viewBottom, { bottom: bottom + 8 }]}>
        {listSelected.length > 0 ? (
          <View style={styles.selected}>
            <Text category="c4" status={"primary"}>
              {listSelected.length} selected
            </Text>
          </View>
        ) : null}
        <Button
          children={t("common:done").toUpperCase()}
          status={"basic"}
          style={[styles.btnDone]}
          onPress={_onDone}
        />
      </View>
    </Container>
  );
});

export default SearchMedicineName;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
  },
  topNav: {
    marginHorizontal: 24,
    marginTop: 12,
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    flex: 1,
  },
  content: {
    marginTop: 32,
  },
  bottom: {
    position: "absolute",
    left: 24,
    right: 24,
  },
  viewBottom: {
    position: "absolute",
    left: 0,
    right: 0,
  },
  btnDone: {
    flex: 1,
    marginHorizontal: 24,
  },
  selected: {
    paddingVertical: 4,
    paddingHorizontal: 16,
    backgroundColor: "color-green-400",
    alignSelf: "center",
    justifyContent: "center",
    borderRadius: 99,
    marginBottom: 16,
  },
});
const DATA = [
  {
    title: "A",
    data: [
      { id: 1, name: "Acepromazine" },
      { id: 2, name: "Advantage" },
      { id: 3, name: "Amitriptyline" },
      { id: 4, name: "Amlodipine Besylate" },
      { id: 5, name: "Ammonium Chloride" },
      { id: 6, name: "Amoxicillin" },
      { id: 7, name: "Ampicillin" },
      { id: 8, name: "Antacids" },
      { id: 9, name: "Aspirin" },
      { id: 10, name: "Atenolol" },
      { id: 11, name: "Azathioprine" },
    ],
  },
  {
    title: "B",
    data: [
      { id: 1, name: "Baytril" },
      { id: 2, name: "Benadryl for Dogs and Cats" },
      { id: 3, name: "Bexsero" },
      { id: 4, name: "BOOSTRIX" },
    ],
  },
];
