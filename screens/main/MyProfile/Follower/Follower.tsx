import React, { memo } from "react";
import { View } from "react-native";
import { StyleService, useStyleSheet } from "@ui-kitten/components";
import { useNavigation } from "@react-navigation/native";

import Text from "components/Text";
import Content from "components/Content";
import Container from "components/Container";
import AnimatedInput from "screens/vet/Medical/RequestMedicalInfo/AnimatedInput";
import { t } from "i18next";
import { Images } from "assets/images";
import UserFollow from "./UserFollow";

const Follower = memo(() => {
  const { goBack } = useNavigation();
  const styles = useStyleSheet(themedStyles);

  const [value, setValue] = React.useState("");
  return (
    <Container style={styles.container}>
      <View style={[styles.header]}>
        <AnimatedInput
          containerStyle={styles.input}
          value={value}
          setValue={setValue}
          size={"small"}
          placeholder={t("common:search").toString()}
          status={"info"}
        />
        <Text marginHorizontal={16} onPress={goBack} marginTop={12}>
          {t("cancel")}
        </Text>
      </View>
      <Content contentContainerStyle={styles.content}>
        <Text
          category="c4"
          fontFamily="Montserrat-Medium"
          fontWeight="500"
          uppercase
          marginBottom={24}
          children={"1.2M followers"}
        />
        {DATA_FOLLOWER.map((item, i) => {
          return <UserFollow item={item} key={i} onPress={() => {}} />;
        })}
      </Content>
    </Container>
  );
});

export default Follower;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
    paddingBottom: 0,
  },
  input: {
    flex: 1,
    marginLeft: 24,
    marginTop: 12,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
  },
  content: {
    marginTop: 32,
    paddingHorizontal: 24,
    paddingBottom: 60,
  },
});
const DATA_FOLLOWER = [
  {
    id: 0,
    name: "Sophie Leonard",
    avatar: Images.avatar1,
    type: "Rabbit Owner",
    didFollow: true,
  },
  {
    id: 1,
    name: "Loretta Arnold",
    avatar: Images.avatar2,
    type: "Rabbit Owner",
    didFollow: false,
  },
  {
    id: 2,
    name: "Jessie Sims",
    avatar: Images.avatar3,
    type: "Rabbit Owner",
    didFollow: false,
  },
  {
    id: 3,
    name: "Birdie Farmer",
    avatar: Images.avatar4,
    type: "Rabbit Owner",
    didFollow: true,
  },
  {
    id: 4,
    name: "Marie Moody",
    avatar: Images.avatar5,
    type: "Rabbit Owner",
    didFollow: true,
  },
  {
    id: 5,
    name: "Ralph Freeman",
    avatar: Images.avatar6,
    type: "Rabbit Owner",
    didFollow: false,
  },
  {
    id: 6,
    name: "Carolyn Aguilar",
    avatar: Images.avatar8,
    type: "Rabbit Owner",
    didFollow: false,
  },
  {
    id: 7,
    name: "Katie Hunt",
    avatar: Images.avatar7,
    type: "Rabbit Owner",
    didFollow: false,
  },
  {
    id: 8,
    name: "Lou Barber",
    avatar: Images.avatar10,
    type: "Rabbit Owner",
    didFollow: false,
  },
  {
    id: 9,
    name: "Marie Moody",
    avatar: Images.avatar1,
    type: "Rabbit Owner",
    didFollow: false,
  },
];
