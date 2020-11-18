import moment from "moment";

export const currentMonthDays = (
  toDate,
  defaultItemValue = {},
  keyFormat = undefined
) => {
  const days = {};
  const dateStart = toDate.startOf("month");
  let dateEnd = dateStart.clone().endOf("month");

  // if (toDate.startOf("month").diff(moment().startOf("month")) === 0) {
  //   // Current month
  //   dateEnd = dateStart.clone().add(moment().diff(dateStart, "days"), "days");
  // } else {
  //   // Past Month
  //   dateEnd = dateStart.clone().endOf("month");
  // }

  while (dateEnd.diff(dateStart) > 0) {
    if (keyFormat) days[dateStart.clone().format(keyFormat)] = defaultItemValue;
    else days[dateStart.clone()] = defaultItemValue;
    dateStart.add(1, "days");
  }
  return days;
};

export const computeMarkedDates = (dateList) => {
  let i;
  const APIBefore = [];
  const API = [];
  let checkFirstItem = true;
  let checkDateBefore = "";
  let checkTypeBefore = "";
  let checkOntimeBefore = Boolean;
  let startStatus = true;
  const checkinData = {};

  let date = "";
  let type = "";
  let ff = true;

  for (i = 0; i < Object.keys(dateList).length; i++) {
    // delete object type departure from Data
    if (dateList[i].type !== "departure") {
      APIBefore.push(dateList[i]);
    }
  }
  for (i = 0; i < APIBefore.length; i++) {
    // check after type == absent
    if (ff) {
      API.push(APIBefore[i]);
      type = APIBefore[i].type;
      date = moment.unix(APIBefore[i].timestamp.seconds).format("YYYYMMDD");
      ff = false;
    } else if (
      moment.unix(APIBefore[i].timestamp.seconds).format("YYYYMMDD") === date &&
      type === "absent" &&
      APIBefore[i].type === "arrival"
    ) {
      API.pop();
      API.push(APIBefore[i]);
      type = APIBefore[i].type;
      date = moment.unix(APIBefore[i].timestamp.seconds).format("YYYYMMDD");
    } else {
      API.push(APIBefore[i]);
      type = APIBefore[i].type;
      date = moment.unix(APIBefore[i].timestamp.seconds).format("YYYYMMDD");
    }
  }
  for (i = 0; i < API.length; i++) {
    if (API[i].type === "arrival") {
      if (API[i].ontime) {
        if (checkFirstItem === true) {
          checkinData[
            moment.unix(API[i].timestamp.seconds).format("YYYY-MM-DD")
          ] = {
            textColor: "white",
            startingDay: true,
            endingDay: true,
            color: "#249d3c",
          };
          checkDateBefore = moment
            .unix(API[i].timestamp.seconds)
            .format("YYYYMMDD");
          checkTypeBefore = "arrival";
          checkFirstItem = false;
          checkOntimeBefore = API[i].ontime;
        } else if (
          moment.unix(API[i].timestamp.seconds).format("YYYYMMDD") - 1 ===
            Number(checkDateBefore) &&
          checkTypeBefore === API[i].type &&
          checkOntimeBefore === API[i].ontime
        ) {
          checkinData[
            moment.unix(API[i - 1].timestamp.seconds).format("YYYY-MM-DD")
          ] = {
            textColor: "white",
            startingDay: startStatus,
            endingDay: false,
            color: "#249d3c",
          };
          checkinData[
            moment.unix(API[i].timestamp.seconds).format("YYYY-MM-DD")
          ] = {
            textColor: "white",
            startingDay: false,
            endingDay: true,
            color: "#249d3c",
          };
          checkDateBefore = moment
            .unix(API[i].timestamp.seconds)
            .format("YYYYMMDD");
          checkTypeBefore = "arrival";
          checkOntimeBefore = API[i].ontime;
          startStatus = false;
        } else {
          checkinData[
            moment.unix(API[i].timestamp.seconds).format("YYYY-MM-DD")
          ] = {
            textColor: "white",
            startingDay: true,
            endingDay: true,
            color: "#249d3c",
          };
          checkDateBefore = moment
            .unix(API[i].timestamp.seconds)
            .format("YYYYMMDD");
          checkTypeBefore = "arrival";
          startStatus = true;
          checkOntimeBefore = API[i].ontime;
        }
      } else {
        if (checkFirstItem === true) {
          checkinData[
            moment.unix(API[i].timestamp.seconds).format("YYYY-MM-DD")
          ] = {
            textColor: "white",
            startingDay: true,
            endingDay: true,
            color: "#ff9a00",
          };
          checkDateBefore = moment
            .unix(API[i].timestamp.seconds)
            .format("YYYYMMDD");
          checkTypeBefore = "arrival";
          checkFirstItem = false;
          checkOntimeBefore = API[i].ontime;
        } else if (
          moment.unix(API[i].timestamp.seconds).format("YYYYMMDD") - 1 ===
            Number(checkDateBefore) &&
          checkTypeBefore === API[i].type &&
          checkOntimeBefore === API[i].ontime
        ) {
          checkinData[
            moment.unix(API[i - 1].timestamp.seconds).format("YYYY-MM-DD")
          ] = {
            textColor: "white",
            startingDay: startStatus,
            endingDay: false,
            color: "#ff9a00",
          };
          checkinData[
            moment.unix(API[i].timestamp.seconds).format("YYYY-MM-DD")
          ] = {
            textColor: "white",
            startingDay: false,
            endingDay: true,
            color: "#ff9a00",
          };
          checkDateBefore = moment
            .unix(API[i].timestamp.seconds)
            .format("YYYYMMDD");
          checkTypeBefore = "arrival";
          checkOntimeBefore = API[i].ontime;
          startStatus = false;
        } else {
          checkinData[
            moment.unix(API[i].timestamp.seconds).format("YYYY-MM-DD")
          ] = {
            textColor: "white",
            startingDay: true,
            endingDay: true,
            color: "#ff9a00",
          };
          checkDateBefore = moment
            .unix(API[i].timestamp.seconds)
            .format("YYYYMMDD");
          checkTypeBefore = "arrival";
          startStatus = true;
          checkOntimeBefore = API[i].ontime;
        }
      }
    }
    else if (API[i].type === "absent") {
      if (checkFirstItem === true) {
        checkinData[
          moment.unix(API[i].timestamp.seconds).format("YYYY-MM-DD")
        ] = {
          textColor: "white",
          startingDay: true,
          endingDay: true,
          color: "#d72f3c",
        };
        checkDateBefore = moment
          .unix(API[i].timestamp.seconds)
          .format("YYYY-MM-DD");
        checkTypeBefore = "absent";
        checkFirstItem = false;
        checkOntimeBefore = API[i].ontime;
      } else if (
        moment.unix(API[i].timestamp.seconds).format("YYYYMMDD") - 1 ===
          Number(checkDateBefore) &&
        checkTypeBefore === API[i].type &&
        checkOntimeBefore === API[i].ontime
      ) {
        checkinData[
          moment.unix(API[i - 1].timestamp.seconds).format("YYYY-MM-DD")
        ] = {
          textColor: "white",
          startingDay: startStatus,
          endingDay: false,
          color: "#d72f3c",
        };
        checkinData[
          moment.unix(API[i].timestamp.seconds).format("YYYY-MM-DD")
        ] = {
          textColor: "white",
          startingDay: false,
          endingDay: true,
          color: "#d72f3c",
        };
        checkDateBefore = moment
          .unix(API[i].timestamp.seconds)
          .format("YYYYMMDD");
        checkTypeBefore = "absent";
        checkOntimeBefore = API[i].ontime;
        startStatus = false;
      } else {
        checkinData[
          moment.unix(API[i].timestamp.seconds).format("YYYY-MM-DD")
        ] = {
          textColor: "white",
          startingDay: true,
          endingDay: true,
          color: "#d72f3c",
        };
        checkDateBefore = moment
          .unix(API[i].timestamp.seconds)
          .format("YYYYMMDD");
        checkTypeBefore = "absent";
        startStatus = true;
        checkOntimeBefore = API[i].ontime;
      }
    }
  }

  return checkinData;
};
