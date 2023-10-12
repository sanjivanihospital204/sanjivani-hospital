import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import ProtectedRoute from "./Components/ProtectedRoute";
import Login from "./Pages/Login";
import Dashboard from "./Pages/Dashboard";
import AddPatient from "./Pages/AddPatient";

const App = () => {
  return (
    <BrowserRouter>
      {/* <Navbar /> */}

      <Routes>

        <Route path="/login" element={<Login />} />

        <Route path="/" element={<ProtectedRoute />}>
          {/* <Route path="/" element={<Login />} /> */}
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/add-patient" element={<AddPatient />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />

      </Routes>
      {/* <Footer /> */}
    </BrowserRouter>
  );
};

export default App;
