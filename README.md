# Todo API (Node.js + Express + MongoDB)

A simple REST API for managing todos with user authentication using JWT.
Users can register, login, and manage their own todos.

---

## Features

* User registration
* User login with JWT authentication
* Create todos
* Get all todos for a user
* Update a todo
* Delete a todo
* Protected routes using middleware
* Input validation using Zod

---

## Tech Stack

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT (JSON Web Token)
* Zod (Validation)
* bcrypt (Password hashing)

---

## Installation

Clone the repository

```
git clone <your-repo-url>
```

Install dependencies

```
npm install
```

Create a `.env` file in the root directory

```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

Start the server

```
npm start
```

Server will run at

```
http://localhost:5000
```

---

## API Endpoints

### Authentication

#### Register User

```
POST /auth/register
```

Body

```json
{
  "username": "john@example.com",
  "password": "123456"
}
```

---

#### Login User

```
POST /auth/login
```

Body

```json
{
  "username": "john@example.com",
  "password": "123456"
}
```

Response

```json
{
  "token": "JWT_TOKEN"
}
```

---

### Todos (Protected Routes)

Authorization Header

```
Authorization: Bearer YOUR_TOKEN
```

---

#### Create Todo

```
POST /todo/add-todo
```

Body

```json
{
  "title": "Learn Node",
  "description": "Build a Todo API",
  "completed": false
}
```

---

#### Get All Todos

```
GET /todo/get-todos
```

Returns all todos for the logged-in user.

---

#### Update Todo

```
PUT /todo/update-todo/:uid
```

Body

```json
{
  "title": "Learn Node and Express",
  "completed": true
}
```

---

#### Delete Todo

```
DELETE /todo/delete-todo/:id
```

Deletes the specified todo.

---

## Project Structure

```
project
│
├── controllers
│   └── todoController.js
│   └── authController.js
│
├── models
│   └── Todo.js
│   └── User.js
│
├── routes
│   └── todoRoutes.js
│   └── authRoutes.js
│
├── auth
│   └── jwtVerification.js
│
├── server.js
└── README.md
```

---

## Testing

You can test all APIs using **Postman**.

Steps:

1. Register a user
2. Login and copy the JWT token
3. Use the token in the Authorization header
4. Test todo CRUD APIs

---

## Future Improvements

* Add pagination for todos
* Add user profile endpoint
* Add logout functionality
* Add frontend (React)

---

## Author
## Amar Badiger
Built as a learning project for practicing backend development with Node.js and MongoDB.
