import React from "react";
import { CircularProgress } from "@mui/material";

const ScopeLoader = () => {
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        backgroundColor: "rgba(255, 255, 255, 0.6)",
        zIndex: 10,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <CircularProgress color="primary" size={40} />
    </div>
  );
};

export default ScopeLoader;
