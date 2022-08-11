import React, { memo } from "react";
import {
  View,
  ImageRequireSource,
  TouchableOpacity,
  ViewStyle,
} from "react-native";

import { StyleService, useStyleSheet, Avatar } from "@ui-kitten/components";
import { NavigationProp, useNavigation } from "@react-navigation/native";

import Text from "components/Text";
import { MainBottomTabStackParamList } from "navigation/types";

interface Props {
  avatar: ImageRequireSource;
  userName: string;
  userType: string;
}
interface DataProps {
  data: Props;
  style?: ViewStyle;
}
const UserInformation = memo(({ data, style }: DataProps) => {
  const { navigate } =
    useNavigation<NavigationProp<MainBottomTabStackParamList>>();
  const styles = useStyleSheet(themedStyles);
  const _onPress = React.useCallback(() => {
    navigate("MyProfile");
  }, []);
  return (
    <TouchableOpacity style={[styles.container, style]} onPress={_onPress}>
      <Avatar
        source={data.avatar}
        style={{ marginRight: 16, width: 56, height: 56 }}
      />
      <View>
        <Text status="primary" marginBottom={5}>
          {data.userName}
        </Text>
        <Text status="primary" category="c4">
          {data.userType}
        </Text>
      </View>
    </TouchableOpacity>
  );
});

export default UserInformation;

const themedStyles = StyleService.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
});
