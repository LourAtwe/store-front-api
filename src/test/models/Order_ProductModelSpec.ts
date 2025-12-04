import { OrderModel, Order, OrderProduct } from '../../models/Order_Product';
import { UserStore } from '../../models/User';
import { client } from '../../database';

describe('OrderModel', () => {
  const store = new OrderModel();
  const userStore = new UserStore();

  let testUserId: number;
  let testOrder: Order;

  const testProducts: OrderProduct[] = [
    { product_id: 54, quantity: 2 },
    { product_id: 2, quantity: 3 },
  ];

  beforeAll(async () => {
    const conn = await client.connect();

    // تنظيف أي بيانات قديمة
    await conn.query('DELETE FROM order_products');
    await conn.query('DELETE FROM orders');
    await conn.query('DELETE FROM users');

    // إنشاء مستخدم جديد للتيست
    const user = await userStore.create({
      firstName: 'Test',
      lastName: 'User',
      password: '123456',
    });
    testUserId = user.id as number;

    // إضافة منتجات للتأكد من وجودها
    await conn.query(`INSERT INTO products (id, name, price, category) VALUES (54, 'Product 54', 50, 'Category A') ON CONFLICT (id) DO NOTHING`);
    await conn.query(`INSERT INTO products (id, name, price, category) VALUES (2, 'Product 2', 30, 'Category B') ON CONFLICT (id) DO NOTHING`);

    conn.release();
  });

  afterAll(async () => {
    const conn = await client.connect();
    await conn.query('DELETE FROM order_products');
    await conn.query('DELETE FROM orders');
    await conn.query('DELETE FROM users');
    conn.release();
  });

  it('should create a new order with products', async () => {
    const orderData: Order = {
      user_id: testUserId,
      products: testProducts,
    };

    const newOrder = await store.create(orderData);

    expect(newOrder).toBeDefined();
    expect(newOrder.id).toBeGreaterThan(0);
    expect(newOrder.user_id).toBe(testUserId);
    expect(newOrder.status).toBe('active');
    expect(newOrder.products?.length).toBe(2);
    expect(newOrder.products).toEqual(
      jasmine.arrayContaining([
        jasmine.objectContaining({ product_id: 54, quantity: 2 }),
        jasmine.objectContaining({ product_id: 2, quantity: 3 }),
      ])
    );

    testOrder = newOrder;
  });

  it('should get current order by user', async () => {
    const current = await store.currentOrderByUser(testUserId);

    expect(current).toBeDefined();
    expect(current?.id).toBe(testOrder.id);
    expect(current?.user_id).toBe(testUserId);
    expect(current?.status).toBe('active');
    expect(current?.products?.length).toBe(2);
    expect(current?.products).toEqual(
      jasmine.arrayContaining([
        jasmine.objectContaining({ product_id: 54, quantity: 2 }),
        jasmine.objectContaining({ product_id: 2, quantity: 3 }),
      ])
    );
  });

  it('should return null if no current order', async () => {
    const noOrder = await store.currentOrderByUser(123456789); // مستخدم غير موجود
    expect(noOrder).toBeNull();
  });
});
