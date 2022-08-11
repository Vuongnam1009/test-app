import React, { memo } from "react";
import { View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  useTheme,
  useStyleSheet,
  Icon,
  StyleService,
} from "@ui-kitten/components";
import { VetBottomTabStackParamList } from "./types";
import useLayout from "hooks/useLayout";
import Text from "components/Text";
import { globalStyle } from "styles/globalStyle";
import Dashboard from "screens/vet/Dashboard";
import Appointment from "screens/vet/Appointment";
import Medical from "screens/vet/Medical";
import Medicines from "screens/vet/Medicines";
import Reminder from "screens/vet/Reminder";
interface ButtonTabProps {
  focused: boolean;
  icon: string;
  numberNotification?: number;
  onPress?: void;
}

const BottomTab = createBottomTabNavigator<VetBottomTabStackParamList>();

const VetBottomTa = memo(() => {
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
        name="Dashboard"
        component={Dashboard}
        options={{
          tabBarIcon: ({ focused }) => (
            <ButtonTab focused={focused} icon="dashboard" />
          ),
        }}
      />
      <BottomTab.Screen
        name="Appointment"
        component={Appointment}
        options={{
          tabBarIcon: ({ focused }) => (
            <ButtonTab focused={focused} icon="appointment" />
          ),
        }}
      />
      <BottomTab.Screen
        name="Medical"
        component={Medical}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <ButtonTab focused={focused} icon="medical" />
          ),
        }}
      />
      <BottomTab.Screen
        name="Medicines"
        component={Medicines}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <ButtonTab focused={focused} icon="medicines" />
          ),
        }}
      />
      <BottomTab.Screen
        name="Reminder"
        component={Reminder}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <ButtonTab focused={focused} icon="reminder" />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
});
export default VetBottomTa;

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
