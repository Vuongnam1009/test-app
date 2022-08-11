import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { RootStackParamList } from "./types";
import { createStackNavigator } from "@react-navigation/stack";

import { LogBox } from "react-native";
import AuthNavigator from "./AuthNavigator";
import Onboarding from "screens/onboarding/Onboarding";
import NewPetNavigator from "./NewPetNavigator";
import DrawerNavigator from "./DrawerNavigator";
import ActivityStack from "./ActivityStack";
import NewPostNavigator from "./NewPostNavigator";
import VetStackNavigator from "./VetStackNavigator";
import Settings from "screens/main/Settings";
import Follower from "screens/main/MyProfile/Follower/Follower";
import Following from "screens/main/MyProfile/Follower/Following";
import ProfileUser from "screens/main/ProfileUser/ProfileUser";
import PostDetails from "screens/main/PostDetails";
import PetProfile from "screens/main/PetProfile";

LogBox.ignoreLogs([
  "Non-serializable values were found in the navigation state",
]);
const Stack = createStackNavigator<RootStackParamList>();
const AppContainer = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName="Intro"
      >
        <Stack.Screen name="Intro" component={Onboarding} />
        <Stack.Screen name="Auth" component={AuthNavigator} />
        <Stack.Screen name="NewPet" component={NewPetNavigator} />
        <Stack.Screen
          name={"DrawerNavigator"}
          component={DrawerNavigator}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ActivityStack"
          component={ActivityStack}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="NewPostStack"
          component={NewPostNavigator}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="VetStackNavigator"
          component={VetStackNavigator}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Settings"
          component={Settings}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Follower"
          component={Follower}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Following"
          component={Following}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ProfileUser"
          component={ProfileUser}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="PostDetails"
          component={PostDetails}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="PetProfile"
          component={PetProfile}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default AppContainer;
