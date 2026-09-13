import { BrowserRouter, Routes, Route } from "react-router-dom";
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

function Home() {
  return <h1>HireMe</h1>;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/customer/home" element={<CustomerHome />} />
        <Route path="/customer/explore" element={<CustomerExplore />} />
        <Route path="/customer/bookings" element={<CustomerBookings />} />
        <Route path="/customer/messages" element={<CustomerMessages />} />
        <Route path="/customer/profile" element={<CustomerProfile />} />
        <Route path="/worker/home" element={<WorkerHome />} />
        <Route path="/worker/jobs" element={<WorkerJobs />} />
        <Route path="/worker/earnings" element={<WorkerEarnings />} />
        <Route path="/worker/messages" element={<WorkerMessages />} />
        <Route path="/worker/profile" element={<WorkerProfile />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
