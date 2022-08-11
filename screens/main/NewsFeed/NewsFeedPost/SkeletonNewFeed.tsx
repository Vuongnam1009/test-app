import React, { memo } from "react";
import { View } from "react-native";
import { StyleService, useStyleSheet, Layout } from "@ui-kitten/components";
import useLayout from "hooks/useLayout";
import { globalStyle } from "styles/globalStyle";
import SkeletonItem from "components/SkeletonItem";

const SkeletonNewFeed = memo(() => {
  const { height, width, top, bottom } = useLayout();
  const styles = useStyleSheet(themedStyles);

  return (
    <Layout style={styles.container} level="1">
      <View style={styles.avatarView}>
        <SkeletonItem width={56} height={56} marginRight={24} />
        <SkeletonItem width={56} height={56} marginRight={24} />
        <SkeletonItem width={56} height={56} marginRight={24} />
        <SkeletonItem width={56} height={56} marginRight={24} />
        <SkeletonItem width={56} height={56} marginRight={24} />
        <SkeletonItem width={56} height={56} marginRight={24} />
        <SkeletonItem width={56} height={56} marginRight={24} />
      </View>
      <View style={styles.textView}>
        <SkeletonItem width={56} height={15} marginRight={24} />
        <SkeletonItem width={56} height={15} marginRight={24} />
        <SkeletonItem width={56} height={15} marginRight={24} />
        <SkeletonItem width={56} height={15} marginRight={24} />
        <SkeletonItem width={56} height={15} marginRight={24} />
        <SkeletonItem width={56} height={15} marginRight={24} />
        <SkeletonItem width={56} height={15} marginRight={24} />
      </View>
      <View style={[styles.postView, { width: width - 24 }]}>
        <View style={globalStyle.flexDirection}>
          <SkeletonItem width={32} height={32} marginRight={16} />
          <View>
            <SkeletonItem width={102} height={16} marginRight={16} />
            <SkeletonItem width={54} height={8} marginTop={8} />
          </View>
        </View>
        <SkeletonItem width={16} height={16} />
      </View>
      <View>
        <SkeletonItem
          width={width}
          height={340 * (height / 812)}
          type="square"
        />
      </View>
      <View style={[styles.bottomPost, { width: width - 24 }]}>
        <View style={[globalStyle.flexDirection, globalStyle.center]}>
          <SkeletonItem width={24} height={24} marginLeft={16} />
          <SkeletonItem width={40} height={16} marginLeft={16} />
          <SkeletonItem width={24} height={24} marginLeft={27} />
          <SkeletonItem width={40} height={16} marginLeft={16} />
        </View>
        <View>
          <SkeletonItem width={24} height={24} marginLeft={16} />
        </View>
      </View>
      <View>
        <SkeletonItem width={width - 32} height={16} marginLeft={16} />
        <SkeletonItem width={191} height={16} marginLeft={16} marginTop={4} />
        <SkeletonItem width={87} height={8} marginLeft={16} marginTop={12} />
      </View>
      <View style={[globalStyle.flexDirection]}>
        <SkeletonItem
          width={32}
          height={32}
          marginHorizontal={16}
          marginTop={12}
        />
        <View>
          <SkeletonItem width={102} height={16} marginTop={12} />
          <SkeletonItem width={54} height={8} marginTop={4} />
        </View>
      </View>
    </Layout>
  );
});

export default SkeletonNewFeed;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
    paddingTop: 12,
    paddingBottom: 8,
  },
  avatarView: {
    flexDirection: "row",
    marginLeft: 16,
  },
  textView: {
    flexDirection: "row",
    marginLeft: 16,
    marginTop: 8,
  },
  postView: {
    marginTop: 24,
    marginLeft: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 9,
  },
  bottomPost: {
    ...globalStyle.flexSpaceBetween,
    alignItems: "center",
    marginTop: 8,
    marginBottom: 12,
  },
});
