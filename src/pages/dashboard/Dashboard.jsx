import React, { useState } from "react";
import Header from "../../component/Header";
import SideBar from "../../component/SideBar";
import { Outlet } from "react-router-dom";
import Footer from "../../component/Footer";

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen((prev) => !prev);
  };

  return (
    <div className="h-screen w-screen overflow-hidden">

      {/* Fixed Header */}
      <div className="fixed top-0 left-0 right-0 z-50 h-13 bg-white border-b">
        <Header toggleSidebar={toggleSidebar} />
      </div>

      {/* Fixed Sidebar */}
      <div className={`fixed top-16 left-0 bottom-0 ${sidebarOpen ? "w-64" : "w-20"} bg-white border-r z-40 overflow-hidden transition-all duration-300`}>
        <SideBar sidebarOpen={sidebarOpen} />
      </div>

      {/* Main Content */}
      <main className={`${sidebarOpen ? "ml-64" : "ml-20"} mt-14 h-[calc(100vh-4rem)] overflow-y-auto p-6 bg-gray-50 transition-all duration-300`}>
        <Outlet />
      </main>

      {/* Footer */}
      <div className="fixed mb-0 pb-0 bottom-0 left-0 right-0 z-50 h-12 bg-white border-t">
        <Footer />
      </div>

    </div>
  );
};

export default Dashboard;
