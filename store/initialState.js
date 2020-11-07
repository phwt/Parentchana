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
  },
};
