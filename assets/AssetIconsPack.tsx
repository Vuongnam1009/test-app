import React from "react";
import {
  Image,
  ImageProps,
  ImageSourcePropType,
  StyleSheet,
} from "react-native";
import { IconPack, IconProvider } from "@ui-kitten/components";
import { SvgProps } from "react-native-svg";
import { Icons } from "./icons";

const createIcon = (source: ImageSourcePropType): IconProvider<ImageProps> => {
  return {
    toReactElement: (props) => (
      <Image
        style={styles.icon}
        {...props}
        source={source}
        resizeMode="cover"
      />
    ),
  };
};

const styles = StyleSheet.create({
  icon: {
    width: 24,
    height: 24,
  },
});

const AssetIconsPack: IconPack<ImageProps | SvgProps> = {
  name: "assets",
  icons: {
    back: createIcon(Icons.back),
    camera: createIcon(Icons.camera),
    menu: createIcon(Icons.menu),
    search: createIcon(Icons.search),
    tabAddPost: createIcon(Icons.tabAddPost),
    radioActive: createIcon(Icons.radioActive),
    cancel: createIcon(Icons.cancel),
    eyeOff: createIcon(Icons.eyeOff),
    eyeOn: createIcon(Icons.eyeOn),
    arr: createIcon(Icons.arr),
    newsFeed: createIcon(Icons.newsFeed),
    notifications: createIcon(Icons.notifications),
    profileUser: createIcon(Icons.profileUser),
    activity: createIcon(Icons.activity),
    track: createIcon(Icons.track),
    vet: createIcon(Icons.vet),
    help: createIcon(Icons.help),
    settings: createIcon(Icons.settings),
    tabFavorite: createIcon(Icons.tabFavorite),
    love: createIcon(Icons.love),
    loveActive: createIcon(Icons.loveActive),
    comment: createIcon(Icons.comment),
    bookmark: createIcon(Icons.bookmark),
    bookmarkActive: createIcon(Icons.bookmarkActive),
    addStory: createIcon(Icons.addStory),
    menuBlack: createIcon(Icons.menuBlack),
    filter: createIcon(Icons.filter),
    close: createIcon(Icons.close),
    arrDown: createIcon(Icons.arrDown),
    refresh: createIcon(Icons.refresh),
    direction: createIcon(Icons.direction),
    reminder: createIcon(Icons.reminder),
    medical: createIcon(Icons.medical),
    medicines: createIcon(Icons.medicines),
    dashboard: createIcon(Icons.dashboard),
    appointment: createIcon(Icons.appointment),
    history: createIcon(Icons.history),
    chatAdd: createIcon(Icons.chatAdd),
    send: createIcon(Icons.send),
    articleShare: createIcon(Icons.articleShare),
    circle: createIcon(Icons.circle),
    completed: createIcon(Icons.completed),
    date: createIcon(Icons.date),
    arrRight: createIcon(Icons.arrRight),
    verified: createIcon(Icons.verified),
    medicineActive: createIcon(Icons.medicineActive),
    medicineInactive: createIcon(Icons.medicineInactive),
    document: createIcon(Icons.document),
    location: createIcon(Icons.location),
    phone: createIcon(Icons.phone),
    active: createIcon(Icons.active),
    recordPrice: createIcon(Icons.recordPrice),
    email: createIcon(Icons.email),
    emailNormal: createIcon(Icons.emailNormal),
    petType: createIcon(Icons.petType),
    breed: createIcon(Icons.breed),
    injection: createIcon(Icons.injection),
    oral: createIcon(Icons.oral),
    medicineOther: createIcon(Icons.medicineOther),
    medicineSkipped: createIcon(Icons.medicineSkipped),
    medicineTakken: createIcon(Icons.medicineTakken),
    messenger: createIcon(Icons.messenger),
    follow: createIcon(Icons.follow),
    followed: createIcon(Icons.followed),
    tabPost: createIcon(Icons.tabPost),
    tabPhoto: createIcon(Icons.tabPhoto),
    lock: createIcon(Icons.lock),
    logo: createIcon(Icons.logo),
    logout: createIcon(Icons.logout),
    unit: createIcon(Icons.unit),
    update: createIcon(Icons.update),
    privacy: createIcon(Icons.privacy),
    tabNotification: createIcon(Icons.tabNotification),
    unFollow: createIcon(Icons.unFollow),
    dislike: createIcon(Icons.dislike),
    edit: createIcon(Icons.edit),
    owner: createIcon(Icons.owner),
    info: createIcon(Icons.info),
    zoomIn: createIcon(Icons.zoomIn),
    makeGrid: createIcon(Icons.makeGrid),
    multiSelect: createIcon(Icons.multiSelect),
  },
};
export default AssetIconsPack;
