import React, { memo } from "react";
import { View } from "react-native";
import {
  TopNavigation,
  StyleService,
  useStyleSheet,
  Layout,
  Input,
} from "@ui-kitten/components";

import Content from "components/Content";
import Container from "components/Container";
import NavigationAction from "components/NavigationAction";
import NewsFeedPost from "../NewsFeed/NewsFeedPost";
import { Images } from "assets/images";
import Comment from "./Comment";
import { DATA_CMT } from "constants/Data";
import { Controller, useForm } from "react-hook-form";

const PostDetails = memo(() => {
  const styles = useStyleSheet(themedStyles);

  const {
    control,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm({
    defaultValues: {
      comment: "",
    },
  });
  return (
    <Container style={styles.container}>
      <TopNavigation
        title={"Annie Tran"}
        accessoryLeft={<NavigationAction />}
        accessoryRight={<NavigationAction icon="menuBlack" />}
      />
      <Content contentContainerStyle={styles.content}>
        <NewsFeedPost item={DATA} />
        <View style={styles.viewComment}>
          {DATA_CMT.map((item, i) => {
            return <Comment data={item} key={i} />;
          })}
        </View>
      </Content>
      <Layout style={styles.bottom}>
        <Controller
          name="comment"
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              status={"transparent"}
              onChangeText={onChange}
              autoFocus
              value={value}
              onBlur={onBlur}
              placeholder="Write a comment..."
              onTouchStart={handleSubmit(() => {})}
              onTouchEnd={handleSubmit(() => {})}
              keyboardType="email-address"
              textStyle={{
                paddingTop: getValues("comment") === "" ? 0 : 16,
              }}
              caption={errors.comment?.message}
            />
          )}
        />
      </Layout>
    </Container>
  );
});

export default PostDetails;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
  },
  listCmt: {
    marginTop: 32,
    marginHorizontal: 16,
  },
  viewComment: {
    marginTop: 32,
  },
  content: {
    paddingBottom: 60,
  },
  bottom: {},
});
const DATA = {
  id: 2,
  avatar: Images.avatar5,
  userName: "Charlie Puth",
  location: "Northside",
  image: [Images.post4, Images.post1, Images.post3, Images.post2],
  likedNumber: 3200,
  commentNumber: 421,
  title: "My Daughter & Puppy!😊 What do you think? #puppy #sleeping",
  time: "10 minutes ago",
};
