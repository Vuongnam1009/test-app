import React, { memo } from "react";
import AddNewPet from "screens/createPetProfile/AddNewPet";
import BreedPet from "screens/createPetProfile/BreedPet";
import DeviceMonitor from "screens/createPetProfile/DeviceMonitor";
import GenderPet from "screens/createPetProfile/GenderPet/GenderPet";
import TypePet from "screens/createPetProfile/TypePet";
import WeightBirthday from "screens/createPetProfile/WeightBirthday";
import createStackNavigator from "./createStackNavigator";
import { NewPetStackParamList } from "./types";

const Stack = createStackNavigator<NewPetStackParamList>();

const NewPetNavigator = memo(() => {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="AddNewPet"
    >
      <Stack.Screen name="AddNewPet" component={AddNewPet} />
      <Stack.Screen name="TypePet" component={TypePet} />
      <Stack.Screen name="BreedPet" component={BreedPet} />
      <Stack.Screen name="GenderPet" component={GenderPet} />
      <Stack.Screen name="WeightBirthday" component={WeightBirthday} />
      <Stack.Screen name="DeviceMonitor" component={DeviceMonitor} />
    </Stack.Navigator>
  );
});

export default NewPetNavigator;
