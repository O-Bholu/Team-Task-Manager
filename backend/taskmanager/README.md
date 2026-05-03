# Team Task Manager - Backend

This is a Spring Boot backend for the Team Task Manager application using MongoDB and JWT authentication.

Prerequisites:
- Java 21
- Maven
- MongoDB running (default mongodb://localhost:27017)

Run:

1. Start MongoDB.
2. Build and run with Maven:

```bash
mvn clean package
mvn spring-boot:run
```

API endpoints:
- POST /auth/signup
- POST /auth/login
- POST /projects (ADMIN)
- GET /projects
- POST /tasks
- PUT /tasks/{id}?status=IN_PROGRESS
- GET /tasks/project/{id}
