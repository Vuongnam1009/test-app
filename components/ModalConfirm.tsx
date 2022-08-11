import React from "react";
import {
  View,
  StyleSheet,
  Image,
  ImageRequireSource,
  ViewStyle,
} from "react-native";
import {
  useTheme,
  Button,
  Modal,
  Avatar,
  TextProps,
} from "@ui-kitten/components";
import { EvaStatus, RenderProp } from "@ui-kitten/components/devsupport";
import { useTranslation } from "react-i18next";
import useAppTheme from "hooks/useAppTheme";

import Text from "./Text";
import useLayout from "hooks/useLayout";
import { Images } from "assets/images";
import { globalStyle } from "styles/globalStyle";
interface ModalConfirmProps {
  title: string;
  description: any;
  image?: ImageRequireSource;
  style?: ViewStyle;
  avatar?: ImageRequireSource;
  buttonAbove?: {
    title?: string;
    onPress?: () => void;
    status?: EvaStatus;
  };
  buttonBelow?: {
    title?: any;
    onPress?: () => void;
    status?: EvaStatus;
  };
}

function ModalConfirm(
  {
    title,
    description,
    buttonAbove,
    buttonBelow,
    avatar,
    style,
    image,
  }: ModalConfirmProps,
  ref: React.ForwardedRef<{ show: () => void; hide: () => void }>
) {
  const { t } = useTranslation("common");
  const { width, height } = useLayout();
  const themes = useTheme();
  const { theme } = useAppTheme();

  const modalRef = React.useRef<Modal>(null);

  React.useImperativeHandle(ref, () => ({
    show: () => {
      modalRef.current?.show();
    },
    hide: () => {
      modalRef.current?.hide();
    },
  }));

  const hide = React.useCallback(() => {
    modalRef.current?.hide();
  }, []);

  return (
    <Modal
      ref={modalRef}
      onBackdropPress={hide}
      backdropStyle={[
        styles.container,
        {
          backgroundColor:
            theme === "light"
              ? "rgba(30, 31, 32, 0.86)"
              : "rgba(0, 0, 0, 0.86)",
        },
      ]}
    >
      <View
        style={[
          styles.modal,
          {
            backgroundColor: themes["background-basic-color-1"],
            width: width - 64,
          },
          style,
        ]}
      >
        <View style={globalStyle.itemsCenter}>
          <Text category="h3" center>
            {title}
          </Text>
          <Text marginTop={16} center category="b2-p">
            {description}
          </Text>
        </View>
        {image ? (
          <Image
            source={image}
            style={{ width: 311 * (width / 375), height: 160 * (height / 812) }}
          />
        ) : null}
        {avatar ? (
          <Avatar
            source={avatar ? avatar : Images.petAvatar}
            size={"giant"}
            style={styles.avatar}
          />
        ) : null}
        <View style={styles.buttonView}>
          <Button
            status={buttonAbove?.status || "basic"}
            size="large"
            onPress={buttonAbove?.onPress}
          >
            {buttonAbove?.title?.toUpperCase() ||
              t("cancel").toString().toUpperCase()}
          </Button>
          <Button
            size="large"
            style={styles.button}
            onPress={buttonBelow?.onPress}
            status={buttonBelow?.status || "basic"}
          >
            {buttonBelow?.title || t("remove").toString()}
          </Button>
        </View>
      </View>
    </Modal>
  );
}

export default React.forwardRef(ModalConfirm) as (
  props: ModalConfirmProps & {
    ref?: React.ForwardedRef<{ show: () => void; hide: () => void }>;
  }
) => ReturnType<typeof ModalConfirm>;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  modal: {
    flex: 1,
    borderRadius: 24,
    paddingTop: 24,
    paddingBottom: 32,
    paddingHorizontal: 24,
  },
  buttonView: {
    marginTop: 32,
  },
  button: {
    marginTop: 12,
  },
  avatar: {
    alignSelf: "center",
    marginTop: 24,
  },
});
