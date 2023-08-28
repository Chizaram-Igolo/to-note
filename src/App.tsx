import { useState, useEffect } from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";

import SignUpSuccess from "./pages/Authentication/SignUpSuccess";
import SignUp from "./pages/Authentication/SignUp";
import SignIn from "./pages/Authentication/SignIn";
import Sidebar from "./components/Sidebar";

import "./App.css";

import Protected from "./pages/Authentication/Protected";
import UploadDocument from "./pages/Dashboard/UploadDocument";
import ViewDocument from "./pages/Dashboard/ViewDocument";
import SignDocument from "./pages/Dashboard/SignDocument";
import DocumentsList from "./pages/Dashboard/DocumentsList";
import Dashboard from "./pages/Dashboard/Dashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<SignIn />} />
        <Route path="/register" element={<SignUp />} />
        <Route path="/register-success" element={<SignUpSuccess />} />

        <Route path="/dashboard/*" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
