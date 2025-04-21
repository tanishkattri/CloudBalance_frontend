const adminCon = [
  { text: "User Management", path: "users", allowedRoles:["ADMIN", "READ_ONLY"] },
  { text: "Onboarding", path: "onboarding", allowedRoles:["ADMIN"] },
  { text: "Cost Explorer", path: "cost-explorer", allowedRoles:["ADMIN", "CUSTOMER", "READ_ONLY"] },
  { text: "AWS Services", path: "aws-services", allowedRoles:["ADMIN", "CUSTOMER", "READ_ONLY"] }
];

export { adminCon };
