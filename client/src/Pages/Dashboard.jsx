import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import MenuToggle from "../Components/MenuToggle";
import Menubar from "../Components/Menubar";
import Navbar from "../Components/Navbar";
import RecordTable from "../Components/RecordTable";
import { GET_ALL_PATIENT, GET_API } from "../Services/api";

const Dashboard = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [records, setRecords] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      const patientData = await GET_API(GET_ALL_PATIENT);
      if (patientData?.status === 'OK') {
        setRecords(patientData?.data);
      }
    }
    fetchData();
  }, [])

  const handleMenuToggle = () => {
    setShowMenu(!showMenu);
  };

  const handleButtonClick = () => {
    navigate("/add-patient");
  };

  return (
    <div className="flex flex-col h-screen">
      <div className="flex flex-grow">
        <div
          className={`w-1/4 h-full bg-gray-200 ${showMenu ? "" : "hidden"
            } lg:block`}>
          <Menubar />
        </div>
        <div className="flex-1 sm:relative">
          <MenuToggle showMenu={showMenu} handleMenuToggle={handleMenuToggle} />
          <div className="h-16 bg-white shadow-md">
            <Navbar pageName={"Patient Dashboard"} />
          </div>
          <div className="container mx-auto p-4">
            <div className="flex justify-between items-center p-4 border-b" style={{ flexDirection: 'row-reverse' }}>
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={handleButtonClick}
              >
                Add New Patient
              </button>
            </div>
            {records.length > 0 ? (
              <div className="mt-4">
                <h2 className="text-lg font-semibold mb-2">Records</h2>
                <RecordTable records={records} />
              </div>
            ) : (
              <p className="mt-4">No records added yet.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
