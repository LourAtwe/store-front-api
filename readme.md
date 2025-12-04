<html>
 
 <h1>1️⃣ Database Setup & Connection</h1>
<h2>🗄 Create the database</h2> 
<pre>
Open your SQL terminal and run:
sql
CREATE DATABASE storepro_test;
CREATE DATABASE smartbuy
</pre>
<h1> 2️⃣ Add database credentials to .env</h1>
<pre>
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
</pre>
<h1> 3- Install Project Packages:</h1>
<pre>npm install
Run Database Migrations: npm run migrate-up</pre>

<h1>4- Start the Backend Server:</h1> 
 npm run start

<h1> 5- Ports Information</h1>
<pre>
Service	                 Port
Backend API	             3003
PostgreSQL Database	     5432 </pre>


<h1>6- Testing: </h1> 
 npm run test



</html>
