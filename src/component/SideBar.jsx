import React from "react";
import { NavLink } from "react-router-dom";
import { adminCon } from "../pages/dashboard/SideBarConfig";
import { useSelector } from "react-redux";

const SideBar = () => {
  const user = useSelector((state) => state.userReducer.user);

  return (
    <aside className="w-64 h-[calc(100vh-64px)] bg-white border-r border-gray-200">
      <nav className="p-4">
        <ul className="space-y-1">
          {adminCon.map(
            (item, index) =>
              item?.allowedRoles?.includes(user?.role) && (
                <li key={index}>
                  <NavLink
                    to={item.path}
                    className={({ isActive }) =>
                      `block p-2 rounded-md ${
                        isActive
                          ? "bg-blue-500 text-white"
                          : "text-gray-700 hover:bg-gray-100"
                      }`
                    }
                  >
                    {item.text}
                  </NavLink>
                </li>
              )
          )}
        </ul>
      </nav>
    </aside>
  );
};

export default SideBar;
