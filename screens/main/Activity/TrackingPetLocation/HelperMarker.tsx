import React, { memo } from "react";
import { View, Image, ImageRequireSource } from "react-native";
import { StyleService, useStyleSheet, Avatar } from "@ui-kitten/components";

import { Marker } from "react-native-maps";
import { Images } from "assets/images";
interface Props {
  id: number;
  name: string;
  location: { latitude: number; longitude: number };
  avatar: ImageRequireSource;
}
interface DataProps {
  dataHelper: Props[];
}

const HelperMarker = memo(({ dataHelper }: DataProps) => {
  const styles = useStyleSheet(themedStyles);
  return (
    <>
      {dataHelper.map((item, i) => {
        return (
          <Marker coordinate={item.location} key={i}>
            <View>
              <Image
                source={Images.pinPet}
                /* @ts-ignore */
                style={styles.pinMap}
              />
              <Avatar
                source={item.avatar}
                size={"medium"}
                /* @ts-ignore */
                style={styles.avatar}
              />
            </View>
          </Marker>
        );
      })}
    </>
  );
});

export default HelperMarker;

const themedStyles = StyleService.create({
  avatar: {
    position: "absolute",
    left: 10,
    top: 6,
  },
  pinMap: {
    width: 60,
    height: 65,
    tintColor: "text-basic-color",
    opacity: 0.4,
  },
});
