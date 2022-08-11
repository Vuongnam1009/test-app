import React, { memo } from "react";
import { View, TouchableOpacity } from "react-native";
import {
  StyleService,
  useStyleSheet,
  Icon,
  Avatar,
  Layout,
} from "@ui-kitten/components";
import { DrawerActions, useNavigation } from "@react-navigation/native";
import useLayout from "hooks/useLayout";
import { globalStyle } from "styles/globalStyle";

import Text from "components/Text";
import NavigationAction from "components/NavigationAction";
import Animated, {
  Easing,
  interpolate,
  useAnimatedStyle,
  useDerivedValue,
  withTiming,
} from "react-native-reanimated";
import useAppTheme from "hooks/useAppTheme";
import useToggle from "hooks/useToggle";
import { PetProps } from "components/TrackingPetModal";
import { isEmpty } from "lodash";
import { Images } from "assets/images";
import { useTranslation } from "react-i18next";

interface Props {
  _onReload?(): void;
  dataPet: PetProps[];
  petTracking?: PetProps;
  setPetTracking: React.Dispatch<React.SetStateAction<PetProps>>;
  onPressAddPet?(): void;
}

const DropdownPet = memo(
  ({
    _onReload,
    dataPet,
    petTracking,
    setPetTracking,
    onPressAddPet,
  }: Props) => {
    const { height, width, top } = useLayout();
    const styles = useStyleSheet(themedStyles);
    const navigation = useNavigation();
    const { theme } = useAppTheme();
    const { t } = useTranslation(["activity", "common"]);

    const [isShow, setIsShow] = useToggle(false);
    const translateX = useDerivedValue(() => {
      return isShow ? 0 : 1;
    }, [isShow]);

    const style = useAnimatedStyle(() => {
      const down = interpolate(translateX.value, [0, 1], [0, top]);
      return {
        position: "absolute",
        left: 0,
        top: top + 12,
        height: height,
        transform: [
          {
            translateY: withTiming(down, {
              duration: 250,
              easing: Easing.linear,
            }),
          },
        ],
        backgroundColor:
          theme === "light" ? "rgba(30, 31, 32, 0.86)" : "rgba(0, 0, 0, 0.86)",
      };
    });
    const rotateZ = useDerivedValue(() => {
      return withTiming(translateX.value ? 0 : -180, {
        duration: 250,
        easing: Easing.linear,
      });
    });

    const styleDrop = useAnimatedStyle(() => {
      return {
        transform: [
          { rotateZ: `${rotateZ.value}deg` },
          { rotateY: `${rotateZ.value}deg` },
        ],
      };
    });
    const _onPressPet = React.useCallback((item: PetProps) => {
      setPetTracking(item);
      setIsShow();
    }, []);
    return (
      <View style={[styles.container, { top: top }]}>
        <View style={styles.top}>
          <NavigationAction
            icon="menu"
            onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
          />
          <TouchableOpacity
            onPress={setIsShow}
            activeOpacity={1}
            style={[globalStyle.flexDirection, globalStyle.itemsCenter]}
          >
            <Avatar source={petTracking?.avatar} size={"tiny"} />
            <Text center capitalize marginLeft={8}>
              {petTracking?.name}
            </Text>
            <Animated.View style={styleDrop}>
              <Icon pack="assets" name="arrDown" style={styles.dropDown} />
            </Animated.View>
          </TouchableOpacity>
          <NavigationAction icon="refresh" onPress={_onReload} />
        </View>
        {isShow ? (
          <Animated.View style={style}>
            <Layout level={"1"} style={{ width: width, flexDirection: "row" }}>
              {isEmpty(dataPet) ? (
                <View>
                  <Text center uppercase marginVertical={24}>
                    {t("noDataPet")}
                  </Text>
                </View>
              ) : (
                <View style={styles.petView}>
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
                        <Avatar size={"huge"} source={avatar} />
                        <Text center capitalize marginTop={8}>
                          {name}
                        </Text>
                      </TouchableOpacity>
                    );
                  })}
                </View>
              )}
              <TouchableOpacity
                style={styles.buttonAdd}
                onPress={onPressAddPet}
              >
                <Avatar source={Images.addPet} size={"huge"} />
                <Text status={"info"} center marginTop={8}>
                  {t("addPet")}
                </Text>
              </TouchableOpacity>
            </Layout>
            <TouchableOpacity style={globalStyle.flexOne} onPress={setIsShow} />
          </Animated.View>
        ) : null}
      </View>
    );
  }
);

export default DropdownPet;

const themedStyles = StyleService.create({
  container: {
    paddingTop: 10,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    left: 0,
    right: 0,
    zIndex: 100,
    paddingHorizontal: 12,
    backgroundColor: "background-basic-color-1",
  },
  top: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  petView: {
    flexDirection: "row",
    paddingLeft: 24,
    marginTop: 32,
  },
  dropDown: {
    width: 16,
    height: 16,
    marginLeft: 4,
  },
  itemPet: {
    marginBottom: 24,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 32,
  },
  buttonAdd: {
    alignItems: "center",
    marginTop: 32,
  },
});
