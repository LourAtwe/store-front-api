// src/models/Order.ts

import { client } from '../database';

export type OrderProduct = {
  product_id: number;
  quantity: number;
};

export type Order = {
  id?: number;
  user_id: number;
  status?: string;
  created_at?: Date;
  products?: OrderProduct[];
};

export class OrderModel {

  // طلب حالي لكل مستخدم
  async currentOrderByUser(user_id: number): Promise<Order | null> {
    try {
        // @ts-ignore
      const conn = await client.connect();
      const orderSql = 'SELECT * FROM orders WHERE user_id=$1 AND status=$2 LIMIT 1';
      const orderResult = await conn.query(orderSql, [user_id, 'active']);
      
      if (!orderResult.rows.length) {
        conn.release();
        return null;
      }

      const order = orderResult.rows[0];

      // جلب المنتجات المرتبطة بهذا الطلب
      const productsSql = 'SELECT product_id, quantity FROM order_products WHERE order_id=$1';
      const productsResult = await conn.query(productsSql, [order.id]);

      order.products = productsResult.rows;

      conn.release();
      return order;
    } catch (err) {
      throw new Error(`Could not get current order for user ${user_id}. Error: ${err}`);
    }
  }

  // إنشاء طلب جديد مع منتجاته
  async create(order: Order): Promise<Order> {
  try {
    const conn = await client.connect();
    const sqlOrder = 'INSERT INTO orders (user_id, status) VALUES ($1, $2) RETURNING *';
    const orderResult = await conn.query(sqlOrder, [order.user_id, order.status || 'active']);
    const newOrder = orderResult.rows[0];

    if (order.products && order.products.length) {
      const sqlProduct = 'INSERT INTO order_products (order_id, product_id, quantity) VALUES ($1, $2, $3)';
      for (const p of order.products) {
        await conn.query(sqlProduct, [newOrder.id, p.product_id, p.quantity]);
      }
    }

    const productsResult = await conn.query('SELECT product_id, quantity FROM order_products WHERE order_id=$1', [newOrder.id]);
    newOrder.products = productsResult.rows;

    conn.release();
    return newOrder;
  } catch (err) {
    throw new Error(`Could not create order. Error: ${err}`);
  }
}}
