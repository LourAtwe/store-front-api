import bcrypt from 'bcrypt';


import  { client }  from '../database';

export type User = {
  id?: number;
  firstName: string;
  lastName: string;
  password: string;
};


export class UserStore {
      async index(): Promise<User[]>{
          
              const conn =await client.connect();
              const sql= 'SELECT * FROM users';
              const result = await conn.query(sql);
              conn.release();
              return result.rows; 
  }
  async show(id: string): Promise<User> {
  try {
    const conn = await client.connect();
    const sql = `SELECT id, firstname, lastname, password FROM users WHERE id = $1`;
    const result = await conn.query(sql, [id]);
    conn.release();

    const row = result.rows[0];
    if (!row) throw new Error(`User not found: ${id}`);

    // 🔹 mapping lowercase DB → camelCase TS
    return {
      id: row.id,
      firstName: row.firstname,
      lastName: row.lastname,
      password: row.password,
    };
  } catch (err) {
    throw new Error(`Cannot get user ${id}: ${err}`);
  }
}
  /*async show(id: string): Promise<User> {
      // @ts-ignore
      const conn = await client.connect();
      const result = await conn.query('SELECT * FROM users WHERE id=$1', [id]);
      conn.release();
      return result.rows[0];
    }*/
  async create(u: User): Promise<User> {
    try {
      // @ts-ignore
      const conn = await client.connect();
      const sql = 'INSERT INTO users (firstName, lastName, password) VALUES ($1, $2, $3) RETURNING *';

      const saltRounds = parseInt(process.env.SALT_ROUNDS as string);
      const pepper = process.env.BCRYPT_PASSWORD as string;
      const hash = bcrypt.hashSync(u.password + pepper, saltRounds);

      const result = await conn.query(sql, [u.firstName, u.lastName, hash]);
      const user = result.rows[0];
 
      conn.release();

      //return user;
      return {
  id: user.id,
  firstName: user.firstname,  // هنا عملنا mapping
  lastName: user.lastname,
  password: user.password
};
    } catch (err) {
      throw new Error(`Could not create user ${u.firstName}. Error: ${err}`);
    }
  }
}
