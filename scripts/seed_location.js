import dotenv from 'dotenv';
import fs from 'fs';
import mongoose from 'mongoose';
import path from 'path';
import { fileURLToPath } from 'url';
import Location from '../src/model/location.js';
dotenv.config({ path: './.env.local' });

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function seed() {
  await mongoose.connect(process.env.MONGO_URI);

  // ลบข้อมูลเก่า
  await Location.deleteMany({});

  // โหลดข้อมูลจากไฟล์ geography.json
  const raw = fs.readFileSync(
    path.join(__dirname, '../data/geography.json'),
    'utf8',
  );
  const data = JSON.parse(raw);

  // กรองข้อมูลที่ field ขาดหายออกก่อน map และแปลงชื่อ field ให้ตรงกับ geography.json
  const locations = data
    .filter(
      (item) =>
        item.subdistrictNameTh &&
        item.districtNameTh &&
        item.provinceNameTh &&
        item.postalCode,
    )
    .map((item) => ({
      sub_district: item.subdistrictNameTh,
      district: item.districtNameTh,
      province: item.provinceNameTh,
      postal_code: String(item.postalCode),
    }));

  console.log('จำนวนข้อมูลที่จะ insert:', locations.length);
  if (locations.length > 0) {
    console.log('ตัวอย่างข้อมูล:', locations[0]);
  }

  // insert ลง database
  await Location.insertMany(locations);

  console.log('Seed success!');
  mongoose.disconnect();
}

seed();
