import React, { memo } from "react";
import {
  TopNavigation,
  StyleService,
  useStyleSheet,
  Icon,
  Layout,
  ViewPager,
} from "@ui-kitten/components";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import useLayout from "hooks/useLayout";

import Text from "components/Text";
import Container from "components/Container";
import NavigationAction from "components/NavigationAction";
import { useTranslation } from "react-i18next";
import * as MediaLibrary from "expo-media-library";

import { NewPostStackParamList } from "navigation/types";
import SkeletonNewPost from "./SkeletonNewPost";
import MediaTab from "./MediaTab";
import { Images } from "assets/images";
import { Asset } from "expo-media-library";
import PhotoTab from "./PhotoTab";
import { globalStyle } from "styles/globalStyle";

const NewPost = memo(() => {
  const { navigate } = useNavigation<NavigationProp<NewPostStackParamList>>();
  const { height, width, top, bottom } = useLayout();
  const styles = useStyleSheet(themedStyles);
  const { t } = useTranslation(["createPost", "common"]);

  const [isLoading, setIsLoading] = React.useState(true);
  const [choosePhoto, setChoosePhoto] = React.useState<any>();
  const [activeTab, setActiveTab] = React.useState(0);
  const [allPhoto, setAllPhoto] = React.useState<Asset[]>([]);

  const _getPhoto = async () => {
    let { status } = await MediaLibrary.requestPermissionsAsync();
    let media = await MediaLibrary.getAssetsAsync({
      mediaType: ["photo"],
    });
    let album = "Camera";
    let getAlbum = await MediaLibrary.getAlbumAsync(album);
    const getAllPhoto = await MediaLibrary.getAssetsAsync({
      first: 20,
      album: getAlbum,
      sortBy: ["creationTime"],
      mediaType: ["photo"],
    });
    setAllPhoto(getAllPhoto.assets);
    let photo = await MediaLibrary.getAssetInfoAsync(media.assets[0]);
    setChoosePhoto(photo.uri);
  };
  React.useEffect(() => {
    if (isLoading) {
      setTimeout(() => {
        setIsLoading(false);
      }, 3000);
      setTimeout(() => {
        _getPhoto();
      }, 2000);
      clearTimeout();
    } else {
    }
  }, [setIsLoading, isLoading]);

  const _onNext = React.useCallback(() => {
    navigate("ChooseEffect", { photo: choosePhoto });
  }, [choosePhoto]);
  return (
    <Container style={styles.container}>
      <TopNavigation
        accessoryLeft={<NavigationAction icon="close" />}
        title={() => (
          <Text category="b1">
            {t("cameraRoll")}
            <Icon pack="assets" name="arrDown" style={styles.dropDown} />
          </Text>
        )}
        accessoryRight={
          <Text status={"info"} marginRight={4} onPress={_onNext}>
            {t("common:next")}
          </Text>
        }
      />

      {isLoading ? (
        <SkeletonNewPost />
      ) : (
        <ViewPager
          selectedIndex={activeTab}
          onSelect={setActiveTab}
          style={globalStyle.flexOne}
        >
          <PhotoTab
            photo={choosePhoto}
            setPhoto={setChoosePhoto}
            listImg={allPhoto}
          />
          <PhotoTab
            photo={choosePhoto}
            setPhoto={setChoosePhoto}
            listImg={allPhoto}
          />
          <PhotoTab
            photo={choosePhoto}
            setPhoto={setChoosePhoto}
            listImg={allPhoto}
          />
        </ViewPager>
      )}
      <Layout style={{ paddingBottom: bottom + 16 }}>
        <MediaTab
          tabs={mediaTab}
          selectedIndex={activeTab}
          onChange={setActiveTab}
        />
      </Layout>
    </Container>
  );
});

export default NewPost;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
    paddingBottom: 0,
  },
  dropDown: {
    width: 16,
    height: 16,
  },
});
const mediaTab = [
  { id: 0, tab: "library", notRead: 0 },
  { id: 1, tab: "photos", notRead: 0 },
  { id: 2, tab: "video", notRead: 0 },
];
const DATA_PHOTO = [
  Images.recent1,
  Images.recent2,
  ,
  Images.recent3,
  ,
  Images.recent4,
  ,
  Images.recent5,
  ,
  Images.recent6,
  ,
  Images.recent7,
  ,
  Images.recent8,
  ,
  Images.recent9,
];
