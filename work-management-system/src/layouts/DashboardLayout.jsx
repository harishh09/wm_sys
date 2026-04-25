import Sidebar from "../components/Sidebar";

const DashboardLayout = ({ children }) => {
  return (
    <div className="flex min-h-screen">
      
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-300 p-6">
        {children}
      </div>

    </div>
  );
};

export default DashboardLayout;