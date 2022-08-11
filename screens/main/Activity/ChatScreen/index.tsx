import React, { memo } from "react";
import { TouchableOpacity, View } from "react-native";
import {
  TopNavigation,
  useTheme,
  StyleService,
  useStyleSheet,
  Avatar,
  Layout,
  Icon,
} from "@ui-kitten/components";
import { useNavigation } from "@react-navigation/native";

import Text from "components/Text";
import Container from "components/Container";
import { Bubble, GiftedChat, IMessage } from "react-native-gifted-chat";
import { Images } from "assets/images";
import NavigationAction from "components/NavigationAction";
import { globalStyle } from "styles/globalStyle";
import useLayout from "hooks/useLayout";
import RenderComposer from "./RenderComposer";

const Conversation = memo(() => {
  const { goBack } = useNavigation();
  const { top, bottom, width, height } = useLayout();
  const theme = useTheme();
  const styles = useStyleSheet(themedStyles);
  const [messages, setMessages] = React.useState<IMessage[]>();
  const [showLastLocation, setShowLastLocation] = React.useState(true);

  React.useEffect(() => {
    setMessages([
      {
        _id: 0,
        createdAt: new Date(),
        text: "Now I go to find & get notification to you when I found it.",
        user: {
          _id: 2,
          name: "React Native",
          avatar: Images.avatar1,
        },
      },

      {
        _id: 2,
        /* @ts-ignore */
        text: null,
        createdAt: new Date(),
        // image: Images.map3,
        user: {
          _id: 1,
          name: "React Native",
          avatar: Images.avatar,
        },
      },
      {
        _id: 3,
        text: "Thank you!",
        image: "https://i.ibb.co/tmdnPHG/img-map3.png",
        createdAt: new Date(),
        user: {
          _id: 1,
          name: "React Native",
          avatar: Images.avatar,
        },
      },
      {
        _id: 4,
        text: `I can help you.${"\n"}Please send me last location of you pet.`,
        createdAt: new Date(),
        user: {
          _id: 2,
          name: "React Native",
          avatar: Images.avatar1,
        },
      },
    ]);
  }, []);
  const onSend = React.useCallback(
    (messages = []) => {
      setMessages((previousMessages) =>
        GiftedChat.append(previousMessages, messages)
      );
    },
    [messages]
  );

  const renderBubble = React.useCallback((props) => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          left: [styles.wrapperLeftStyle, { maxWidth: 263 * (width / 375) }],
          right: [styles.wrapperRightStyle, { maxWidth: 263 * (width / 375) }],
        }}
        textStyle={{
          left: styles.leftTextStyle,
          right: styles.rightTextStyle,
        }}
      />
    );
  }, []);

  return (
    <Container style={[styles.container, { paddingBottom: bottom + 16 }]}>
      <TopNavigation
        style={{
          borderBottomColor: theme["background-basic-color-2"],
          paddingTop: top,
          borderBottomWidth: 1,
        }}
        title={() => (
          <View style={[globalStyle.flexDirection, { marginTop: top - 8 }]}>
            <Avatar source={Images.avatar1} size="tiny" />
            <Text marginTop={2} marginLeft={8}>
              Annie Tran
            </Text>
          </View>
        )}
        accessoryLeft={<NavigationAction />}
        accessoryRight={<NavigationAction icon="menuBlack" />}
      />

      <GiftedChat
        user={{ _id: 1 }}
        scrollToBottom
        messages={messages}
        onSend={(message) => onSend(message)}
        renderBubble={(props) => renderBubble(props)}
        timeFormat={"MM/DD/YYYY  HH:MM"}
        imageStyle={{ marginHorizontal: -12 }}
        renderTime={() => null}
        renderSend={() => null}
        renderComposer={(props) => {
          console.log("props", props);

          return <RenderComposer {...props} />;
        }}
        infiniteScroll
        showUserAvatar
        alwaysShowSend
        renderChatFooter={() =>
          showLastLocation ? (
            <>
              <Layout level={"1"} style={styles.footer}>
                <View>
                  <Text category="c4" marginBottom={8}>
                    Last location of Sammy
                  </Text>
                  <Text>1825 Church Ave, Brooklyn, NY 11226</Text>
                </View>
                <TouchableOpacity style={styles.btnShare} activeOpacity={0.7}>
                  <Icon
                    pack="assets"
                    name="articleShare"
                    style={globalStyle.icon16}
                  />
                </TouchableOpacity>
              </Layout>
            </>
          ) : null
        }
      />
    </Container>
  );
});

export default Conversation;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
    paddingTop: 0,
  },
  containerStyle: {
    flex: 1,
  },
  topHeader: {
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
    paddingLeft: 16,
  },
  leftTextStyle: {
    color: "text-primary-color",
    fontSize: 14,
    fontWeight: "400",
    lineHeight: 21,
    fontFamily: "Montserrat-Regular",
  },
  rightTextStyle: {
    color: "text-basic-color",
    fontSize: 14,
    fontWeight: "400",
    lineHeight: 21,
    fontFamily: "Montserrat-Regular",
  },
  btnSend: {
    marginLeft: 24,
  },
  wrapperLeftStyle: {
    backgroundColor: "background-basic-color-4",
    borderBottomLeftRadius: 4,
    borderRadius: 24,
    paddingVertical: 12,
    paddingHorizontal: 8,
  },
  wrapperRightStyle: {
    borderBottomRightRadius: 4,
    borderRadius: 24,
    paddingVertical: 12,
    paddingHorizontal: 8,
    backgroundColor: "background-basic-color-2",
    maxWidth: 263,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    marginTop: 24,
    paddingVertical: 16,
  },
  btnShare: {
    borderRadius: 99,
    backgroundColor: "color-green-400",
    width: 40,
    height: 40,
    ...globalStyle.center,
  },
});
const audioMess =
  "http://commondatastorage.googleapis.com/codeskulptor-demos/DDR_assets/Sevish_-__nbsp_.mp3";
const imageMess =
  "https://s3-alpha-sig.figma.com/img/adc7/17ea/4385c876b632daf90987923f3d4b0715?Expires=1632700800&Signature=dKxgdp2cslKCF85BD1iMC~YzPGCTG6oAscWDDJonzqil1Hze0acBM3Xg4ltSAj0BHqX50uDIx~EWQIC5JEIOHBbRAjhiMp3Wo0PPy0YkQc5de8l24Vh180u5pr5HNfFm9jdWkoX3u99xHNPX~ZCEwcN7~0JnqoeZmzhbD3KHGHQrpRwPyOx-Yhq57R3V98Rtv3A~1sWCzg9d~vyIPUuTUmOsAPzukQpxo1KsfCm3RIAlalDLMlhvEs2s4f1dX9Lw4En~f6a7cHmrXfBElvE3AghM2aLdrbQEqHDKJ6Z~ehPNn88jBzw~qQEwZMnzGfGt2fEbJyQcf8LP4CjUE2d2Jw__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA";
