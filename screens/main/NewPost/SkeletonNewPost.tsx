import React, { memo } from "react";
import { View } from "react-native";
import { useTheme, StyleService, useStyleSheet } from "@ui-kitten/components";
import { useNavigation } from "@react-navigation/native";
import useLayout from "hooks/useLayout";

import SkeletonItem from "components/SkeletonItem";

const SkeletonNewPost = memo(() => {
  const { goBack } = useNavigation();
  const { height, width, top, bottom } = useLayout();
  const theme = useTheme();
  const styles = useStyleSheet(themedStyles);

  const widthItem = 93 * (width / 375);
  return (
    <View style={styles.container}>
      <SkeletonItem
        width={width}
        height={340 * (height / 812)}
        marginRight={24}
        type={"square"}
      />
      <View style={styles.item}>
        {IMG.map((item, i) => {
          return (
            <SkeletonItem
              width={widthItem}
              height={widthItem}
              type={"square"}
              key={i}
              marginBottom={1}
            />
          );
        })}
      </View>
    </View>
  );
});

export default SkeletonNewPost;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
  },
  item: {
    flexWrap: "wrap",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 1,
  },
});
const IMG = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
];
