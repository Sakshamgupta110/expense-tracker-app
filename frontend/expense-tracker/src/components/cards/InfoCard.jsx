import React from 'react';

const InfoCard = ({
  icon,
  label,
  value,
  color = 'bg-blue-500', // fallback color
}) => {
  return (
    <div className="flex items-center gap-4 p-4 bg-white rounded-2xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-300">
      <div
        className={`flex items-center justify-center w-14 h-14 text-white text-[26px] ${color} rounded-full shadow-lg`}
      >
        {icon}
      </div>
      <div className="flex flex-col">
        <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">
          {label}
        </span>
        <span className="text-2xl font-semibold text-gray-800">
          {value}
        </span>
      </div>
    </div>
  );
};

export default InfoCard;
