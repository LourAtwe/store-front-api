// db.js
import * as dotenv from 'dotenv';
dotenv.config();

import * as pkg from 'pg';
const { Pool } = pkg;

const pool = new Pool({
  host: process.env.POSTGRES_HOST,
  database: process.env.POSTGRES_DB,
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,

});

export default pool;

// اختبار الاتصال
pool.connect()
  .then(() => console.log('Connected to PostgreSQL successfully!'))
  .catch(err => console.error('Connection error', err));
