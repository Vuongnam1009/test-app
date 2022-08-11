import React, { memo } from "react";
import { View, ImageRequireSource, TouchableOpacity } from "react-native";
import {
  StyleService,
  useStyleSheet,
  Avatar,
  Button,
  Icon,
} from "@ui-kitten/components";
import { globalStyle } from "styles/globalStyle";

import Text from "components/Text";
import { useTranslation } from "react-i18next";

interface Props {
  name: string;
  isUser?: boolean;
  avatar: ImageRequireSource;
  _onLostPet?(): void;
  _onAdopt?(): void;
}

const Header = memo(({ name, isUser, avatar, _onAdopt, _onLostPet }: Props) => {
  const styles = useStyleSheet(themedStyles);
  const { t } = useTranslation(["profile", "common"]);

  return (
    <View style={styles.top}>
      <Avatar
        source={avatar}
        size={"giant"}
        /* @ts-ignore */
        style={styles.avatar}
      />
      <Text marginTop={16} category="h4" center marginBottom={7}>
        {name}
      </Text>
      {isUser ? (
        <View style={styles.viewFavorite}>
          <Icon pack="assets" name="loveActive" style={globalStyle.icon16} />
          <Text category="c4" marginLeft={4}>
            125K {t("favorites")}
          </Text>
        </View>
      ) : (
        <View>
          <View style={styles.viewFavorite}>
            <Icon pack="assets" name="owner" style={globalStyle.icon16} />
            <Text category="c4" marginLeft={4} status={"info"}>
              Jackson Maxwell
            </Text>
          </View>
        </View>
      )}
      {isUser ? (
        <View style={styles.viewButton}>
          <TouchableOpacity style={styles.button}>
            <Text
              category="c3"
              uppercase
              center
              status={"placeholder"}
              onPress={_onAdopt}
            >
              {t("makeAdopt")}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <Text
              category="c3"
              uppercase
              center
              status={"placeholder"}
              onPress={_onLostPet}
            >
              {t("lostPet")}
            </Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.userFavorite}>
          <View>
            <Text category="os2">125K</Text>
            <Text capitalize category="c4" status={"placeholder"}>
              {t("favorites")}{" "}
            </Text>
          </View>
          <Button
            style={styles.buttonFavorite}
            status={"basic"}
            accessoryRight={() => (
              <View>
                <Text
                  fontFamily="Montserrat-Medium"
                  fontWeight="500"
                  status={"primary"}
                >
                  {t("favorite").toUpperCase()}
                </Text>
              </View>
            )}
          />
        </View>
      )}
    </View>
  );
});

export default Header;

const themedStyles = StyleService.create({
  top: {
    borderBottomWidth: 1,
    borderBottomColor: "background-basic-color-2",
  },
  userFavorite: {
    flexDirection: "row",
    marginLeft: 44,
    marginBottom: 24,
    alignItems: "center",
  },
  buttonFavorite: {
    flex: 1,
    marginRight: 120,
    marginLeft: 24,
  },
  viewFavorite: {
    alignSelf: "center",
    flexDirection: "row",
    marginRight: 16,
    marginBottom: 24,
    alignItems: "center",
  },
  viewButton: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 60,
    marginBottom: 24,
  },
  button: {
    width: 120,
    paddingVertical: 8,
  },
  avatar: {
    marginTop: -48,
    borderWidth: 2,
    borderColor: "background-basic-color-1",
    alignSelf: "center",
  },
});
