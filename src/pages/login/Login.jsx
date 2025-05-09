import React, { useState, useEffect } from "react";
import { loginFields, loginButton } from "./loginConfig";
import cloudLogo from "/home/tanishk/Downloads/CloudBalanceFrontEnd/CloudBalance/src/images/image1.png";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setUserData } from "../../redux/reducer";
import FormRenderer from "../../component/form/FormRender";
import CommonButton from "../../component/button";
import { postApi, getApi } from "../../services/apiService";
import { toast } from "react-toastify";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.userReducer.user);

  const [data, setData] = useState({ email: "", password: "" });
  const [error, setError] = useState({});

  useEffect(() => {
    if (user?.role === "ADMIN" || user?.role === "READ_ONLY") {
      navigate("/dashboard/users", { replace: true });
    } else if (user?.role === "CUSTOMER") {
      navigate("/dashboard/cost-explorer", { replace: true });
    }
  }, [user, navigate]);

  const validate = () => {
    const newErrors = {};
    if (!data.email) {
      newErrors.email = "Email is required";
      toast.error("Email is required");
    } else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(data.email)) {
      newErrors.email = "Invalid email format";
    }
    if (!data.password) {
      newErrors.password = "Password is required";
    } else if (data.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
    if (error[name]) {
      setError((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setError(validationErrors);
      return;
    }

    try {
      const response = await postApi("/auth/signin", data);
      localStorage.setItem("token", response.data.data.token);
      toast.success("Login successful!");

      const userRes = await getApi("/users/me");
      const userData = userRes.data.data;
      dispatch(setUserData(userData));

      const role = userData?.role;
      setTimeout(() => {
        if (role === "ADMIN") {
          navigate("/dashboard/users", { replace: true });
        } else {
          navigate("/dashboard/cost-explorer", { replace: true });
        }
      }, 600);
    } catch (err) {
      console.error("Login error:", err.message);
      const backendMessage = err?.response?.data?.message;
      toast.error(backendMessage || "Login failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-white px-4">
      <form
        onSubmit={handleLogin}
        className="bg-white shadow-xl rounded-[2rem] w-full max-w-sm p-8 space-y-5"
      >
        <div className="flex justify-center">
          <img src={cloudLogo} alt="CloudBalance Logo" className="h-10 object-contain" />
        </div>

        <h2 className="text-xl font-semibold text-center text-gray-800">
          Login to CloudBalance
        </h2>

        <FormRenderer
          fields={loginFields}
          data={data}
          onChange={handleChange}
          errors={error}
        />

        <CommonButton
          type={loginButton.type}
          text={loginButton.text}
          sx={{ marginTop: 2 }}
        />
      </form>
    </div>
  );
};

export default Login;
