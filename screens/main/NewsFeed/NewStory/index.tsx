import React, { memo } from "react";
import { View, Image, TouchableOpacity } from "react-native";
import {
  TopNavigation,
  useTheme,
  StyleService,
  useStyleSheet,
} from "@ui-kitten/components";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import useLayout from "hooks/useLayout";
import { globalStyle } from "styles/globalStyle";

import Text from "components/Text";
import Container from "components/Container";
import { Camera } from "expo-camera";
import NavigationAction from "components/NavigationAction";
import { Images } from "assets/images";
import FocusAwareStatusBar from "components/FocusAwareStatusBar";
import { t } from "i18next";
import { ActivityStackParamList } from "navigation/types";
import TabBarCamera from "./TabBarCamera";

const initialState = {
  whbalance: "auto",
  cameraType: "back",
  flash: "off",
  zoomValue: 0,
};
function reducer(state = initialState, action: { type: string; payload: any }) {
  switch (action.type) {
    case "@type/WH_BALANCE":
      return { ...state, whbalance: action.payload };
    case "@type/CAMERA_BACK":
      return { ...state, cameraType: action.payload };
    case "@type/CAMERA_FRONT":
      return { ...state, cameraType: action.payload };
    case "@type/FLASH":
      return { ...state, flash: action.payload };
    case "@type/ZOOM":
      return {
        ...state,
        zoomValue: action.payload,
      };
    default:
      return { ...state };
  }
}

const NewStory = memo(() => {
  const { navigate } = useNavigation<NavigationProp<ActivityStackParamList>>();
  const { height, width, top, bottom } = useLayout();
  const theme = useTheme();
  const styles = useStyleSheet(themedStyles);
  const HEIGHT_BOTTOM = bottom + 66 * (height / 812);

  const [state, dispatch] = React.useReducer(reducer, initialState);
  const cameraRef = React.useRef<Camera>(null);
  const [hasPermission, setHasPermission] = React.useState<boolean>(false);
  const { cameraType, whbalance, flash, zoomValue } = state;
  const [activeIndex, setActiveIndex] = React.useState(2);
  const OptionProps = [
    { id: "type", property: t("type") },
    { id: "live", property: t("live") },
    { id: "normal", property: t("normal") },
    { id: "slowMotion", property: t("slowMotion") },
    { id: "portrait", property: t("portrait") },
    { id: "more", property: t("more") },
  ];

  const _takePicture = async () => {
    if (cameraRef.current) {
      const options = { quality: 0.5, base64: true, skipProcessing: true };
      let photo = await cameraRef.current.takePictureAsync(options);
      const source = photo.uri;
      cameraRef.current.pausePreview();
      cameraRef.current.resumePreview();
      await handleSave(source);
    }
  };
  React.useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);
  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  const _handleCameraToggle = () => {
    if (cameraType === "back") {
      dispatch({
        type: "@type/CAMERA_FRONT",
        payload: "front",
      });
    } else {
      dispatch({
        type: "@type/CAMERA_BACK",
        payload: "back",
      });
    }
  };
  const _toggleFlash = () => {
    if (flash === "off") {
      dispatch({
        type: "@type/FLASH",
        payload: "torch",
      });
    } else {
      dispatch({
        type: "@type/FLASH",
        payload: "off",
      });
    }
  };
  const handleSave = async (photo: string) => {
    navigate("PreviewPhoto", { photo: photo });
  };

  return (
    <Container style={styles.container}>
      <FocusAwareStatusBar barStyle="light-content" />
      <Camera
        ref={cameraRef}
        style={[styles.camera]}
        type={cameraType}
        flashMode={flash}
        ratio={"16:9"}
      >
        <TopNavigation
          appearance="control"
          accessoryLeft={<NavigationAction status="transparent" />}
        />

        <View style={[styles.contentButton, { bottom: 28 + HEIGHT_BOTTOM }]}>
          <TouchableOpacity onPress={() => {}}>
            <Image source={Images.photosLibrary} 
             /* @ts-ignore */    
            style={styles.photoLibrary} />
          </TouchableOpacity>
          <TouchableOpacity onPress={_toggleFlash}>
            {flash === "torch" ? (
              <Image source={Images.flash} />
            ) : (
              <Image source={Images.flashOff} />
            )}
          </TouchableOpacity>
          <View style={styles.buttonTakePhotoContainer}>
            <TouchableOpacity style={styles.button} onPress={_takePicture} />
          </View>
          <TouchableOpacity onPress={_handleCameraToggle}>
            <Image source={Images.switchCamera} />
          </TouchableOpacity>
          <TouchableOpacity>
            <Image source={Images.faceEffect} />
          </TouchableOpacity>
        </View>
      </Camera>
      <View style={[styles.bottomType, { height: HEIGHT_BOTTOM }]}>
        <TabBarCamera
          activeIndex={activeIndex}
          onChange={setActiveIndex}
          tabs={OptionProps}
        />
      </View>
    </Container>
  );
});

export default NewStory;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
    backgroundColor: "color-primary-100",
    paddingBottom: 0,
  },
  camera: {
    flex: 1,
  },
  contentButton: {
    ...globalStyle.flexSpaceBetween,
    alignItems: "center",
    paddingHorizontal: 28,
    position: "absolute",
    left: 0,
    right: 0,
  },
  buttonTakePhotoContainer: {
    borderRadius: 99,
    borderWidth: 4,
    borderColor: "color-basic-100",
    width: 72,
    height: 72,
    alignItems: "center",
    padding: 4,
  },
  button: {
    backgroundColor: "color-basic-100",
    width: 56,
    height: 56,
    borderRadius: 99,
  },
  bottomType: {
    position: "absolute",
    bottom: 0,
    backgroundColor: "rgba(29, 30, 44, 0.8)",
    zIndex: 10,
  },
  photoLibrary: {
    width: 32,
    height: 32,
  },
});
