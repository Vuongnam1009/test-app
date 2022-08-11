import React, { memo } from "react";
import { View, Image, ViewStyle } from "react-native";
import {
  TopNavigation,
  useTheme,
  StyleService,
  useStyleSheet,
  Layout,
  Icon,
} from "@ui-kitten/components";
import { useNavigation } from "@react-navigation/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import useLayout from "hooks/useLayout";
import { globalStyle } from "styles/globalStyle";

import Text from "components/Text";
import Content from "components/Content";
import Container from "components/Container";
import { useTranslation } from "react-i18next";

interface Props {
  name: string;
  location: string;
  phoneNumber: number;
  email: string;
  petName: string;
  petType: string;
  breed: string;
  style?: ViewStyle;
}

const InformationCard = memo(
  ({
    name,
    location,
    phoneNumber,
    email,
    petName,
    petType,
    breed,
    style,
  }: Props) => {
    const { goBack } = useNavigation();
    const { height, width, top, bottom } = useLayout();
    const theme = useTheme();
    const styles = useStyleSheet(themedStyles);
    const { t } = useTranslation(["medical", "common"]);
    let strPhone = phoneNumber.toString();
    return (
      <Layout style={[styles.container, style]}>
        <View style={styles.petOwner}>
          <View style={[globalStyle.flexDirection, { marginBottom: 9 }]}>
            <Text>{t("petOwner")}:</Text>
            <Text fontFamily="Montserrat-Medium"> {name}</Text>
          </View>
          <View style={[globalStyle.flexDirection, { marginBottom: 9 }]}>
            <Icon pack="assets" name="location" style={globalStyle.icon16} />
            <Text category="c4" status={"placeholder"} marginLeft={9}>
              {location}
            </Text>
          </View>
          <View style={[globalStyle.flexDirection, { marginBottom: 9 }]}>
            <Icon pack="assets" name="phone" style={globalStyle.icon16} />
            <Text category="c4" status={"placeholder"} marginLeft={9}>
              {strPhone.slice(0, 3)}-{strPhone.slice(3, 6)}-
              {strPhone.slice(6, 12)}
            </Text>
          </View>
          <View style={globalStyle.flexDirection}>
            <Icon pack="assets" name="email" style={globalStyle.icon16} />
            <Text category="c4" status={"placeholder"} marginLeft={9}>
              {email}
            </Text>
          </View>
        </View>
        <View style={styles.pet}>
          <View style={[globalStyle.flexDirection, { marginBottom: 9 }]}>
            <Text>{t("petName")}:</Text>
            <Text fontFamily="Montserrat-Medium"> {petName}</Text>
          </View>
          <View style={[globalStyle.flexDirection, { marginBottom: 9 }]}>
            <Icon pack="assets" name="petType" style={globalStyle.icon16} />
            <Text category="c4" status={"placeholder"} marginLeft={9}>
              {petType}
            </Text>
          </View>
          <View style={[globalStyle.flexDirection]}>
            <Icon pack="assets" name="breed" style={globalStyle.icon16} />
            <Text category="c4" status={"placeholder"} marginLeft={9}>
              {breed}
            </Text>
          </View>
        </View>
      </Layout>
    );
  }
);

export default InformationCard;

const themedStyles = StyleService.create({
  container: {
    borderRadius: 4,
    marginHorizontal: 16,
    ...globalStyle.shadow,
  },
  petOwner: {
    padding: 16,
    borderBottomColor: "background-basic-color-2",
    borderBottomWidth: 1,
  },
  pet: {
    padding: 16,
    paddingBottom: 24,
  },
});
