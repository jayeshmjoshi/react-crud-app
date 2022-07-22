import "./App.css";
import { Fragment, useContext } from "react";
import AuthContext from "./context/AuthContext";
import { Routes, Route } from "react-router-dom";
import Header from "./components/layout/Header";

import HomePage from "./pages/Homepage";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Dashboard from "./components/Dashboard";
import NotFound from "./pages/NotFound";
import ChangePassword from "./pages/ChangePassword";
import AddEmp from "./pages/AddEmp";
import EditEmp from "./pages/EditEmp";
import EmpDetail from "./pages/EmpDetail";

function App() {
  const authCtx = useContext(AuthContext);
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} exact />
        {!authCtx.isLoggedIn && (
          <Route path="/login" element={<Login />} exact />
        )}
        <Route path="/sign-up" element={<SignUp />} exact />
        {authCtx.isLoggedIn && (
          <Fragment>
            <Route path="/dashboard" element={<Dashboard />} exact />
            <Route path="/add-employee" element={<AddEmp />} exact />
            <Route path="/employee/:empId" element={<EmpDetail />} exact />
            <Route path="/employee/edit/:empId" element={<EditEmp />} exact />
            <Route path="/change-password" element={<ChangePassword />} exact />
          </Fragment>
        )}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
