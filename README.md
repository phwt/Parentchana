# Parentchana

การที่จะทําให้การเรียนรู้ในโรงเรียนจะมีประสิทธิภาพนั้น ผู้ที่เกี่ยวข้องไม่ได้มีเพียงแค่ครูและนักเรียน
เท่านั้น แต่ยังรวมถึงผู้ปกครองของตัวนักเรียนด้วย การที่ผู้ปกครองสามารถมีปฏิสัมพันธ์กับโรงเรียนได้ง่ายและ
สะดวกยิ่งขึ้น จะทําให้ผู้ปกครองสามารถเข้าใจตัวนักเรียนขณะที่อยู่ที่โรงเรียนได้มากขึ้น และสามารถ
สนับสนุนรวมถึงส่งเสริมตัวนักเรียนได้อย่างถูกต้อง ซึ่งนอกจากอํานวยความสะดวกแล้ว ยังช่วยเพิ่มความสบาย
ใจต่อความปลอดภัยของตัวนักเรียนให้กับตัวผู้ปกครองอีกด้วย

![](/capture/01_Main_Menu.png){width="500px"}

## Functions
1. Student Pick-up
- ระบบเช็คอินรับนักเรียน นํามาช่วยลดความติดขัดของจราจรในช่วงเย็น โดยตามปกติเมื่อผู้ปกครองไป
ถึงจุดรับแล้วรอให้ลูกของตนมาขึ้นรถ อาจก่อให้เกิดปัญหาเช่น ลูกไม่พร้อมขึ้นรถ หรือไม่ได้อยู่ที่จุดรับ ซึ่งจะ
ส่งผลให้เกิดความล่าช้า และทําให้จราจรติดขัดได้โดยระบบนี้จะทําให้สามารถแจ้งเตือนไปยังคุณครูประจําจุด
รับนักเรียนว่าผู้ปกครองของนักเรียนคนนั้นกําลังจะมาถึง และให้นักเรียนเตรียมตัวขึ้นรถ เพื่อความรวดเร็วของ
การรับลูกของผู้ปกครองทุกคน
2. Time Check-in
- ระบบเช็คเวลาเข้าเรียน ผู้ปกครองจะได้รับการแจ้งเตือนมาที่เครื่องเมื่อลูกของตนเดินได้ทางเข้า/ออก
จากโรงเรียน และยังสามารถตรวจสอบเวลาเข้า/ออกโรงเรียนย้อนหลังในแต่ละวันได้
3. School Calendar
- เป็นปฏิทินแสดงกิจกรรมของโรงเรียนโดยผู้ปกครองสามารถตั้งแจ้งเตือนบนกิจกรรมที่ตนเองสนใจได้
เช่น ตั้งให้ส่งแจ้งเตือนกิจกรรม “วันสอบกลางภาคเรียน” ในเวลา 18:00 ของวันก่อนที่จะถึงกิจกรรมนั้น ๆ

## Technology Stack
  - React Native
  - JavaScript
  - Bootstrap 4

## Screenshots

School Calendar
![](/capture/Simulator Screen Shot - iPhone 12 Pro - 2020-11-24 at 19.21.28.png)
![](/capture/Simulator Screen Shot - iPhone 12 Pro - 2020-11-24 at 21.50.25.png)

Time Check-in
![](/capture/01_Select.png)
![](/capture/02_CheckIn_Selected.png)

Student Pick-up
![](/capture/01_Scan.png)
![](/capture/02_Success.png)
![](/capture/03_TeacherList.png)

## Demo User Account

- Parent
  - E-Mail: parent@test.com
  - Password: P@ssw0rd
- Teacher
  - E-Mail: teacher@test.com
  - Password: P@ssw0rd

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
