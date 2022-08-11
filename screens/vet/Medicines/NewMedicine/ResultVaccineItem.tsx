import React from "react";
import { TouchableOpacity } from "react-native";
import { StyleService, useStyleSheet, Icon } from "@ui-kitten/components";
import { globalStyle } from "styles/globalStyle";
import Text from "components/Text";
import useToggle from "hooks/useToggle";
import { MedicinesItemProps } from "constants/Types";

export interface VaccineProps {
  item: MedicinesItemProps;
  onPress(item: MedicinesItemProps): void;
}

const ResultVaccineItem = ({ item, onPress }: VaccineProps) => {
  const styles = useStyleSheet(themedStyles);

  const [isActive, setIsActive] = useToggle(false);
  return (
    <TouchableOpacity
      onPress={() => {
        onPress(item);
        setIsActive();
      }}
      style={styles.item}
    >
      <Text status={isActive ? "danger" : "basic"}>{item.name}</Text>
      <Icon
        pack="assets"
        name="active"
        style={{
          ...globalStyle.icon24,
          tintColor: isActive ? undefined : "transparent",
        }}
      />
    </TouchableOpacity>
  );
};

export default ResultVaccineItem;

const themedStyles = StyleService.create({
  item: {
    ...globalStyle.flexSpaceBetween,
    marginBottom: 32,
    marginHorizontal: 24,
  },
});
