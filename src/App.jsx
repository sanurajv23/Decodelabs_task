import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import CustomerHome from "./pages/customer/CustomerHome";
import CustomerExplore from "./pages/customer/CustomerExplore";
import CustomerBookings from "./pages/customer/CustomerBookings";
import CustomerMessages from "./pages/customer/CustomerMessages";
import CustomerProfile from "./pages/customer/CustomerProfile";
import WorkerHome from "./pages/worker/WorkerHome";
import WorkerJobs from "./pages/worker/WorkerJobs";
import WorkerEarnings from "./pages/worker/WorkerEarnings";
import WorkerMessages from "./pages/worker/WorkerMessages";
import WorkerProfile from "./pages/worker/WorkerProfile";
import CustomerRegisterChoice from "./pages/customer/registration/CustomerRegisterChoice";
import CustomerVerify from "./pages/customer/registration/CustomerVerify";
import CustomerVerificationCode from "./pages/customer/registration/CustomerVerificationCode";
import CustomerRegisterDetails from "./pages/customer/registration/CustomerRegisterDetails";
import WorkerVerify from "./pages/worker/registration/WorkerVerify";
import WorkerVerificationCode from "./pages/worker/registration/WorkerVerificationCode";
import WorkerRegisterDetails from "./pages/worker/registration/WorkerRegisterDetails";
import WorkerWorkDetails from "./pages/worker/registration/WorkerWorkDetails";
import WorkerComplete from "./pages/worker/registration/WorkerComplete";
import Login from "./pages/auth/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import { getSession } from "./utils/auth";

function RootRedirect() {
  const session = getSession();
  if (session?.authenticated) {
    return <Navigate to={session.role === "worker" ? "/worker/home" : "/customer/home"} replace />;
  }
  return <Navigate to="/register" replace />;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Entry / Redirect Route */}
        <Route path="/" element={<RootRedirect />} />

        {/* Public Authentication & Registration Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<CustomerRegisterChoice />} />

        {/* Customer Registration Flow */}
        <Route path="/customer/register" element={<CustomerVerify />} />
        <Route path="/customer/register/verify" element={<CustomerVerify />} />
        <Route path="/customer/register/code" element={<CustomerVerificationCode />} />
        <Route path="/customer/register/otp" element={<CustomerVerificationCode />} />
        <Route path="/customer/register/details" element={<CustomerRegisterDetails />} />

        {/* Worker Registration Flow */}
        <Route path="/worker/register" element={<WorkerVerify />} />
        <Route path="/worker/register/verify" element={<WorkerVerify />} />
        <Route path="/worker/register/verification" element={<WorkerVerificationCode />} />
        <Route path="/worker/register/code" element={<WorkerVerificationCode />} />
        <Route path="/worker/register/details" element={<WorkerRegisterDetails />} />
        <Route path="/worker/register/work" element={<WorkerWorkDetails />} />
        <Route path="/worker/register/complete" element={<WorkerComplete />} />

        {/* Protected Customer Routes */}
        <Route
          path="/customer/home"
          element={
            <ProtectedRoute requiredRole="customer">
              <CustomerHome />
            </ProtectedRoute>
          }
        />
        <Route
          path="/customer/explore"
          element={
            <ProtectedRoute requiredRole="customer">
              <CustomerExplore />
            </ProtectedRoute>
          }
        />
        <Route
          path="/customer/bookings"
          element={
            <ProtectedRoute requiredRole="customer">
              <CustomerBookings />
            </ProtectedRoute>
          }
        />
        <Route
          path="/customer/messages"
          element={
            <ProtectedRoute requiredRole="customer">
              <CustomerMessages />
            </ProtectedRoute>
          }
        />
        <Route
          path="/customer/profile"
          element={
            <ProtectedRoute requiredRole="customer">
              <CustomerProfile />
            </ProtectedRoute>
          }
        />

        {/* Protected Worker Routes */}
        <Route
          path="/worker/home"
          element={
            <ProtectedRoute requiredRole="worker">
              <WorkerHome />
            </ProtectedRoute>
          }
        />
        <Route
          path="/worker/jobs"
          element={
            <ProtectedRoute requiredRole="worker">
              <WorkerJobs />
            </ProtectedRoute>
          }
        />
        <Route
          path="/worker/earnings"
          element={
            <ProtectedRoute requiredRole="worker">
              <WorkerEarnings />
            </ProtectedRoute>
          }
        />
        <Route
          path="/worker/messages"
          element={
            <ProtectedRoute requiredRole="worker">
              <WorkerMessages />
            </ProtectedRoute>
          }
        />
        <Route
          path="/worker/profile"
          element={
            <ProtectedRoute requiredRole="worker">
              <WorkerProfile />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
