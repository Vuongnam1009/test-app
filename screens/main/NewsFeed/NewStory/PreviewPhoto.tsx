import React, { memo } from "react";
import { ImageBackground, Platform } from "react-native";
import {
  TopNavigation,
  StyleService,
  useStyleSheet,
  Button,
} from "@ui-kitten/components";
import {
  useNavigation,
  useRoute,
  NavigationProp,
} from "@react-navigation/native";
import useLayout from "hooks/useLayout";
import {
  PreviewPhotoNavigationProp,
  RootStackParamList,
} from "navigation/types";
import NavigationAction from "components/NavigationAction";
import { useTranslation } from "react-i18next";

const PreviewPhoto = memo(() => {
  const { navigate } = useNavigation<NavigationProp<RootStackParamList>>();
  const { height, width, top, bottom } = useLayout();
  const styles = useStyleSheet(themedStyles);
  const { t } = useTranslation(["camera", "common"]);

  const route = useRoute<PreviewPhotoNavigationProp>();
  const _handlePost = React.useCallback(() => {
    navigate("DrawerNavigator");
  }, []);
  return (
    <ImageBackground
      source={{ uri: route.params.photo }}
      style={{
        width: width,
        height: Platform.OS === "ios" ? height : height + top,
      }}
    >
      <TopNavigation
        appearance="control"
        style={{ marginTop: top }}
        accessoryLeft={<NavigationAction status="transparent" />}
      />
      <Button
        children={t("post").toString().toUpperCase()}
        style={[styles.post, { bottom: bottom + 32 }]}
        onPress={_handlePost}
      />
    </ImageBackground>
  );
});

export default PreviewPhoto;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
    backgroundColor: "transparent",
  },
  post: {
    width: 120,
    height: 56,
    position: "absolute",
    right: 32,
  },
});
