import React from "react";
import Header from "../../component/Header";
import SideBar from "../../component/SideBar";
import { adminCon } from "./SideBarConfig";
import { Outlet } from "react-router-dom";

const Dashboard = () => {
  return (
    <div className="h-screen w-screen overflow-hidden">

      <div className="fixed top-0 left-0 right-0 z-50 h-13 bg-white border-b">
        <Header
          userName="Admin"
          onLogout={() => console.log("Logout clicked")}
        />
      </div>

      {/* Fixed Sidebar */}
      <div className="fixed top-16 left-0 bottom-0 w-64 bg-white border-r z-40 overflow-hidden">
        <SideBar adminCon={adminCon} />
      </div>

      {/* Scrollable Main Content */}
      <main className="ml-64 mt-14 h-[calc(100vh-4rem)] overflow-y-auto p-6 bg-gray-50">
        <Outlet />
      </main>
      
    </div>
  );
};

export default Dashboard;
