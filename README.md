# Team Task Manager Frontend

React + Vite frontend for the Team Task Manager application.

## Overview

This frontend provides the user interface for managing projects, tasks, team members, and account access in the Team Task Manager system.

## Features

- User login and signup
- JWT authentication
- Protected routes
- Role-based access control
- Dashboard overview
- Project management
- Task management
- Team member management
- Calendar view
- Settings page
- Responsive UI

## Tech Stack

- React
- Vite
- Axios
- React Router DOM
- Context API
- Tailwind CSS

## Folder Structure

src/
- components/
- pages/
- services/
- context/
- routes/
- utils/

## Prerequisites

- Node.js 18 or later
- npm

## Setup

1. Install dependencies
npm install
```bash
Start the development server
npm run dev
Build for production
Preview the production build


```API Configuration
The API base URL is configured in src/services/api.js.



API Configuration
The API base URL is configured in src/services/api.js.

Default backend URL:

If your backend runs on a different host or port, update it in that file.

Authentication Flow
User logs in through the login page
Backend returns a JWT token
Token is stored in localStorage
Axios attaches the token in the Authorization header
User role is decoded from the JWT and stored in AuthContext





## Backend README

```markdown
# Team Task Manager Backend

Spring Boot backend for the Team Task Manager application.

## Overview

This backend provides REST APIs for authentication, projects, tasks, and team management. It uses MongoDB for data storage and JWT for authentication.

## Features

- User signup and login
- JWT authentication
- Role-based access control
- Project management
- Task management
- Team member support
- REST API for frontend integration

## Tech Stack

- Java 21
- Spring Boot
- Spring Security
- MongoDB
- JWT
- Maven

## Prerequisites

- Java 21
- Maven
- MongoDB running locally

Default MongoDB URL:

```bash
mongodb://localhost:27017


## ⚙️ Backend Setup

Follow these steps to run the backend locally:

### 1️⃣ Start MongoDB

Make sure MongoDB is running before starting the backend.

* Default URL:

```bash
mongodb://localhost:27017
```

---

### 2️⃣ Build the Project

Run the following command to build the project:

```bash
mvn clean package
```

---

### 3️⃣ Run the Application

Start the Spring Boot application:

```bash
mvn spring-boot:run
```

---

## 🌐 Backend Server

* Runs on: `http://localhost:8080`

---

## 🧪 Test APIs

You can test APIs using Postman:

### 🔹 Signup

```http
POST http://localhost:8080/auth/signup
```

### 🔹 Login

```http
POST http://localhost:8080/auth/login
```

---

## ⚠️ Notes

* Ensure MongoDB is running before starting the server
* Update `application.properties` if using a custom database URL
* Default port: **8080**

---



## 🔌 API Endpoints

### 🔐 Authentication

| Method | Endpoint       | Description                       |
| ------ | -------------- | --------------------------------- |
| POST   | `/auth/signup` | Register a new user               |
| POST   | `/auth/login`  | Authenticate user & get JWT token |

---

### 📁 Projects

| Method | Endpoint    | Description          | Access              |
| ------ | ----------- | -------------------- | ------------------- |
| POST   | `/projects` | Create a new project | Admin Only          |
| GET    | `/projects` | Get all projects     | Authenticated Users |

---

### ✅ Tasks

| Method | Endpoint                         | Description             |
| ------ | -------------------------------- | ----------------------- |
| POST   | `/tasks`                         | Create a new task       |
| PUT    | `/tasks/{id}?status=IN_PROGRESS` | Update task status      |
| GET    | `/tasks/project/{id}`            | Get tasks by project ID |

---

## 🔒 Security

* 🔑 All protected endpoints require a **JWT token**
* 🛡️ Authentication is handled using **Spring Security**
* 👥 Role-based access control:

  * **ADMIN** → Can create projects and manage users
  * **USER** → Can view projects and manage assigned tasks

---

## 📌 Notes

* Include the token in headers:

```http
Authorization: Bearer <your-token>
```

* Ensure proper roles are assigned during signup
* Unauthorized requests will return **401 / 403 errors**

---
