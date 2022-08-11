import React from "react";
import {
  View,
  StyleSheet,
  ImageRequireSource,
  TouchableOpacity,
} from "react-native";
import { useTheme, Modal, Avatar } from "@ui-kitten/components";
import { useTranslation } from "react-i18next";
import useAppTheme from "hooks/useAppTheme";

import Text from "components/Text";
import useLayout from "hooks/useLayout";
import { isEmpty } from "lodash";
import { globalStyle } from "styles/globalStyle";
import { Images } from "assets/images";

export interface PetProps {
  id: number;
  name: string;
  avatar: ImageRequireSource;
}
interface TrackingPetModal {
  title?: string;
  dataPet: Array<PetProps>;
  petTracking?: PetProps;
  setPetTracking: React.Dispatch<React.SetStateAction<PetProps>>;
  onPressAddPet?(): void;
}

function ModalConfirm(
  { title, dataPet, onPressAddPet, setPetTracking }: TrackingPetModal,
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

  const _onPressPet = React.useCallback((item: PetProps) => {
    setPetTracking(item);
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
        ]}
      >
        <Text marginBottom={32} category="h3" center>
          {title ? title : "Pet to Tracking"}
        </Text>
        {isEmpty(dataPet) ? null : (
          <View>
            {dataPet.map((item, i) => {
              let { avatar, name } = item;
              return (
                <TouchableOpacity
                  key={i}
                  style={styles.itemPet}
                  onPress={() => {
                    _onPressPet(item);
                  }}
                >
                  <Avatar size={"huge"} style={styles.avatar} source={avatar} />
                  <Text center capitalize>
                    {name}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        )}
        <TouchableOpacity
          style={[globalStyle.flexDirection, globalStyle.alignItemsCenter]}
          onPress={onPressAddPet}
        >
          <Avatar source={Images.addPet} size={"huge"} style={styles.avatar} />
          <Text status={"info"} center>
            Add Pet
          </Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
}

export default React.forwardRef(ModalConfirm) as (
  props: TrackingPetModal & {
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
    alignSelf: "center",
    paddingHorizontal: 24,
    marginHorizontal: 32,
  },
  avatar: {
    marginRight: 24,
  },
  itemPet: {
    marginBottom: 24,
    flexDirection: "row",
    alignItems: "center",
  },
});
