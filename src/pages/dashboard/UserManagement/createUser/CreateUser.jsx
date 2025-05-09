import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import userConfig from "./userDetailsConfig";
import { getApi } from "../../../../services/apiService";
import FormRenderer from "../../../../component/form/FormRender";
import { useEffect } from "react";
import CommonButton from "../../../../component/button";
import { postApi } from "../../../../services/apiService";
import { toast } from "react-toastify";
import AccountSelector from "../../../../component/AccountSelector";

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
  const [errors, setErrors] = useState({});

  const validateField = (name, value) => {
    const fieldConfig = userConfig.find((field) => field.name === name);
    if (!fieldConfig) return "";

    if (fieldConfig.required && !value) {
      return `${fieldConfig.label} is required.`;
    }

    if (fieldConfig.minlength && value.length < fieldConfig.minlength) {
      return `${fieldConfig.label} must be at least ${fieldConfig.minlength} characters.`;
    }

    if (fieldConfig.maxlength && value.length > fieldConfig.maxlength) {
      return `${fieldConfig.label} must be less than ${fieldConfig.maxlength} characters.`;
    }

    if (fieldConfig.pattern) {
      const regex = new RegExp(fieldConfig.pattern);
      if (!regex.test(value)) {
        return `Invalid ${fieldConfig.label.toLowerCase()}.`;
      }
    }

    return ""; // No error
  };

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
    accounts:
      formData.role === "CUSTOMER"
        ? formData.accounts.map((acc) => acc.id)
        : [],
  };

  // const handleChange = (e) => {
  //   setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  // };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    const error = validateField(name, value);
    setErrors((prevErrors) => ({ ...prevErrors, [name]: error }));
  };

  const validateAllFields = () => {
    let tempErrors = {};
    userConfig.forEach((field) => {
      const error = validateField(field.name, formData[field.name]);
      if (error) {
        tempErrors[field.name] = error;
      }
    });
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0; // No errors => form valid
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateAllFields()) {
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      await postApi("/users", payload);
      toast.success("User created successfully");
      navigate("/dashboard/users");
    } catch (error) {
      // Handle axios error
      const backendMessage = error?.response?.data?.message;
      if (backendMessage) {
        toast.error(backendMessage);
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    }
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
            onBlur={handleBlur}
            errors={errors}
          />
          {formData.role === "CUSTOMER" && (
            <AccountSelector
              allAccounts={allAccounts}
              selectedAccounts={formData.accounts}
              onAddAccount={(acc) =>
                setFormData((prev) => ({
                  ...prev,
                  accounts: [...prev.accounts, acc],
                }))
              }
              onRemoveAccount={(id) =>
                setFormData((prev) => ({
                  ...prev,
                  accounts: prev.accounts.filter((a) => a.id !== id),
                }))
              }
            />
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
