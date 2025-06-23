import React, { useState } from "react";
import { RiEyeLine, RiEyeOffLine } from "react-icons/ri";

const Input = ({ label, placeholder, type, value, onChange }) => {
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => setShowPassword((prev) => !prev);

  return (
    <div className="mb-2">
      {label && (
        <label className="text-[13px] text-slate-800 block mb-1">
          {label}
        </label>
      )}
      <div className="relative flex items-center input-box border rounded px-2 py-1 bg-white focus-within:ring-2 focus-within:ring-purple-400">
        <input
          type={type === "password" ? (showPassword ? "text" : "password") : type}
          placeholder={placeholder}
          className="w-full bg-transparent outline-none text-[15px] py-1"
          value={value}
          onChange={onChange}
          autoComplete={type === "password" ? "current-password" : undefined}
        />
        {type === "password" && (
          <button
            type="button"
            onClick={toggleShowPassword}
            className="absolute right-2 text-xl text-purple-600 hover:text-purple-800 focus:outline-none focus:text-purple-800 transition-colors"
            tabIndex={-1}
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? <RiEyeOffLine /> : <RiEyeLine />}
          </button>
        )}
      </div>
    </div>
  );
};

export default Input;
