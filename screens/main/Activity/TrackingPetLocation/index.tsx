import React, { memo } from "react";
import { View, Image, TouchableOpacity, ScrollView } from "react-native";
import {
  TopNavigation,
  StyleService,
  useStyleSheet,
  Avatar,
  Layout,
  Icon,
  Button,
} from "@ui-kitten/components";
import useLayout from "hooks/useLayout";
import { globalStyle } from "styles/globalStyle";

import Text from "components/Text";
import Container from "components/Container";
import NavigationAction from "components/NavigationAction";
import { useTranslation } from "react-i18next";
import MapView, { PROVIDER_GOOGLE, Marker, Polyline } from "react-native-maps";
import { Images } from "assets/images";
import { customMapStyle } from "constants/Data";
import DeviceMarker from "./DeviceMarker";
import ModalConfirm from "components/ModalConfirm";
import useModal from "hooks/useModal";
import useToggle from "hooks/useToggle";
import HelperMarker from "./HelperMarker";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { ActivityStackParamList } from "navigation/types";

const TrackingPetLocation = memo(() => {
  const { navigate } = useNavigation<NavigationProp<ActivityStackParamList>>();
  const { height, width, top, bottom } = useLayout();
  const styles = useStyleSheet(themedStyles);
  const { t } = useTranslation(["activity", "common"]);

  const initialRegion = {
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0555,
    longitudeDelta: 0.0555,
  };
  const currentLocation = { latitude: 37.8025259, longitude: -122.4351431 };
  const fifteenMinLocation = { latitude: 37.8025259, longitude: -122.4244431 };
  const thirtyMinLocation = { latitude: 37.7896386, longitude: -122.421646 };
  const oneHourLocation = { latitude: 37.7665248, longitude: -122.4161628 };
  const oneHour15mLocation = { latitude: 37.7583348, longitude: -122.4162328 };
  const homeLocation = {
    latitude: 37.7534153,
    longitude: -122.4325687,
  };

  const [state, setState] = React.useState(initialRegion);
  const [current, setCurrent] = React.useState(1);
  const refMap = React.useRef<MapView | null>(null);
  const refScroll = React.useRef<ScrollView>(null);
  const { modalRef, hide, show } = useModal();
  const [showHelper, setShowHelper] = useToggle(false);

  //scroll to Index
  React.useEffect(() => {
    refScroll?.current?.scrollTo({
      x: current * 100 + 8 - (width - 60) / 2,
      animated: true,
    });
  }, [refScroll, current]);
  const dataLocation = [
    { id: 0, title: "Now", location: currentLocation },
    { id: 1, title: "15m ago", location: fifteenMinLocation },
    { id: 2, title: "30m ago", location: thirtyMinLocation },
    { id: 3, title: "1h ago", location: oneHourLocation },
    { id: 4, title: "1h15m ago", location: oneHour15mLocation },
    { id: 5, title: "Home", location: homeLocation },
  ];
  const _onDirection = () => {};
  const _onPressItem = React.useCallback(
    (index) => {
      setCurrent(index);
    },
    [refMap, setCurrent]
  );
  React.useEffect(() => {
    refMap?.current?.animateToRegion({
      ...state,
      latitude: dataLocation[current].location.latitude,
      longitude: dataLocation[current].location.longitude,
    });
  }, [refMap, current]);
  const _onHistory = () => navigate("HistoryTrackingPet");
  return (
    <Container style={styles.container}>
      <TopNavigation
        style={{ paddingTop: top }}
        accessoryRight={
          <NavigationAction icon="history" onPress={_onHistory} />
        }
        accessoryLeft={<NavigationAction />}
        title={() => (
          <Text marginTop={top - 8} category="b1">
            Sammy {t("location")}
          </Text>
        )}
      />
      <MapView
        ref={refMap}
        provider={PROVIDER_GOOGLE}
        style={styles.mapView}
        region={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0531,
        }}
        customMapStyle={customMapStyle}
      >
        {/* show helper */}
        {showHelper ? (
          <HelperMarker
            dataHelper={[
              {
                id: 0,
                name: "Johan",
                location: { latitude: 37.78825, longitude: -122.4324 },
                avatar: Images.avatar10,
              },
              {
                id: 1,
                name: "Johan",
                location: { latitude: 37.79525, longitude: -122.4324 },
                avatar: Images.avatar1,
              },
              {
                id: 2,
                name: "Johan",
                location: { latitude: 37.79125, longitude: -122.4424 },
                avatar: Images.avatar2,
              },
            ]}
          />
        ) : null}
        {/* DeviceMarker */}
        <DeviceMarker location={homeLocation} />
        {/* Location Pet  */}
        <Marker coordinate={currentLocation}>
          <View>
            <Image
              source={Images.pinPet}
              /* @ts-ignore */
              style={styles.pinMap}
            />
            <Avatar
              source={Images.pet3}
              size={"medium"}
              /* @ts-ignore */
              style={styles.avatar}
            />
          </View>
        </Marker>
        {/* Focus Location  */}
        <Marker
          coordinate={{
            latitude: dataLocation[current].location.latitude - 0.0014,
            longitude: dataLocation[current].location.longitude,
          }}
        >
          <View style={globalStyle.shadowFade}>
            <Avatar source={Images.pinDot} size={"tiny"} />
          </View>
        </Marker>
        {/* Line map */}
        <Polyline
          coordinates={[
            currentLocation,
            fifteenMinLocation,
            thirtyMinLocation,
            oneHourLocation,
            oneHour15mLocation,
            homeLocation,
          ]}
          strokeColor="#4380FF"
          strokeWidth={3}
        />
      </MapView>
      <Layout style={[styles.bottom, { paddingBottom: bottom }]}>
        <View style={[globalStyle.flexSpaceBetween, styles.titleBottom]}>
          <View>
            <Text category="c4" marginBottom={8}>
              15 {t("minAgo")}
            </Text>
            <Text>1825 Church Ave, Brooklyn, NY 11226</Text>
          </View>
          <TouchableOpacity style={styles.btnDirection} onPress={_onDirection}>
            <Icon pack="assets" name="direction" style={globalStyle.icon16} />
          </TouchableOpacity>
        </View>
        {!showHelper ? (
          <>
            <ScrollView
              horizontal
              ref={refScroll}
              contentContainerStyle={styles.content}
              showsHorizontalScrollIndicator={false}
            >
              <Layout
                style={[styles.line, { width: 99.5 * dataLocation.length }]}
                level={"4"}
              />
              <View
                style={{
                  ...globalStyle.flexSpaceBetween,
                  width: 101 * dataLocation.length,
                }}
              >
                {dataLocation.map((item, index) => {
                  return (
                    <TouchableOpacity
                      key={index}
                      activeOpacity={0.7}
                      onPress={() => {
                        _onPressItem(index);
                      }}
                    >
                      {index !== current ? (
                        <Layout
                          style={[
                            styles.dot,
                            {
                              alignSelf: item.id != 0 ? "center" : "flex-start",
                              marginLeft:
                                item.id === dataLocation.length - 1 ? 12 : 0,
                            },
                          ]}
                          level={"4"}
                        />
                      ) : (
                        <View style={globalStyle.shadowFade}>
                          <Avatar
                            source={Images.pinDot}
                            style={[
                              /* @ts-ignore */
                              styles.pinDot,
                              {
                                alignSelf:
                                  current === dataLocation.length - 1
                                    ? "flex-end"
                                    : "center",
                              },
                            ]}
                          />
                        </View>
                      )}
                      <Text
                        marginTop={8}
                        category="c4"
                        status={current === index ? "danger" : "basic"}
                      >
                        {item.title}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </ScrollView>
            <View style={globalStyle.flexDirection}>
              <Button
                children={t("foundIt").toUpperCase()}
                style={styles.btnFountIt}
                onPress={setShowHelper}
              />
              <Button
                children={t("getHelp").toUpperCase()}
                status={"danger"}
                style={styles.btnHelp}
                onPress={show}
              />
            </View>
          </>
        ) : null}
      </Layout>
      <ModalConfirm
        ref={modalRef}
        style={globalStyle.marH32}
        title={"Get a Help!"}
        description={
          <View>
            <Text category="b2-p" center>
              {t("sentHelperTitle")}
            </Text>
          </View>
        }
        buttonAbove={{
          title: t("sendNow").toUpperCase(),
          onPress: setShowHelper,
        }}
        buttonBelow={{
          title: <Text underline>{t("noThank")}</Text>,
          status: "transparent",
          onPress: hide,
        }}
      />
    </Container>
  );
});

export default TrackingPetLocation;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
    paddingTop: 0,
  },
  content: {
    paddingHorizontal: 16,
    flexDirection: "column",
    marginBottom: 24,
  },
  mapView: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: -10,
    bottom: 0,
  },
  bottom: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    paddingTop: 16,
  },
  avatar: {
    position: "absolute",
    left: 10,
    top: 6,
  },
  pinMap: {
    width: 60,
    height: 65,
  },
  btnDirection: {
    backgroundColor: "color-green-400",
    ...globalStyle.center,
    width: 40,
    height: 40,
    borderRadius: 99,
  },
  titleBottom: {
    marginHorizontal: 16,
    marginBottom: 24,
  },
  dot: {
    borderRadius: 99,
    ...globalStyle.icon8,
  },
  line: {
    height: 2,
    position: "absolute",
    top: 3,
    left: 16,
    right: 0,
  },
  btnFountIt: {
    flex: 1,
    marginHorizontal: 16,
  },
  btnHelp: {
    flex: 1,
    marginRight: 16,
  },
  pinDot: {
    width: 8,
    height: 8,
    borderWidth: 0.5,
    borderColor: "text-danger-color",
  },
});
