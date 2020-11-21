import moment from "moment";
import React, { useCallback, useEffect, useState } from "react";
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

  // let y = { "aaa": { seconds: 456 }, "bbb": { seconds: 123 } }
  // Object.fromEntries(Object.entries(y).sort((x, y) => x[1].seconds - y[1].seconds))

  let listConvert = currentMonthDays({
    toDate: moment(new Date(), "DD/MM/YYYY"),
    keyFormat: "YYYY-MM-DD",
    weekdayOnly: true,
  })

  API.map((item) => {
    // console.log(moment.unix(item.timestamp.seconds).format("YYYY-MM-DD"));
    const date = moment.unix(item.timestamp.seconds).format("YYYY-MM-DD");
    // console.log(listConvert[date]);
    if (Object.entries(listConvert[date]).length == 0) {
      var addObject = {
        ontime: item.ontime,
        type: item.type,
        date: date,
      };
    }
    else {
      var addObject = {
        ontime: listConvert[date].ontime,
        type: listConvert[date].type,
        date: listConvert[date].date,
        ontime2: item.ontime,
        type2: item.type,
        date2: date,
      };
    }
    listConvert[date] = addObject;
  });
  // console.log(listConvert);
  API.sort((a, b) =>
    a.timestamp.seconds > b.timestamp.seconds
      ? 1
      : b.timestamp.seconds > a.timestamp.seconds
        ? -1
        : 0
  );

  // let cc = Object.fromEntries(Object.entries(API).sort((a1, a2) => a1[1].timestamp.seconds - a2[1].timestamp.seconds))
  // console.log(cc);
  // let aux = "";
  // const swarp = (arr, i1, i2) => { //swarp item in array
  //   aux = arr[i1];
  //   arr[i1] = arr[i2];
  //   arr[i2] = aux;
  //   return arr;
  // };
  // console.log(API);
  // let isSorted = false;
  // let lastUnsorted = API.length - 1;
  // while (!isSorted) { // sort arr by date
  //   for (i = 0; i < lastUnsorted; i++) {
  //     isSorted = true;
  //     if (moment.unix(API[i].timestamp.seconds).format("YYYY-MM-DD") > moment.unix(API[(i + 1)].timestamp.seconds).format("YYYY-MM-DD")) {
  //       swarp(API, i, i + 1);
  //       isSorted = false;
  //     }
  //   }
  //   lastUnsorted--;
  // }

  Object.keys(listConvert).map((item) => {
    console.log(item);
    
    // console.log(Object.entries(listConvert[item]).length);
    if (Object.entries(listConvert[item]).length == 3) {
      if (listConvert[item].ontime) {
        checkinData[listConvert[item].date] = { textColor: "white", startingDay: true, endingDay: true, color: "#249d3c", };
      }
      else {
        checkinData[listConvert[item].date] = { textColor: "white", startingDay: true, endingDay: true, color: "#ff9a00", };
      }
    }
    else if (Object.entries(listConvert[item]).length == 6) {
      if (listConvert[item].ontime == true & listConvert[item].ontime2 == true) {
        checkinData[listConvert[item].date] = { textColor: "white", startingDay: true, endingDay: true, color: "#249d3c", };
      }
      else {
        checkinData[listConvert[item].date] = { textColor: "white", startingDay: true, endingDay: true, color: "#ff9a00", };
      }
    }
    else if (Object.entries(listConvert[item]).length == 0){
      checkinData[item] = { textColor: "white", startingDay: true, endingDay: true, color: "#d72f3c", };
    }

  })

  // console.log(checkinData);
  // console.log(Object.keys(listConvert).length);
  // for (i = 0; i < API.length; i++) {
  // console.log("-----------------------------------", API.length);
  // console.log(moment.unix(API[i].timestamp.seconds).format("YYYY-MM-DD"));
  // console.log(API[i].ontime)
  // console.log(API[i].type)
  //   if (API[i].type === "arrival") {
  //     if (API[i].ontime) {
  //       checkinData[moment.unix(API[i].timestamp.seconds).format("YYYY-MM-DD")] = { textColor: "white", startingDay: true, endingDay: true, color: "#249d3c", };
  //     }
  //     else {
  //       checkinData[moment.unix(API[i].timestamp.seconds).format("YYYY-MM-DD")] = { textColor: "white", startingDay: true, endingDay: true, color: "#ff9a00", };
  //     }
  //   }
  //   else if (API[i].type === "departure") {
  //     if (!API[i].ontime) {
  //       checkinData[moment.unix(API[i].timestamp.seconds).format("YYYY-MM-DD")] = { textColor: "white", startingDay: true, endingDay: true, color: "#ff9a00", };
  //     }
  //   }
  // }

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