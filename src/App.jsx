import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setUserData } from "./redux/reducer";
import { setNavigator } from "./utils/navigation";
import { getApi } from "./services/apiService";
import AppRoutes from "./routes/AppRoutes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    setNavigator(navigate);
  }, [navigate]);

  <ToastContainer
    position="top-right"
    autoClose={3000}
    hideProgressBar={false}
    newestOnTop
    closeOnClick
    pauseOnHover
    theme="light"
  />;

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await getApi("/users/me");
        dispatch(setUserData(res.data));
      } catch (err) {
        console.error("User fetch failed", err);
        localStorage.removeItem("token");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [dispatch]);

  if (loading) return null;

  return (
    <>
      <AppRoutes />;
      <ToastContainer />
    </>
  );
}

export default App;
