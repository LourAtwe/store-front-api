✔ RESTful Routing Summary
Users

GET /users/index
GET /users/get/:id
POST /users/create


Products

GET /products/index
GET /products/get/:id
POST /products/create


Orders

GET /orders/current
POST /orders/create


Database Schema


CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    price NUMERIC(10,2) NOT NULL,
    category VARCHAR(100) 
);

CREATE TABLE Users (
    id SERIAL PRIMARY KEY,
    firstName VARCHAR(255),
    lastName VARCHAR(255),
    password VARCHAR(255)
);

CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    status VARCHAR(50) DEFAULT 'active',
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE order_products (
    id SERIAL PRIMARY KEY,
    order_id INTEGER REFERENCES orders(id),
    product_id INTEGER REFERENCES products(id),
    quantity INTEGER
);
