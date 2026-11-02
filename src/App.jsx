
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";

import CreateProject from "./pages/customer/CreateProject";
import MyProjects from "./pages/customer/MyProjects";
import ProjectBids from "./pages/customer/ProjectBids";
import CustomerDashboard from "./pages/customer/CustomerDashboard";

import AvailableProjects from "./pages/contractor/AvailableProjects";
import SubmitBid from "./pages/contractor/SubmitBid";
import MyWonProjects from "./pages/contractor/MyWonProjects";
import MyBids from "./pages/contractor/MyBids";
import ContractorDashboard from "./pages/contractor/ContractorDashboard";

import AdminDashboard from "./pages/admin/AdminDashboard";
import EngineerDashboard from "./pages/engineer/EngineerDashboard";
import SupplierDashboard from "./pages/supplier/SupplierDashboard";
import AgentDashboard from "./pages/agent/AgentDashboard";

import ProtectedRoute from "./components/auth/ProtectedRoute.jsx";
import Profile from "./pages/Profile";
import Home from "./pages/Home";

function App() {
    return (
        <BrowserRouter>
            <Routes>

                {/* Authentication Routes */}

                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />

                {/* Dashboard Routes */}

                <Route
                    path="/customer/dashboard"
                    element={
                        <ProtectedRoute allowedRole="CUSTOMER">
                            <CustomerDashboard />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/contractor/dashboard"
                    element={
                        <ProtectedRoute allowedRole="CONTRACTOR">
                            <ContractorDashboard />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/admin/dashboard"
                    element={
                        <ProtectedRoute allowedRole="ADMIN">
                            <AdminDashboard />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/engineer/dashboard"
                    element={
                        <ProtectedRoute allowedRole="ENGINEER">
                            <EngineerDashboard />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/supplier/dashboard"
                    element={
                        <ProtectedRoute allowedRole="SUPPLIER">
                            <SupplierDashboard />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/agent/dashboard"
                    element={
                        <ProtectedRoute allowedRole="AGENT">
                            <AgentDashboard />
                        </ProtectedRoute>
                    }
                />

                {/* Customer Routes */}

                <Route
                    path="/customer/create-project"
                    element={
                        <ProtectedRoute allowedRole="CUSTOMER">
                            <CreateProject />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/customer/projects"
                    element={
                        <ProtectedRoute allowedRole="CUSTOMER">
                            <MyProjects />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/customer/projects/:projectId/bids"
                    element={
                        <ProtectedRoute allowedRole="CUSTOMER">
                            <ProjectBids />
                        </ProtectedRoute>
                    }
                />

                {/* Contractor Routes */}

                <Route
                    path="/contractor/projects"
                    element={
                        <ProtectedRoute allowedRole="CONTRACTOR">
                            <AvailableProjects />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/contractor/projects/:projectId/bid"
                    element={
                        <ProtectedRoute allowedRole="CONTRACTOR">
                            <SubmitBid />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/contractor/won-projects"
                    element={
                        <ProtectedRoute allowedRole="CONTRACTOR">
                            <MyWonProjects />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/contractor/my-bids"
                    element={
                        <ProtectedRoute allowedRole="CONTRACTOR">
                            <MyBids />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/profile"
                    element={
                        <ProtectedRoute>
                            <Profile />
                        </ProtectedRoute>
                    }
                />

            </Routes>
        </BrowserRouter>
    );
}

export default App;
