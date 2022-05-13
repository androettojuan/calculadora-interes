import React from "react";
import { useField } from "formik";
import "./Input.css";

const Input = ({ label, ...props }) => {
  const [field, meta] = useField(props);

  return (
    <div className="control">
      <label className="label">{label}</label>
      <input className="input" {...field} {...props}></input>
      {meta.touched && meta.error ? (
        <div className="error-message"></div>
      ) : null}
    </div>
  );
};

export default Input;
