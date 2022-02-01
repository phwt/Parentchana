# Parentchana

การที่จะทําให้การเรียนรู้ในโรงเรียนจะมีประสิทธิภาพนั้น ผู้ที่เกี่ยวข้องไม่ได้มีเพียงแค่ครูและนักเรียน
เท่านั้น แต่ยังรวมถึงผู้ปกครองของตัวนักเรียนด้วย การที่ผู้ปกครองสามารถมีปฏิสัมพันธ์กับโรงเรียนได้ง่ายและ
สะดวกยิ่งขึ้น จะทําให้ผู้ปกครองสามารถเข้าใจตัวนักเรียนขณะที่อยู่ที่โรงเรียนได้มากขึ้น และสามารถ
สนับสนุนรวมถึงส่งเสริมตัวนักเรียนได้อย่างถูกต้อง ซึ่งนอกจากอํานวยความสะดวกแล้ว ยังช่วยเพิ่มความสบาย
ใจต่อความปลอดภัยของตัวนักเรียนให้กับตัวผู้ปกครองอีกด้วย

<img width="300" src="/capture/01_Main_Menu.png">

## Features

1. Student Pick-up
   - ระบบเช็คอินรับนักเรียน นํามาช่วยลดความติดขัดของจราจรในช่วงเย็น โดยตามปกติเมื่อผู้ปกครองไปถึงจุดรับแล้วรอให้ลูกของตนมาขึ้นรถ อาจก่อให้เกิดปัญหาเช่น ลูกไม่พร้อมขึ้นรถ หรือไม่ได้อยู่ที่จุดรับ ซึ่งจะส่งผลให้เกิดความล่าช้า และทําให้จราจรติดขัดได้โดยระบบนี้จะทําให้สามารถแจ้งเตือนไปยังคุณครูประจําจุดรับนักเรียนว่าผู้ปกครองของนักเรียนคนนั้นกําลังจะมาถึง และให้นักเรียนเตรียมตัวขึ้นรถ เพื่อความรวดเร็วของการรับลูกของผู้ปกครองทุกคน
2. Time Check-in
   - ระบบเช็คเวลาเข้าเรียน ผู้ปกครองจะได้รับการแจ้งเตือนมาที่เครื่องเมื่อลูกของตนเดินได้ทางเข้า/ออกจากโรงเรียน และยังสามารถตรวจสอบเวลาเข้า/ออกโรงเรียนย้อนหลังในแต่ละวันได้
3. School Calendar
   - เป็นปฏิทินแสดงกิจกรรมของโรงเรียนโดยผู้ปกครองสามารถตั้งแจ้งเตือนบนกิจกรรมที่ตนเองสนใจได้ เช่น ตั้งให้ส่งแจ้งเตือนกิจกรรม “วันสอบกลางภาคเรียน” ในเวลา 18:00 ของวันก่อนที่จะถึงกิจกรรมนั้น ๆ

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
