import React, { useRef } from "react";
import Step_2 from "./steps/Step_2";
import Step_3 from "./steps/Step_3";
import { useState } from "react";
import { postApi } from "../../../services/apiService";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import I_AM_Role from "./steps/I_AM_Role/I_AM_Role";
import { toast} from "react-toastify";
const Onboarding = () => {
  const navigate = useNavigate();
  const [account, setAccount] = useState({
    accountName: "",
    accountNumber: "",
    arnNumber: "",
  });
  const topRef = useRef(null);
  const handleChange = (e) => {
    setAccount((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const [errors, setErrors] = useState({
    arnNumber: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!account.accountName || !account.accountNumber || !account.arnNumber) {
      alert("Please fill all the fields");
      return;
    }

    try {
      const response = await postApi("/accounts", account);
      console.log("Account saved successfully:", response.data);
      toast.success("Account saved successfully!");

      setAccount({
        accountName: "",
        accountNumber: "",
        arnNumber: "",
      });
      navigate("/dashboard/Onboarding/ThankYou", { replace: true });
    } catch (error) {
      console.error("Error saving account:", error);
      toast.error("Failed to save account.");
    }
  };

  

  const [step, setStep] = useState(1);


  const cancel = () => {
    setStep(1);
    setAccount({
      accountName: "",
      accountNumber: "",
      arnNumber: "",
    });
    setErrors({
      arnNumber: "",
    });
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      topRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);

    return () => clearTimeout(timeout);
  }, [step]);

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  const steps = {
    1: (
      <I_AM_Role
        data={account}
        nextStep={nextStep}
        onChange={handleChange}
        errors={errors}
        setErrors={setErrors}
        cancel={cancel}
      />
    ),
    2: <Step_2 nextStep={nextStep} prevStep={prevStep} cancel={cancel}/>,
    3: <Step_3 onSubmit={handleSubmit} prevStep={prevStep} cancel={cancel}/>,
  };

  return <div ref={topRef}>{steps[step]}</div>;
};

export default Onboarding;
