# Parentchana

It is not only the responsibility of the teacher and the students to create an efficient learning environment, but also of the student's parent.
The ease of interaction between parents and schools will assist parents in understanding how things work at school and can promote the student in the proper manner.

<img width="300" src="/capture/01_Main_Menu.png">

## Features

1. Student Pick-up
   - Pick-up queue system to mitigate traffic jams usually occurs in the evening. Normally, the parent would wait at the pick-up point for their children, which causes a number of issues, such as the student not being ready or being too far away from the pick-up point, resulting in a traffic jam.
   - This system will allow the parent to notify the teacher in charge of the pick-up point of their arrival. As a result, they can look for the student and prepare them to be picked up once the parent arrives.

2. Time Check-in
   - Notify parents of their children's arrival/departure from school, with the option of viewing historical check-in/out times.

3. School Calendar
   - Displays events at the school and allows you to receive notifications about upcoming events.

## Technology Stack
  - React Native
  - JavaScript
  - Bootstrap 4

## Screenshots

### Student Pick-up

<img width="300" align="left" src="/capture/pickup/01_Scan.png">
<img width="300" align="left" src="/capture/pickup/02_Success.png">
<img width="300" src="/capture/pickup/03_TeacherList.png">

### Time Check-in

<img width="300" align="left" src="/capture/checkin/01_Select.png">
<img width="300" src="/capture/checkin/02_CheckIn_Selected.png">

### School Calendar

<img width="300" align="left" src="/capture/calendar/01_Calendar_Agenda.png">
<img width="300" src="/capture/calendar/02_EventList.png">

## Development Setup

Config the `config.js` file

- Fill in the required config parameters from Firebase Console and Google Calendar API
- You can view the example in `config-example.js` file
- `config.js` file is ignored by default

Install required packages

```
npm install
```

Run the development server

```
npm start
```
