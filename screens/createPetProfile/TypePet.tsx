import React, { memo } from "react";
import { View, Image, TouchableOpacity } from "react-native";
import {
  TopNavigation,
  useTheme,
  StyleService,
  useStyleSheet,
  Modal,
  Layout,
  Input,
  Button,
} from "@ui-kitten/components";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import useLayout from "hooks/useLayout";

import Text from "components/Text";
import Content from "components/Content";
import Container from "components/Container";
import { Images } from "assets/images";
import { useTranslation } from "react-i18next";
import NavigationAction from "components/NavigationAction";
import BackgroundLogin from "components/BackgroundLogin";
import { NewPetStackParamList } from "navigation/types";
import useModal from "hooks/useModal";
const TypePet = memo(() => {
  const { goBack, navigate } =
    useNavigation<NavigationProp<NewPetStackParamList>>();
  const { height, width, top, bottom } = useLayout();
  const theme = useTheme();
  const styles = useStyleSheet(themedStyles);
  const { t } = useTranslation(["newPet", "common"]);

  const { show, hide, modalRef } = useModal();
  const handleChoose = React.useCallback((name) => {
    navigate("BreedPet", { title: name });
  }, []);

  return (
    <Container style={styles.container}>
      <BackgroundLogin text={t("title")} title={t("petType")} />
      <TopNavigation
        accessoryLeft={<NavigationAction />}
        appearance={"control"}
      />
      <Content contentContainerStyle={{ marginTop: 140 * (height / 812) }}>
        <View style={styles.viewType}>
          {DATA_PET_TYPE.map((item, i) => {
            return (
              <View
                key={i}
                style={[styles.button, { width: 150 * (width / 375) }]}
              >
                {item.other ? (
                  <TouchableOpacity activeOpacity={0.7} onPress={show}>
                    <Image
                      source={Images.other}
                      /* @ts-ignore */
                      style={styles.img}
                    />
                    <Text center marginTop={16}>
                      {t("other")}
                    </Text>
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={() => handleChoose(item.name)}
                  >
                    <Image
                      source={item.img}
                      /* @ts-ignore */
                      style={styles.img}
                    />
                    <Text center marginTop={16}>
                      {item.name}
                    </Text>
                  </TouchableOpacity>
                )}
              </View>
            );
          })}
        </View>
      </Content>
      <Modal
        ref={modalRef}
        onBackdropPress={hide}
        backdropStyle={{ backgroundColor: "#000", opacity: 0.8 }}
      >
        <Layout
          style={{ flex: 1, padding: 24, borderRadius: 20, width: width - 64 }}
        >
          <Text center category="b1" marginBottom={32}>
            {t("otherPetType")}
          </Text>
          <Input style={styles.input} autoFocus />
          <Button
            children={t("common:ok").toString()}
            status="basic"
            onPress={hide}
          />
        </Layout>
      </Modal>
    </Container>
  );
});

export default TypePet;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
  },
  viewType: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginHorizontal: 36,
  },
  img: {
    width: 96,
    height: 96,
  },
  button: {
    alignItems: "center",
    marginBottom: 32,
  },
  input: {
    marginBottom: 32,
  },
});
const DATA_PET_TYPE = [
  {
    id: 0,
    img: Images.dog,
    name: "Dog",
  },
  {
    id: 1,
    img: Images.cat,
    name: "Cat",
  },
  {
    id: 2,
    img: Images.rabbit,
    name: "Rabbit",
  },
  {
    id: 3,
    img: Images.bird,
    name: "Bird",
  },
  {
    id: 4,
    img: Images.hamster,
    name: "Hamster",
  },
  {
    other: true,
  },
];
