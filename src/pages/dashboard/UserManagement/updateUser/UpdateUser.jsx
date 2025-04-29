import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import FormRenderer from "../../../../component/form/FormRender";
import userUpdateConfig from "./updateUserConfig";
import { getApi, putApi } from "../../../../services/apiService";
import { toast } from "react-toastify";
import CommonButton from "../../../../component/button";

const UpdateUser = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    role: "",
    password: "",
    confirmPassword: "",
    accounts: [],
  });

  const [allAccounts, setAllAccounts] = useState([]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await getApi(`/users/${id}`);
        const userData = res.data.data || res;
        console.log(userData);
        setUser({
          firstName: userData.firstName || "",
          lastName: userData.lastName || "",
          email: userData.email || "",
          role: userData.role || "",
          password: "",
          confirmPassword: "",
          accounts: userData.accounts || [],
        });
      } catch (err) {
        toast.error("Failed to fetch user" + err.message);
      }
    };

    fetchUser();
  }, [id]);

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const res = await getApi("/accounts");
        setAllAccounts(res.data || res);
      } catch (err) {
        console.error("Failed to fetch accounts", err);
      }
    };

    fetchAccounts();
  }, []);

  const handleChange = (e) => {
    setUser((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...user,
        accounts: user.accounts,
      };

      await putApi(`/users/${id}`, payload);
      toast.success("User updated successfully!");
      navigate("/dashboard/users");
    } catch (error) {
      toast.error("Failed to update user");
      console.error(error);
    }
  };

  return (
    <div className="px-8 py-6">
      <div className="text-sm text-gray-500 mb-2">
        <span
          className="text-blue-600 hover:underline cursor-pointer"
          onClick={() => navigate("/dashboard/users")}
        >
          Users
        </span>{" "}
        / UpdateUser
      </div>

      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Update User</h2>

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-5xl bg-white p-6 rounded-xl shadow border border-gray-200 grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5"
      >
        <FormRenderer
          fields={userUpdateConfig}
          data={user}
          onChange={handleChange}
          errors={{}}
        />

        {user.role === "CUSTOMER" && (
          <div className="col-span-2 bg-gray-50 border border-gray-300 p-4 rounded-md">
            <h3 className="text-md font-semibold mb-3">Assign Accounts</h3>

            <div className="grid grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium mb-2">All Accounts</h4>
                <div className="max-h-40 overflow-y-auto border p-2 rounded">
                  {allAccounts.map((acc) => (
                    <div
                      key={acc.id}
                      className="flex items-center justify-between py-1"
                    >
                      <span>
                        {acc.accountName} ({acc.accountNumber})
                      </span>
                      <button
                        type="button"
                        className="text-blue-600 hover:underline text-sm"
                        onClick={() =>
                          setUser((prev) => ({
                            ...prev,
                            accounts: [...prev.accounts, acc.id],
                          }))
                        }
                        disabled={user.accounts.includes(acc.id)}
                      >
                        Add
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-medium mb-2">Selected Accounts</h4>
                <div className="max-h-40 overflow-y-auto border p-2 rounded">
                  {allAccounts
                    .filter((acc) => user.accounts.includes(acc.id))
                    .map((acc) => (
                      <div
                        key={acc.id}
                        className="flex items-center justify-between py-1"
                      >
                        <span>
                          {acc.accountName} ({acc.accountNumber})
                        </span>
                        <button
                          type="button"
                          className="text-red-500 hover:underline text-sm"
                          onClick={() =>
                            setUser((prev) => ({
                              ...prev,
                              accounts: prev.accounts.filter(
                                (id) => id !== acc.id
                              ),
                            }))
                          }
                        >
                          Remove
                        </button>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="col-span-2 flex justify-center mt-4">
          <CommonButton
            type="submit"
            text="Update User"
            fullWidth={false}
            className="w-40"
            sx={{ marginTop: 2 }}
          />
        </div>
      </form>
    </div>
  );
};

export default UpdateUser;
