import { InputHTMLAttributes } from "react";
import "./Input.css";

type InputProps = {
  label?: string;
  errors?: string[];
} & InputHTMLAttributes<HTMLInputElement>;

export function Input({ label, errors, ...htmlInputProps }: InputProps) {
  return (
    <>
      <div className="element-form">
        <label className="label-form">{label}</label>
        <div>
          <input
            {...htmlInputProps}
            className={`input-form ${errors && "error-border"} ${
              htmlInputProps.className
            }`}
          ></input>
          {errors && errors.map((e, i) => <p key={`error-${i}`} className="error-form">{e}</p>)}
        </div>
      </div>
    </>
  );
}
