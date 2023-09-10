import { Routes, Route, BrowserRouter } from "react-router-dom";

import SignUpSuccess from "./pages/Authentication/SignUpSuccess";
import SignUp from "./pages/Authentication/SignUp";
import SignIn from "./pages/Authentication/SignIn";
import Dashboard from "./pages/Dashboard/Dashboard";

import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/login" element={<SignIn />} />
        <Route path="/register" element={<SignUp />} />
        <Route path="/register-success" element={<SignUpSuccess />} />
        <Route path="/dashboard/*" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
