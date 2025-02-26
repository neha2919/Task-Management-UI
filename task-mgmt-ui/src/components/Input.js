import React from "react";
import "../styles/Input.css";

const Input = ({ label, type, value, onChange, name }) => {
  return (
    <div className="input-container">
      <label>{label}</label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        name={name}
        autoComplete="off"
      />
    </div>
  );
};

export default Input;
