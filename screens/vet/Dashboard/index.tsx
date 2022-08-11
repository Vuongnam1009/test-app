import React, { memo } from "react";
import { StyleService, useStyleSheet } from "@ui-kitten/components";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import useLayout from "hooks/useLayout";
import Content from "components/Content";
import Container from "components/Container";
import TrackingPetModal, { PetProps } from "components/TrackingPetModal";
import { RootStackParamList } from "navigation/types";
import Chart from "../Component/Chart";
import { LinearGradient } from "expo-linear-gradient";
import NextAppointment from "../Component/NextAppointment";
import DropdownPet from "screens/main/Activity/DropdownPet";
import { Images } from "assets/images";
import useModal from "hooks/useModal";
import WeightPetModal from "../Component/WeightPetModal";
import { DATA_NEXT_APPOINTMENT } from "constants/Data";
import AdMob from "components/AdMob";

const Dashboard = memo(() => {
  const { navigate } = useNavigation<NavigationProp<RootStackParamList>>();
  const { height, width, top, bottom } = useLayout();
  const styles = useStyleSheet(themedStyles);

  const [updateWeight, setUpdateWeight] = React.useState("");
  let initValue = {
    id: 0,
    name: "Sam",
    avatar: Images.pet3,
  };
  const [petTracking, setPetTracking] = React.useState<PetProps>(initValue);
  const [loading, setLoading] = React.useState(false);
  const { show, hide, modalRef } = useModal();
  const {
    show: showWeight,
    hide: hideWeight,
    modalRef: modalRefWeight,
  } = useModal();
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
    hide();
    navigate("NewPet", { screen: "AddNewPet" });
  }, []);
  return (
    <Container style={styles.container}>
      <DropdownPet
        dataPet={DATA_PET}
        _onReload={_onReload}
        petTracking={petTracking}
        setPetTracking={setPetTracking}
        onPressAddPet={_addPet}
      />
      <Content
        style={{
          marginTop: top + 24,
          paddingTop: 24,
        }}
        contentContainerStyle={{
          paddingBottom: bottom + 60,
        }}
        level="2"
      >
        <LinearGradient
          colors={["#A494FC", "#6266F9"]}
          style={styles.chartView}
        >
          <Chart
            onUpdate={showWeight}
            data={Data_Weight}
            title={"Weight"}
            strokeColor={"#ffffff"}
            lastData={Data_Weight[Data_Weight.length - 1]}
          />
        </LinearGradient>
        <AdMob marginTop={16} />
        <NextAppointment
          data={DATA_NEXT_APPOINTMENT}
          title="Next Appointment"
          style={styles.nextAppointment}
        />
      </Content>
      <TrackingPetModal
        ref={modalRef}
        dataPet={DATA_PET}
        petTracking={petTracking}
        setPetTracking={setPetTracking}
        onPressAddPet={_addPet}
      />
      <WeightPetModal
        ref={modalRefWeight}
        weightPet={updateWeight}
        _onSubmit={setUpdateWeight}
      />
    </Container>
  );
});

export default Dashboard;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
  },
  chartView: {
    marginHorizontal: 16,
    borderRadius: 10,
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  nextAppointment: {
    paddingHorizontal: 16,
  },
});
export const Data_Weight = [
  { x: 1, y: 40 },
  { x: 2, y: 90 },
  { x: 3, y: 100 },
  { x: 4, y: 80 },
  { x: 5, y: 60 },
  { x: 6, y: 130 },
];
const DATA_PET = [
  { id: 0, name: "sammy", avatar: Images.pet2 },
  { id: 1, name: "Jame", avatar: Images.pet4 },
];
