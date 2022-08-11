import React, { memo } from "react";
import { View, Image } from "react-native";
import {
  TopNavigation,
  useTheme,
  StyleService,
  useStyleSheet,
} from "@ui-kitten/components";
import { useNavigation } from "@react-navigation/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import useLayout from "hooks/useLayout";
import { globalStyle } from "styles/globalStyle";

import Text from "components/Text";
import Content from "components/Content";
import Container from "components/Container";
import AnimatedInput from "screens/vet/Medical/RequestMedicalInfo/AnimatedInput";
import { t } from "i18next";
import UserFollow from "./UserFollow";
import { Images } from "assets/images";

const Following = memo(() => {
  const { goBack } = useNavigation();
  const { height, width, top, bottom } = useLayout();
  const theme = useTheme();
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
          children={"253 followings"}
        />
        {DATA_FOLLOWER.map((item, i) => {
          return <UserFollow item={item} key={i} onPress={() => {}} disable />;
        })}
      </Content>
    </Container>
  );
});

export default Following;

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
    name: "Sophie Leonard",
    avatar: Images.avatar2,
    type: "Rabbit Owner",
    didFollow: true,
  },
  {
    id: 2,
    name: "Sophie Leonard",
    avatar: Images.avatar3,
    type: "Rabbit Owner",
    didFollow: true,
  },
  {
    id: 3,
    name: "Sophie Leonard",
    avatar: Images.avatar4,
    type: "Rabbit Owner",
    didFollow: true,
  },
  {
    id: 3,
    name: "Sophie Leonard",
    avatar: Images.avatar5,
    type: "Rabbit Owner",
    didFollow: true,
  },
  {
    id: 3,
    name: "Sophie Leonard",
    avatar: Images.avatar6,
    type: "Rabbit Owner",
    didFollow: true,
  },
  {
    id: 3,
    name: "Sophie Leonard",
    avatar: Images.avatar8,
    type: "Rabbit Owner",
    didFollow: true,
  },
  {
    id: 3,
    name: "Sophie Leonard",
    avatar: Images.avatar7,
    type: "Rabbit Owner",
    didFollow: true,
  },
  {
    id: 3,
    name: "Sophie Leonard",
    avatar: Images.avatar10,
    type: "Rabbit Owner",
    didFollow: true,
  },
  {
    id: 3,
    name: "Sophie Leonard",
    avatar: Images.avatar1,
    type: "Rabbit Owner",
    didFollow: true,
  },
];
