import React, { memo } from "react";
import { View, TouchableOpacity } from "react-native";
import {
  useTheme,
  StyleService,
  useStyleSheet,
  Input,
  Icon,
  Button,
} from "@ui-kitten/components";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import useLayout from "hooks/useLayout";
import { globalStyle } from "styles/globalStyle";

import Text from "components/Text";
import Content from "components/Content";
import Container from "components/Container";
import { useTranslation } from "react-i18next";
import { Controller, useForm } from "react-hook-form";
import HospitalResult, { HospitalProps } from "../Component/HospitalResult";
import ModalConfirm from "components/ModalConfirm";
import useModal from "hooks/useModal";
import { RootStackParamList } from "navigation/types";

const MedicalSearch = memo(() => {
  const { goBack, navigate } =
    useNavigation<NavigationProp<RootStackParamList>>();
  const { bottom } = useLayout();
  const theme = useTheme();
  const styles = useStyleSheet(themedStyles);
  const { t } = useTranslation(["medical", "common"]);

  const { modalRef, hide, show } = useModal();
  const [showClear, setShowClear] = React.useState(false);
  const [list, setList] = React.useState(DATA_HOSPITAL);
  const [listSelected, setListSelected] = React.useState<Array<HospitalProps>>(
    []
  );

  const {
    control,
    handleSubmit,
    getValues,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      search: "",
    },
  });

  React.useEffect(() => {
    if (getValues("search") === "") {
      setShowClear(false);
    } else {
      setShowClear(true);
    }
  }, [getValues("search")]);
  const _onClear = React.useCallback(() => {
    reset();
  }, []);

  const _addItem = React.useCallback((item: HospitalProps) => {
    setListSelected((prev) => {
      let arr = [...prev];
      arr.push(item);
      return arr;
    });
  }, []);

  const _removeItem = React.useCallback(
    (item: HospitalProps) => {
      const arr = listSelected.filter((i) => i.id !== item.id);
      setListSelected(arr);
    },
    [listSelected]
  );
  React.useEffect(() => {
    console.log(listSelected.length);
  }, [listSelected]);

  const _onDone = () => {
    navigate("VetStackNavigator", { screen: "RequestMedicalInfo" });
  };
  const _onCancel = () => {
    show();
  };
  return (
    <Container style={styles.container}>
      <View style={styles.header}>
        <Controller
          name="search"
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              style={styles.searchBar}
              status={errors.search ? "warning" : "transparent"}
              onChangeText={onChange}
              onChange={() => setShowClear(true)}
              value={value}
              onBlur={onBlur}
              autoFocus
              size="small"
              onTouchStart={handleSubmit(() => {})}
              onTouchEnd={handleSubmit(() => {})}
              keyboardType="email-address"
              caption={errors.search?.message}
              accessoryLeft={<Icon pack="assets" name="search" />}
              accessoryRight={(props) => {
                return (
                  <View>
                    {showClear ? (
                      <TouchableOpacity onPress={_onClear}>
                        <Icon
                          pack="assets"
                          name="close"
                          style={globalStyle.icon16}
                        />
                      </TouchableOpacity>
                    ) : null}
                  </View>
                );
              }}
            />
          )}
        />
        <Text marginLeft={12} onPress={_onCancel}>
          {t("common:cancel")}
        </Text>
      </View>
      <Content contentContainerStyle={styles.content} level="1">
        <Text uppercase category="c4" marginBottom={16} marginLeft={24}>
          {list.length} {t("results")}
        </Text>
        {list.map((item, i) => {
          return (
            <TouchableOpacity key={i}>
              <HospitalResult
                item={item}
                onPress={() => {
                  const result = listSelected.find(({ id }) => id === item.id);
                  if (result === undefined) {
                    _addItem(item);
                  } else {
                    _removeItem(item);
                  }
                }}
              />
            </TouchableOpacity>
          );
        })}
      </Content>
      <View style={[styles.viewBottom, { bottom: bottom + 8 }]}>
        {listSelected.length > 0 ? (
          <View style={styles.selected}>
            <Text category="c4" status={"primary"}>
              {listSelected.length} selected
            </Text>
          </View>
        ) : null}
        <Button
          children={t("common:done").toUpperCase()}
          status={"basic"}
          style={[styles.btnDone]}
          onPress={_onDone}
        />
      </View>
      <ModalConfirm
        ref={modalRef}
        buttonAbove={{ title: "Nevermind", onPress: hide }}
        buttonBelow={{
          title: <Text underline>Yes, Cancel</Text>,
          status: "transparent",
          onPress: goBack,
        }}
        title="Are you sure?"
        description={
          "Are you sure you want to cancel getting Sammy’s medical records for free?"
        }
      />
    </Container>
  );
});

export default MedicalSearch;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
    paddingBottom: 0,
  },
  header: {
    marginTop: 8,
    ...globalStyle.flexSpaceBetween,
    marginHorizontal: 24,
    alignItems: "center",
  },
  searchBar: {
    flex: 1,
  },
  content: {
    marginTop: 32,
    paddingBottom: 150,
  },
  viewBottom: {
    position: "absolute",
    left: 0,
    right: 0,
  },
  btnDone: {
    flex: 1,
    marginHorizontal: 24,
  },
  selected: {
    paddingVertical: 4,
    paddingHorizontal: 16,
    backgroundColor: "color-green-400",
    alignSelf: "center",
    justifyContent: "center",
    borderRadius: 99,
    marginBottom: 16,
  },
});
const DATA_HOSPITAL = [
  {
    id: 0,
    title: "Banfield Pet Hospital",
    location: "632 Broadway, New York, NY 10012",
    phone: 8083553305,
  },
  {
    id: 1,
    title: "Uptown Veterinary Associates",
    location: "510 E 62nd St, New York, NY 10065",
    phone: 5878414264,
  },
  {
    id: 2,
    title: "NYC Veterinary Specialists",
    location: "321 E 52nd St, New York, NY 10022",
    phone: 1284447066,
  },
  {
    id: 3,
    title: "New York Veterinary Hospital",
    location: "163 Avenue C, New York, NY 10009",
    phone: 4208928884,
  },
  {
    id: 4,
    title: "The Animal Medical Center",
    location: "240 E 80th St, New York, NY 10075",
    phone: 4208928884,
  },
  {
    id: 5,
    title: "Brooklyn Veterinary Associates",
    location: "510 E 62nd St, New York, NY 10065",
    phone: 5878414264,
  },
];
