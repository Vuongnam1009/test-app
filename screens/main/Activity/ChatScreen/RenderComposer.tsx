import React from "react";
import { View,TouchableOpacity } from "react-native";
import {
  StyleService,
  useStyleSheet,
  Layout,
  Icon,
} from "@ui-kitten/components";

import { Composer, Send } from "react-native-gifted-chat";

const RenderComposer = (props: any) => {
  const styles = useStyleSheet(themedStyles);
  return (
    <Layout {...props} style={styles.container}>
      <Composer
        {...props}
        textInputStyle={styles.textInput}
        placeholder="Add a comment…"
      />
      <View style={styles.content}>
        <TouchableOpacity>
          <Icon pack="assets" name="chatAdd" style={styles.chatAdd} />
        </TouchableOpacity>
        <Send {...props} containerStyle={styles.containerSend}>
          <Icon pack="assets" name="send" style={styles.iconSend} />
        </Send>
      </View>
    </Layout>
  );
};

export default RenderComposer;

const themedStyles = StyleService.create({
  container: {
    flexDirection: "row",
    flex: 1,
  },
  content: {
    flexDirection: "row",
    marginRight: 8,
    alignItems: "center",
  },
  containerSend: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 24,
    marginRight: 12,
  },
  iconSend: {
    tintColor: "text-basic-color",
  },
  chatAdd: {
    tintColor: "text-basic-color",
  },
  textInput: {
    color: "text-basic-color",
  },
});
