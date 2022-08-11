import React, { memo } from "react";
import createStackNavigator from "./createStackNavigator";
import { AuthStackParamList } from "./types";

import Login from "screens/auth/Login";
import Auth from "screens/auth/Home";
import FirstSignUp from "screens/auth/FirstSignUp";
import SecondSignUp from "screens/auth/SecondSignUp";
import SuccessSignUp from "screens/auth/SuccessSignUp";

const Stack = createStackNavigator<AuthStackParamList>();

const AuthNavigator = memo(() => {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="Home"
    >
      <Stack.Screen name="Home" component={Auth} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="FirstSignUp" component={FirstSignUp} />
      <Stack.Screen name="SecondSignUp" component={SecondSignUp} />
      <Stack.Screen name="SuccessSignUp" component={SuccessSignUp} />
    </Stack.Navigator>
  );
});

export default AuthNavigator;
