# E-Commerce API Usage Guide

This repository contains the usage instructions for the live **E-Commerce API** deployed at:

**https://e-commerce-api-8i6n.onrender.com**

---

## 1. Register (Signup)

**POST** `https://e-commerce-api-8i6n.onrender.com/api/user/register`

**Request Body (JSON):**

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "123456"
}

**2. Login**

POST https://e-commerce-api-8i6n.onrender.com/api/user/login

Request Body (JSON):

{
  "email": "john@example.com",
  "password": "123456"
}

Response:

{
  "token": "<your-jwt-token>"
}

    Save this token — you need to pass it in headers for protected routes.

**Product APIs
Add Product (Protected)**

POST https://e-commerce-api-8i6n.onrender.com/api/product/add

Headers:

Authorization: Bearer <your-jwt-token>
Content-Type: application/json

Body Example:

{
  "title": "iPhone 14",
  "price": 999,
  "desc": "Latest Apple phone"
}

Get All Products (Public)

GET https://e-commerce-api-8i6n.onrender.com/api/product/all
Get Product by ID (Public)

GET https://e-commerce-api-8i6n.onrender.com/api/product/<product_id>
Update Product (Protected)

PUT https://e-commerce-api-8i6n.onrender.com/api/product/update/<product_id>

Headers:

Authorization: Bearer <your-jwt-token>
Content-Type: application/json

Body Example:

{
  "price": 899
}

Delete Product (Protected)

DELETE https://e-commerce-api-8i6n.onrender.com/api/product/delete/<product_id>

Headers:

Authorization: Bearer <your-jwt-token>

Cart APIs (All Protected)
Add to Cart

POST https://e-commerce-api-8i6n.onrender.com/api/cart/add

Headers:

Authorization: Bearer <your-jwt-token>
Content-Type: application/json

Body Example:

{
  "productId": "<product_id>",
  "title": "iPhone",
  "price": 999,
  "qty": 1
}

Get User Cart

GET https://e-commerce-api-8i6n.onrender.com/api/cart

Headers:

Authorization: Bearer <your-jwt-token>

Remove Product from Cart

DELETE https://e-commerce-api-8i6n.onrender.com/api/cart/remove/<product_id>

Headers:

Authorization: Bearer <your-jwt-token>

Clear Cart

DELETE https://e-commerce-api-8i6n.onrender.com/api/cart/clear

Headers:

Authorization: Bearer <your-jwt-token>

Decrease Product Quantity

POST https://e-commerce-api-8i6n.onrender.com/api/cart/decrease

Headers:

Authorization: Bearer <your-jwt-token>
Content-Type: application/json

Body Example:

{
  "productId": "<product_id>",
  "qty": 1
}

Important Notes

    For all protected routes, always include the Authorization header with the token you got on login.

    Content-Type for POST and PUT requests should be application/json.

    Replace <product_id> with the actual product ID from the database.

    You can test all these APIs easily in Postman or any API client
