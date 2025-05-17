import CryptoDetail from "./pages/CryptoDetail";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TicketList from "./pages/ticket-support/components/TicketList";

import TicketDetail from "./pages/ticket-support/components/TicketDetail";
import TicketSupportIndex from "./pages/ticket-support/index.jsx";

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/currency/:_id" element={<CryptoDetail />} />

      <Route path="login">
        <Route path="*" element={<Login />} />
      </Route>

      <Route path="/tickets" element={<TicketList />} />
      <Route path="/tickets/sockets" element={<TicketSupportIndex />} />
      <Route path="/tickets/:id" element={<TicketDetail />} />
    </Routes>
  );
}
