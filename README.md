# CRM Panel API

This project is a **RESTful API** built with **NestJS** for a **CRM (Customer Relationship Management)** system. It provides endpoints for managing students, teachers, groups, payments, and lessons. The application is fully dockerized for easy setup and deployment, ensuring a consistent experience across different environments. Payment processing is powered by **Stripe**, providing a secure and reliable way to handle transactions.

---

## Features

- **Student Management**  
  - Create, read, update, and delete student records.
  - Filter students by name, phone number, parent name, and parent phone number.
  - Manage student group memberships.
  
- **Teacher Management**  
  - Create, read, update, and delete teacher records.

- **Group Management**  
  - Create, read, update, and delete groups.
  - Assign teachers to groups.

- **Payment Management**  
  - Create payment records with Stripe integration.
  - Retrieve payments by month.
  - List paid/unpaid students for a given month.

- **Lesson Management**  
  - Create lessons and initialize attendance records.
  - End lessons and update student attendance.

- **Image Upload**  
  - Upload images to **MinIO** and retrieve their URLs.

- **Statistics**  
  - Generate monthly statistics on:
    - Total students
    - Students who left
    - Total groups
    - Total teachers

---

## Technologies Used

- **NestJS:** A progressive Node.js framework for building efficient, reliable, and scalable server-side applications.
- **TypeScript:** A superset of JavaScript that adds static typing for better code maintainability.
- **PostgreSQL:** A powerful, open-source object-relational database system.
- **TypeORM:** An Object Relational Mapper (ORM) for TypeScript and JavaScript.
- **MinIO:** A high-performance object storage server compatible with Amazon S3.
- **Stripe:** A secure and reliable payment processing platform for online businesses.
- **Swagger:** An API documentation tool.
- **Docker Compose:** A tool for defining and managing multi-container Docker applications.
- **Adminer:** A database management tool.

---

## Installation and Usage

### 1. Clone the repository:

```bash
git clone https://github.com/rarebek/crm-panel.git
cd crm-panel
pnpm install
```

### 2. Configure Environment:
Create a .env file in the root directory.
Populate the .env file with the necessary environment variables. You can find a template and explanations in the docker-compose.yaml file.
Make sure to include your Stripe secret key.
### 3. Start the Application:
```bash
docker-compose up -d
```
This command will build and run all the necessary containers (database, MinIO, API server).

### 4. Access Swagger Documentation:
Once the application is running, you can find the Swagger documentation at:

http://localhost:3000/api

Use Swagger to explore the API endpoints, understand their functionality, and test requests.