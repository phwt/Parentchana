import { calendarAPI, checkinAPI } from "./mockData";

export default {
  pickup: {
    registeredPlate: "12 AB 4567",
    registeredStudent: ["12345", "12346", "12347"],
  },
  calendar: {
    list: calendarAPI,
    favorite: [],
  },
  checkin: {
    list: checkinAPI,
  },
};
