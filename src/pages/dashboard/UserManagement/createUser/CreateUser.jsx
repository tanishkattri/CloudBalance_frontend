import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import userConfig from "./userDetailsConfig";
import { getApi } from "../../../../services/apiService";
import FormRenderer from "../../../../component/form/FormRender";
import { useEffect } from "react";
import CommonButton from "../../../../component/button";
import { postApi } from "../../../../services/apiService";

const CreateUser = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
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
    const fetchAccounts = async () => {
      try {
        const res = await getApi("/accounts");
        setAllAccounts(res.data);
      } catch (err) {
        console.error("Failed to fetch accounts", err);
      }
    };

    fetchAccounts();
  }, []);

  

  const payload = {
    ...formData,
    accounts: formData.accounts.map((acc) => acc.id),
  };

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    await postApi("/users", payload);
    navigate("/dashboard/users");
  };
  return (
    <>
      <div className="px-8 py-6">
        {/* Breadcrumb */}
        <div className="text-sm text-gray-500 mb-2">
          <span
            className="text-blue-600 hover:underline cursor-pointer"
            onClick={() => navigate("/dashboard/users")}
          >
            Users
          </span>{" "}
          / Add New User
        </div>

        {/* Page Title */}
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">
          Add New User
        </h2>

        {/* Form Container */}
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-5xl bg-white p-6 rounded-xl shadow border border-gray-200 grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5"
        >
          <FormRenderer
            fields={userConfig}
            data={formData}
            onChange={handleChange}
            errors={{}}
          />
          {formData.role === "CUSTOMER" && (
            <div className="col-span-2 bg-gray-50 border border-gray-300 p-4 rounded-md">
              <h3 className="text-md font-semibold mb-3">Assign Accounts</h3>

              <div className="grid grid-cols-2 gap-6">
                {/* All Accounts */}
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
                            setFormData((prev) => ({
                              ...prev,
                              accounts: [...prev.accounts, acc],
                            }))
                          }
                          disabled={formData.accounts.some(
                            (a) => a.id === acc.id
                          )}
                        >
                          Add
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Selected Accounts */}
                <div>
                  <h4 className="font-medium mb-2">Selected Accounts</h4>
                  <div className="max-h-40 overflow-y-auto border p-2 rounded">
                    {formData.accounts.map((acc) => (
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
                            setFormData((prev) => ({
                              ...prev,
                              accounts: prev.accounts.filter(
                                (a) => a.id !== acc.id
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

          {/* Submit Button */}
          <div className="col-span-2 flex justify-center mt-4">
            <CommonButton
              type="submit"
              text="Create User"
              fullWidth={false}
              className="w-40"
              sx={{ marginTop: 2 }}
            />
          </div>
        </form>
      </div>
    </>
  );
};

export default CreateUser;
