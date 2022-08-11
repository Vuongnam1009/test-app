import { RouteProp } from "@react-navigation/native";
import { PetProps } from "components/TrackingPetModal";

export type RootStackParamList = {
  Intro: undefined;
  Auth: { screen: keyof AuthStackParamList };
  NewPet: { screen: keyof NewPetStackParamList };
  DrawerNavigator: { screen: keyof DrawerStackParamList };
  ActivityStack: { screen: keyof ActivityStackParamList };
  NewPostStack: { screen: keyof NewPostStackParamList };
  ProfileStack: { screen: keyof ProfileStackParamList };
  VetStackNavigator: { screen: keyof VetStackParamList };
  MainBottom: { screen: keyof MainBottomTabStackParamList };
  Settings: undefined;
  Follower: undefined;
  Following: undefined;
  ProfileUser: undefined;
  PostDetails: undefined;
  PetProfile: { isUser: boolean; data: PetProps };
};
export type IntroStackParamList = {
  OnboardingScreen: undefined;
};
export type AuthStackParamList = {
  Home: undefined;
  Login: undefined;
  FirstSignUp: undefined;
  SecondSignUp: undefined;
  SuccessSignUp: undefined;
};
export type ProfileStackParamList = {
  UserProfile: undefined;
  Settings: undefined;
};
export type ActivityStackParamList = {
  NewStory: undefined;
  PreviewPhoto: { photo: string };
  NewsFeedSearch: undefined;
  FilterSearch: undefined;
  TrackingPetLocation: undefined;
  HistoryTrackingPet: undefined;
  ChatScreen: undefined;
};
export type NewPostStackParamList = {
  ChoosePhoto: undefined;
  ChooseEffect: { photo: string };
  WritePost: undefined;
  NewMoment: { photo: string };
};
export type NewPetStackParamList = {
  AddNewPet: undefined;
  TypePet: undefined;
  BreedPet: { title: string };
  GenderPet: undefined;
  WeightBirthday: undefined;
  DeviceMonitor: undefined;
};
export type VetStackParamList = {
  NewAppointment: undefined;
  NewVaccine: undefined;
  MedicalSearch: undefined;
  RequestMedicalInfo: undefined;
  CheckoutInformation: undefined;
  ConsentRequest: undefined;
  AddVaccineManual: undefined;
  VaccinesList: undefined;
  MedicinesList: undefined;
  NewMedicine: { name: string };
  SearchMedicineName: undefined;
  NewReminder: undefined;
};
//Drawer
export type DrawerStackParamList = {
  Main: undefined;
  Vet: undefined;
};
export type MainBottomTabStackParamList = {
  NewFeed: undefined;
  Activity: undefined;
  NewPost: undefined;
  Notifications: { activeIndex: number };
  MyProfile: undefined;
};
export type VetBottomTabStackParamList = {
  Dashboard: undefined;
  Appointment: undefined;
  Medical: undefined;
  Medicines: undefined;
  Reminder: undefined;
};
export type NewSearchStackParamList = {
  Home: undefined;
};

export type PetProfileNavigationProp = RouteProp<
  RootStackParamList,
  "PetProfile"
>;
export type BreedScreenNavigationProp = RouteProp<
  NewPetStackParamList,
  "BreedPet"
>;
export type NotificationsNavigationProp = RouteProp<
  MainBottomTabStackParamList,
  "Notifications"
>;
export type NewMedicineNavigationProp = RouteProp<
  VetStackParamList,
  "NewMedicine"
>;
export type MediaNavigationProp = RouteProp<
  NewPostStackParamList,
  "ChooseEffect"
>;
export type NewMomentNavigationProp = RouteProp<
  NewPostStackParamList,
  "NewMoment"
>;
export type PreviewPhotoNavigationProp = RouteProp<
  ActivityStackParamList,
  "PreviewPhoto"
>;
