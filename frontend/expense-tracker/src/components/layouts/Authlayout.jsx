import React from "react";
import card2 from "../../assets/images/card2.png";
import { LuTrendingUpDown } from "react-icons/lu";
const Authlayout = ({ children }) => {
  return (
    <div className="flex ">
      <div className="w-screen h-screen md:w-[60vw] px-12  pt-8 pb-12">
        <h2 className="text-lg font-medium text-black">Expense Tracker</h2>
        {children}
      </div>

      <div className="hidden md:block w-[40vw] h-screen Ibg-violet-50 bg-auth-bg-img bg-cover bg-no-repeat bg-center overflow-hidden p-8 relative">
        <div className="w-48 h-48 rounded-[40px] bg-purple-600 absolute -top-7 -left-5" />
        <div className="w-48 h-56 rounded-[40px] border-[20px] border-fuchsia-600 absolute top-[30%] -right-10" />
        <div className="w-48 h-48 rounded-[40px] bg-violet-500 absolute -bottom-7 left-5" />
        <div className="grid grid-cols-1 z-10 relative">
          <StatsInfoCard
            icon={<LuTrendingUpDown />}
            label="Track Your Income & Expenses"
            value="430,000"
            color="bg-purple-600"
          />
        </div>

        <img
          src={card2}
          className="w-64 lg:w-[90%] absolute bottom-10 shadow-lg shadow-blue-400/15 rounded-2xl"
        />
      </div>
    </div>
  );
};

export default Authlayout;


const StatsInfoCard = ({ icon, label, value, color }) => {
  return <div className="flex items-center gap-2 p-4 rounded-lg bg-white shadow-md">
    <div className={`w-12 h-12 rounded-full flex items-center text-white justify-center ${color}`}>
      {icon}
    </div>
    <div>
      <p className="text-sm font-medium text-gray-700">{label}</p>
      <p className="text-lg font-bold text-gray-900">{value}</p>
    </div>
  </div>
}
