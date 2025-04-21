const userUpdateConfig = [
    {
      name: "firstName",
      label: "First Name",
      type: "text",
      placeholder: "Enter first name",
      required: true,
    },
    {
      name: "lastName",
      label: "Last Name",
      type: "text",
      placeholder: "Enter last name",
      required: true,
    },
    {
      name: "email",
      label: "Email",
      type: "email",
      placeholder: "Enter email address",
      required: true,
    },
    {
      name: "role",
      label: "Role",
      type: "select",
      required: true,
      options: [
        { value: "", label: "--Select Role--" },
        { value: "ADMIN", label: "ADMIN" },
        { value: "CUSTOMER", label: "CUSTOMER" },
        { value: "READ_ONLY", label: "READ_ONLY" },
      ],
    },
    // {
    //   name: "password",
    //   label: "Password",
    //   type: "password",
    //   placeholder: "Enter new password (optional)",
    //   required: false,
    //   autoComplete: "new-password",
    // },
    // {
    //   name: "confirmPassword",
    //   label: "Confirm Password",
    //   type: "password",
    //   placeholder: "Confirm new password",
    //   required: false,
    //   autoComplete: "new-password", 
    // },
  ];
  
  export default userUpdateConfig;
  