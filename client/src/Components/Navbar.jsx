import CryptoJS from 'crypto-js';
import React from "react";
import { demouser } from "../Assets/index";
import { LOCAL_OBJECT_SECRET_KEY } from "../Services/api";
import { getLocalStorageObject } from "../Services/util";

const Navbar = ({ pageName }) => {
  const user = getLocalStorageObject('token');
  const loggedInUser =
    user && CryptoJS.AES.decrypt(user, LOCAL_OBJECT_SECRET_KEY).toString(CryptoJS.enc.Utf8);
  const userData = JSON.parse(loggedInUser);

  return (
    <nav className="bg-white flex items-center justify-between h-20 px-8 shadow-sm">
      <div className="flex items-center">
        <h1 className="text-lg font-semibold text-gray-500">{pageName}</h1>
      </div>
      <div className="flex items-center">
        <div className="rounded-full h-10 w-10 bg-gray-300 flex items-center justify-center mr-4">
          <img src={demouser} alt="avatar" className="rounded-full h-8 w-8" />
        </div>
        <div className="flex flex-col text-sm">
          <span className="font-medium">{userData?.user?.name}</span>
          <span>Super Admin</span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
