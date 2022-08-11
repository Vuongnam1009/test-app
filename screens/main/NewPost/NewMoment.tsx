import React, { memo } from "react";
import { View, Image } from "react-native";
import {
  TopNavigation,
  useTheme,
  StyleService,
  useStyleSheet,
  Input,
  Toggle,
} from "@ui-kitten/components";
import {
  NavigationProp,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import useLayout from "hooks/useLayout";
import { globalStyle } from "styles/globalStyle";

import Text from "components/Text";
import Content from "components/Content";
import Container from "components/Container";
import NavigationAction from "components/NavigationAction";
import { useTranslation } from "react-i18next";
import { NewMomentNavigationProp, RootStackParamList } from "navigation/types";
import { Images } from "assets/images";
import useToggle from "hooks/useToggle";
import AdMob from "components/AdMob";

const NewMoment = memo(() => {
  const { navigate } = useNavigation<NavigationProp<RootStackParamList>>();
  const { height, width, top, bottom } = useLayout();
  const theme = useTheme();
  const styles = useStyleSheet(themedStyles);
  const route = useRoute<NewMomentNavigationProp>();
  const { t } = useTranslation(["filter", "common"]);

  const sizeImg = 84 * (width / 375);

  const [checked, setChecked] = React.useState(false);
  const [checkedFB, setCheckedFB] = useToggle(true);
  const [checkedTwitter, setCheckedTwitter] = useToggle(false);
  const [checkedInsta, setCheckedInsta] = useToggle(false);
  const onCheckedChange = (isChecked: boolean) => {
    setChecked(isChecked);
  };
  const _onShare = React.useCallback(() => {
    navigate("DrawerNavigator", { screen: "Main" });
  }, []);
  return (
    <Container style={styles.container}>
      <TopNavigation
        accessoryLeft={<NavigationAction />}
        title={<Text category="b1">{t("newMoment")}</Text>}
        accessoryRight={
          <Text status={"info"} marginRight={4} onPress={_onShare}>
            {t("common:share")}
          </Text>
        }
      />
      <Content contentContainerStyle={styles.content}>
        <View style={globalStyle.flexDirection}>
          <Image
            source={{ uri: route?.params?.photo }}
            style={{ width: sizeImg, height: sizeImg, marginRight: 16 }}
          />
          <Input
            status={"transparent"}
            placeholder={t("saySomething")}
            multiline
            style={{ flex: 1, minHeight: sizeImg, maxHeight: sizeImg }}
          />
        </View>
        <View style={styles.location}>
          <Image
            source={Images.location}
            /* @ts-ignore */
            style={styles.icon}
          />
          <View>
            <Text category="c4" uppercase marginTop={4}>
              {t("addLocation")}
            </Text>
            <Text marginTop={12}>841 Stacy Point Suite 388</Text>
          </View>
        </View>
        <View style={[globalStyle.flexDirection, { width: width - 48 }]}>
          <Image
            source={Images.share}
            /* @ts-ignore */
            style={styles.icon}
          />
          <View>
            <Text category="c4" uppercase marginTop={6} marginBottom={18}>
              {t("shareSettings")}
            </Text>
            <View style={[styles.fb, { width: 294 * (width / 375) }]}>
              <Image
                source={Images.facebook}
                /* @ts-ignore */
                style={styles.iconSocial}
              />
              <Text marginTop={4} marginLeft={16}>
                Facebook
              </Text>
              <Toggle
                checked={checkedFB}
                onChange={setCheckedFB}
                style={styles.toggle}
              />
            </View>
            <View style={[styles.twitter]}>
              <Image
                source={Images.twitter}
                /* @ts-ignore */
                style={styles.iconSocial}
              />
              <Text marginTop={4} marginLeft={16}>
                Twitter
              </Text>
              <Toggle
                checked={checkedTwitter}
                onChange={setCheckedTwitter}
                style={styles.toggle}
              />
            </View>
            <View style={globalStyle.flexDirection}>
              <Image
                source={Images.insta}
                /* @ts-ignore */
                style={styles.iconSocial}
              />
              <Text marginTop={4} marginLeft={16}>
                Instagram
              </Text>
              <Toggle
                checked={checkedInsta}
                onChange={setCheckedInsta}
                style={styles.toggle}
              />
            </View>
          </View>
        </View>

        <View style={[styles.comment]}>
          <Image
            source={Images.comment}
            /* @ts-ignore */
            style={styles.icon}
          />
          <View>
            <Text category="c4" uppercase marginBottom={8} marginTop={6}>
              {t("turnOffComment")}
            </Text>
            <Text
              category="c2"
              status={"placeholder"}
              maxWidth={225 * (width / 375)}
            >
              {t("desComment")}
            </Text>
          </View>
          <Toggle
            checked={checked}
            onChange={onCheckedChange}
            style={styles.toggleCmt}
          />
        </View>
        <AdMob />
      </Content>
    </Container>
  );
});

export default NewMoment;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
  },
  content: {
    marginTop: 24,
    paddingHorizontal: 24,
  },
  icon: {
    width: 24,
    height: 24,
    marginRight: 16,
  },
  iconSocial: {
    width: 24,
    height: 24,
    marginTop: 4,
    marginBottom: 8,
  },
  location: {
    flexDirection: "row",
    marginVertical: 40,
  },
  comment: {
    marginTop: 40,
    flexDirection: "row",
  },
  fb: {
    flexDirection: "row",
  },
  twitter: {
    flexDirection: "row",
    marginVertical: 24,
  },
  toggle: {
    position: "absolute",
    right: 0,
    top: 0,
  },
  toggleCmt: {
    position: "absolute",
    right: 0,
    top: 0,
  },
});
