import { calendarAPI, checkinAPI } from "./mockData";

export default {
  auth: {
    authenticated: false,
    role: 0,
    profile: {},
  },
  pickup: {
    registeredPlate: "12 AB 4567",
    registeredStudent: ["12345", "12346", "12347"],
  },
  calendar: {
    events: [],
    favorite: [],
  },
  checkin: {
    list: checkinAPI,
  },
};
