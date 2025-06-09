import React from "react";

interface LabelProps {
  labelMessage: string;
  className?: string;
}
function Label({ labelMessage, className }: LabelProps) {
  return (
    <label
      className={`block marginLabel ${className}`}
    >{`${labelMessage}:`}</label>
  );
}

export default Label;
