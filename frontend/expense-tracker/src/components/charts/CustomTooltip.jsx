import React from 'react';

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white px-2 py-1 rounded shadow border border-gray-200 text-xs">
        <p className="font-semibold text-purple-800 mb-0">{payload[0].name}</p>
        <p className="text-gray-700 mb-0">
          Amount: <span className="font-bold text-gray-900">₹{payload[0].value.toLocaleString()}</span>
        </p>
      </div>
    );
  }
  return null;
};

export default CustomTooltip;