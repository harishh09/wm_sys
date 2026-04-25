import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
  const location = useLocation();

  const linkClasses = (path) =>
    `block px-3 py-2 rounded transition ${
      location.pathname === path
        ? "bg-blue-500 text-white"
        : "text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-800"
    }`;

  return (
    <div className="w-64 min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white p-4 transition-colors duration-300">
      
      <h2 className="text-xl font-bold mb-6">WMS</h2>

      <ul>
        <li className="mb-2">
          <Link to="/" className={linkClasses("/")}>
            Dashboard
          </Link>
        </li>

        <li className="mb-2">
          <Link to="/projects" className={linkClasses("/projects")}>
            Projects
          </Link>
        </li>

        <li className="mb-2">
          <Link to="/users" className={linkClasses("/users")}>
            Users
          </Link>
        </li>

        <li className="mb-2">
          <Link to="/settings" className={linkClasses("/settings")}>
            Settings
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;