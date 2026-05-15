import {
  lazy,
  Suspense,
} from "react";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import PageLoader from "../components/common/PageLoader";

const Dashboard = lazy(() =>
  import("../pages/Dashboard")
);

const Patients = lazy(() =>
  import("../pages/Patients")
);

const Reminders = lazy(() =>
  import("../pages/Reminders")
);

const Inventory = lazy(() =>
  import("../pages/Inventory")
);

const Login = lazy(() =>
  import("../pages/Login")
);

import ProtectedRoute from "./ProtectedRoute";

import NotFound from "../pages/NotFound";

export default function AppRoutes() {

  return (

    <BrowserRouter>

      <Suspense fallback={<PageLoader />}>

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

          <Route
            path="/inventory"
            element={
              <ProtectedRoute>
                <Inventory />
              </ProtectedRoute>
            }
          />

          <Route path="*" element={<NotFound />} />

        </Routes>

      </Suspense>

    </BrowserRouter>
  );
}