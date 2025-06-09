import React from "react";

interface InputProps {
  type: React.HTMLInputTypeAttribute;
  name: string;
  placeholder?: string;
  className?: string;
}

function Input({ type, name, placeholder, className }: InputProps) {
  return (
    <input
      className={`p-10 margin-bottom text-slate-500 rounded-md padding-10 border-1 border-slate-400 active:border-0 ${className}`}
      type={type}
      name={name}
      placeholder={placeholder}
    />
  );
}

export default Input;
