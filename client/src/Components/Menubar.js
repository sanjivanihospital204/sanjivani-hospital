import React, { useState } from "react";
import {
  dashboard,
  logo,
  logout,
  user
} from "../Assets/index";

const Menubar = () => {
  const [selectedItem, setSelectedItem] = useState(null);

  const menuItems = [
    { name: "Patient Dashboard", icon: dashboard, link: "/dashboard" },
    {
      name: "User Management",
      icon: user,
      link: "/user-management",
    }
  ];

  const handleItemClick = (item) => {
    setSelectedItem(item);
  };

  return (
    <div className="flex flex-col h-full w-full">
      <div className="flex items-center justify-center h-20">
        <img src={logo} alt="Company Logo" className="h-20 w-30 pt-5" />
      </div>
      <div className="flex-1 flex flex-col justify-between">
        <div className="flex flex-col items-start pt-20">
          <span className="px-5 py-2 text-black">Menu</span>
          {menuItems.map((item, index) => (
            <a
              key={index}
              href={item.link}
              className={`px-4 py-3 flex items-center ${selectedItem === item ? "text-lime-500" : "hover:text-gray"
                }`}
              onClick={() => handleItemClick(item)}>
              <img src={item.icon} alt={item.name} className="h-5 w-5 mr-2" />
              <span className="hidden sm:inline-block">{item.name}</span>
            </a>
          ))}
        </div>
        <div
          className="flex items-center justify-center h-20 cursor-pointer text-red-500"
          onClick={() => {
            window.location.href = "/";
          }}>
          <img src={logout} alt="Logout" className="h-6 w-6 mr-2" />
          <span className="hidden sm:inline-block text-red-500 text-2xl ">
            Logout
          </span>
        </div>
      </div>
    </div>
  );
};

export default Menubar;