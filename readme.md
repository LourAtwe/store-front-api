# 1️⃣ Database Setup & Connection
## 🗄 Create the database

Open your SQL terminal and run:

sql
CREATE DATABASE storepro_test;

CREATE DATABASE smartbuy

# 2️⃣ Add database credentials to .env

Create a file named .env in the project root and add:

POSTGRES_HOST=127.0.0.1
POSTGRES_PORT=5432
POSTGRES_DB=smartbuy
POSTGRES_TEST_DB=storepro_test
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres

BCRYPT_PASSWORD=yourSecretPass
SALT_ROUNDS=10
TOKEN_SECRET=yourJwtSecret

# 3- Install Project Packages:
npm install
Run Database Migrations: npm run migrate-up

# 4- Start the Backend Server:
 npm run start

# 5- Ports Information
Service	             Port
Backend API	         3003
PostgreSQL Database	 5432


# 6- Testing: npm run test

# Note: Salutations,
I wanted to let you know that I currently don’t have time to split the routes into
 grouped handler files. Also, changing the file or route names could cause issues 
 when running the project. Please make sure all routes listed in REQUIREMENTS.md 
 remain present as they are to ensure proper functionality.

Thanks for your understanding.
