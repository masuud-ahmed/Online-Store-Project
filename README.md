 # Online-Store-Project

This is an online store project backend with advanced features.

## Online Store Backend API Documentation

**Project Name:** E-Commerce Backend

### Introduction

The E-Commerce Backend project provides a set of APIs for managing users, admins, products, carts, reviews, and orders in an online store. The project is built using Node.js, Express.js, and Prisma with PostgreSQL as the database.

### Authentication

All endpoints require authentication using JSON Web Tokens (JWT). Users and admins must include a valid token in the Authorization header to access protected routes.

---

## User Controller

### 1. User Signup

- Endpoint: `/api/users/signup`
- Method: POST
- Description: Create a new user account.
- Request Body:
  - `name` (string): User's name
  - `email` (string): User's email
  - `password` (string): User's password
- Response:
  - `status` (number): HTTP status code
  - `message` (string): Success or error message
  - `newuser` (object): Details of the newly created user

### 2. User Login

- Endpoint: `/api/users/login`
- Method: POST
- Description: Authenticate and log in a user.
- Request Body:
  - `email` (string): User's email
  - `password` (string): User's password
- Response:
  - `status` (number): HTTP status code
  - `message` (string): Success or error message
  - `token` (string): JWT token for authentication

### 3. Get All Users (Admin Only)

- Endpoint: `/api/users/`
- Method: GET
- Description: Retrieve a list of all users (admin access required).
- Response:
  - `status` (number): HTTP status code
  - `users` (array): Array of user objects

### 4. Get Current User

- Endpoint: `/api/users/currentUser`
- Method: GET
- Description: Retrieve details of the currently logged-in user.
- Response:
  - `status` (number): HTTP status code
  - `user` (object): Details of the current user

---

## Admin Controller

### 1. Admin Signup

- Endpoint: `/api/admins/signup`
- Method: POST
- Description: Create a new admin account.
- Request Body:
  - `name` (string): Admin's name
  - `email` (string): Admin's email
  - `password` (string): Admin's password
- Response:
  - `status` (number): HTTP status code
  - `message` (string): Success or error message
  - `newadmin` (object): Details of the newly created admin

### 2. Admin Login

- Endpoint: `/api/admins/login`
- Method: POST
- Description: Authenticate and log in an admin.
- Request Body:
  - `email` (string): Admin's email
  - `password` (string): Admin's password
- Response:
  - `status` (number): HTTP status code
  - `message` (string): Success or error message
  - `token` (string): JWT token for authentication

### 3. Get All Admins

- Endpoint: `/api/admins/`
- Method: GET
- Description: Retrieve a list of all admins.
- Response:
  - `status` (number): HTTP status code
  - `admins` (array): Array of admin objects

### 4. Get Current Admin

- Endpoint: `/api/admins/admin`
- Method: GET
- Description: Retrieve details of the currently logged-in admin.
- Response:
  - `status` (number): HTTP status code
  - `admin` (object): Details of the current admin

---

## Product Controller

### 1. Get All Products

- Endpoint: `/api/products/`
- Method: GET
- Description: Retrieve a list of all products.
- Response:
  - `status` (number): HTTP status code
  - `products` (array): Array of product objects

### 2. Create a Product (Admin Only)

- Endpoint: `/api/products/`
- Method: POST
- Description: Create a new product (admin access required).
- Request Body:
  - `name` (string): Product name
  - `description` (string): Product description
  - `price` (float): Product price
  - `stock_quantity` (int): Product stock quantity
- Response:
  - `status` (number): HTTP status code
  - `message` (string): Success or error message

### 3. Modify a Product (Admin Only)

- Endpoint: `/api/products/:id`
- Method: PUT
-Method: PUT
- Description: Modify details of a specific product (admin access required).
- Request Parameters:
  - `id` (int): Product ID
- Request Body:
  - `name` (string): Updated product name
  - `description` (string): Updated product description
  - `price` (float): Updated product price
  - `stock_quantity` (int): Updated product stock quantity
- Response:
  - `status` (number): HTTP status code
  - `message` (string): Success or error message

### 4. Delete a Product (Admin Only)

- Endpoint: `/api/products/:id`
- Method: DELETE
- Description: Delete a specific product (admin access required).
- Request Parameters:
  - `id` (int): Product ID
- Response:
  - `status` (number): HTTP status code
  - `message` (string): Success or error message

---

## Review Controller

### 1. Get All Reviews

- Endpoint: `/api/review/`
- Method: GET
- Description: Retrieve a list of all reviews.
- Response:
  - `status` (number): HTTP status code
  - `reviews` (array): Array of review objects

### 2. Get Reviews by Product ID

- Endpoint: `/api/review/:id`
- Method: GET
- Description: Retrieve reviews for a specific product.
- Request Parameters:
  - `id` (int): Product ID
- Response:
  - `status` (number): HTTP status code
  - `reviews` (array): Array of review objects

### 3. Create a Review (User Only)

- Endpoint: `/api/review/:id`
- Method: POST
- Description: Create a new review for a specific product (user access required).
- Request Parameters:
  - `id` (int): Product ID
- Request Body:
  - `rating` (int): Review rating
  - `comment` (string): Review comment
- Response:
  - `status` (number): HTTP status code
  - `message` (string): Success or error message

### 4. Update a Review (User Only)

- Endpoint: `/api/review/:id/:reviewId`
- Method: PUT
- Description: Update a user's review for a specific product (user access required).
- Request Parameters:
  - `id` (int): Product ID
  - `reviewId` (int): Review ID
- Request Body:
  - `rating` (int): Updated review rating
  - `comment` (string): Updated review comment
- Response:
  - `status` (number): HTTP status code
  - `message` (string): Success or error message

### 5. Delete a Review (User Only)

- Endpoint: `/api/review/:reviewId`
- Method: DELETE
- Description: Delete a user's review (user access required).
- Request Parameters:
  - `reviewId` (int): Review ID
- Response:
  - `status` (number): HTTP status code
  - `message` (string): Success or error message

---

## Server

The server file (`server.js`) sets up the Express server and defines the routes for different controllers. It includes middleware for handling JSON requests.

## Prisma Schema

The Prisma schema (`schema.prisma`) defines the data models for the application, including User, Admin, Product, Cart, CartItem, Order, OrderItem, and Review. It also specifies the relationships between these models and the database provider (PostgreSQL).

 # Middleware

Middleware functions (`userVerify.js` and `adminVerify.js`) are used to verify user and admin authentication, respectively. These middleware functions are applied to routes that require authentication.

 # Conclusion

This API documentation provides an overview of the available endpoints and their functionalities. Developers can use these APIs to build front-end applications for managing users, admins, products, carts, reviews, and orders in an online store.
