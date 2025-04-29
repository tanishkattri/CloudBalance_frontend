import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import { getApi } from "../../../services/apiService";
import { getUserTableColumns } from "../../../component/userTableConfig";
import MuiDataTable from "../../../component/table/DataTable";
import CommonButton from "../../../component/button";

const UserManagement = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.userReducer.user);

  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await getApi("/users");
        setUsers(response.data.data);
      } catch (error) {
        console.error("Failed to fetch users:", error);
      }
    };
    fetchUsers();
  }, []);

  const columns = getUserTableColumns(navigate, user.role);
  const formattedUsers = users.map((u, index) => ({
    id: index + 1,
    ...u,
  }));

  return (
    <div className="p-6">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Users</h1>

        {user.role === "ADMIN" && (
          <CommonButton
            text="+ Add New User"
            onClick={() => navigate("/dashboard/users/create-user")}
            color="primary"
            variant="contained"
            fullWidth={false}
            className="px-4 py-2"
          />
        )}
      </div>

      {/* User Table */}
      <MuiDataTable columns={columns} rows={formattedUsers} />
    </div>
  );
};

export default UserManagement;
