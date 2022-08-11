import React, { memo } from "react";
import { Image } from "react-native";
import { StyleService, useStyleSheet } from "@ui-kitten/components";
import useLayout from "hooks/useLayout";

import { Marker } from "react-native-maps";
import { Images } from "assets/images";
interface Props {
  location: { latitude: number; longitude: number };
}

const DeviceMarker = memo(({ location }: Props) => {
  const { height, width, top, bottom } = useLayout();
  const styles = useStyleSheet(themedStyles);

  const sizeImg = 200 * (width / 375);
  return (
    <Marker
      coordinate={{
        latitude: location.latitude - 0.012,
        longitude: location.longitude - 0.001,
      }}
    >
      <Image
        source={Images.pinHome}
        style={{ width: sizeImg, height: sizeImg }}
      />
    </Marker>
  );
});

export default DeviceMarker;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
  },
});
