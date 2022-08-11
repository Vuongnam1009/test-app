import React, { memo } from "react";
import { View, ImageRequireSource, TouchableOpacity } from "react-native";
import {
  useTheme,
  StyleService,
  useStyleSheet,
  Avatar,
  Icon,
} from "@ui-kitten/components";
import { globalStyle } from "styles/globalStyle";

import Text from "components/Text";
import useToggle from "hooks/useToggle";

interface Props {
  id: number;
  name: string;
  avatar: ImageRequireSource;
  type: string;
  didFollow: boolean;
}
interface ItemProps {
  item: Props;
  onPress(): void;
  disable?: boolean;
  _onPressUser?(): void;
}

const UserFollow = memo(
  ({ item, onPress, disable, _onPressUser }: ItemProps) => {
    const styles = useStyleSheet(themedStyles);
    const theme = useTheme();
    const [isFollow, setIsFollow] = useToggle(item.didFollow);

    return (
      <View style={styles.container}>
        <TouchableOpacity
          onPress={_onPressUser}
          activeOpacity={0.7}
          style={[globalStyle.flexDirection, globalStyle.alignItemsCenter]}
        >
          <Avatar source={item.avatar} size={"huge"} />
          <View style={styles.title}>
            <Text
              marginBottom={5}
              fontFamily="Montserrat-Medium"
              fontWeight="500"
            >
              {item.name}
            </Text>
            <Text category="c4">{item.type}</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.7}
          disabled={disable}
          style={[
            styles.btnFollow,
            {
              backgroundColor: !isFollow
                ? theme["background-basic-color-7"]
                : theme["color-green-400"],
            },
          ]}
          onPress={() => {
            setIsFollow();
            onPress();
          }}
        >
          {isFollow ? (
            <Icon pack="assets" name="unFollow" style={globalStyle.icon20} />
          ) : (
            <Icon pack="assets" name="follow" style={globalStyle.icon20} />
          )}
        </TouchableOpacity>
      </View>
    );
  }
);

export default UserFollow;

const themedStyles = StyleService.create({
  container: {
    ...globalStyle.flexSpaceBetween,
    alignItems: "center",
    marginBottom: 24,
  },
  btnFollow: {
    width: 40,
    height: 40,
    borderRadius: 99,
    ...globalStyle.center,
  },
  title: {
    marginLeft: 16,
  },
});
