import React, { memo } from "react";
import { View, TouchableOpacity, ImageRequireSource } from "react-native";
import {
  StyleService,
  useStyleSheet,
  Avatar,
  Icon,
  Layout,
} from "@ui-kitten/components";
import { globalStyle } from "styles/globalStyle";
import Text from "components/Text";
import { useTranslation } from "react-i18next";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { MainBottomTabStackParamList } from "navigation/types";

interface Props {
  id: number;
  userName: string;
  about: string;
  numberPost: string;
  numberFollower: string;
  numberFollowing: string;
  messNotRead?: number;
  avatar: ImageRequireSource;
}
interface ItemProps {
  dataUser: Props;
  _onEdit?(): void;
  _onFollower?(): void;
  _onFollowing?(): void;
}

const HeaderProfile = memo(
  ({ dataUser, _onEdit, _onFollower, _onFollowing }: ItemProps) => {
    let {
      messNotRead,
      numberFollower,
      userName,
      numberFollowing,
      numberPost,
      about,
      avatar,
    } = dataUser;
    const { navigate, dispatch, goBack } =
      useNavigation<NavigationProp<MainBottomTabStackParamList>>();
    const styles = useStyleSheet(themedStyles);
    const { t } = useTranslation(["profile", "common"]);

    const _onPressMess = React.useCallback(() => {
      navigate("Notifications", { activeIndex: 2 });
    }, []);
    return (
      <View style={styles.container}>
        <View style={styles.top}>
          <TouchableOpacity
            style={styles.btnMess}
            onPress={_onPressMess}
            activeOpacity={0.7}
          >
            <Icon pack="assets" name="messenger" style={globalStyle.icon24} />
            {messNotRead ? (
              <Layout style={styles.messNotRead} level={"7"}>
                <Text status={"primary"} category="c4">
                  {messNotRead}
                </Text>
              </Layout>
            ) : null}
          </TouchableOpacity>
          <Avatar size={"giant"} source={avatar} />
          <TouchableOpacity
            style={styles.btnAddFriend}
            onPress={_onEdit}
            activeOpacity={0.7}
          >
            <Icon pack="assets" name="edit" style={globalStyle.icon24} />
          </TouchableOpacity>
        </View>
        <Text category="b1" center marginTop={16} marginBottom={8}>
          {userName}
        </Text>
        <Text center marginBottom={24}>
          {about}
        </Text>
        <View style={styles.bottom}>
          <TouchableOpacity activeOpacity={1}>
            <Text center style={styles.otherText} uppercase>
              {numberPost}
            </Text>
            <Text category="c4">{t("posts")}</Text>
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.7} onPress={_onFollower}>
            <Text center style={styles.otherText} uppercase>
              {numberFollower}
            </Text>
            <Text category="c4">{t("followers")}</Text>
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.7} onPress={_onFollowing}>
            <Text center style={styles.otherText} uppercase>
              {numberFollowing}
            </Text>
            <Text category="c4">{t("following")}</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
);

export default HeaderProfile;

const themedStyles = StyleService.create({
  container: {
    borderBottomWidth: 1,
    paddingBottom: 16,
    borderColor: "background-basic-color-2",
  },
  otherText: {
    fontFamily: "Oswald-Medium",
    fontSize: 16,
    fontWeight: "500",
    lineHeight: 23.71,
  },
  top: {
    ...globalStyle.flexSpaceBetween,
    alignItems: "center",
    paddingHorizontal: 60,
  },
  btnMess: {
    width: 40,
    height: 40,
    borderRadius: 99,
    backgroundColor: "background-basic-color-4",
    ...globalStyle.center,
  },
  btnAddFriend: {
    width: 40,
    height: 40,
    borderRadius: 99,
    backgroundColor: "#4380FF",
    ...globalStyle.center,
  },
  bottom: {
    ...globalStyle.flexSpaceBetween,
    paddingLeft: 59,
    paddingRight: 32,
  },
  messNotRead: {
    ...globalStyle.icon16,
    borderRadius: 99,
    ...globalStyle.center,
    position: "absolute",
    top: 0,
    right: -6,
  },
});
