import React, { memo } from "react";
import ChatScreen from "screens/main/Activity/ChatScreen";
import TrackingPetLocation from "screens/main/Activity/TrackingPetLocation";
import HistoryTrackingPet from "screens/main/Activity/TrackingPetLocation/HistoryTrackingPet";
import NewsFeedSearch from "screens/main/NewsFeed/NewsFeedSearch";
import FilterSearch from "screens/main/NewsFeed/NewsFeedSearch/FilterSearch";
import NewStory from "screens/main/NewsFeed/NewStory";
import PreviewPhoto from "screens/main/NewsFeed/NewStory/PreviewPhoto";
import createStackNavigator from "./createStackNavigator";

import { ActivityStackParamList } from "./types";
const Stack = createStackNavigator<ActivityStackParamList>();

const ActivityStack = memo(() => {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="NewStory"
    >
      <Stack.Screen name="NewStory" component={NewStory} />
      <Stack.Screen name="PreviewPhoto" component={PreviewPhoto} />
      <Stack.Screen name="NewsFeedSearch" component={NewsFeedSearch} />
      <Stack.Screen name="FilterSearch" component={FilterSearch} />
      <Stack.Screen
        name="TrackingPetLocation"
        component={TrackingPetLocation}
      />
      <Stack.Screen name="HistoryTrackingPet" component={HistoryTrackingPet} />
      <Stack.Screen name="ChatScreen" component={ChatScreen} />
    </Stack.Navigator>
  );
});

export default ActivityStack;
