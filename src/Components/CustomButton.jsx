import React from "react";

const CustomButton = ({ children }) => {
  return (
    <div>
      <a
        href="#"
        className="rounded-xl bg-gradient-to-br from-green-600 to-emerald-400 px-6 py-4 font-dm text-sm font-medium text-white shadow-md shadow-green-400/50 transition-transform duration-200 ease-in-out hover:scale-[1.03]"
      >
        {children}
      </a>
    </div>
  );
};

export default CustomButton;
