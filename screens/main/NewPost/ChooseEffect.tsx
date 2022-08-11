import React, { memo } from "react";
import { View, Image, TouchableOpacity } from "react-native";
import {
  TopNavigation,
  useTheme,
  StyleService,
  useStyleSheet,
  ViewPager,
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
import { NewPostStackParamList, MediaNavigationProp } from "navigation/types";
import { useTranslation } from "react-i18next";
import { Images } from "assets/images";
import MediaTab from "./MediaTab";
const ChooseEffect = memo(() => {
  const { navigate } = useNavigation<NavigationProp<NewPostStackParamList>>();
  const { height, width, top, bottom } = useLayout();
  const theme = useTheme();
  const styles = useStyleSheet(themedStyles);
  const { t } = useTranslation(["filter", "common"]);
  const route = useRoute<MediaNavigationProp>();
  let photo = route.params.photo;

  const Filter = [
    { id: 0, title: "Normal", image: photo },
    { id: 1, title: "Vintage", image: photo },
    { id: 2, title: "Black & White", image: photo },
    { id: 3, title: "Brightness", image: photo },
  ];
  const Edit = [
    { id: 0, title: "Tune Image", image: Images.tune },
    { id: 1, title: "Crop", image: Images.crop },
    { id: 2, title: "Transform", image: Images.transform },
  ];
  const _onNext = React.useCallback(() => {
    navigate("NewMoment", { photo: photo });
  }, []);
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [effect, setEffect] = React.useState("Normal");
  return (
    <Container style={styles.container}>
      <TopNavigation
        accessoryLeft={<NavigationAction />}
        title={() => (
          <Text capitalize category="b1">
            {t("effect")}
          </Text>
        )}
        accessoryRight={
          <Text status={"info"} marginRight={4} onPress={_onNext}>
            {t("common:next")}
          </Text>
        }
      />
      <View style={globalStyle.flexOne}>
        <Image
          source={{ uri: photo }}
          style={{
            width: width,
            height: 340 * (height / 812),
          }}
        />
        <ViewPager
          selectedIndex={selectedIndex}
          onSelect={setSelectedIndex}
          swipeEnabled={false}
        >
          <Content horizontal contentContainerStyle={styles.content}>
            {Filter.map((item, i) => {
              return (
                <View key={i} style={styles.itemEffect}>
                  <Text
                    center
                    category="c4"
                    status={effect === item.title ? "danger" : "placeholder"}
                    marginBottom={8}
                  >
                    {item.title}
                  </Text>
                  <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={() => {
                      setEffect(item.title);
                    }}
                  >
                    <Image
                      source={{ uri: item.image }}
                      style={{
                        width: 104 * (width / 375),
                        height: 104 * (width / 375),
                        borderRadius: 20,
                      }}
                    />
                  </TouchableOpacity>
                </View>
              );
            })}
          </Content>
          <Content horizontal contentContainerStyle={styles.content}>
            {Edit.map((item, i) => {
              return (
                <View key={i} style={styles.itemEffect}>
                  <Text
                    center
                    category="c4"
                    status={"placeholder"}
                    marginBottom={8}
                  >
                    {item.title}
                  </Text>
                  <TouchableOpacity
                    activeOpacity={0.7}
                    style={[
                      styles.btn,
                      {
                        width: 104 * (width / 375),
                        height: 104 * (width / 375),
                      },
                    ]}
                  >
                    <Image
                      source={item.image}
                      style={{
                        width: 36 * (width / 375),
                        height: 36 * (width / 375),
                      }}
                    />
                  </TouchableOpacity>
                </View>
              );
            })}
          </Content>
        </ViewPager>
      </View>
      <MediaTab
        tabs={TABS}
        selectedIndex={selectedIndex}
        onChange={setSelectedIndex}
      />
    </Container>
  );
});

export default ChooseEffect;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
  },
  content: {
    paddingRight: 24,
  },
  itemEffect: {
    marginLeft: 24,
    marginTop: 24,
  },
  btn: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "color-basic-400",
  },
});
const TABS = [
  { id: 0, tab: "filter", notRead: 0 },
  { id: 1, tab: "edit", notRead: 0 },
];
