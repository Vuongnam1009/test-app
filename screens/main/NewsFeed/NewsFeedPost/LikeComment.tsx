import React, { memo } from "react";
import { View, TouchableOpacity } from "react-native";
import {
  useTheme,
  StyleService,
  useStyleSheet,
  Icon,
} from "@ui-kitten/components";
import { globalStyle } from "styles/globalStyle";

import Text from "components/Text";
import { convertNumber } from "utils/convertNumber";
import useToggle from "hooks/useToggle";

interface PostProps {
  likeNumber: number;
  commentNumber: number;
  onPressComment?(): void;
}

const LikeComment = memo(
  ({ likeNumber, commentNumber, onPressComment }: PostProps) => {
    const [liked, setLiked] = useToggle(false);
    const [bookmark, setBookMark] = useToggle(false);
    const theme = useTheme();
    const styles = useStyleSheet(themedStyles);

    return (
      <View style={styles.container}>
        <View style={globalStyle.flexDirection}>
          <TouchableOpacity
            style={styles.likeNumber}
            activeOpacity={0.7}
            onPress={setLiked}
          >
            {liked ? (
              <Icon pack="assets" name="loveActive" />
            ) : (
              <Icon pack="assets" name="love" />
            )}
            <Text marginLeft={8} center category="c4">
              {convertNumber(likeNumber)}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.7}
            style={styles.commentNumber}
            onPress={onPressComment}
          >
            <Icon pack="assets" name="comment" />
            <Text marginLeft={8} center category="c4">
              {convertNumber(commentNumber)}
            </Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity activeOpacity={0.7} onPress={setBookMark}>
          {bookmark ? (
            <Icon pack="assets" name="bookmark" />
          ) : (
            <Icon pack="assets" name="bookmarkActive" />
          )}
        </TouchableOpacity>
      </View>
    );
  }
);

export default LikeComment;

const themedStyles = StyleService.create({
  container: {
    flexDirection: "row",
    marginVertical: 8,
    marginHorizontal: 16,
    justifyContent: "space-between",
  },
  likeNumber: {
    flexDirection: "row",
    alignItems: "center",
  },
  commentNumber: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 40,
  },
});
