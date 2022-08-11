import React, { memo } from "react";
import { View, Image, ImageRequireSource } from "react-native";
import { StyleService, useStyleSheet } from "@ui-kitten/components";
import useLayout from "hooks/useLayout";

import { isEmpty } from "lodash";
import LoadingIndicator from "components/LoadingIndicator";
import AnimatedAppearance from "components/AnimatedAppearance";

interface Props {
  data: ImageRequireSource[];
}
const TabPhoto = memo(({ data }: Props) => {
  const { height, width, top, bottom } = useLayout();
  const styles = useStyleSheet(themedStyles);
  const sizeImage = (width - 1) / 3;
  return (
    <AnimatedAppearance>
      <View style={styles.container}>
        {isEmpty(data) ? (
          <LoadingIndicator size={"giant"} />
        ) : (
          <View style={styles.content}>
            {data.map((item, i) => {
              return (
                <Image
                  source={item}
                  key={i}
                  style={{
                    width: sizeImage,
                    height: sizeImage,
                    marginRight: 1,
                    marginBottom: 1,
                  }}
                />
              );
            })}
          </View>
        )}
      </View>
    </AnimatedAppearance>
  );
});

export default TabPhoto;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
  },
  content: {
    flexWrap: "wrap",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    marginRight: -2,
  },
});
