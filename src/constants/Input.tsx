import React from "react";

type InputProps = {
  label: string;
  attributes: {
    id?: string;
    name?: string;
    type?: string;
    placeholder?: string;
    required?: boolean;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    value?: string;
    autoFocus?: boolean;
  };
};

const Input = ({ label = "", attributes = {} }: InputProps) => {
  return (
    <div>
      {label && (
        <label
          htmlFor={attributes?.id || label.toLowerCase()}
          className="font-semibold first-letter:uppercase"
        >
          {label}
        </label>
      )}
      <input
        {...attributes}
        className="mb-2 w-full rounded-lg border bg-[#fafafa] px-2 py-2 leading-tight text-gray-700  outline-none placeholder:text-sm placeholder:text-[#737373] focus:border"
      />
    </div>
  );
};

export default Input;
