import React, { memo } from "react";
import NewAppointment from "screens/vet/Appointment/NewAppointment";
import AddVaccineManual from "screens/vet/Medical/AddVaccineManual";
import CheckoutInformation from "screens/vet/Medical/CheckoutInfomation";
import ConsentRequest from "screens/vet/Medical/ConsentRequest";
import MedicalSearch from "screens/vet/Medical/MedicalSearch";
import NewVaccine from "screens/vet/Medical/NewVaccine";
import RequestMedicalInfo from "screens/vet/Medical/RequestMedicalInfo/RequestMedicalInfo";
import VaccinesList from "screens/vet/Medical/VaccinesList";
import MedicinesList from "screens/vet/Medicines/MedicinesList";
import NewMedicine from "screens/vet/Medicines/NewMedicine";
import SearchMedicineName from "screens/vet/Medicines/NewMedicine/SearchMedicineName";
import NewReminder from "screens/vet/Reminder/NewReminder";

import createStackNavigator from "./createStackNavigator";
import { VetStackParamList } from "./types";

const Stack = createStackNavigator<VetStackParamList>();

const VetStackNavigator = memo(() => {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="NewAppointment"
    >
      <Stack.Screen name="NewAppointment" component={NewAppointment} />
      <Stack.Screen name="NewVaccine" component={NewVaccine} />
      <Stack.Screen name="MedicalSearch" component={MedicalSearch} />
      <Stack.Screen name="RequestMedicalInfo" component={RequestMedicalInfo} />
      <Stack.Screen
        name="CheckoutInformation"
        component={CheckoutInformation}
      />
      <Stack.Screen name="ConsentRequest" component={ConsentRequest} />
      <Stack.Screen name="AddVaccineManual" component={AddVaccineManual} />
      <Stack.Screen name="VaccinesList" component={VaccinesList} />
      <Stack.Screen name="MedicinesList" component={MedicinesList} />
      <Stack.Screen name="NewMedicine" component={NewMedicine} />
      <Stack.Screen name="SearchMedicineName" component={SearchMedicineName} />
      <Stack.Screen name="NewReminder" component={NewReminder} />
    </Stack.Navigator>
  );
});

export default VetStackNavigator;
