import React, { memo } from "react";
import { View, Image, TouchableOpacity } from "react-native";
import { StyleService, useStyleSheet, Avatar } from "@ui-kitten/components";
import { NavigationProp, useNavigation } from "@react-navigation/native";

import Text from "components/Text";
import { useTranslation } from "react-i18next";
import { PetProps } from "components/TrackingPetModal";
import { isEmpty } from "lodash";
import LoadingIndicator from "components/LoadingIndicator";
import { RootStackParamList } from "navigation/types";
import { Images } from "assets/images";

interface Props {
  data: PetProps[];
  addPet?: boolean;
  isUser: boolean;
}
const PetList = memo(({ data, addPet, isUser }: Props) => {
  const { navigate } = useNavigation<NavigationProp<RootStackParamList>>();
  const styles = useStyleSheet(themedStyles);
  const { t } = useTranslation(["profile", "common"]);

  const _onPet = (item: PetProps) => {
    navigate("PetProfile", { isUser: isUser, data: item });
  };
  return (
    <View style={styles.container}>
      <Text
        marginBottom={17}
        uppercase
        fontFamily="Montserrat-Medium"
        fontWeight="500"
      >
        {t("petList")}
      </Text>
      {isEmpty(data) ? (
        <LoadingIndicator size="giant" />
      ) : (
        <View style={styles.content}>
          {data.map((item, i) => {
            return (
              <TouchableOpacity
                key={i}
                style={styles.item}
                onPress={() => _onPet(item)}
                activeOpacity={0.7}
              >
                <Avatar source={item.avatar} size={"huge"} />
                <Text center category="c4" marginTop={8}>
                  {item.name}
                </Text>
              </TouchableOpacity>
            );
          })}
          {addPet ? (
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => navigate("NewPet", { screen: "AddNewPet" })}
            >
              <Image
                source={Images.addPet}
                /* @ts-ignore */
                style={styles.addPet}
              />
              <Text category="c4" center marginTop={8}>
                {t("activity:addPet")}
              </Text>
            </TouchableOpacity>
          ) : null}
        </View>
      )}
    </View>
  );
});

export default PetList;

const themedStyles = StyleService.create({
  container: {
    paddingLeft: 24,
    marginTop: 24,
    paddingBottom: 25,
    borderBottomColor: "background-basic-color-2",
    borderBottomWidth: 1,
  },
  content: {
    flexDirection: "row",
  },
  item: {
    marginRight: 32,
  },
  addPet: {
    width: 48,
    height: 48,
  },
});
