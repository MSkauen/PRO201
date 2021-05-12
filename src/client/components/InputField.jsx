import React from "react";

export function InputField({ id, onChangeValue, value, type, placeholder }) {
  return (
    <input
      id={id}
      type={type}
      value={value}
      placeholder={placeholder}
      onChange={(e) => onChangeValue(e.target.value)}
    />
  );
}
