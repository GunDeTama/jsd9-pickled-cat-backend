import { User } from '../../../model/User.js';
import { BadRequestError, InternalServerError } from '../../../utils/error.js';
import { ResponseConstructor } from '../../../utils/response.js';

export const createUser = async (req, res, next) => {
  try {
    // console.log('Request body:', req.body);
    
    // รับ fields ทั้งหมดจาก request body
    const { 
      firstname, 
      lastname, 
      email, 
      password,
      phone,
      address 
    } = req.body;

    // ตรวจสอบว่ามีข้อมูลครบทุก fields ที่จำเป็น
    if (!firstname || !lastname || !email || !password) {
      throw new BadRequestError('กรุณากรอกข้อมูลให้ครบ (firstname, lastname, email, password)');
    }

    // ตรวจสอบว่ามีข้อมูล address ครบถ้วนหรือไม่ (ถ้ามีการส่ง address มา)
    if (address) {
      const { sub_district, district, province, postal_code } = address;
      if (!sub_district || !district || !province || !postal_code) {
        throw new BadRequestError('กรุณากรอกข้อมูลที่อยู่ให้ครบถ้วน (sub_district, district, province, postal_code)');
      }
    }

    // console.log('Checking existing user for email:', email);
    // ตรวจสอบว่ามี email นี้ในระบบแล้วหรือไม่
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new BadRequestError('อีเมลนี้ถูกใช้งานแล้ว');
    }

    // console.log('Creating new user');
    // สร้าง user ใหม่
    const user = new User({
      firstname,
      lastname,
      email,
      password,
      phone,
      address
    });

    try {
      console.log('Saving user to database');
      await user.save();
      console.log('User saved successfully');
    } catch (saveError) {
      console.error('Error saving user:', saveError);
      // จัดการ validation errors จาก mongoose
      if (saveError.name === 'ValidationError') {
        const messages = Object.values(saveError.errors).map(err => err.message);
        throw new BadRequestError(messages.join(', '));
      }
      throw new InternalServerError('เกิดข้อผิดพลาดในการสร้างผู้ใช้');
    }

    // console.log('Generating auth token');
    // สร้าง token
    const token = user.generateAuthToken();

    // เตรียมข้อมูลสำหรับส่งกลับ (ไม่ส่ง password กลับไป)
    const userObject = user.toObject();
    delete userObject.password;

    // console.log('Sending response');
    // ส่ง response กลับ
    res.status(201).json(
      new ResponseConstructor('สร้างผู้ใช้สำเร็จ', {
        user: userObject,
        token
      })
    );
  } catch (error) {
    // console.error('Error in createUser:', error);
    if (error instanceof BadRequestError || error instanceof InternalServerError) {
      next(error);
    } else {
      next(new InternalServerError('เกิดข้อผิดพลาดที่ไม่ทราบสาเหตุ'));
    }
  }
};
