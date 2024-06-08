import React from "react";
import InputContainer from "../InputContainer/InputContainer";
import classes from "./input.module.css";
function Input(
  { type, name, label, defaultValue, onChange, onBlur, error },
  ref
) {
  const getErrorMessage = () => {
    if (!error) return;
    if (error.message) return error.message;

    switch (error.type) {
      case "required":
        return `${label} is required`;
      case "minLength":
        return `${label} must be at least ${error.types.minLength} characters`;
      case "maxLength":
        return `${label} must be at most ${error.types.maxLength} characters`;
      case "pattern":
        return `${label} is invalid`;
      case "validate":
        return error.message;
      default:
        return `*`;
    }
  };
  return (
    <InputContainer label={label}>
      <input
        defaultValue={defaultValue}
        className={classes.input}
        type={type}
        placeholder={label}
        ref={ref}
        name={name}
        onChange={onChange}
        onBlur={onBlur}
      />
      {error && <span className={classes.error}>{getErrorMessage()}</span>}
    </InputContainer>
  );
}

export default React.forwardRef(Input);
