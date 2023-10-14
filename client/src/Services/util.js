export function setLocalStorageObject(key, value) {
    localStorage.setItem(key, value);
  }
  
  export function getLocalStorageObject(key) {
    return localStorage.getItem(key);
  }
  
  export function removeLocalStorageObject(key) {
    return localStorage.removeItem(key);
  }