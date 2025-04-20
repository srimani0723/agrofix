# **Project: Role-Based Routing Application**

## **Overview**
This project is a web application designed to manage role-based routing and authentication for buyers, admins, and general users. Users log in to the application, and their roles are saved in cookies, which determine their access to specific sections of the app.

---

## **Features**
- **Authentication**: Users can log in and register. Credentials are validated, and roles are assigned based on user type.
- **Role-Based Routing**: Pages like `BuyersPage` and `AdminsPage` are protected, accessible only to users with the appropriate role.
- **Cookies for Role Persistence**: After login, the role is stored in cookies, ensuring the user's role persists across sessions.
- **Responsive UI**: The app uses Material-UI for a clean and responsive design.
- **Error Handling**: Includes fallback routes like `NotFound` to handle unauthorized access or invalid URLs.

---

## **Technologies Used**
### **Frontend**:
- React.js for building the UI.
- React Router for navigation and routing.
- Material-UI for responsive and modern design components.
- js-cookie for cookie management.

### **Backend**:
- Node.js with Express.js for handling API requests and managing authentication.
- Knex.js for database queries.

### **Database**:
- PostgreSQL (or any relational database) for storing user information, roles, and orders.

### **Others**:
- Axios for making HTTP requests.

---

## **Setup Instructions**
### **Prerequisites**
- Node.js installed.
- A database (PostgreSQL/MySQL) with the required schema.
- Git installed.

### **1. Clone the Repository**
```bash
git clone https://github.com/yourusername/repository-name.git
cd repository-name
```
## **2. Install Dependencies**
Install all the necessary dependencies for both the frontend and backend by running the following command:
```bash
npm install
```

