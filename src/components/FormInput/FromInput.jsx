import { useState } from "react";
import "./FromInput.css";
import React from "react";

function FormInput(props) {
  const [focused, setFocused] = useState(false);

  // eslint-disable-next-line react/prop-types
  const { label, errorMessage, onChange, id, ...inputProps } = props;

  const handleFocus = (e) => {
    setFocused(true);
  };

  return (
    <div className="form-input">
      <label>{label}</label>
      <input
        {...inputProps}
        onChange={onChange}
        onBlur={handleFocus}
        onFocus={() =>
          inputProps.name === "confirmPassword" && setFocused(true)
        }
        focused={focused.toString()}
      />
      <span className="mes">{errorMessage}</span>
    </div>
  );
}

export default FormInput;
