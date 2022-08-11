import { useTheme } from "@ui-kitten/components";
import React, { memo, useState } from "react";
import { StyleSheet, View } from "react-native";
import CalendarStrip from "react-native-calendar-strip";
import moment from "moment";
import Text from "components/Text";

interface CalendarProps {
  onPress?(): void;
  current?: string;
  selected?: string;
}

const CalendarComponent = memo(() => {
  const [customDatesStyles, setCustomDatesStyles] = useState([]);
  const [markedDates, setMarkedDates] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");
  const theme = useTheme();

  let startDate = moment();
  for (let i = 0; i < 7; i++) {
    let date = startDate.clone().add(i, "days");
    customDatesStyles.push({
      /* @ts-ignore */
      startDate: date, // Single date since no endDate provided
      dateNumberStyle: {
        color: "#1D1E2C",
        fontFamily: "Montserrat-Regular",
        fontSize: 14,
        lineHeight: 17.07,
      },
      highlightDateNameStyle: { color: "#FFFFFF" },
      highlightDateNumberStyle: { color: "#FFFFFF" },
      // Random color...
      dateContainerStyle: {
        /* @ts-ignore */
        backgroundColor: `transparent`,
      },
    });
    let dots = [];

    dots.push({
      selectedColor: "#9265DC",
    });
    markedDates.push({
      date,
      dots,
    });
  }

  const datesBlacklistFunc = (date: { isoWeekday: () => number }) => {
    return date.isoWeekday() === 7;
  };

  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginHorizontal: 36,
        }}
      >
        {DATE.map((item, i) => {
          return (
            <Text key={i} category="c4" uppercase center style={{ width: 42 }}>
              {item}
            </Text>
          );
        })}
      </View>
      <CalendarStrip
        calendarAnimation={{ type: "sequence", duration: 80 }}
        daySelectionAnimation={{
          type: "background",
          duration: 300,
          highlightColor: "#1D1E2C",
        }}
        style={styles.calendar}
        calendarHeaderStyle={styles.calendarHeaderStyle}
        calendarHeaderPosition={"below"}
        calendarColor={"transparent"}
        showDayName={false}
        dateNumberStyle={{
          color: "#1D1E2C",
          fontFamily: "Montserrat-Regular",
          fontSize: 14,
          lineHeight: 17.07,
          fontWeight: "500",
        }}
        selectedDate={new Date()}
        customDatesStyles={[
          { startDate: "2021-12-17T18:37:27.278Z" },
          { highlightDateNumberStyle: { color: "#FFFFFF" } },
          { highlightDateNameStyle: { color: "#FFFFFF" } },
          { dateContainerStyle: { backgroundColor: "transparent" } },
        ]}
        highlightDateNameStyle={{ color: "#FFFFFF" }}
        highlightDateNumberStyle={{ color: "#FFFFFF" }}
        highlightDateContainerStyle={{ backgroundColor: "#FA4169" }}
        // datesBlacklist={datesBlacklistFunc}
        markedDates={markedDates}
      />
    </View>
  );
});

export default CalendarComponent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderBottomColor: "rgba(141, 151, 158, 0.2)",
    borderBottomWidth: 1,
    paddingBottom: 8,
    marginBottom: 46,
  },
  calendar: {
    borderBottomRightRadius: 12,
    borderBottomLeftRadius: 12,
    shadowColor: "rgba(141, 151, 158, 0.2)",
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16,
    paddingHorizontal: 16,
  },
  calendarHeaderStyle: {
    color: "red",
    position: "absolute",
    height: 0,
  },
});
const DATE = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
