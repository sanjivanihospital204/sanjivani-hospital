import CryptoJS from 'crypto-js';
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { logo } from "../Assets/index";
import Alert from "../Components/Alert";
import { ADMIN_LOGIN, ADMIN_LOGIN_API, LOCAL_OBJECT_SECRET_KEY } from "../Services/api";
import { setLocalStorageObject } from "../Services/util";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [alertBox, setAlertBox] = useState({
    message: '',
    success: true,
    showAlert: false
  });

  const clearSuccess = () => setAlertBox('');
  const navigate = useNavigate();

  const loginUser = async (event) => {
    event.preventDefault();
    const adminResponse = await ADMIN_LOGIN(ADMIN_LOGIN_API, {
      email,
      password,
    });

    if (adminResponse.validUser) {
      setAlertBox({
        message: adminResponse.message,
        success: true,
        showAlert: true
      });
      const userData = CryptoJS.AES.encrypt(
        JSON.stringify(adminResponse),
        LOCAL_OBJECT_SECRET_KEY
      ).toString();
      setLocalStorageObject('token', userData);
      navigate("/dashboard");
    } else {
      setAlertBox({
        message: adminResponse.message,
        success: false,
        showAlert: true
      });
    }
  }

  return (
    <>
      <div className="text-center">
        <img
          className="w-80 h-70 mb-auto sm:mb-20 mx-auto min-w-[150px]"
          src={logo}
          alt="logo"
        />
        {alertBox.showAlert && (
          <Alert type={alertBox.success ? 'success' : 'error'} message={alertBox.message} onClose={clearSuccess} />
        )}
        <form onSubmit={loginUser} style={{
          margin: '0 20% 5%'
        }}>
          <div className="mb-8">
            <h1 className="text-3xl font-bold mt-4 mb-2 text-gray-600 text-left">
              Login
            </h1>
          </div>
          <div className="text-left">
            <label className="block mb-1">Email</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              type="email"
              className="w-full px-4 py-2 border rounded-lg mb-4"
            />
          </div>
          <div className="text-left">
            <label className="block mb-1">Password</label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              type="password"
              className="w-full px-4 py-2 border rounded-lg mb-4"
            />
          </div>
          <div className="flex justify-between items-center">
            <button
              type="submit"
              className="bg-lime-500 text-white py-2 px-4 rounded-sm">
              Login
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Login;
