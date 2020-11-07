import { calendarAPI, checkinAPI } from "./mockData";

export default {
  pickup: {
    list: [
      {
        id: "asdas",
        timestamp: new Date(),
        plate: `${Math.floor(1 + Math.random()) * 9} AB ${Math.floor(
          1000 + Math.random() * 9000
        )}`,
        students: [
          `61070${Math.floor(100 + Math.random() * 900)}`,
          `61070${Math.floor(100 + Math.random() * 900)}`,
          `61070${Math.floor(100 + Math.random() * 900)}`,
        ],
      },
      {
        id: "asdasdsdas",
        timestamp: new Date(),
        plate: `${Math.floor(1 + Math.random()) * 9} AB ${Math.floor(
          1000 + Math.random() * 9000
        )}`,
        students: [
          `61070${Math.floor(100 + Math.random() * 900)}`,
          `61070${Math.floor(100 + Math.random() * 900)}`,
          `61070${Math.floor(100 + Math.random() * 900)}`,
        ],
      },
    ],
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
