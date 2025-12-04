// src/database.ts
import * as dotenv from 'dotenv'
import { Pool } from 'pg'

// تحميل المتغيرات البيئية من ملف .env
dotenv.config()

console.log("CONNECTED TO DB:", process.env.POSTGRES_DB);

// استخراج المتغيرات البيئية
const {
  POSTGRES_HOST,
  POSTGRES_DB,
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  POSTGRES_TEST_DB,
  ENV,
} = process.env
let client: Pool;
console.log(ENV);


// إنشاء Pool للاتصال بقاعدة البيانات


if(ENV === 'test') {
  client = new Pool({
    host: POSTGRES_HOST,
    database: POSTGRES_TEST_DB,
    user: POSTGRES_USER,
    password: POSTGRES_PASSWORD,
  })
}

if(ENV === 'dev') {
  client = new Pool({
    host: POSTGRES_HOST,
    database: POSTGRES_DB,
    user: POSTGRES_USER,
    password: POSTGRES_PASSWORD,
  })
}
export { client };
