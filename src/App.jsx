import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />

      <Route path="login">
                <Route path="*" element={<Login />} />
      </Route>
    </Routes>
  );
}
