import React from "react";
import { TouchableOpacity, ViewStyle } from "react-native";
import {
  useTheme,
  Layout,
  StyleService,
  useStyleSheet,
  Icon,
} from "@ui-kitten/components";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

import Text from "components/Text";
import { globalStyle } from "styles/globalStyle";

interface Props {
  tabs: string[];
  style?: ViewStyle;
  selectedIndex: number;
  onChange(index: number): void;
  useIcon?: boolean;
}

const tab = ["Top", "People", "Pet", "Tags"];

const FrequencyTab = ({
  tabs = tab,
  style,
  selectedIndex,
  onChange,
  useIcon,
}: Props) => {
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
            {useIcon ? (
              <Icon
                pack="assets"
                name={item}
                style={[
                  globalStyle.icon16,
                  {
                    tintColor:
                      selectedIndex === index
                        ? theme["color-red-100"]
                        : theme["color-primary-200"],
                  },
                ]}
              />
            ) : (
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
                {item}
              </Text>
            )}
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

export default FrequencyTab;

const themedStyles = StyleService.create({
  container: {
    height: 40,
    flexDirection: "row",
    overflow: "hidden",
    alignSelf: "center",
    borderBottomWidth: 1,
    borderBottomColor: "color-basic-200",
    marginBottom: 8,
    marginTop: 24,
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
});
