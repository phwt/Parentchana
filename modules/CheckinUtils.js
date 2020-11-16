import moment from "moment";

export const currentMonthDays = (toDate, defaultItemValue = {}) => {
  const days = {};
  const dateStart = toDate.startOf("month");
  let dateEnd;

  if (toDate.startOf("month").diff(moment().startOf("month")) === 0) {
    // Current month
    dateEnd = dateStart.clone().add(moment().diff(dateStart, "days"), "days");
  } else {
    // Past Month
    dateEnd = dateStart.clone().endOf("month");
  }

  while (dateEnd.diff(dateStart, "days") >= 0) {
    days[dateStart.clone()] = defaultItemValue;
    dateStart.add(1, "days");
  }
  return days;
};
