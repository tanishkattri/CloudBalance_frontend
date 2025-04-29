import React from "react";
import useLogoutUser from "../assets/logout";
import img from "/home/tanishk/Downloads/CloudBalanceFrontEnd/CloudBalance/src/images/image1.png";
import { useSelector } from "react-redux";
import CommonButton from "./button";
import { useNavigate } from "react-router-dom";

const Header = ({ toggleSidebar }) => {
  const logout = useLogoutUser();
  const navigate = useNavigate();
  const user = useSelector((state) => state.userReducer.user) || {};

  const handleLogoClick = () => {
    if (user?.role === "ADMIN" || user?.role === "READ_ONLY") {
      navigate("/dashboard/users");
    } else if (user?.role === "CUSTOMER") {
      navigate("/dashboard/cost-explorer");
    }
  };

  return (
    <header className="bg-white shadow-md px-6 py-3 flex items-center justify-between">
      <div className="flex items-center gap-3">
        {/* ✅ Clickable Logo */}
        <img
          src={img}
          alt="Logo"
          onClick={handleLogoClick}
          className="h-9 cursor-pointer"
        />

        {/* 🔁 Sidebar Toggle Button on right of logo */}
        <button
          onClick={toggleSidebar}
          className="text-gray-700 hover:text-blue-500 focus:outline-none"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      <div className="flex items-center gap-6">
        <div className="text-sm text-gray-700">
          Welcome, <span className="font-medium">{user.firstName || "Guest"}</span>
        </div>

        <CommonButton
          text="Logout"
          onClick={logout}
          color="error"
          variant="contained"
          fullWidth={false}
          className="text-sm px-4 py-1"
        />
      </div>
    </header>
  );
};

export default Header;
