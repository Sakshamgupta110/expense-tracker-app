import React,{useContext, useState} from 'react'
import { useNavigate } from 'react-router-dom'
import { SIDE_MENU_DATA } from '../../utils/data'
import { UserContext } from '../../context/UserContext'

const SideMenu = ({ activemenu }) => {
  const {user,clearUser} = useContext(UserContext)

  const navigate =useNavigate();

  const handleClick = (route) =>{
    if(route=='logout'){
      handleLogout();
      return;
    }
    navigate(route);
  };
  const handleLogout =()=>{
    localStorage.clear();
    clearUser();
    navigate("/login");
  };
  return (
    <div className="h-full bg-white shadow-lg border-r border-gray-200">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center gap-3">
          {user?.profileImageUrl ? (
            <img
              src={user?.profileImageUrl || ""}
              alt="Profile Image"
              className="w-12 h-12 rounded-full object-cover border-2 border-violet-200"
            />
          ) : (
            <div className="w-12 h-12 rounded-full bg-violet-500 flex items-center justify-center text-white font-semibold text-lg">
              {user?.fullName ? user.fullName.charAt(0).toUpperCase() : 'U'}
            </div>
          )}
          <div>
            <h5 className="font-semibold text-gray-900 text-sm">
              {user?.fullName || "User"}
            </h5>
            <p className="text-xs text-gray-500">{user?.email}</p>
          </div>
        </div>
      </div>
      
      <div className="p-4">
        {SIDE_MENU_DATA.map((item, index) => {
          const isActive = activemenu === item.label;
          return (
            <button
              key={`menu_${index}`}
              className={`w-full flex items-center gap-4 text-[15px] font-medium transition-all duration-200 ${
                isActive
                  ? "text-white bg-violet-600 shadow-md border-r-4 border-violet-800" 
                  : "text-gray-600 hover:bg-violet-50 hover:text-violet-600"
              } py-3 px-6 rounded-lg mb-2`}
              onClick={() => handleClick(item.path)}
            > 
              <item.icon className={`text-xl ${isActive ? "text-white" : "text-gray-400"}`} />
              {item.label}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default SideMenu