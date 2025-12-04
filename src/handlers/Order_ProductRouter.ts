import express, { Request, Response } from 'express';
import { OrderModel } from '../models/Order_Product';
import verifyAuthToken from '../middlewares/verifyAuthToken';

const store = new OrderModel();

// الطلب الحالي للمستخدم
export const currentOrder = async (req: any, res: Response) => {
  try {
    // لازم يكون req.user جاي من verifyAuthToken
    const user = req.user;

    if (!user) {
      // لو ما وصل user → معناها التوكن مش صحيح
      return res.status(401).json({ error: 'Unauthorized' });
    }

    // جلب الطلب الحالي بناءً على user.id اللي جاي من التوكن
    console.log(user.id);
    const order = await store.currentOrderByUser(user.id);

    if (!order) {
      return res.status(404).json({ message: 'No active order found' });
    }

    res.json(order);
  } catch (err) {
    res.status(500).json({ error: err instanceof Error ? err.message : err });
  }
};

// إنشاء طلب جديد
export const createOrder = async (req: any, res: Response) => {
  try {
    const user = req.user;

    if (!user) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    // إنشاء الطلب وربطه برقم المستخدم من التوكن
    console.log(user.id)
    const order = await store.create({
      user_id: user.id,
      products: req.body.products
    });

    res.json(order);
  } catch (err) {
    res.status(500).json({ error: err instanceof Error ? err.message : err });
  }
  

};

// تعريف الروابط
const Order_Product_routes = (app: express.Application) => {
  // لازم verifyAuthToken يجي قبل الفنكشن
  app.get('/orders/current', verifyAuthToken, currentOrder);
  app.post('/orders/create', verifyAuthToken, createOrder);
};

export default Order_Product_routes;
