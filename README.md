# Enterprise Work Management System 🚀

A full-stack enterprise project management and employee collaboration platform built using **React.js, Redux Toolkit, Tailwind CSS, Node.js, Express.js, JWT, Socket.io, and Recharts**.

This system helps organizations manage projects, tasks, users, and productivity with role-based access control and analytics dashboard.

---

## 🌐 Live Links

- **Frontend (Vercel):** https://your-vercel-link.vercel.app  
- **Backend (Render):** https://wm-sys.onrender.com  
- **GitHub Repository:** https://github.com/harishh09/wm_sys

---

## 📌 Features

### 🔐 Authentication & Authorization

- User Signup / Login  
- JWT Authentication  
- Role Based Access:
  - Admin
  - Manager
  - Employee
- Protected Routes

### 📊 Dashboard

- Total Projects
- Total Tasks
- Completed Tasks
- Pending Tasks
- Pie Chart Analytics
- Tasks by Project Bar Chart
- Recent Activity Feed
- Real-time Notifications

### 📁 Project Management

- Create Project
- Edit Project
- Delete Project
- View Project Details

### ✅ Task Management

- Add Tasks
- Assign Tasks to Users
- Due Dates
- Priority Levels:
  - High
  - Medium
  - Low
- Status Tracking:
  - Pending
  - In Progress
  - Done

### 📌 Kanban Board

Drag & Drop Task Workflow:

- Pending
- In Progress
- Done

### 👥 User Management

- Add Users
- Delete Users
- Update Roles
- Toggle Active / Inactive Status
- Last Activity Tracking

### 🔔 Notifications

- Real-time updates using Socket.io
- Project updates
- Task updates
- User actions

### ⚙️ Settings

- Dark / Light Theme
- Theme Persistence using LocalStorage
- Profile Section

### 🧪 Testing

- 5 Unit Tests
- 1 Integration Test

---

## 🛠️ Tech Stack

### Frontend

- React.js
- Redux Toolkit
- React Router DOM
- Tailwind CSS
- Axios
- React Hook Form
- Recharts
- @hello-pangea/dnd

### Backend

- Node.js
- Express.js
- JWT
- bcryptjs
- Socket.io
- dotenv
- CORS

### Deployment

- Vercel
- Render

---

## 📂 Folder Structure

```text
wm_sys/
└── work-management-system/
    ├── backend/
    │   ├── server.js
    │   ├── users.json
    │   └── package.json
    │
    ├── public/
    ├── src/
    │   ├── pages/
    │   ├── features/
    │   ├── context/
    │   └── components/
    │
    ├── package.json
    └── vite.config.js

## ⚙️ Installation & Setup

### 1️⃣ Clone Repository

\`\`\`bash
git clone https://github.com/harishh09/wm_sys.git
cd wm_sys/work-management-system
\`\`\`

### 2️⃣ Install Frontend Dependencies

\`\`\`bash
npm install
\`\`\`

### 3️⃣ Install Backend Dependencies

\`\`\`bash
cd backend
npm install
\`\`\`

### 4️⃣ Create `.env` File in backend

\`\`\`env
PORT=5000
JWT_SECRET=your_secret_key
\`\`\`

### 5️⃣ Run Backend

\`\`\`bash
node server.js
\`\`\`

### 6️⃣ Run Frontend

Open new terminal:

\`\`\`bash
cd work-management-system
npm run dev
\`\`\`

---


## 📈 Future Enhancements

- MongoDB Integration
- File Uploads
- Email Notifications
- PDF Reports
- Team Chat
- Calendar Scheduling

---

## 👨‍💻 Developed By

**Harish Sahoo**  
