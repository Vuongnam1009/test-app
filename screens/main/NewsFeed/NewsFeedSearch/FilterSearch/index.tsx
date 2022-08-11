import React, { memo } from "react";
import { TouchableOpacity, View } from "react-native";
import {
  TopNavigation,
  useTheme,
  StyleService,
  useStyleSheet,
  Input,
  Button,
} from "@ui-kitten/components";

import Text from "components/Text";
import Content from "components/Content";
import Container from "components/Container";
import NavigationAction from "components/NavigationAction";
import { useTranslation } from "react-i18next";
import PetTypeFilter from "./PetTypeFilter";
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
} from "react-native-reanimated";
import { Controller, useForm } from "react-hook-form";
import ChooseGenderPet from "./ChooseGenderPet";
import useToggle from "hooks/useToggle";
import { RuleName } from "utils/rules";

const FilterSearch = memo(() => {
  const theme = useTheme();
  const styles = useStyleSheet(themedStyles);
  const { t } = useTranslation(["filter", "common"]);

  const [breed, setBreed] = React.useState<
    "dog" | "cat" | "rabbit" | "bird" | "hamster" | "other"
  >("dog");
  const [genderPet, setGenderPet] = React.useState<
    "male" | "female" | "neutered?" | "spayed?"
  >("male");

  const [adopt, setAdopt] = useToggle(false);

  const progress = useSharedValue(1);
  const {
    control,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm({
    defaultValues: {
      breed: "",
    },
  });
  React.useEffect(() => {
    if (getValues("breed") !== "") {
      progress.value = 0;
    } else {
      progress.value = 1;
    }
  }, [getValues("breed"), progress.value]);

  const animatedStyle = useAnimatedStyle(() => {
    let input = [0, 1];
    const translateY = interpolate(
      progress.value,
      input,
      [6, 16],
      Extrapolate.CLAMP
    );
    const translateX = interpolate(
      progress.value,
      [0, 1],
      [-4, 0],
      Extrapolate.CLAMP
    );
    const scale = interpolate(
      progress.value,
      [0, 1],
      [0.85, 1],
      Extrapolate.CLAMP
    );
    return {
      position: "absolute",
      zIndex: 10,
      left: 16 + 24,
      transform: [{ translateY }, { scale }, { translateX }],
      backgroundColor: "transparent",
    };
  });

  const _onClear = React.useCallback(() => {
    setBreed("dog");
    setAdopt();
    setGenderPet("male");
  }, []);

  return (
    <Container style={styles.container}>
      <TopNavigation
        accessoryLeft={<NavigationAction icon="close" />}
        title={() => <Text category="b1">{t("title")}</Text>}
        accessoryRight={
          <Text marginRight={8} status={"info"} onPress={_onClear}>
            {t("common:clear")}
          </Text>
        }
      />
      <Content>
        <PetTypeFilter activeTag={breed} setActiveTag={setBreed} />
        <View>
          <Animated.View style={animatedStyle}>
            <Text category={"b2-s"} status="placeholder" capitalize>
              {breed} Breeds
            </Text>
          </Animated.View>
          <Controller
            rules={RuleName}
            name="breed"
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                status={errors.breed ? "warning" : "basic"}
                onChangeText={onChange}
                onChange={onChange}
                value={value}
                onBlur={onBlur}
                autoFocus
                size="medium"
                onTouchStart={handleSubmit(() => {})}
                onTouchEnd={handleSubmit(() => {})}
                keyboardType="email-address"
                caption={errors.breed?.message}
                style={styles.inputBox}
                textStyle={{
                  paddingTop: getValues("breed") === "" ? 0 : 16,
                }}
              />
            )}
          />
        </View>
        <ChooseGenderPet genderPet={genderPet} setGenderPet={setGenderPet} />
        <Text category="h4" marginLeft={24} marginBottom={16}>
          {t("other")}
        </Text>

        <TouchableOpacity
          onPress={setAdopt}
          style={[
            styles.adopt,
            {
              backgroundColor: adopt
                ? theme["text-danger-color"]
                : "transparent",
            },
          ]}
        >
          <Text category="c3" status={adopt ? "primary" : "placeholder"}>
            {t("petAdopt")}
          </Text>
        </TouchableOpacity>
      </Content>
      <Button
        children={t("buttonFilter").toUpperCase()}
        size={"large"}
        status={"danger"}
        style={styles.btnFilter}
      />
    </Container>
  );
});

export default FilterSearch;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
  },
  inputBox: {
    marginHorizontal: 24,
    marginBottom: 40,
  },
  adopt: {
    borderRadius: 99,
    paddingVertical: 9,
    paddingHorizontal: 22,
    maxWidth: 107,
    marginLeft: 24,
  },
  btnFilter: {
    marginHorizontal: 24,
    marginBottom: 8,
  },
});
