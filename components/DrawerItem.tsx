import React from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import SvgHoverLine from "components/SvgHoverLine";
import Text from "components/Text";
import {
  Icon,
  StyleService,
  useStyleSheet,
  useTheme,
} from "@ui-kitten/components";

interface Props {
  onPress?(): void;
  label?: string;
  icon?: string;
  tabActive: number;
  tabChoose?: number;
}

const DrawerItem = ({
  onPress,
  label,
  icon = "menu",
  tabActive,
  tabChoose,
}: Props) => {
  const styles = useStyleSheet(themedStyles);
  const theme = useTheme();

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={onPress}
      style={styles.container}
    >
      <Icon
        pack="assets"
        name={icon}
        style={[
          styles.icon,
          {
            tintColor:
              tabChoose === tabActive
                ? theme["text-primary-color"]
                : theme["text-primary-color"],
          },
        ]}
      />
      <Text status={tabChoose === tabActive ? "primary" : "primary"}>
        {label}
      </Text>
    </TouchableOpacity>
  );
};

export default DrawerItem;

const themedStyles = StyleService.create({
  container: {
    flexDirection: "row",
    marginLeft: 32,
    alignItems: "center",
    marginBottom: 32,
  },
  icon: {
    tintColor: "text-primary-color",
    marginRight: 24,
  },
});
