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
  let API = [];
  const checkinData = {};

  let date = "";
  let type = "";
  let ff = true;

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

  let listConvert = currentMonthDays({
    toDate: moment(new Date(), "DD/MM/YYYY"),
    keyFormat: "YYYY-MM-DD",
    weekdayOnly: true,
  });

  API.map((item) => {
    const date = moment.unix(item.timestamp.seconds).format("YYYY-MM-DD");
    let addObject;
    if (Object.entries(listConvert[date]).length === 0) {
      addObject = {
        ontime: item.ontime,
        type: item.type,
        date: date,
      };
    } else {
      addObject = {
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
  API.sort((a, b) =>
    a.timestamp.seconds > b.timestamp.seconds
      ? 1
      : b.timestamp.seconds > a.timestamp.seconds
      ? -1
      : 0
  );

  Object.keys(listConvert).map((item) => {
    if (Object.entries(listConvert[item]).length === 3) {
      if (listConvert[item].ontime) {
        checkinData[listConvert[item].date] = {
          textColor: "white",
          startingDay: true,
          endingDay: true,
          color: "#249d3c",
        };
      } else {
        checkinData[listConvert[item].date] = {
          textColor: "white",
          startingDay: true,
          endingDay: true,
          color: "#ff9a00",
        };
      }
    } else if (Object.entries(listConvert[item]).length === 6) {
      if (
        (listConvert[item].ontime === true) &
        (listConvert[item].ontime2 === true)
      ) {
        checkinData[listConvert[item].date] = {
          textColor: "white",
          startingDay: true,
          endingDay: true,
          color: "#249d3c",
        };
      } else {
        checkinData[listConvert[item].date] = {
          textColor: "white",
          startingDay: true,
          endingDay: true,
          color: "#ff9a00",
        };
      }
    } else if (Object.entries(listConvert[item]).length === 0) {
      checkinData[item] = {
        textColor: "white",
        startingDay: true,
        endingDay: true,
        color: "#d72f3c",
      };
    }
  });

  return checkinData;
};
