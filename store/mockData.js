export const checkinAPI = [
  // 02/11 - Arrive on-time | Depart early
  {
    studentId: "12345",
    type: "arrival",
    ontime: true,
    timestamp: {
      seconds: 1604302932,
    },
  },
  {
    studentId: "12345",
    type: "departure",
    ontime: false,
    timestamp: {
      seconds: 1604304763,
    },
  },
  // 03/11 - Arrive on-time | Depart on-time
  {
    studentId: "12345",
    type: "arrival",
    ontime: true,
    timestamp: {
      seconds: 1604364791,
    },
  },
  {
    studentId: "12345",
    type: "departure",
    ontime: true,
    timestamp: {
      seconds: 1604397555,
    },
  },
  // 04/11 - Absent (no arrival and departure data)
  // {
  //   studentId: "12345",
  //   type: "absent",
  //   ontime: false,
  //   timestamp: {
  //     seconds: 1604455200,
  //   },
  // },
  // 05/11 - Arrive late (before 09:00 check) | Depart on-time
  {
    studentId: "12345",
    type: "arrival",
    ontime: false,
    timestamp: {
      seconds: 1604540744,
    },
  },
  {
    studentId: "12345",
    type: "departure",
    ontime: true,
    timestamp: {
      seconds: 1604571163,
    },
  },
  // 06/11 - Arrive late (after 09:00 check) | Depart on-time
  // {
  //   studentId: "12345",
  //   type: "absent",
  //   ontime: false,
  //   timestamp: {
  //     seconds: 1604628000,
  //   },
  // },
  {
    studentId: "12345",
    type: "arrival",
    ontime: false,
    timestamp: {
      seconds: 1604636624,
    },
  },
  {
    studentId: "12345",
    type: "departure",
    ontime: true,
    timestamp: {
      seconds: 1604658476,
    },
  },
];

export const calendarAPI = [
  {
    kind: "calendar#event",
    etag: "XXXXXXXXXXXXXXXX",
    id: "3br302",
    status: "confirmed",
    htmlLink: "https://www.google.com/calendar/event?eid=xxxxxx",
    created: "2020-06-25T07:08:19.000Z",
    updated: "2020-06-25T07:08:19.076Z",
    summary: "ประชุมครู",
    creator: {
      email: "email@example.com",
      self: true,
    },
    organizer: {
      email: "email@example.com",
      self: true,
    },
    start: {
      date: "2020-11-06",
    },
    end: {
      date: "2020-11-07",
    },
    transparency: "transparent",
    iCalUID: "xxxxxxx@google.com",
    sequence: 0,
    reminders: {
      useDefault: false,
    },
  },
  {
    kind: "calendar#event",
    etag: "XXXXXXXXXXXXXXXX",
    id: "3sgoi7",
    status: "confirmed",
    htmlLink: "https://www.google.com/calendar/event?eid=xxxxxx",
    created: "2020-06-25T07:08:42.000Z",
    updated: "2020-06-25T07:08:42.629Z",
    summary: "เรียนพิเศษวันเสาร์",
    creator: {
      email: "email@example.com",
      self: true,
    },
    organizer: {
      email: "email@example.com",
      self: true,
    },
    start: {
      date: "2020-11-07",
    },
    end: {
      date: "2020-11-08",
    },
    transparency: "transparent",
    iCalUID: "xxxxxxx@google.com",
    sequence: 0,
    reminders: {
      useDefault: false,
    },
  },
  {
    kind: "calendar#event",
    etag: "XXXXXXXXXXXXXXXX",
    id: "2hbrma",
    status: "confirmed",
    htmlLink: "https://www.google.com/calendar/event?eid=xxxxxx",
    created: "2020-08-19T07:49:30.000Z",
    updated: "2020-08-19T07:49:54.998Z",
    summary: "ชั้นประถม 1-6 สอบปลายภาค",
    creator: {
      email: "email@example.com",
      self: true,
    },
    organizer: {
      email: "email@example.com",
      self: true,
    },
    start: {
      date: "2020-11-06",
    },
    end: {
      date: "2020-11-07",
    },
    iCalUID: "xxxxxxx@google.com",
    sequence: 1,
    reminders: {
      useDefault: false,
    },
  },
  {
    kind: "calendar#event",
    etag: "XXXXXXXXXXXXXXXX",
    id: "1jf1tq",
    status: "confirmed",
    htmlLink: "https://www.google.com/calendar/event?eid=xxxxxx",
    created: "2020-08-19T07:50:42.000Z",
    updated: "2020-08-19T07:50:42.033Z",
    summary: "ชั้นมัธยม 1-6 หยุดเตรียมสอบ",
    creator: {
      email: "email@example.com",
      self: true,
    },
    organizer: {
      email: "email@example.com",
      self: true,
    },
    start: {
      date: "2020-11-06",
    },
    end: {
      date: "2020-11-07",
    },
    transparency: "transparent",
    iCalUID: "xxxxxxx@google.com",
    sequence: 0,
    reminders: {
      useDefault: false,
    },
  },
  {
    kind: "calendar#event",
    etag: "XXXXXXXXXXXXXXXX",
    id: "6fqlp2",
    status: "confirmed",
    htmlLink: "https://www.google.com/calendar/event?eid=xxxxxx",
    created: "2020-06-25T07:08:51.000Z",
    updated: "2020-08-19T07:51:36.280Z",
    summary: "ชั้นมัธยม 1-6 สอบปลายภาค",
    creator: {
      email: "email@example.com",
      self: true,
    },
    organizer: {
      email: "email@example.com",
      self: true,
    },
    start: {
      date: "2020-11-09",
    },
    end: {
      date: "2020-11-10",
    },
    transparency: "transparent",
    iCalUID: "xxxxxxx@google.com",
    sequence: 0,
    reminders: {
      useDefault: false,
    },
  },
  {
    kind: "calendar#event",
    etag: "XXXXXXXXXXXXXXXX",
    id: "46h4gc",
    status: "confirmed",
    htmlLink: "https://www.google.com/calendar/event?eid=xxxxxx",
    created: "2020-06-25T07:08:57.000Z",
    updated: "2020-08-19T07:51:42.670Z",
    summary: "ชั้นประถม 1-6 สอบปลายภาค",
    creator: {
      email: "email@example.com",
      self: true,
    },
    organizer: {
      email: "email@example.com",
      self: true,
    },
    start: {
      date: "2020-11-10",
    },
    end: {
      date: "2020-11-11",
    },
    transparency: "transparent",
    iCalUID: "xxxxxxx@google.com",
    sequence: 0,
    reminders: {
      useDefault: false,
    },
  },
  {
    kind: "calendar#event",
    etag: "XXXXXXXXXXXXXXXX",
    id: "6c545t",
    status: "confirmed",
    htmlLink: "https://www.google.com/calendar/event?eid=xxxxxx",
    created: "2020-06-25T07:09:04.000Z",
    updated: "2020-08-19T07:51:56.733Z",
    summary: "ชั้นมัธยม 1-6 สอบปลายภาค",
    creator: {
      email: "email@example.com",
      self: true,
    },
    organizer: {
      email: "email@example.com",
      self: true,
    },
    start: {
      date: "2020-11-11",
    },
    end: {
      date: "2020-11-12",
    },
    transparency: "transparent",
    iCalUID: "xxxxxxx@google.com",
    sequence: 0,
    reminders: {
      useDefault: false,
    },
  },
  {
    kind: "calendar#event",
    etag: "XXXXXXXXXXXXXXXX",
    id: "62ngbn",
    status: "confirmed",
    htmlLink: "https://www.google.com/calendar/event?eid=xxxxxx",
    created: "2020-06-25T07:09:12.000Z",
    updated: "2020-08-19T07:52:05.486Z",
    summary: "ชั้นประถม 1-6 สอบปลายภาค",
    creator: {
      email: "email@example.com",
      self: true,
    },
    organizer: {
      email: "email@example.com",
      self: true,
    },
    start: {
      date: "2020-11-12",
    },
    end: {
      date: "2020-11-13",
    },
    transparency: "transparent",
    iCalUID: "xxxxxxx@google.com",
    sequence: 0,
    reminders: {
      useDefault: false,
    },
  },
  {
    kind: "calendar#event",
    etag: "XXXXXXXXXXXXXXXX",
    id: "6s3ev1",
    status: "confirmed",
    htmlLink: "https://www.google.com/calendar/event?eid=xxxxxx",
    created: "2020-08-19T07:52:43.000Z",
    updated: "2020-08-19T07:52:43.981Z",
    summary: "ชั้นประถม 1-6 หยุดเตรียมสอบ",
    creator: {
      email: "email@example.com",
      self: true,
    },
    organizer: {
      email: "email@example.com",
      self: true,
    },
    start: {
      date: "2020-11-09",
    },
    end: {
      date: "2020-11-10",
    },
    transparency: "transparent",
    iCalUID: "xxxxxxx@google.com",
    sequence: 0,
    reminders: {
      useDefault: false,
    },
  },
  {
    kind: "calendar#event",
    etag: "XXXXXXXXXXXXXXXX",
    id: "7ohq6c",
    status: "confirmed",
    htmlLink: "https://www.google.com/calendar/event?eid=xxxxxx",
    created: "2020-08-19T07:52:50.000Z",
    updated: "2020-08-19T07:52:51.018Z",
    summary: "ชั้นมัธยม 1-6 หยุดเตรียมสอบ",
    creator: {
      email: "email@example.com",
      self: true,
    },
    organizer: {
      email: "email@example.com",
      self: true,
    },
    start: {
      date: "2020-11-10",
    },
    end: {
      date: "2020-11-11",
    },
    transparency: "transparent",
    iCalUID: "xxxxxxx@google.com",
    sequence: 0,
    reminders: {
      useDefault: false,
    },
  },
  {
    kind: "calendar#event",
    etag: "XXXXXXXXXXXXXXXX",
    id: "7n82dj",
    status: "confirmed",
    htmlLink: "https://www.google.com/calendar/event?eid=xxxxxx",
    created: "2020-08-19T07:53:05.000Z",
    updated: "2020-08-19T07:53:05.494Z",
    summary: "ชั้นประถม 1-6 หยุดเตรียมสอบ",
    creator: {
      email: "email@example.com",
      self: true,
    },
    organizer: {
      email: "email@example.com",
      self: true,
    },
    start: {
      date: "2020-11-11",
    },
    end: {
      date: "2020-11-12",
    },
    transparency: "transparent",
    iCalUID: "xxxxxxx@google.com",
    sequence: 0,
    reminders: {
      useDefault: false,
    },
  },
  {
    kind: "calendar#event",
    etag: "XXXXXXXXXXXXXXXX",
    id: "4b94h0",
    status: "confirmed",
    htmlLink: "https://www.google.com/calendar/event?eid=xxxxxx",
    created: "2020-08-19T07:53:18.000Z",
    updated: "2020-08-19T07:53:18.123Z",
    summary: "ชั้นมัธยม 1-6 หยุดเตรียมสอบ",
    creator: {
      email: "email@example.com",
      self: true,
    },
    organizer: {
      email: "email@example.com",
      self: true,
    },
    start: {
      date: "2020-11-12",
    },
    end: {
      date: "2020-11-13",
    },
    transparency: "transparent",
    iCalUID: "xxxxxxx@google.com",
    sequence: 0,
    reminders: {
      useDefault: false,
    },
  },
  {
    kind: "calendar#event",
    etag: "XXXXXXXXXXXXXXXX",
    id: "3lkkau",
    status: "confirmed",
    htmlLink: "https://www.google.com/calendar/event?eid=xxxxxx",
    created: "2020-06-25T07:09:19.000Z",
    updated: "2020-08-19T07:53:40.867Z",
    summary: "ชั้นมัธยม 1-6 สอบปลายภาค",
    creator: {
      email: "email@example.com",
      self: true,
    },
    organizer: {
      email: "email@example.com",
      self: true,
    },
    start: {
      date: "2020-11-13",
    },
    end: {
      date: "2020-11-14",
    },
    transparency: "transparent",
    iCalUID: "xxxxxxx@google.com",
    sequence: 0,
    reminders: {
      useDefault: false,
    },
  },
  {
    kind: "calendar#event",
    etag: "XXXXXXXXXXXXXXXX",
    id: "3cakll",
    status: "confirmed",
    htmlLink: "https://www.google.com/calendar/event?eid=xxxxxx",
    created: "2020-08-19T07:54:10.000Z",
    updated: "2020-08-19T07:54:10.800Z",
    summary: "ชั้นประถม 1-6 ปิดภาคเรียน",
    creator: {
      email: "email@example.com",
      self: true,
    },
    organizer: {
      email: "email@example.com",
      self: true,
    },
    start: {
      date: "2020-11-13",
    },
    end: {
      date: "2020-11-14",
    },
    transparency: "transparent",
    iCalUID: "xxxxxxx@google.com",
    sequence: 0,
    reminders: {
      useDefault: false,
    },
  },
  {
    kind: "calendar#event",
    etag: "XXXXXXXXXXXXXXXX",
    id: "14p601",
    status: "confirmed",
    htmlLink: "https://www.google.com/calendar/event?eid=xxxxxx",
    created: "2020-08-19T07:55:17.000Z",
    updated: "2020-08-19T07:55:17.332Z",
    summary: "วันประกาศเกียรติคุณ",
    creator: {
      email: "email@example.com",
      self: true,
    },
    organizer: {
      email: "email@example.com",
      self: true,
    },
    start: {
      date: "2020-11-17",
    },
    end: {
      date: "2020-11-18",
    },
    transparency: "transparent",
    iCalUID: "xxxxxxx@google.com",
    sequence: 0,
    reminders: {
      useDefault: false,
    },
  },
  {
    kind: "calendar#event",
    etag: "XXXXXXXXXXXXXXXX",
    id: "5uk9dn",
    status: "confirmed",
    htmlLink: "https://www.google.com/calendar/event?eid=xxxxxx",
    created: "2020-06-25T07:12:12.000Z",
    updated: "2020-08-19T07:55:44.658Z",
    summary: "ประชุมคณะผู้บริหาร",
    creator: {
      email: "email@example.com",
      self: true,
    },
    organizer: {
      email: "email@example.com",
      self: true,
    },
    start: {
      date: "2020-11-23",
    },
    end: {
      date: "2020-11-24",
    },
    transparency: "transparent",
    iCalUID: "xxxxxxx@google.com",
    sequence: 1,
    reminders: {
      useDefault: false,
    },
  },
  {
    kind: "calendar#event",
    etag: "XXXXXXXXXXXXXXXX",
    id: "0tga5a",
    status: "confirmed",
    htmlLink: "https://www.google.com/calendar/event?eid=xxxxxx",
    created: "2020-08-19T07:56:12.000Z",
    updated: "2020-08-19T07:56:12.174Z",
    summary: "ประชุมครูเตรียมเปิดภาคเรียนที่ 2",
    creator: {
      email: "email@example.com",
      self: true,
    },
    organizer: {
      email: "email@example.com",
      self: true,
    },
    start: {
      date: "2020-11-30",
    },
    end: {
      date: "2020-12-01",
    },
    transparency: "transparent",
    iCalUID: "xxxxxxx@google.com",
    sequence: 0,
    reminders: {
      useDefault: false,
    },
  },
  {
    kind: "calendar#event",
    etag: "XXXXXXXXXXXXXXXX",
    id: "1r13fj",
    status: "confirmed",
    htmlLink: "https://www.google.com/calendar/event?eid=xxxxxx",
    created: "2020-08-10T07:01:00.000Z",
    updated: "2020-08-19T07:57:38.006Z",
    summary: "ชั้น ป.1 - ม.6 เปิดภาคเรียนที่ 2",
    creator: {
      email: "email@example.com",
      self: true,
    },
    organizer: {
      email: "email@example.com",
      self: true,
    },
    start: {
      date: "2020-12-01",
    },
    end: {
      date: "2020-12-02",
    },
    transparency: "transparent",
    iCalUID: "xxxxxxx@google.com",
    sequence: 0,
    reminders: {
      useDefault: false,
    },
  },
  {
    kind: "calendar#event",
    etag: "XXXXXXXXXXXXXXXX",
    id: "4psv1q",
    status: "confirmed",
    htmlLink: "https://www.google.com/calendar/event?eid=xxxxxx",
    created: "2020-09-24T03:14:46.000Z",
    updated: "2020-09-24T03:25:24.823Z",
    summary: "วันที่ 19-22 หยุดกรณีพิเศษตามมติคณะรัฐมนตรี",
    creator: {
      email: "email@example.com",
      self: true,
    },
    organizer: {
      email: "email@example.com",
      self: true,
    },
    start: {
      date: "2020-11-19",
    },
    end: {
      date: "2020-11-23",
    },
    transparency: "transparent",
    iCalUID: "xxxxxxx@google.com",
    sequence: 0,
    reminders: {
      useDefault: false,
    },
  },
  {
    kind: "calendar#event",
    etag: "XXXXXXXXXXXXXXXX",
    id: "2v9gd0",
    status: "confirmed",
    htmlLink: "https://www.google.com/calendar/event?eid=xxxxxx",
    created: "2020-06-25T07:10:27.000Z",
    updated: "2020-10-05T08:49:52.219Z",
    summary: "ฝ่ายวิชาการประถม และมัธยมจัดตารางสอน",
    creator: {
      email: "email@example.com",
      self: true,
    },
    organizer: {
      email: "email@example.com",
      self: true,
    },
    start: {
      date: "2020-11-23",
    },
    end: {
      date: "2020-11-26",
    },
    transparency: "transparent",
    iCalUID: "xxxxxxx@google.com",
    sequence: 3,
    reminders: {
      useDefault: false,
    },
  },
];
