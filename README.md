# Restaurante Presidente Backend

**RESTful API for powering a fullstack restaurant management platform built with NestJS and MongoDB.**

Restaurante Presidente Backend provides the core business logic for a restaurant management system, including authentication, product catalog management, shopping cart operations, persistent notifications, user settings, and customer feedback via email.

## 📌 Description

This project serves as the backend layer of the **Restaurante Presidente** fullstack application.

It is responsible for:

✔ User authentication and authorization

✔ Product catalog management across multiple categories

✔ Shopping cart operations

✔ Persistent notifications storage

✔ User settings management

✔ Email feedback collection

✔ Administrative product management

The API is built using NestJS and follows a modular domain-based architecture to improve maintainability, scalability, and separation of responsibilities.

---

## ✨ Main Features

* 🔐 JWT-based authentication

* 🔑 Secure password hashing using bcrypt

* 🍽 Product CRUD by category:
  - Hot dishes
  - Cold dishes
  - Drinks
  - Desserts

* 🛒 Shopping cart management

* 🔔 Persistent notification tracking

* 📧 Customer feedback email module

* 👤 User profile settings management

* ⚡ MongoDB persistence with Mongoose

* 🐳 Dockerized MongoDB environment

---

## 🚀 Installation & Usage

Clone the repository:

```bash
git clone https://github.com/emanuelarevalomartinez/restaurante-backend-nest.git
cd restaurante-backend-nest
```

Install dependencies:

```bash
npm install
```

Create environment variables:

Create a `.env` file based on `.env.template`

Example:

```env
DB_PORT=mongodb://localhost:27017/restaurante_backend_nest
JWT_SECRET=super_secret_jwt_secret_passwordQ1*
```

---

## 🐳 Database Setup (Docker)

The project includes a Docker environment for MongoDB and Mongo Express.

Start the database services:

```bash
cd docker
docker compose up -d
```

This will start:

- MongoDB on port `27017`
- Mongo Express on port `8081`

Mongo Express UI:

```text
http://localhost:8081
```

---

## ▶ Running the Application

Development mode:

```bash
npm run start:dev
```

Production build:

```bash
npm run build
npm run start:prod
```

Debug mode:

```bash
npm run start:debug
```

By default, the API runs on:

```text
http://localhost:3000
```

---

## 🧩 Project Architecture

The project is organized into modular business domains:

| Module              | Responsibility                     |
| ------------------- | ---------------------------------- |
| `autenticacion`     | Authentication & JWT management    |
| `usuario`           | User management                    |
| `platos-calientes`  | Hot dishes CRUD                    |
| `platos-frios`      | Cold dishes CRUD                   |
| `bebidas`           | Drinks CRUD                        |
| `postres`           | Desserts CRUD                      |
| `carrito-usuario`   | Shopping cart logic                |
| `notificaciones`    | Notifications persistence          |
| `correos`           | Email feedback system              |
| `public`            | Static assets management           |

This modular separation allows each domain to remain independent and easier to maintain.

---

## 📚 API Capabilities

The API provides endpoints for:

✔ User registration

✔ User login

✔ Product retrieval by category

✔ Add product to cart

✔ Remove product from cart

✔ Clear shopping cart

✔ Create notifications

✔ Retrieve notifications

✔ Delete notifications

✔ Update user profile

✔ Change user password

✔ Change user email

✔ Send feedback emails

---

## 🛠 Tech Stack

| Technology        | Usage                         |
| ----------------- | ----------------------------- |
| NestJS            | Backend framework             |
| TypeScript        | Type safety                   |
| MongoDB           | Database                      |
| Mongoose          | ODM                           |
| JWT               | Authentication                |
| bcrypt            | Password hashing              |
| class-validator   | DTO validation                |
| class-transformer | Data transformation           |
| Nodemailer        | Email sending                 |
| Docker            | Database containerization     |
| Mongo Express     | Database visualization        |

---

## 🤝 Contributing

1. Fork the repository  
2. Create a new branch  
3. Commit your changes  
4. Open a Pull Request  

Contributions, improvements, and suggestions are welcome 🚀

---

## 📝 License

Apache License 2.0 — free for personal and commercial use.

## 🔗 Repository

[GitHub - Restaurante Presidente Backend](https://github.com/emanuelarevalomartinez/restaurante-backend-nest)