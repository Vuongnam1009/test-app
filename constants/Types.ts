import { EvaStatus } from "@ui-kitten/components/devsupport";
import { ImageRequireSource, ViewStyle } from "react-native";
import * as ImagePicker from "react-native-image-picker";

export interface ButtonType {
  status?: EvaStatus;
  title: string;
  onPress: () => void;
}
export interface SuccessScreenType {
  image?: ImageRequireSource;
  title?: string;
  description?: string;
  children?: ButtonType[] | null;
  buttonsViewStyle?: ViewStyle;
  buttonStyle?: ViewStyle;
}
export enum EKeyAsyncStorage {
  theme = "theme",
  intro = "intro",
}
export interface Action {
  title?: string;
  type: "capture" | "library";
  options: ImagePicker.CameraOptions | ImagePicker.ImageLibraryOptions;
}
export enum PermissionEnum {
  GRANTED = "granted",
  UNDETERMINED = "undetermined",
  DENIED = "denied",
}
export enum Animation_Types_Enum {
  SlideTop,
  SlideBottom,
  SlideInRight,
  SlideInLeft,
}
export enum Result_Types_Enum {
  People = "people",
  Pet = "pet",
  Tag = "tag",
}
export enum Notification_Types_Enum {
  Comment = "comment",
  Follow = "follow",
  Emotion = "emotion",
}

export interface VaccineProps {
  id: number;
  name: string;
  code: number;
  administered: string;
  expired: string;
  verified: boolean;
  active?: boolean;
}
export interface MedicinesItemProps {
  id: number;
  name: string;
  timePerDay?: number;
  mg?: number;
  type?: "other" | "oral" | "injection" | string;
}
