import React from "react";

export function InputField({ label, onChangeValue, value, type }) {
  return (
    <div>
      <label>
        {label}:{" "}
        <input
          type={type}
          value={value}
          onChange={(e) => onChangeValue(e.target.value)}
        />
      </label>
    </div>
  );
}
