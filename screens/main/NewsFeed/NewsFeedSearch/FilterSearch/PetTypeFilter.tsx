import React, { memo } from "react";
import { View, TouchableOpacity, Easing } from "react-native";
import { useTheme, StyleService, useStyleSheet } from "@ui-kitten/components";
import { useNavigation } from "@react-navigation/native";
import useLayout from "hooks/useLayout";

import Text from "components/Text";
import { useTranslation } from "react-i18next";

interface Props {
  activeTag: "dog" | "cat" | "rabbit" | "bird" | "hamster" | "other";
  setActiveTag: React.Dispatch<
    React.SetStateAction<
      "dog" | "cat" | "rabbit" | "bird" | "hamster" | "other"
    >
  >;
}

const PetTypeFilter = memo(({ activeTag, setActiveTag }: Props) => {
  const { goBack } = useNavigation();
  const { height, width, top, bottom } = useLayout();
  const theme = useTheme();
  const styles = useStyleSheet(themedStyles);
  const { t } = useTranslation(["filter", "common"]);

  const _onPress = React.useCallback(
    (breed: "dog" | "cat" | "rabbit" | "bird" | "hamster" | "other") => {
      setActiveTag(breed);
    },
    []
  );
  return (
    <View style={styles.container}>
      <Text category="h4" marginTop={40} marginBottom={16}>
        {t("petType")}
      </Text>
      <View style={styles.content}>
        {DATA.map((item, i) => {
          return (
            <View
              style={[
                styles.button,
                {
                  borderWidth: activeTag !== item.name ? 1 : 0,
                  borderColor:
                    activeTag !== item.name
                      ? theme["color-basic-400"]
                      : "transparent",
                  backgroundColor:
                    activeTag === item.name
                      ? theme["text-danger-color"]
                      : "transparent",
                },
              ]}
              key={i}
            >
              <TouchableOpacity
                /* @ts-ignore */
                onPress={() => _onPress(item.name)}
                activeOpacity={0.7}
              >
                <Text
                  category="c3"
                  capitalize
                  status={activeTag === item.name ? "primary" : "placeholder"}
                >
                  {item.name}
                </Text>
              </TouchableOpacity>
            </View>
          );
        })}
      </View>
    </View>
  );
});

export default PetTypeFilter;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    marginBottom: 24,
  },
  content: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  button: {
    borderRadius: 99,
    paddingHorizontal: 16,
    paddingVertical: 9,
    marginRight: 9,
    marginBottom: 8,
  },
});
const DATA = [
  { id: 0, name: "dog" },
  { id: 1, name: "cat" },
  { id: 2, name: "rabbit" },
  { id: 3, name: "bird" },
  { id: 4, name: "hamster" },
  { id: 5, name: "other" },
];
