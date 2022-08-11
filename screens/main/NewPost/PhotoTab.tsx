import React, { memo } from "react";
import { View, Image, TouchableOpacity } from "react-native";
import {
  TopNavigation,
  useTheme,
  StyleService,
  useStyleSheet,
  Icon,
} from "@ui-kitten/components";
import { useNavigation } from "@react-navigation/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import useLayout from "hooks/useLayout";
import { globalStyle } from "styles/globalStyle";

import Text from "components/Text";
import Content from "components/Content";
import Container from "components/Container";
import { Asset } from "expo-media-library";

interface Props {
  photo: string;
  setPhoto: React.Dispatch<React.SetStateAction<string>>;
  listImg: Asset[];
}
interface PlButtonProps {
  _onPress?(): void;
  icon: string;
}

const PhotoTab = memo(({ photo, listImg, setPhoto }: Props) => {
  const { goBack } = useNavigation();
  const { height, width, top, bottom } = useLayout();
  const theme = useTheme();
  const heightImg = 340 * (height / 812) - 1;
  const smallImg = 93 * (width / 375) - 1;
  const styles = useStyleSheet(themedStyles);

  const PlButton = React.useCallback(({ _onPress, icon }: PlButtonProps) => {
    return (
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={_onPress}
        style={styles.plButton}
      >
        <Icon pack="assets" name={icon} style={globalStyle.icon16} />
      </TouchableOpacity>
    );
  }, []);
  return (
    <Content>
      <View>
        <Image
          source={{ uri: photo }}
          style={{ width: width, height: heightImg }}
        />
        <View style={styles.viewBtn}>
          <PlButton icon="zoomIn" />
          <PlButton icon="makeGrid" />
          <PlButton icon="multiSelect" />
        </View>
      </View>
      <View style={styles.viewPhoto}>
        {listImg.map((item, i) => {
          return (
            <TouchableOpacity key={i} onPress={() => setPhoto(item.uri)}>
              <Image
                source={{ uri: item.uri }}
                style={{
                  width: smallImg,
                  height: smallImg,
                  marginRight: 1,
                  marginBottom: 1,
                }}
              />
            </TouchableOpacity>
          );
        })}
      </View>
    </Content>
  );
});

export default PhotoTab;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
  },
  viewPhoto: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 1,
    marginLeft: 1,
  },
  plButton: {
    width: 36,
    height: 36,
    backgroundColor: "rgba(29, 30, 44, 0.7)",
    borderRadius: 99,
    ...globalStyle.center,
    marginLeft: 20,
  },
  viewBtn: {
    flexDirection: "row",
    position: "absolute",
    bottom: 12,
    right: 16,
  },
});
