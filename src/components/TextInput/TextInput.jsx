import React from "react";
import "./styles.css";

const TextInput = ({ searchValue, handleChange }) => {
  return (
    <input
      className="text-input"
      onChange={handleChange}
      value={searchValue}
      type="search"
      placeholder="type your search"
    />
  );
};

export default TextInput;
