import * as React from "react";
import { View, StyleSheet, ImageBackground, Platform } from "react-native";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
} from "@react-navigation/drawer";
import { NavigationProp, useNavigation } from "@react-navigation/native";

import { Images } from "assets/images";
import useLayout from "hooks/useLayout";
import UserInformation from "components/UserInformation";
import DrawerItem from "components/DrawerItem";
import { DrawerStackParamList, RootStackParamList } from "./types";
import DrawerMainStack from "./DrawerMainStack";
import DrawerVetStack from "./DrawerVetStack";

const Drawer = createDrawerNavigator<DrawerStackParamList>();
const DATA_USER = {
  avatar: Images.avatar,
  userName: "Jackson Maxwell",
  userType: "Pet Owner",
};
const SCREENS = [
  { id: 0, label: "News Feed", icon: "newsFeed" },
  { id: 1, label: "Pet Activity Tracking", icon: "activity" },
  { id: 2, label: "Tracking Pet Location", icon: "track" },
  { id: 3, label: "Vet", icon: "vet" },
  { id: 4, label: "Settings", icon: "settings" },
  { id: 5, label: "Help", icon: "help" },
];

export default function DrawerNavigator() {
  const { width, height, bottom, top } = useLayout();

  const [tabActive, setTabActive] = React.useState(0);

  const { navigate } = useNavigation<NavigationProp<RootStackParamList>>();
  const onNavigate = (key: number) => {
    switch (key) {
      case 0:
        navigate("DrawerNavigator", { screen: "Main" });
        break;
      case 1:
        navigate("DrawerNavigator", { screen: "Vet" });
        break;
      case 2:
        navigate("DrawerNavigator", { screen: "Vet" });
        break;
      case 3:
        navigate("DrawerNavigator", { screen: "Vet" });
        break;
      case 4:
        navigate("Settings");
        break;
      case 5:
        navigate("Settings");
        break;
    }
  };
  const DrawerContent = (props: any) => {
    return (
      <DrawerContentScrollView
        {...props}
        bounces={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingTop: 207 * (height / 812),
          height: height,
        }}
      >
        {SCREENS.map((item, index) => {
          const { id, label, icon } = item;
          return (
            <DrawerItem
              key={index}
              tabChoose={id}
              icon={icon}
              tabActive={tabActive}
              label={label}
              onPress={() => {
                setTabActive(id);
                onNavigate(id);
              }}
            />
          );
        })}
        <UserInformation
          data={DATA_USER}
          style={{ position: "absolute", bottom: bottom + 48, left: 32 }}
        />
      </DrawerContentScrollView>
    );
  };
  return (
    <ImageBackground
      source={Images.fIntro}
      style={{
        width: width,
        height: Platform.OS === "ios" ? height : height + top,
      }}
    >
      <View
        style={{
          position: "absolute",
          left: 0,
          bottom: 0,
          width: width,
          height: height,
          backgroundColor: "#1D1E2C",
          opacity: 0.8,
        }}
      />
      <Drawer.Navigator
        initialRouteName="Main"
        screenOptions={{
          headerShown: false,
          drawerContentContainerStyle: styles.contentContainerDrawer,
          sceneContainerStyle: { backgroundColor: "transparent" },
          drawerType: "slide",
          drawerStyle: styles.drawerStyles,
          overlayColor: "transparent",
          drawerActiveBackgroundColor: "transparent",
        }}
        drawerContent={(props) => {
          return <DrawerContent />;
        }}
      >
        <Drawer.Screen name="Main">
          {(props) => <DrawerMainStack />}
        </Drawer.Screen>
        <Drawer.Screen name="Vet">
          {(props) => <DrawerVetStack />}
        </Drawer.Screen>
      </Drawer.Navigator>
    </ImageBackground>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainerDrawer: {
    backgroundColor: "transparent",
  },
  sceneContainerStyle: {
    backgroundColor: "transparent",
  },
  drawerStyles: {
    backgroundColor: "transparent",
  },
});
