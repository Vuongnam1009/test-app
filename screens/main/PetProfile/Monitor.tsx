import React, { memo } from "react";
import { View } from "react-native";
import {
  StyleService,
  useStyleSheet,
  Button,
  Icon,
} from "@ui-kitten/components";
import { globalStyle } from "styles/globalStyle";

import Text from "components/Text";
import { useTranslation } from "react-i18next";
import { isEmpty } from "lodash";
import { TouchableOpacity } from "react-native-gesture-handler";
import ProgressBar from "components/ProgressBar";

interface Props {
  activity: number;
  rest: number;
  distance: number;
  kcal: number;
}
interface DataProps {
  data: Props;
  _onChange?(): void;
  range: string;
}

const Monitor = memo(({ data, _onChange, range }: DataProps) => {
  const styles = useStyleSheet(themedStyles);
  const { t } = useTranslation(["profile", "common"]);

  return (
    <View style={[styles.container, { marginTop: isEmpty(data) ? 48 : 40 }]}>
      <Text category="h4" capitalize marginBottom={24}>
        {t("monitorData")}
      </Text>
      {isEmpty(data) ? (
        <View>
          <Button
            children={t("addMonitor").toUpperCase()}
            status={"basic"}
            style={styles.btnAdd}
          />
        </View>
      ) : (
        <View>
          <View style={styles.content}>
            <View>
              {/* activity */}
              <View>
                <View style={globalStyle.flexDirection}>
                  <View style={globalStyle.flexDirection}>
                    <Text category="os1">
                      {Math.floor(data?.activity / 360)}
                    </Text>
                    <Text category="os2" marginTop={21}>
                      h
                    </Text>
                  </View>
                  <View style={globalStyle.flexDirection}>
                    <Text category="os1">
                      {Math.floor((data?.activity % 360) / 6)}
                    </Text>
                    <Text category="os2" marginTop={21}>
                      m
                    </Text>
                  </View>
                </View>
                <Text category="c4" status={"placeholder"}>
                  Activity
                </Text>
              </View>
              {/* Distance */}
              <View>
                <View style={globalStyle.flexDirection}>
                  <Text category="os1">{data.distance}</Text>
                  <Text category="os2" marginTop={21}>
                    km
                  </Text>
                </View>
                <Text category="c4" status={"placeholder"}>
                  Distance
                </Text>
              </View>
            </View>
            <View>
              {/* Rest */}
              <View>
                <View style={globalStyle.flexDirection}>
                  <View style={globalStyle.flexDirection}>
                    <Text category="os1">{Math.floor(data.rest / 360)}</Text>
                    <Text category="os2" marginTop={21}>
                      h
                    </Text>
                  </View>
                  <View style={globalStyle.flexDirection}>
                    <Text category="os1">
                      {Math.floor((data.rest % 360) / 6)}
                    </Text>
                    <Text category="os2" marginTop={21}>
                      m
                    </Text>
                  </View>
                </View>
                <Text category="c4" status={"placeholder"}>
                  Rest
                </Text>
              </View>
              {/* Burn */}
              <View>
                <View style={globalStyle.flexDirection}>
                  <Text category="os1">{data.kcal}</Text>
                  <Text category="os2" marginTop={21}>
                    kcal
                  </Text>
                </View>
                <Text category="c4" status={"placeholder"}>
                  Burn
                </Text>
              </View>
            </View>
          </View>
          <View style={styles.range}>
            <View style={globalStyle.flexDirection}>
              <Text category="b2-m" marginRight={6}>
                Safe range radius:
              </Text>
              <Text category="b2-m" fontFamily="Montserrat-Medium">
                {range ? range : 15}km
              </Text>
              <TouchableOpacity activeOpacity={0.7} onPress={_onChange}>
                <Text status={"info"} category="b2-m" marginLeft={9}>
                  Change
                </Text>
              </TouchableOpacity>
            </View>
            <Icon pack="assets" name="info" style={globalStyle.icon16} />
          </View>
          <View style={styles.status}>
            <Text category="b2-m">Monitor Battery Status: </Text>
            <Text category="b2-m" fontFamily="Montserrat-Medium">
              80%
            </Text>
          </View>
          <ProgressBar
            didDone={8}
            total={10}
            styleBar={styles.progressBar}
            style={styles.progressBar}
          />
        </View>
      )}
    </View>
  );
});

export default Monitor;

const themedStyles = StyleService.create({
  container: {
    marginHorizontal: 24,
    marginBottom: 48,
  },
  content: {
    marginRight: 62,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  progressBar: {
    height: 8,
  },
  btnAdd: {},
  bigOswald: {
    fontFamily: "Oswald-Regular",
    fontSize: 36,
    lineHeight: 53.35,
  },
  smallOswald: {
    fontFamily: "Oswald-Regular",
  },
  range: {
    ...globalStyle.flexSpaceBetween,
    marginTop: 36,
    alignItems: "center",
  },
  status: {
    flexDirection: "row",
    marginBottom: 16,
    marginTop: 32,
  },
});
