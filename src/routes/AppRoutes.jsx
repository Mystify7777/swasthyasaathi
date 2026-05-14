import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import NotFound from "../pages/NotFound";
import Patients from "../pages/Patients";
import Reminders from "../pages/Reminders";
import Inventory from "../pages/Inventory";

import ProtectedRoute from "./ProtectedRoute";

export default function AppRoutes() {

  return (

    <BrowserRouter>

      <Routes>

        <Route path="/" element={<Login />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
  path="/patients"
  element={
    <ProtectedRoute>
      <Patients />
    </ProtectedRoute>
  }
/>

                <Route
          path="/reminders"
          element={
            <ProtectedRoute>
              <Reminders />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<NotFound />} />

        <Route
  path="/inventory"
  element={
    <ProtectedRoute>
      <Inventory />
    </ProtectedRoute>
  }
/>

      </Routes>

    </BrowserRouter>
  );
}