
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../services/authService";
import { getUserFromToken } from "../../utils/jwt";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    async function handleLogin(e) {
        e.preventDefault();

        try {
            setError("");
            setLoading(true);

            const response = await login({ email, password });

            localStorage.setItem("token", response.token);

            const user = getUserFromToken();

            if (!user || !user.role) {
                setError("Unable to identify your account role. Please log in again.");
                localStorage.removeItem("token");
                return;
            }

            const dashboards = {
                CUSTOMER: "/customer/dashboard",
                CONTRACTOR: "/contractor/dashboard",
                ADMIN: "/admin/dashboard",
                ENGINEER: "/engineer/dashboard",
                SUPPLIER: "/supplier/dashboard",
                AGENT: "/agent/dashboard"
            };

            const dashboardPath = dashboards[user.role];

            if (dashboardPath) {
                navigate(dashboardPath, { replace: true });
            } else {
                setError("Unknown account role: " + user.role);
                localStorage.removeItem("token");
            }
        } catch (error) {
            console.error("Login failed:", error);
            setError(
                error.response?.data?.message ||
                "Login failed. Please check your email and password."
            );
        } finally {
            setLoading(false);
        }
    }

    return (
        <div
            className="min-vh-100 d-flex align-items-center py-5"
            style={{
                background: "linear-gradient(135deg, #EFF6FF, #FFFFFF, #FFF7ED)"
            }}
        >
            <div className="container">
                <div className="row justify-content-center align-items-center g-5">

                    {/* Brand section */}
                    <div className="col-lg-5 d-none d-lg-block">
                        <Link
                            to="/"
                            className="text-decoration-none fw-bold display-6"
                            style={{ color: "#17365D" }}
                        >
                            Nirmaan<span style={{ color: "#F97316" }}>X</span>
                        </Link>

                        <p className="text-secondary mt-2 mb-4">
                            BUILD WITH TRUST
                        </p>

                        <div className="display-1 mb-4">🏗️</div>

                        <h1
                            className="fw-bold display-5"
                            style={{ color: "#17365D" }}
                        >
                            Welcome back to your construction journey.
                        </h1>

                        <p className="fs-5 text-secondary mt-3">
                            Connect with contractors, manage projects, compare
                            bids, and build with confidence.
                        </p>

                        <div className="mt-4 d-flex flex-column gap-3">
                            <div>✓ Manage your projects in one place</div>
                            <div>✓ Review and compare contractor bids</div>
                            <div>✓ Access your personalized dashboard</div>
                        </div>
                    </div>

                    {/* Login form */}
                    <div className="col-12 col-md-8 col-lg-5">
                        <div
                            className="card border-0 rounded-4 p-4 p-md-5"
                            style={{
                                boxShadow: "0 15px 50px rgba(23, 54, 93, 0.12)"
                            }}
                        >
                            <div className="text-center mb-4">
                                <Link
                                    to="/"
                                    className="text-decoration-none fw-bold fs-3 d-lg-none"
                                    style={{ color: "#17365D" }}
                                >
                                    Nirmaan<span style={{ color: "#F97316" }}>X</span>
                                </Link>

                                <h2
                                    className="fw-bold mt-2"
                                    style={{ color: "#17365D" }}
                                >
                                    Login to Your Account
                                </h2>

                                <p className="text-secondary mb-0">
                                    Enter your details to continue
                                </p>
                            </div>

                            {error && (
                                <div className="alert alert-danger rounded-3" role="alert">
                                    {error}
                                </div>
                            )}

                            <form onSubmit={handleLogin}>
                                <div className="mb-3">
                                    <label htmlFor="loginEmail" className="form-label fw-semibold">
                                        Email Address
                                    </label>

                                    <input
                                        id="loginEmail"
                                        type="email"
                                        className="form-control form-control-lg rounded-3"
                                        placeholder="you@example.com"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        autoComplete="email"
                                        required
                                    />
                                </div>

                                <div className="mb-4">
                                    <label htmlFor="loginPassword" className="form-label fw-semibold">
                                        Password
                                    </label>

                                    <div className="input-group">
                                        <input
                                            id="loginPassword"
                                            type={showPassword ? "text" : "password"}
                                            className="form-control form-control-lg"
                                            style={{
                                                borderRadius: "10px 0 0 10px"
                                            }}
                                            placeholder="Enter your password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            autoComplete="current-password"
                                            required
                                        />

                                        <button
                                            type="button"
                                            className="btn btn-outline-secondary"
                                            style={{
                                                borderRadius: "0 10px 10px 0"
                                            }}
                                            onClick={() => setShowPassword(!showPassword)}
                                            aria-label={showPassword ? "Hide password" : "Show password"}
                                        >
                                            {showPassword ? "Hide" : "Show"}
                                        </button>
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    className="btn btn-lg text-white w-100 rounded-3 fw-semibold"
                                    style={{ backgroundColor: "#F97316" }}
                                    disabled={loading}
                                >
                                    {loading ? "Logging in..." : "Login"}
                                </button>
                            </form>

                            <div className="text-center mt-4">
                                <span className="text-secondary">
                                    Don't have an account?{" "}
                                </span>

                                <Link
                                    to="/register"
                                    className="fw-semibold text-decoration-none"
                                    style={{ color: "#2563EB" }}
                                >
                                    Register here
                                </Link>
                            </div>

                            <div className="text-center mt-3">
                                <Link
                                    to="/"
                                    className="text-secondary text-decoration-none small"
                                >
                                    ← Back to Home
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
