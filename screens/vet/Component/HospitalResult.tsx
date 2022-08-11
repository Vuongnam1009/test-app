import React, { memo } from "react";
import { View, TouchableOpacity, ViewStyle } from "react-native";
import {
  StyleService,
  useStyleSheet,
  Icon,
  Layout,
} from "@ui-kitten/components";

import { globalStyle } from "styles/globalStyle";
import Text from "components/Text";

export interface HospitalProps {
  id: string | number;
  title: string;
  location: string;
  phone: number;
  active?: boolean;
}
interface ResultProps {
  item: HospitalProps;
  onPress(item: HospitalProps): void;
  disable?: boolean;
  style?: ViewStyle;
}

const HospitalResult = memo(
  ({ item, onPress, disable, style }: ResultProps) => {
    const styles = useStyleSheet(themedStyles);
    let strPhone = item.phone.toString();
    const [isActive, setIsActive] = React.useState(item.active);
    return (
      <TouchableOpacity
        disabled={disable}
        activeOpacity={0.7}
        onPress={() => {
          onPress(item);
          setIsActive(!isActive);
        }}
      >
        <Layout style={[styles.container, style]}>
          {isActive ? (
            <Icon pack="assets" name="active" style={styles.active} />
          ) : null}
          <Text
            fontFamily="Montserrat-Medium"
            marginBottom={8}
            status={isActive ? "danger" : "basic"}
          >
            {item.title}
          </Text>
          <View style={styles.location}>
            <Icon pack="assets" name="location" style={globalStyle.icon16} />
            <Text status={"placeholder"} category="c4" marginLeft={16}>
              {item.location}
            </Text>
          </View>
          <View style={globalStyle.flexDirection}>
            <Icon pack="assets" name="phone" style={globalStyle.icon16} />
            <Text status={"placeholder"} category="c4" marginLeft={16}>
              {strPhone.slice(0, 3)}-{strPhone.slice(3, 6)}-
              {strPhone.slice(6, 12)}
            </Text>
          </View>
        </Layout>
      </TouchableOpacity>
    );
  }
);

export default HospitalResult;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
    padding: 16,
    borderRadius: 4,
    marginBottom: 8,
    ...globalStyle.shadow,
    marginHorizontal: 24,
  },
  active: {
    position: "absolute",
    right: 0,
    top: 0,
    ...globalStyle.icon24,
  },
  location: {
    flexDirection: "row",
    marginBottom: 8,
  },
});
