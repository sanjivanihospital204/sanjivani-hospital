import { createContext, useState } from "react";
// import { Redirect, Route, Switch } from "react-router-dom";
import { Route, Routes } from "react-router-dom";
import "./App.css";

// elements
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import ProtectedRoute from "./components/ProtectedRoute";
import ErrorPage from "./pages/404";
import AddPatient from "./pages/AddPatient";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Patient from "./pages/Patient";
import PdfDemo from "./PdfDemo";

export const MessageBarContext = createContext();


const App = () => {
  const [messageBar, setMessageBar] = useState({
    open: false,
    vertical: "top",
    horizontal: "center",
    severity: "success", // Add severity property
    message: "", // Add message property
  });

  const handleSnackbarClose = () => {
    setMessageBar({ ...messageBar, open: false });
  };

  return (
    <>
      <MessageBarContext.Provider value={{ messageBar, setMessageBar }}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<ProtectedRoute />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/patients" element={<Patient />} />
            <Route path="/patient/:patientId?" element={<AddPatient />} />
            <Route path="/pdf" element={<PdfDemo />} />
            <Route path="*" element={<ErrorPage />} />
          </Route>
        </Routes>
        <Snackbar
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          open={messageBar.open}
          autoHideDuration={3000}
          onClose={handleSnackbarClose}
        >
          <Alert onClose={handleSnackbarClose} severity={messageBar.severity} sx={{ width: '100%' }}>
            {messageBar.message}
          </Alert>
        </Snackbar>
      </MessageBarContext.Provider>
    </>
  );
};

export default App;
