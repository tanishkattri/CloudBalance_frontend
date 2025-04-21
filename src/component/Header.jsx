import React from "react";
import useLogoutUser from "../assets/logout";
import img from "/home/tanishk/Downloads/CloudBalanceFrontEnd/CloudBalance/src/images/image1.png"
import { useSelector } from "react-redux";
import CommonButton from "./button";

const Header = () => {
  const logout = useLogoutUser();
  const user = useSelector((state) => state.userReducer.user) || "GUEST";
  return (
    <div>
      <header className="bg-white shadow-md px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <img src={img} alt="Logo" className="h-9" />
        </div>

        <div className="flex items-center gap-6">
          <div className="text-sm text-gray-700">
            Welcome,{" "}
            <span className="font-medium">{user.firstName || "Guest"}</span>
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
    </div>
  );
};

export default Header;
