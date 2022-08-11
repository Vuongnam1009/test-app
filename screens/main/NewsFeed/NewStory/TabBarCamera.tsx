import React from "react";
import {
  ScrollView,
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
} from "react-native";
import { Icon, useTheme } from "@ui-kitten/components";
import Animated from "react-native-reanimated";

import Text from "components/Text";
import useLayout from "hooks/useLayout";
import { globalStyle } from "styles/globalStyle";
import { isEmpty } from "lodash";

interface Props {
  id: number | string;
  property: string;
}
interface TabBarProps {
  tabs?: Props[];
  level?: string;
  style?: StyleProp<ViewStyle>;
  styleBtn?: StyleProp<ViewStyle>;
  activeIndex: number;
  onChange(index: number): void;
}

const TabBar = ({
  style,
  activeIndex,
  onChange,
  tabs = [],
  styleBtn,
}: TabBarProps) => {
  const { width } = useLayout();
  const changeIndex = React.useCallback(
    (i: number) => {
      return onChange(i);
    },
    [activeIndex]
  );
  const refScrollView = React.useRef<ScrollView>(null);
  React.useEffect(() => {
    refScrollView.current?.scrollTo({
      x: activeIndex * 100 + 8 - (width - 90) / 2,
      animated: true,
    });
  }, [activeIndex, refScrollView.current]);

  return (
    <ScrollView
      horizontal
      ref={refScrollView}
      scrollEventThrottle={16}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={[
        styles.container,
        style,
        { width: tabs.length * 90 },
      ]}
    >
      {isEmpty(tabs)
        ? null
        : tabs.map((item, i) => {
            return (
              <TouchableOpacity
                onLayout={(event) => event.nativeEvent.layout.width}
                key={i}
                style={[styles.btn, styleBtn]}
                onPress={() => changeIndex(i)}
                activeOpacity={0.7}
              >
                <Text
                  uppercase
                  category="c4"
                  center
                  status={activeIndex === i ? "danger" : "primary"}
                >
                  {item.property}
                </Text>
              </TouchableOpacity>
            );
          })}
    </ScrollView>
  );
};

export default TabBar;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginLeft: 37,
  },
  btn: {
    marginRight: 32,
  },
});
