import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AddRecordForm from "../Components/AddRecordForm";
import Alert from "../Components/Alert";
import MenuToggle from "../Components/MenuToggle";
import Menubar from "../Components/Menubar";
import Navbar from "../Components/Navbar";
import { CREATE_PATIENT, POST_API } from "../Services/api";

const AddPatient = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [alertBox, setAlertBox] = useState({
    message: '',
    success: true,
    showAlert: false
  });
  const clearSuccess = () => setAlertBox('');
  const navigate = useNavigate();

  const handleMenuToggle = () => {
    setShowMenu(!showMenu);
  };

  const addRecord = async (record) => {
    const createPatientResponse = await POST_API(CREATE_PATIENT, record);
    if (createPatientResponse?.status === "created") {
      setAlertBox({
        message: createPatientResponse.message,
        success: true,
        showAlert: true
      });
    } else {
      setAlertBox({
        message: 'Patient not created',
        success: false,
        showAlert: true
      });
    }
    navigate("/dashboard");

  };

  return (
    <>
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
              {alertBox.showAlert && (
                <Alert type={alertBox.success ? 'success' : 'error'} message={alertBox.message} onClose={clearSuccess} />
              )}
              <AddRecordForm onSubmit={addRecord} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddPatient;
