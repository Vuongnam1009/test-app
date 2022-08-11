import React, { memo } from "react";
import { View, ImageRequireSource, TouchableOpacity } from "react-native";
import {
  useTheme,
  StyleService,
  useStyleSheet,
  Avatar,
  Icon,
} from "@ui-kitten/components";
import { useNavigation } from "@react-navigation/native";
import useLayout from "hooks/useLayout";
import { globalStyle } from "styles/globalStyle";

import Text from "components/Text";
import { useTranslation } from "react-i18next";
import useToggle from "hooks/useToggle";

interface ReplyProps {
  id: number;
  name: string;
  avatar: ImageRequireSource;
  comment: string;
  timePost: string;
  isLike: boolean;
  numberLike: number;
}

interface CommentProp {
  id: number;
  name: string;
  avatar: ImageRequireSource;
  comment: string;
  timePost: string;
  isLike: boolean;
  numberLike: number;
  reply: ReplyProps[];
}

interface DataProps {
  data: CommentProp;
}

const Comment = memo(({ data }: DataProps) => {
  const { goBack } = useNavigation();
  const { height, width, top, bottom } = useLayout();
  const theme = useTheme();
  const styles = useStyleSheet(themedStyles);
  const { t } = useTranslation(["post", "common"]);

  const [viewRep, setViewRep] = useToggle(false);
  const [like, setLike] = useToggle(data.isLike);
  return (
    <View style={styles.container}>
      <View style={globalStyle.flexSpaceBetween}>
        <View style={globalStyle.flexDirection}>
          <Avatar
            source={data.avatar}
            size={"small"}
            /* @ts-ignore */
            style={styles.avatar}
          />
          <View>
            <Text fontWeight="500" fontFamily="Montserrat-Medium">
              {data.name}
            </Text>
            <View style={globalStyle.flexDirection}>
              <Text marginVertical={9}>{data.comment}</Text>
            </View>
            <View style={globalStyle.flexDirection}>
              <View>
                <Text category="c4" marginRight={32} status={"placeholder"}>
                  {data.timePost}
                </Text>
                <View style={[styles.line, { width: 44 * (width / 375) }]} />
              </View>
              <View>
                <Text
                  category="c4"
                  marginRight={32}
                  fontFamily="Montserrat-Medium"
                  fontWeight="500"
                  status={"placeholder"}
                  children={t("reply")}
                />
                <TouchableOpacity activeOpacity={0.7} onPress={setViewRep}>
                  {viewRep ? (
                    <Text marginTop={16} status={"placeholder"} category="c4">
                      {t("viewReply")}
                    </Text>
                  ) : (
                    <Text marginTop={16} status={"placeholder"} category="c4">
                      {t("post:viewReplies")} ({data.reply.length})
                    </Text>
                  )}
                </TouchableOpacity>
                {viewRep ? (
                  <View>
                    {data.reply.map((item, i) => {
                      return (
                        <View key={i} style={styles.viewReply}>
                          <View style={globalStyle.flexSpaceBetween}>
                            <Avatar
                              source={item.avatar}
                              size={"small"}
                              /* @ts-ignore */
                              style={styles.avatar}
                            />
                            <View>
                              <Text
                                fontWeight="500"
                                fontFamily="Montserrat-Medium"
                              >
                                {item.name}
                              </Text>
                              <Text marginVertical={9}>{item.comment}</Text>
                              <View style={globalStyle.flexSpaceBetween}>
                                <Text
                                  category="c4"
                                  marginRight={32}
                                  status={"placeholder"}
                                >
                                  {item.timePost}
                                </Text>
                              </View>
                            </View>
                          </View>
                        </View>
                      );
                    })}
                  </View>
                ) : null}
              </View>
            </View>
          </View>
        </View>
        <TouchableOpacity
          style={globalStyle.flexDirection}
          activeOpacity={0.7}
          onPress={setLike}
        >
          <Text category="c4" marginRight={4}>
            {!like ? data.numberLike : data.numberLike + 1}
          </Text>
          <Icon
            pack="assets"
            name={like ? "loveActive" : "love"}
            style={globalStyle.icon16}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
});

export default Comment;

const themedStyles = StyleService.create({
  container: {
    marginHorizontal: 16,
    marginBottom: 16,
  },
  avatar: {
    marginRight: 16,
  },
  line: {
    height: 1,
    backgroundColor: "color-basic-400",
    marginTop: 24,
  },
  viewReply: {
    flexDirection: "row",
    marginTop: 16,
  },
});
