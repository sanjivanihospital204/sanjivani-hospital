import { getLocalStorageObject } from "./util";
import CryptoJS from 'crypto-js';

export const API_HOSTNAME = 'http://localhost:3007';
export const VERCEL_API_HOSTNAME = 'https://sanjivani-hospital.vercel.app';
export const LOCAL_OBJECT_SECRET_KEY = 'sanjivani-hospital-secrets';
export const ADMIN_LOGIN_API = '/admin/login';
export const GET_ALL_PATIENT = '/patient/all';
export const CREATE_PATIENT = '/patient/create';
export const VERIFY_TOKEN = '/verify-token';

export const ADMIN_LOGIN = async (api, data) => {
  // const newApi = API_HOSTNAME + api;
  const newApi = VERCEL_API_HOSTNAME + api;
  const response = await fetch(newApi, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    },
    body: JSON.stringify(data),
  });
  return response.json();
};

export const POST_API = async (api, data) => {

  //get logged in token from local_storage
  const user = getLocalStorageObject('sanjivaniAuthToken');
  const loggedInUser =
    user && CryptoJS.AES.decrypt(user, LOCAL_OBJECT_SECRET_KEY).toString(CryptoJS.enc.Utf8);
  const userData = JSON.parse(loggedInUser);

  // const newApi = API_HOSTNAME + api;
  const newApi = VERCEL_API_HOSTNAME + api;
  const response = await fetch(newApi, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'x-auth-token': userData?.token
    },
    body: JSON.stringify(data),
  });
  return response.json();
};

export const GET_API = async (api) => {
  //get logged in token from local_storage
  const user = getLocalStorageObject('sanjivaniAuthToken');
  const loggedInUser =
    user && CryptoJS.AES.decrypt(user, LOCAL_OBJECT_SECRET_KEY).toString(CryptoJS.enc.Utf8);
  const userData = JSON.parse(loggedInUser);

  // const newApi = API_HOSTNAME + api;
  const newApi = VERCEL_API_HOSTNAME + api;
  const response = await fetch(newApi, {
    method: 'GET',
    headers: {
      'x-auth-token': userData?.token
    },
  })
  return response.json();
};