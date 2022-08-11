import React, { memo } from "react";
import { View, TouchableOpacity } from "react-native";
import { useTheme, StyleService, useStyleSheet } from "@ui-kitten/components";

import Text from "components/Text";

interface Props {
  genderPet: "male" | "female" | "neutered?" | "spayed?";
  setGenderPet: React.Dispatch<
    React.SetStateAction<"male" | "female" | "neutered?" | "spayed?">
  >;
}

const ChooseGenderPet = memo(({ genderPet, setGenderPet }: Props) => {
  const theme = useTheme();
  const styles = useStyleSheet(themedStyles);

  const _onPress = React.useCallback(
    (gender: "male" | "female" | "neutered?" | "spayed?") => {
      return setGenderPet(gender);
    },
    []
  );
  const RenderItem = React.useCallback(
    ({ item }) => {
      return (
        <TouchableOpacity
          onPress={() => _onPress(item.name)}
          style={[
            styles.button,
            {
              borderWidth: genderPet !== item.name ? 1 : 0,
              borderColor:
                genderPet !== item.name
                  ? theme["color-basic-400"]
                  : "transparent",
              backgroundColor:
                genderPet === item.name
                  ? theme["text-danger-color"]
                  : "transparent",
            },
          ]}
        >
          <Text
            capitalize
            category="c3"
            status={genderPet === item.name ? "primary" : "placeholder"}
          >
            {item.name}
          </Text>
        </TouchableOpacity>
      );
    },
    [genderPet]
  );
  return (
    <View style={styles.container}>
      <Text category="h4" marginBottom={16}>
        Gender
      </Text>
      <View style={styles.content}>
        {DATA.map((item, i) => {
          return <RenderItem key={i} item={item} />;
        })}
      </View>
    </View>
  );
});

export default ChooseGenderPet;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
    marginHorizontal: 24,
    marginBottom: 32,
  },
  button: {
    paddingVertical: 9,
    paddingHorizontal: 20,
    borderRadius: 99,
    marginBottom: 8,
    marginRight: 8,
  },
  content: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
});
const DATA = [
  { id: 0, name: "male" },
  { id: 1, name: "female" },
  { id: 2, name: "neutered?" },
  { id: 3, name: "spayed?" },
];
