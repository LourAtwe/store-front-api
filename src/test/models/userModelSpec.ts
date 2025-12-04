import { UserStore, User } from '../../models/User';
import bcrypt from 'bcrypt';

import { client } from '../../database';
describe('UserStore Model', () => {
  const store = new UserStore();
  let createdUser: User;

  const testUser: User = {
    firstName: 'Lour',
    lastName: 'Atwa3',
    password: '123456',
  };

  beforeAll(async () => {
    try {
      // تنظيف جدول المستخدمين قبل كل التيستات
      await client.query('DELETE FROM users');
    } catch (err) {
      console.error('Error in beforeAll:', err);
    }
  });

  afterAll(async () => {
    try {
      // تنظيف جدول المستخدمين بعد كل التيستات
      await client.query('DELETE FROM users');
    } catch (err) {
      console.error('Error in afterAll:', err);
    }
  });

  it('create should add a new user and hash the password', async () => {
    createdUser = await store.create(testUser);

    expect(createdUser).toBeDefined();
    expect(createdUser.firstName).toBe(testUser.firstName);
    expect(createdUser.lastName).toBe(testUser.lastName);

    // تحقق من أن الباسوورد تم هاشه
    const pepper = process.env.BCRYPT_PASSWORD as string;
    const isPasswordCorrect = bcrypt.compareSync(
      testUser.password + pepper,
      createdUser.password as string
    );
    expect(isPasswordCorrect).toBe(true);
  });

  it('index should return a list of users', async () => {
    const users = await store.index();
    expect(users.length).toBeGreaterThan(0);
    expect(users.find(u => u.id === createdUser.id)).toBeDefined();
  });

  it('show should return a single user by id', async () => {
    const user = await store.show(String(createdUser.id));
    expect(user).toBeDefined();
    expect(user.id).toBe(createdUser.id);
    expect(user.firstName).toBe(createdUser.firstName);
    expect(user.lastName).toBe(createdUser.lastName);
  });

});
