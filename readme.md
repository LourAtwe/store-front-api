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


<h1>6- Testing: npm run test</h1> 

<h2>Note:⚠</h2> 
 <pre>Salutations, I wanted to let you know that I currently don’t have time to split the routes into
 grouped handler files. Also, changing the file or route names could cause issues 
 when running the project. Please make sure all routes listed in REQUIREMENTS.md 
 remain present as they are to ensure proper functionality.

Thanks for your understanding.</pre>

</html>
