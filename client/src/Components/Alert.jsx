import React, { useState, useEffect } from 'react';

const Alert = ({ type, message, onClose }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      onClose();
    }, 3000); // Adjust the time in milliseconds as needed

    return () => {
      clearTimeout(timer);
    };
  }, [onClose]);

  return visible ? (
    <div
      className={`${
        type === 'error' ? 'bg-red-500' : 'bg-green-500'
      } text-white px-4 py-2 rounded shadow-md flex items-center justify-between`}
    >
      <span>{message}</span>
      <button onClick={() => setVisible(false)} className="text-white">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
    </div>
  ) : null;
};

export default Alert;
