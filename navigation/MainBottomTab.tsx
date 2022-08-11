import React, { memo } from "react";
import { View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  useTheme,
  useStyleSheet,
  Icon,
  StyleService,
} from "@ui-kitten/components";
import { MainBottomTabStackParamList } from "./types";
import useLayout from "hooks/useLayout";
import Text from "components/Text";
import { globalStyle } from "styles/globalStyle";
import Notifications from "screens/main/Notifications";
import Activity from "screens/main/Activity";
import NewFeed from "screens/main/NewsFeed";
import NewPostNavigator from "./NewPostNavigator";
import MyProfile from "screens/main/MyProfile";
interface ButtonTabProps {
  focused: boolean;
  icon: string;
  numberNotification?: number;
  onPress?: void;
}

const BottomTab = createBottomTabNavigator<MainBottomTabStackParamList>();

const MainBottomTab = memo(() => {
  const theme = useTheme();
  const { width, height, bottom, top } = useLayout();
  const styles = useStyleSheet(themedStyles);

  const ButtonTab = React.useCallback(
    ({ focused, icon, numberNotification }: ButtonTabProps) => {
      return (
        <View
          style={{
            width: 40,
            height: 40,
            ...globalStyle.center,
            backgroundColor: theme["background-basic-color-1"],
          }}
        >
          {numberNotification ? (
            focused ? null : (
              <View style={styles.notification}>
                <Text center category="c4" status="primary">
                  {numberNotification}
                </Text>
              </View>
            )
          ) : null}
          <Icon
            pack="assets"
            name={icon}
            style={{
              width: 24,
              height: 24,
              tintColor: focused
                ? theme["text-danger-color"]
                : theme["text-basic-color"],
            }}
          />
        </View>
      );
    },
    []
  );
  return (
    <BottomTab.Navigator
      tabBarOptions={{
        showLabel: false,
        style: [styles.container],
      }}
      lazy={true}
    >
      <BottomTab.Screen
        name="NewFeed"
        component={NewFeed}
        options={{
          tabBarIcon: ({ focused }) => (
            <ButtonTab
              focused={focused}
              icon="newsFeed"
              numberNotification={undefined}
            />
          ),
        }}
      />
      <BottomTab.Screen
        name="Activity"
        component={Activity}
        options={{
          tabBarIcon: ({ focused }) => (
            <ButtonTab focused={focused} icon="activity" />
          ),
        }}
      />
      <BottomTab.Screen
        name="NewPost"
        component={NewPostNavigator}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <ButtonTab focused={focused} icon="tabAddPost" />
          ),
        }}
      />
      <BottomTab.Screen
        name="Notifications"
        component={Notifications}
        initialParams={{ activeIndex: 0 }}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <ButtonTab
              focused={focused}
              icon="notifications"
              numberNotification={3}
            />
          ),
        }}
      />
      <BottomTab.Screen
        name="MyProfile"
        component={MyProfile}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <ButtonTab focused={focused} icon="profileUser" />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
});
export default MainBottomTab;

const themedStyles = StyleService.create({
  container: {
    position: "absolute",
    left: 0,
    bottom: 0,
    right: 0,
    zIndex: 10,
  },
  viewButtonTab: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "background-basic-color-1",
    paddingTop: 16,
    paddingBottom: 10,
  },
  buttonTab: {
    borderRadius: 12,
    backgroundColor: "blue",
    height: 40,
    width: 40,
  },
  icon: {
    width: 24,
    height: 24,
    alignSelf: "center",
  },
  notification: {
    position: "absolute",
    borderRadius: 99,
    backgroundColor: "red",
    width: 16,
    height: 16,
    zIndex: 10,
    top: 2,
    right: 1,
  },
});
