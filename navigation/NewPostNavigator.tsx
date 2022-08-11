import React, { memo } from "react";
import NewPost from "screens/main/NewPost";
import ChooseEffect from "screens/main/NewPost/ChooseEffect";
import NewMoment from "screens/main/NewPost/NewMoment";
import createStackNavigator from "./createStackNavigator";

import { NewPostStackParamList } from "./types";
const Stack = createStackNavigator<NewPostStackParamList>();

const NewPostNavigator = memo(() => {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="ChoosePhoto"
    >
      <Stack.Screen name="ChoosePhoto" component={NewPost} />
      <Stack.Screen name="ChooseEffect" component={ChooseEffect} />
      <Stack.Screen name="NewMoment" component={NewMoment} />
    </Stack.Navigator>
  );
});

export default NewPostNavigator;
