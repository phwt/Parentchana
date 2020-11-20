import moment from "moment";

export const currentMonthDays = ({
  toDate,
  defaultItemValue = {},
  keyFormat = undefined,
  weekdayOnly = false,
}) => {
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
    if (
      !(
        weekdayOnly &&
        (dateStart.isoWeekday() === 7 || dateStart.isoWeekday() === 6)
      )
    ) {
      if (keyFormat)
        days[dateStart.clone().format(keyFormat)] = defaultItemValue;
      else days[dateStart.clone()] = defaultItemValue;
    }
    dateStart.add(1, "days");
  }
  return days;
};

export const computeMarkedDates = (dateList) => {
  let i;
  // const APIBefore = [];
  let API = [];
  let checkFirstItem = true;
  let checkDateBefore = "";
  let checkTypeBefore = "";
  let checkOntimeBefore = Boolean;
  let startStatus = true;
  const checkinData = {};

  let date = "";
  let type = "";
  let ff = true;

  // for (i = 0; i < Object.keys(dateList).length; i++) {
  //   // delete object type departure from Data
  //   if (dateList[i].type !== "departure") {
  //     APIBefore.push(dateList[i]);
  //   }
  // }

  for (i = 0; i < dateList.length; i++) {
    // check after type == absent
    if (ff) {
      API.push(dateList[i]);
      type = dateList[i].type;
      date = moment.unix(dateList[i].timestamp.seconds).format("YYYYMMDD");
      ff = false;
    } else if (
      moment.unix(dateList[i].timestamp.seconds).format("YYYYMMDD") === date &&
      type === "absent" &&
      dateList[i].type === "arrival"
    ) {
      API.pop();
      API.push(dateList[i]);
      type = dateList[i].type;
      date = moment.unix(dateList[i].timestamp.seconds).format("YYYYMMDD");
    } else {
      API.push(dateList[i]);
      type = dateList[i].type;
      date = moment.unix(dateList[i].timestamp.seconds).format("YYYYMMDD");
    }
  }

  let aux = "";
  const swarp = (arr, i1, i2) => { //swarp item in array
    aux = arr[i1];
    arr[i1] = arr[i2];
    arr[i2] = aux;
    return arr;
  };

  let isSorted = false;
  let lastUnsorted = API.length - 1;
  while (!isSorted) { // sort arr by date
    for (i = 0; i < lastUnsorted; i++) {
      isSorted = true;
      if (moment.unix(API[i].timestamp.seconds).format("YYYY-MM-DD") > moment.unix(API[(i + 1)].timestamp.seconds).format("YYYY-MM-DD")) {
        swarp(API, i, i + 1);
        isSorted = false;
      }
    }
    lastUnsorted--;
  }

  let isSorted2 = false;
  let lastUnsorted2 = API.length - 1;
  while (!isSorted2) { // sort arr by type (arrival between departure)
    for (i = 0; i < lastUnsorted2; i++) {
      isSorted2 = true;
      if (API[i].type == "departure" && API[i + 1].type == "arrival" && moment.unix(API[i].timestamp.seconds).format("YYYY-MM-DD") == moment.unix(API[(i + 1)].timestamp.seconds).format("YYYY-MM-DD")) {
        swarp(API, i, i + 1);
        isSorted2 = false;
      }
    }
    lastUnsorted2--;
  }


  for (i = 0; i < API.length; i++) {
    // console.log("-----------------------------------", API.length);
    // console.log(moment.unix(API[i].timestamp.seconds).format("YYYY-MM-DD"));
    // console.log(API[i].ontime)
    // console.log(API[i].type)

    if (API[i].type === "arrival") {
      if (API[i].ontime) {
        checkinData[moment.unix(API[i].timestamp.seconds).format("YYYY-MM-DD")] = { textColor: "white", startingDay: true, endingDay: true, color: "#249d3c", };
      }
      else {
        checkinData[moment.unix(API[i].timestamp.seconds).format("YYYY-MM-DD")] = { textColor: "white", startingDay: true, endingDay: true, color: "#ff9a00", };
      }
    }
    else if (API[i].type === "departure") {
      if (!API[i].ontime) {
        checkinData[moment.unix(API[i].timestamp.seconds).format("YYYY-MM-DD")] = { textColor: "white", startingDay: true, endingDay: true, color: "#ff9a00", };
      }
    }
  }

  return checkinData;
};





// if (API[i].type === "arrival") {
//   if (API[i].ontime) {
//     if (checkFirstItem === true) {
//       checkinData[
//         moment.unix(API[i].timestamp.seconds).format("YYYY-MM-DD")
//       ] = {
//         textColor: "white",
//         startingDay: true,
//         endingDay: true,
//         color: "#249d3c",
//       };
//       checkDateBefore = moment
//         .unix(API[i].timestamp.seconds)
//         .format("YYYYMMDD");
//       checkTypeBefore = "arrival";
//       checkFirstItem = false;
//       checkOntimeBefore = API[i].ontime;
//     } else if (
//       moment.unix(API[i].timestamp.seconds).format("YYYYMMDD") - 1 ===
//       Number(checkDateBefore) &&
//       checkTypeBefore === API[i].type &&
//       checkOntimeBefore === API[i].ontime
//     ) {
//       checkinData[
//         moment.unix(API[i - 1].timestamp.seconds).format("YYYY-MM-DD")
//       ] = {
//         textColor: "white",
//         startingDay: startStatus,
//         endingDay: false,
//         color: "#249d3c",
//       };
//       checkinData[
//         moment.unix(API[i].timestamp.seconds).format("YYYY-MM-DD")
//       ] = {
//         textColor: "white",
//         startingDay: false,
//         endingDay: true,
//         color: "#249d3c",
//       };
//       checkDateBefore = moment
//         .unix(API[i].timestamp.seconds)
//         .format("YYYYMMDD");
//       checkTypeBefore = "arrival";
//       checkOntimeBefore = API[i].ontime;
//       startStatus = false;
//     } else {
//       checkinData[
//         moment.unix(API[i].timestamp.seconds).format("YYYY-MM-DD")
//       ] = {
//         textColor: "white",
//         startingDay: true,
//         endingDay: true,
//         color: "#249d3c",
//       };
//       checkDateBefore = moment
//         .unix(API[i].timestamp.seconds)
//         .format("YYYYMMDD");
//       checkTypeBefore = "arrival";
//       startStatus = true;
//       checkOntimeBefore = API[i].ontime;
//     }
//   } else {
//     if (checkFirstItem === true) {
//       checkinData[
//         moment.unix(API[i].timestamp.seconds).format("YYYY-MM-DD")
//       ] = {
//         textColor: "white",
//         startingDay: true,
//         endingDay: true,
//         color: "#ff9a00",
//       };
//       checkDateBefore = moment
//         .unix(API[i].timestamp.seconds)
//         .format("YYYYMMDD");
//       checkTypeBefore = "arrival";
//       checkFirstItem = false;
//       checkOntimeBefore = API[i].ontime;
//     } else if (
//       moment.unix(API[i].timestamp.seconds).format("YYYYMMDD") - 1 ===
//       Number(checkDateBefore) &&
//       checkTypeBefore === API[i].type &&
//       checkOntimeBefore === API[i].ontime
//     ) {
//       checkinData[
//         moment.unix(API[i - 1].timestamp.seconds).format("YYYY-MM-DD")
//       ] = {
//         textColor: "white",
//         startingDay: startStatus,
//         endingDay: false,
//         color: "#ff9a00",
//       };
//       checkinData[
//         moment.unix(API[i].timestamp.seconds).format("YYYY-MM-DD")
//       ] = {
//         textColor: "white",
//         startingDay: false,
//         endingDay: true,
//         color: "#ff9a00",
//       };
//       checkDateBefore = moment
//         .unix(API[i].timestamp.seconds)
//         .format("YYYYMMDD");
//       checkTypeBefore = "arrival";
//       checkOntimeBefore = API[i].ontime;
//       startStatus = false;
//     } else {
//       checkinData[
//         moment.unix(API[i].timestamp.seconds).format("YYYY-MM-DD")
//       ] = {
//         textColor: "white",
//         startingDay: true,
//         endingDay: true,
//         color: "#ff9a00",
//       };
//       checkDateBefore = moment
//         .unix(API[i].timestamp.seconds)
//         .format("YYYYMMDD");
//       checkTypeBefore = "arrival";
//       startStatus = true;
//       checkOntimeBefore = API[i].ontime;
//     }
//   }
// } 
// else if (API[i].type === "absent") {
//   if (checkFirstItem === true) {
//     checkinData[
//       moment.unix(API[i].timestamp.seconds).format("YYYY-MM-DD")
//     ] = {
//       textColor: "white",
//       startingDay: true,
//       endingDay: true,
//       color: "#d72f3c",
//     };
//     checkDateBefore = moment
//       .unix(API[i].timestamp.seconds)
//       .format("YYYY-MM-DD");
//     checkTypeBefore = "absent";
//     checkFirstItem = false;
//     checkOntimeBefore = API[i].ontime;
//   } else if (
//     moment.unix(API[i].timestamp.seconds).format("YYYYMMDD") - 1 ===
//     Number(checkDateBefore) &&
//     checkTypeBefore === API[i].type &&
//     checkOntimeBefore === API[i].ontime
//   ) {
//     checkinData[
//       moment.unix(API[i - 1].timestamp.seconds).format("YYYY-MM-DD")
//     ] = {
//       textColor: "white",
//       startingDay: startStatus,
//       endingDay: false,
//       color: "#d72f3c",
//     };
//     checkinData[
//       moment.unix(API[i].timestamp.seconds).format("YYYY-MM-DD")
//     ] = {
//       textColor: "white",
//       startingDay: false,
//       endingDay: true,
//       color: "#d72f3c",
//     };
//     checkDateBefore = moment
//       .unix(API[i].timestamp.seconds)
//       .format("YYYYMMDD");
//     checkTypeBefore = "absent";
//     checkOntimeBefore = API[i].ontime;
//     startStatus = false;
//   } else {
//     checkinData[
//       moment.unix(API[i].timestamp.seconds).format("YYYY-MM-DD")
//     ] = {
//       textColor: "white",
//       startingDay: true,
//       endingDay: true,
//       color: "#d72f3c",
//     };
//     checkDateBefore = moment
//       .unix(API[i].timestamp.seconds)
//       .format("YYYYMMDD");
//     checkTypeBefore = "absent";
//     startStatus = true;
//     checkOntimeBefore = API[i].ontime;
//   }
// }