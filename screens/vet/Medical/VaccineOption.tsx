import React, { memo } from "react";
import { ViewStyle } from "react-native";
import {
  StyleService,
  useStyleSheet,
  Layout,
  Button,
} from "@ui-kitten/components";

import Text from "components/Text";
import ReadMore from "components/ReadMore";
import { t } from "i18next";

interface Props {
  description: string;
  useReadMore?: boolean;
  style?: ViewStyle;
  numberOfLines?: number;
  button: { title: string; onPress?(): void; status?: string; size?: string };
}

const VaccineOption = memo(
  ({
    style,
    description,
    button,
    numberOfLines,
    useReadMore = true,
  }: Props) => {
    const styles = useStyleSheet(themedStyles);

    return (
      <Layout style={[styles.container, style]} level={"1"}>
        <Button
          children={button.title.toUpperCase()}
          onPress={button.onPress}
          status={button.status}
          style={styles.button}
          size={button.size ? button.size : "large"}
        />
        {useReadMore ? (
          <ReadMore
            children={description}
            more={t("common:showMore")}
            less={t("common:showLess")}
            numberOfLines={4}
          />
        ) : (
          <Text category="c4" lineHeight={20}>
            {description}
          </Text>
        )}
      </Layout>
    );
  }
);

export default VaccineOption;

const themedStyles = StyleService.create({
  container: {
    padding: 24,
    borderRadius: 4,
  },
  button: {
    marginBottom: 16,
    flex: 1,
  },
});
