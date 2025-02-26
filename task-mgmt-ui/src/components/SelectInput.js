import React from "react";
import Select from "react-select";
import "../styles/SelectInput.css"; 

const SelectInput = ({ label, options, value, onChange, isMulti = false }) => {
  return (
    <div className="select-input-container">
      <label className="select-label">{label}</label>
      <Select
        options={options}
        isMulti={isMulti}
        value={options.filter((option) => value.includes(option.value))}
        onChange={onChange}
        className="custom-select"
      />
    </div>
  );
};

export default SelectInput;
