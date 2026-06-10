# StudentBudget Web App

StudentBudget is a full-stack budgeting web application designed to help students manage their income, expenses, and available budget. Users can register, log in, set a budget, add income and expenses, view transaction history, and contact the app owner through a contact form.

## Features

* User registration and login
* Set a personal budget
* Add income entries
* Add expense entries
* View remaining budget
* View transaction history
* Contact form with email sending
* Responsive dashboard interface
* REST API for user, budget, income, and expense management

## Tech Stack

### Frontend

* Vue 3
* Quasar Framework
* Vue Router
* Axios
* Bootstrap Icons
* SCSS

### Backend

* Node.js
* Express.js
* MySQL
* Nodemailer
* dotenv
* Jest
* Supertest

## Project Structure

```text
StudentBudget-webapp/
├── backend/
│   ├── indeks.js
│   ├── init.sql
│   ├── env.example
│   ├── package.json
│   └── budzet.test.js
│
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   ├── layouts/
│   │   ├── router/
│   │   └── css/
│   ├── package.json
│   ├── index.html
│   └── quasar.config.js
│
├── install.bat
└── README.md
```

## Main Pages

```text
/          Home page
/dash      Budget dashboard
/trans     Transaction history
/onama     About page
/kontakt   Contact page
/prijava   Login and registration page
```

## Backend API Endpoints

```text
POST /api/login
POST /api/register
GET  /api/budget/:userId
POST /api/set-budget
POST /api/add-rashod
POST /api/add-prihod
GET  /api/transactions/user/:userId
POST /send-email
```

## Requirements

Before running the project, install:

* Node.js 18 or 20
* npm
* MySQL

## Environment Variables

Create a `.env` file inside the `backend` folder.

```env
DB_HOST=localhost
DB_USER=your_mysql_user
DB_PASSWORD=your_mysql_password
DB_NAME=studentbudget

SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password

PORT=3000
```

Do not commit the `.env` file to GitHub.

The project includes an `env.example` file that can be used as a template:

```env
DB_HOST=
DB_USER=
DB_PASSWORD=
DB_NAME=

SMTP_USER=
SMTP_PASS=

PORT=
```

## Database Setup

Create the database and tables using the SQL script:

```bash
cd backend
mysql -u root -p < init.sql
```

The script creates the required tables:

* `korisnici`
* `budzeti`
* `prihodi`
* `rashodi`

## Installation and Running

### 1. Run the backend

```bash
cd backend
npm install
node indeks.js
```

Backend runs on:

```text
http://localhost:3000
```

### 2. Run the frontend

Open a new terminal:

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on:

```text
http://localhost:9000
```

## Running Tests

Backend tests:

```bash
cd backend
npm test
```

Frontend linting:

```bash
cd frontend
npm run lint
```

## Author

Created by kbazon.
