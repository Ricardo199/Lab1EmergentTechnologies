# Student Portal

A full-stack web application for managing students and courses. The system provides role-based dashboards for students and administrators, a RESTful API, and a GraphQL endpoint — all secured with JWT authentication.

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React, React Bootstrap |
| Backend | Node.js, Express |
| Database | MongoDB (Mongoose) |
| API | REST + GraphQL (`express-graphql`) |
| Auth | JWT (HTTP-only cookies), bcrypt |

## Features

- **Authentication** — Secure login with JWT stored in HTTP-only cookies; rate-limited to prevent brute-force attacks.
- **Role-based access** — Separate dashboards and permissions for `student` and `admin` roles.
- **Student management** — Create, read, update, and look up students by student number or name.
- **Course management** — Create, read, update, and delete courses; enrollment tracking per student.
- **GraphQL API** — Query and mutate students and courses via `/graphql` (GraphiQL explorer included in development).
- **REST API** — Full CRUD endpoints under `/api` protected by authentication and authorization middleware.

## Project Structure

```
.
├── server.js               # Express app entry point
├── schema.js               # GraphQL schema
├── resolvers.js            # GraphQL resolvers
├── controller/
│   └── controller.js       # REST API route handlers
├── middleware/
│   └── auth.js             # JWT auth & admin middleware
├── model/
│   ├── student.js          # Mongoose Student model
│   └── course.js           # Mongoose Course model
└── view/
    └── client/             # React frontend (Create React App)
        └── src/
            ├── App.js
            ├── graphqlClient.js
            └── components/
                ├── Login.js
                ├── StudentDashboard.js
                ├── AdminDashboard.js
                ├── StudentList.js
                ├── CourseList.js
                ├── AddStudent.js
                └── AddCourse.js
```

## Prerequisites

- [Node.js](https://nodejs.org/) v14 or later
- [MongoDB](https://www.mongodb.com/) (local instance or MongoDB Atlas)
- npm

## Installation

### 1. Clone the repository

```bash
git clone https://github.com/Ricardo199/Lab1EmergentTechnologies.git
cd Lab1EmergentTechnologies
```

### 2. Install backend dependencies

```bash
npm install
```

### 3. Install frontend dependencies

```bash
cd view/client
npm install
cd ../..
```

### 4. Configure environment variables

Create a `.env` file in the project root:

```env
MONGODB_URI=mongodb://localhost:27017/mernlab1
JWT_SECRET=your_secret_key_here
NODE_ENV=development
PORT=5000
```

## Running the Application

### Development mode (backend + frontend concurrently)

```bash
npm run dev-all
```

### Backend only

```bash
npm run dev
```

### Frontend only

```bash
npm run client
```

| Service | URL |
|---|---|
| Backend API | http://localhost:5000/api |
| GraphQL endpoint | http://localhost:5000/graphql |
| Frontend | http://localhost:3000 |

## API Reference

### Authentication

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/login` | Log in and receive a session cookie |
| `POST` | `/api/logout` | Invalidate the session cookie |

### Students *(authentication required)*

| Method | Endpoint | Access | Description |
|---|---|---|---|
| `GET` | `/api/students` | Admin | List all students |
| `GET` | `/api/students/:studentNumber` | Auth | Get student by number |
| `GET` | `/api/students/:firstName/:lastName` | Auth | Get student by name |
| `POST` | `/api/students` | Public | Register a new student |
| `PUT` | `/api/students/:studentNumber` | Auth | Update student details |

### Courses *(authentication required)*

| Method | Endpoint | Access | Description |
|---|---|---|---|
| `GET` | `/api/courses` | Auth | List all courses |
| `POST` | `/api/courses` | Auth | Create a new course |
| `PUT` | `/api/courses/:name` | Auth | Update a course |
| `DELETE` | `/api/courses/:name` | Admin | Delete a course |

### GraphQL

Navigate to `http://localhost:5000/graphql` to use the interactive GraphiQL explorer.

**Example queries:**

```graphql
# List all students
query {
  students {
    _id
    StudentNumber
    FirstName
    LastName
    Email
    Program
  }
}

# List all courses
query {
  courses {
    _id
    CourseCode
    CourseName
    CourseSection
    CourseSemester
  }
}
```

**Example mutations:**

```graphql
mutation {
  addCourse(
    CourseCode: "CS101"
    CourseName: "Introduction to Computer Science"
    CourseSection: "A"
    CourseSemester: "Fall 2025"
  ) {
    _id
    CourseCode
  }
}
```

## License

This project is licensed under the terms of the [LICENSE](LICENSE) file included in this repository.
