import React, { memo } from "react";
import { View, Image, TouchableOpacity } from "react-native";
import {
  StyleService,
  useStyleSheet,
  Icon,
  Layout,
} from "@ui-kitten/components";
import useLayout from "hooks/useLayout";
import { globalStyle } from "styles/globalStyle";

import Text from "components/Text";
import { Images } from "assets/images";
import { useTranslation } from "react-i18next";
import Animated, {
  Easing,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

interface Props {
  male: boolean;
  setMale?(): void;
}

const SelectGender = memo(({ male, setMale }: Props) => {
  const { height, width, top, bottom } = useLayout();
  const styles = useStyleSheet(themedStyles);
  const { t } = useTranslation("newPet");

  const translateX = useSharedValue(0);
  React.useEffect(() => {
    if (male) {
      translateX.value = 0;
    } else {
      translateX.value = 1;
    }
  }, [translateX, male]);
  const style = useAnimatedStyle(() => {
    const position = interpolate(
      translateX.value,
      [0, 1],
      [100 * (width / 375), 260 * (width / 375)]
    );
    return {
      marginTop: 16,
      transform: [
        {
          translateX: withTiming(position, {
            duration: 350,
            easing: Easing.linear,
          }),
        },
      ],
    };
  });

  return (
    <Layout>
      <View style={[globalStyle.flexSpaceBetween, { marginHorizontal: 64 }]}>
        <TouchableOpacity onPress={setMale}>
          {male ? (
            <Image source={Images.male} />
          ) : (
            <Image source={Images.male01} />
          )}
          <Text center marginTop={16} status={male ? "danger" : "basic"}>
            {t("male")}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={setMale}>
          {male ? (
            <Image source={Images.female} />
          ) : (
            <Image source={Images.female01} />
          )}
          <Text center marginTop={16} status={male ? "basic" : "danger"}>
            {t("female")}
          </Text>
        </TouchableOpacity>
      </View>
      <Animated.View style={style}>
        <Icon name="arr" pack="assets" style={{}} />
      </Animated.View>
    </Layout>
  );
});

export default SelectGender;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
  },
});
