import React from "react";
import { View, StyleSheet } from "react-native";
import { useTheme, Modal, Input, Button } from "@ui-kitten/components";
import { useTranslation } from "react-i18next";
import useAppTheme from "hooks/useAppTheme";

import Text from "components/Text";
import useLayout from "hooks/useLayout";
import { Controller, useForm } from "react-hook-form";
import { RuleOnlyNumber } from "utils/rules";

interface WeightPetModal {
  title?: string;
  weightPet?: string;
  _onSubmit: React.Dispatch<React.SetStateAction<string>>;
}

function WeightPetModal(
  { title, weightPet, _onSubmit }: WeightPetModal,
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
  const _onPress = React.useCallback((string: string) => {
    _onSubmit(string);
  }, []);
  const {
    control,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm({
    defaultValues: {
      weight: "",
    },
  });
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
          {title ? title : "Update Current Weight"}
        </Text>
        <Controller
          name="weight"
          rules={RuleOnlyNumber}
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              onChange={onChange}
              onChangeText={onChange}
              autoFocus
              value={value}
              onBlur={onBlur}
              size="medium"
              keyboardType="numeric"
              onTouchStart={handleSubmit(() => {})}
              onTouchEnd={handleSubmit(() => {})}
              status={errors.weight ? "warning" : "basic"}
              caption={errors.weight?.message}
            />
          )}
        />
        <Button
          children="OK"
          style={styles.btnSubmit}
          status={"basic"}
          onPress={() => _onPress(getValues("weight"))}
        />
      </View>
    </Modal>
  );
}

export default React.forwardRef(WeightPetModal) as (
  props: WeightPetModal & {
    ref?: React.ForwardedRef<{ show: () => void; hide: () => void }>;
  }
) => ReturnType<typeof WeightPetModal>;

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
  btnSubmit: {
    marginTop: 32,
  },
});
