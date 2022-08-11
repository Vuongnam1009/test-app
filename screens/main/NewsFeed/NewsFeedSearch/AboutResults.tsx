import React, { memo } from "react";
import { View, ImageRequireSource, Keyboard } from "react-native";
import {
  StyleService,
  useStyleSheet,
  Avatar,
  Layout,
  Icon,
  Button,
} from "@ui-kitten/components";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import useLayout from "hooks/useLayout";
import { globalStyle } from "styles/globalStyle";

import Text from "components/Text";
import { isEmpty } from "lodash";
import LoadingIndicator from "components/LoadingIndicator";
import Content from "components/Content";
import { useTranslation } from "react-i18next";
import { ActivityStackParamList } from "navigation/types";
import { Result_Types_Enum } from "constants/Types";

export interface PetResultItem {
  id?: number;
  avatar: ImageRequireSource;
  name: string;
  typePet?: string;
  breed?: string;
  adopt?: boolean;
  type?: Result_Types_Enum;
}
interface DataResult {
  data: PetResultItem[];
  showAdopt?: boolean;
  filterBottom?: boolean;
}

const AboutResults = memo(
  ({ data, showAdopt, filterBottom = true }: DataResult) => {
    const { goBack, navigate } =
      useNavigation<NavigationProp<ActivityStackParamList>>();
    const { height, width, top, bottom } = useLayout();
    const styles = useStyleSheet(themedStyles);
    const { t } = useTranslation(["common"]);

    const [isKeyboardVisible, setKeyboardVisible] = React.useState(false);
    React.useEffect(() => {
      const keyboardDidShowListener = Keyboard.addListener(
        "keyboardDidShow",
        () => {
          setKeyboardVisible(true);
        }
      );
      const keyboardDidHideListener = Keyboard.addListener(
        "keyboardDidHide",
        () => {
          setKeyboardVisible(false);
        }
      );

      return () => {
        keyboardDidHideListener.remove();
        keyboardDidShowListener.remove();
      };
    }, []);

    const _onFilter = React.useCallback(() => {
      navigate("FilterSearch");
    }, []);
    const ItemResults = React.useCallback(
      ({ avatar, name, typePet, breed, adopt }: PetResultItem) => {
        return (
          <View style={styles.item}>
            <Avatar
              source={avatar}
              /* @ts-ignore */
              style={styles.avatar}
              size={"huge"}
            />
            <View>
              <View
                style={[
                  styles.rowAndCenter,
                  {
                    marginBottom: 5,
                  },
                ]}
              >
                <Text center marginRight={6}>
                  {name}
                </Text>
                {showAdopt && adopt ? (
                  <View style={styles.rowAndCenter}>
                    <Icon pack="assets" name="loveActive" style={styles.love} />
                    <Text status={"danger"} center category="c4">
                      Adopt
                    </Text>
                  </View>
                ) : null}
              </View>
              {typePet ? (
                <View style={globalStyle.flexDirection}>
                  {typePet ? (
                    <Text category="c4" status={"placeholder"}>
                      {typePet}
                    </Text>
                  ) : null}
                  {breed ? (
                    <View
                      style={[
                        globalStyle.flexDirection,
                        globalStyle.alignItemsCenter,
                      ]}
                    >
                      <Layout style={styles.dot} />
                      <Text category="c4" status={"placeholder"}>
                        {breed}
                      </Text>
                    </View>
                  ) : null}
                </View>
              ) : null}
            </View>
          </View>
        );
      },
      []
    );
    const [dataResult, setDataResult] = React.useState(data);

    return (
      <View style={globalStyle.flexOne}>
        <Content contentContainerStyle={styles.container}>
          {isEmpty(dataResult) ? (
            <LoadingIndicator flexOne size={"giant"} status={"danger"} />
          ) : (
            <View>
              {isEmpty(dataResult) ? (
                <LoadingIndicator />
              ) : (
                dataResult.map((item, i) => {
                  let { avatar, name, typePet, breed, adopt, type } = item;
                  return (
                    <ItemResults
                      avatar={avatar}
                      name={name}
                      typePet={typePet}
                      breed={breed}
                      adopt={adopt}
                      type={type}
                      key={i}
                      id={i}
                    />
                  );
                })
              )}
            </View>
          )}
        </Content>
        {!isKeyboardVisible && filterBottom ? (
          <Button
            children={t("filter").toString()}
            size={"small"}
            style={[styles.filter, { bottom: bottom + 16 }]}
            status={"danger"}
            accessoryRight={<Icon pack="assets" name="filter" />}
            onPress={_onFilter}
          />
        ) : null}
      </View>
    );
  }
);

export default AboutResults;

const themedStyles = StyleService.create({
  container: {
    paddingTop: 16,
    paddingHorizontal: 24,
  },
  item: {
    marginBottom: 24,
    alignItems: "center",
    flexDirection: "row",
  },
  avatar: {
    marginRight: 16,
  },
  dot: {
    width: 4,
    height: 4,
    borderRadius: 99,
    marginLeft: 12,
    marginRight: 8,
    backgroundColor: "text-placeholder-color",
    opacity: 0.5,
  },
  love: {
    tintColor: "text-danger-color",
    width: 12,
    height: 12,
    marginRight: 4,
  },
  rowAndCenter: {
    flexDirection: "row",
    alignItems: "center",
  },
  filter: {
    position: "absolute",
    alignSelf: "center",
  },
});
