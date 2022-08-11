import React from "react";
import { TouchableOpacity, View, ViewStyle } from "react-native";
import {
  useTheme,
  Layout,
  StyleService,
  useStyleSheet,
} from "@ui-kitten/components";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

import Text from "components/Text";

interface TabProps {
  id: number;
  tab: string;
  notRead: number;
}

interface Props {
  tabs: TabProps[];
  style?: ViewStyle;
  selectedIndex: number;
  onChange(index: number): void;
}

const TabBar = ({ style, selectedIndex, onChange, tabs }: Props) => {
  const theme = useTheme();
  const transX = useSharedValue(0);
  const styles = useStyleSheet(themedStyles);

  const [widthItem, setWidthItem] = React.useState(0);

  React.useEffect(() => {
    transX.value = widthItem * selectedIndex;
  }, [selectedIndex, transX, widthItem]);

  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: withSpring(transX.value, {
            stiffness: 200,
            damping: 15,
          }),
        },
      ],
      backgroundColor: theme["color-red-100"],
    };
  });
  return (
    <Layout style={[styles.container, style]}>
      {tabs.map((item, index) => {
        return (
          <TouchableOpacity
            style={styles.btn}
            key={index}
            activeOpacity={0.7}
            onPress={() => onChange(index)}
          >
            <View>
              <Text
                uppercase
                category="b3"
                marginTop={4}
                style={{
                  color:
                    selectedIndex === index
                      ? theme["color-red-100"]
                      : theme["color-primary-200"],
                }}
              >
                {item.tab}
              </Text>
              {item.notRead != 0 ? (
                <View style={styles.notReadView}>
                  <Text center category="c4" status={"primary"}>
                    {item.notRead}
                  </Text>
                </View>
              ) : null}
            </View>
          </TouchableOpacity>
        );
      })}
      <Animated.View
        style={[
          styles.boxAni,
          animatedStyles,
          { width: `${100 / tabs.length}%` },
        ]}
        onLayout={({ nativeEvent }) => setWidthItem(nativeEvent.layout.width)}
      />
    </Layout>
  );
};

export default TabBar;

const themedStyles = StyleService.create({
  container: {
    height: 44,
    flexDirection: "row",
    overflow: "hidden",
    alignSelf: "center",
    borderBottomWidth: 1,
    borderBottomColor: "color-basic-200",
  },
  boxAni: {
    height: 2,
    position: "absolute",
    borderRadius: 20,
    bottom: 0,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  btn: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  notReadView: {
    borderRadius: 99,
    width: 16,
    height: 16,
    backgroundColor: "text-danger-color",
    position: "absolute",
    top: -6,
    right: -14,
  },
});
