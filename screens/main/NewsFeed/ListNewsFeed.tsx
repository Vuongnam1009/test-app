import React, { memo } from "react";
import { View } from "react-native";
import { StyleService, useStyleSheet } from "@ui-kitten/components";
import NewsFeedPost, { NewFeedPostProps } from "./NewsFeedPost";
import { isEmpty } from "lodash";
import LoadingIndicator from "components/LoadingIndicator";
import AnimatedAppearance from "components/AnimatedAppearance";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "navigation/types";

interface Props {
  data: NewFeedPostProps[];
}

const ListNewsFeed = memo(({ data }: Props) => {
  const styles = useStyleSheet(themedStyles);
  const { navigate } = useNavigation<NavigationProp<RootStackParamList>>();
  const _onPost = () => {navigate("PostDetails")};
  return (
    <AnimatedAppearance>
      <View style={styles.container}>
        {isEmpty(data) ? (
          <LoadingIndicator flexOne size={"giant"} />
        ) : (
          data.map((item, i) => {
            return (
              <NewsFeedPost
                item={item}
                key={i}
                _onPress={_onPost}
                _onProfile={() => {
                  navigate("ProfileUser");
                }}
              />
            );
          })
        )}
      </View>
    </AnimatedAppearance>
  );
});

export default ListNewsFeed;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
  },
});
