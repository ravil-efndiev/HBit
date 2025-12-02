import React from "react";

interface Props {
  value: string;
  onChange: (newValue: string) => void;
  placeholder: string;
}

const TextInput = ({ value, onChange, placeholder }: Props) => {
  return (
    <input
      type="text"
      className="input input-primary mb-1.5 bg-(--col-primary-muted) shadow-xs"
      placeholder={placeholder}
      onChange={(e) => onChange(e.target.value)}
      value={value}
    />
  );
};

export default TextInput;
