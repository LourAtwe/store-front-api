import { ProductModel, Product } from '../../models/Product';
import { client } from '../../database';

describe('ProductStore Model - Create Product', () => {
  const store = new ProductModel();
  let createdProduct: Product;

  const testProduct: Product = {
    name: 'Laptop',
    price: 1200,
    category: 'Electronics',
  };

  beforeAll(async () => {
    const conn = await client.connect();
    try {
      // إدخال المنتج التجريبي فقط إذا لم يكن موجود
      await conn.query(
        `INSERT INTO products (id, name, price, category)
         VALUES (9999, $1, $2, $3)
         ON CONFLICT (id) DO NOTHING`,
        [testProduct.name, testProduct.price, testProduct.category]
      );
    } finally {
      conn.release();
    }
  });

  it('should create a new product', async () => {
    createdProduct = await store.create(testProduct);

    expect(createdProduct).toBeDefined();
    expect(createdProduct.id).toBeDefined();
    expect(createdProduct.name).toBe(testProduct.name);
    // تحويل السعر من string إلى number قبل المقارنة
    expect(parseFloat(createdProduct.price as unknown as string)).toBe(testProduct.price);
    expect(createdProduct.category).toBe(testProduct.category);
  });

  // تيست للـ current
  it('should return all products (current)', async () => {
    const products: Product[] = await store.index();

    expect(products).toBeDefined();
    expect(products.length).toBeGreaterThan(0); // لازم يكون في منتجات
  });
});
