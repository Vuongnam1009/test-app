import React, { memo } from "react";
import {
  Layout,
  StyleService,
  useStyleSheet,
  ViewPager,
} from "@ui-kitten/components";
import { NavigationProp, useNavigation } from "@react-navigation/native";

import Content from "components/Content";
import Container from "components/Container";
import TrackingPetModal, { PetProps } from "components/TrackingPetModal";
import { Images } from "assets/images";
import LoadingIndicator from "components/LoadingIndicator";
import useModal from "hooks/useModal";
import { RootStackParamList } from "navigation/types";
import ActivityChart from "./ActivityChart/ActivityChart";
import CalendarComponent from "components/CalendarComponent";
import RestingChart from "./RestChart/RestingChart";
import TabBarAnimation from "./TabBarAnimation";
import TrackingMap from "./TrackingMap";
import useLayout from "hooks/useLayout";
import DropdownPet from "./DropdownPet";

const Activity = memo(() => {
  const { navigate } = useNavigation<NavigationProp<RootStackParamList>>();
  const styles = useStyleSheet(themedStyles);
  const { top, bottom } = useLayout();
  let initValue = {
    id: 0,
    name: "Sam",
    avatar: Images.pet3,
  };
  const [petTracking, setPetTracking] = React.useState<PetProps>(initValue);
  const [loading, setLoading] = React.useState(false);
  const { show, hide, modalRef } = useModal();
  const [selectedIndex, setSelectedIndex] = React.useState(0);

  React.useEffect(() => {
    show();
    if (loading) {
      setTimeout(() => {
        setLoading(false);
      }, 2000);
      clearTimeout();
    } else {
    }
  }, [loading]);

  const _onReload = React.useCallback(() => {}, []);
  const _addPet = React.useCallback(() => {
    navigate("NewPet", { screen: "AddNewPet" });
  }, []);
  const _trackingPetLocation = () => {
    navigate("ActivityStack", { screen: "TrackingPetLocation" });
  };
  return (
    <Container style={styles.container}>
      <DropdownPet
        dataPet={DATA_PET}
        _onReload={_onReload}
        petTracking={petTracking}
        setPetTracking={setPetTracking}
        onPressAddPet={_addPet}
      />
      {loading ? (
        <LoadingIndicator size={"giant"} status={"danger"} />
      ) : (
        <Content
          contentContainerStyle={{
            marginTop: top + 24,
            paddingBottom: bottom + 60,
          }}
        >
          <CalendarComponent />
          <ViewPager
            selectedIndex={selectedIndex}
            onSelect={setSelectedIndex}
            swipeEnabled={true}
          >
            <ActivityChart />
            <RestingChart />
          </ViewPager>
          <TabBarAnimation
            data={["activity", "resting"]}
            selectedIndex={selectedIndex}
            onChange={setSelectedIndex}
          />
          <TrackingMap
            location="51 Clarkson Ave, Brooklyn"
            petName={petTracking?.name}
            onPress={_trackingPetLocation}
          />
        </Content>
      )}
      <TrackingPetModal
        ref={modalRef}
        dataPet={DATA_PET}
        petTracking={petTracking}
        setPetTracking={setPetTracking}
        onPressAddPet={_addPet}
      />
    </Container>
  );
});

export default Activity;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
    paddingBottom: 0,
  },
  chart: {
    marginTop: 32,
    height: 250,
    flex: 1,
  },
});
const DATA_PET = [
  { id: 0, name: "sammy", avatar: Images.pet2 },
  { id: 1, name: "Jame", avatar: Images.pet4 },
];
