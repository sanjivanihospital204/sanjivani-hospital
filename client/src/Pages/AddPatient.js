import React, { useState } from "react";
import MenuToggle from "../Components/MenuToggle";
import Menubar from "../Components/Menubar";
import Navbar from "../Components/Navbar";
import AddRecordForm from "../Components/AddRecordForm";
import RecordTable from "../Components/RecordTable";

const AddPatient = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [records, setRecords] = useState([]);

  const handleMenuToggle = () => {
    setShowMenu(!showMenu);
  };


  const addRecord = (record) => {
    setRecords([...records, record]);
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
            <Navbar pageName={"Add Patient"} />
          </div>
          <div className="container mx-auto p-4">
            <AddRecordForm onSubmit={addRecord} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddPatient;
