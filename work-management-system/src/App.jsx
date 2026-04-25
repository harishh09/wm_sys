import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import { useSelector } from "react-redux";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminDashboard from "./pages/AdminDashboard";
import DashboardLayout from "./layouts/DashboardLayout";
import Projects from "./pages/Projects";
import Dashboard from "./pages/Dashboard";
import ProjectDetails from "./pages/ProjectDetails";
import Users from "./pages/Users";
import Settings from "./pages/Settings";
import Signup from "./pages/Signup";

function App() {
  const user = useSelector((state) => state.auth.user);

  return (
    <BrowserRouter>
      <Routes>
      <Route path="/signup" element={<Signup />} />
  <Route path="/login" element={<Login />} />

  <Route
  path="/users"
  element={
    <ProtectedRoute role="Admin">
      <DashboardLayout>
        <Users />
      </DashboardLayout>
    </ProtectedRoute>
  }
/>

  <Route
    path="/admin"
    element={
      <ProtectedRoute role="Admin">
        <DashboardLayout>
          <AdminDashboard />
        </DashboardLayout>
      </ProtectedRoute>
    }
  />

  <Route
    path="/manager"
    element={
      <ProtectedRoute role="Manager">
        <h1>Manager Dashboard 📋</h1>
      </ProtectedRoute>
    }
  />

  {/* ✅ MAIN DASHBOARD ROUTE (ONLY ONE "/") */}
  <Route
    path="/"
    element={
      <ProtectedRoute>
        <DashboardLayout>
          <Dashboard />
        </DashboardLayout>
      </ProtectedRoute>
    }
  />

  <Route
    path="/projects"
    element={
      <ProtectedRoute>
        <DashboardLayout>
          <Projects />
        </DashboardLayout>
      </ProtectedRoute>
    }
  />
  <Route
  path="/projects/:id"
  element={
    <ProtectedRoute>
      <DashboardLayout>
        <ProjectDetails />
      </DashboardLayout>
    </ProtectedRoute>
  }
/>
<Route
  path="/settings"
  element={
    <ProtectedRoute>
      <DashboardLayout>
        <Settings />
      </DashboardLayout>
    </ProtectedRoute>
  }
/>
</Routes>
    </BrowserRouter>
  );
}
export default App;