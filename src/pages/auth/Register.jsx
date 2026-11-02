
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../services/api";

function Register() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        role: "CUSTOMER",
        phoneNumber: "",
        city: "",
        state: "",
        verified: false,
        rating: 0.0
    });

    const [message, setMessage] = useState("");
    const [isError, setIsError] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    function handleChange(e) {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    }

    async function handleSubmit(e) {
        e.preventDefault();

        try {
            setMessage("");
            setIsError(false);
            setLoading(true);

            await api.post("/users/register", formData);

            setMessage("Registration successful! Redirecting to login...");

            setTimeout(() => {
                navigate("/login", { replace: true });
            }, 1000);
        } catch (error) {
            console.error("Registration failed:", error);

            setIsError(true);
            setMessage(
                error.response?.data?.message ||
                "Registration failed. Please check your details and try again."
            );
        } finally {
            setLoading(false);
        }
    }

    const inputClass = "form-control form-control-lg rounded-3";

    return (
        <div
            className="min-vh-100 py-5"
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
                            Start building something great.
                        </h1>

                        <p className="fs-5 text-secondary mt-3">
                            Join NirmaanX to connect with construction
                            professionals and manage your projects in one place.
                        </p>

                        <div className="mt-4 d-flex flex-column gap-3">
                            <div>✓ Create and manage construction projects</div>
                            <div>✓ Connect with contractors and professionals</div>
                            <div>✓ Track bids and project progress</div>
                        </div>
                    </div>

                    {/* Registration form */}
                    <div className="col-12 col-md-10 col-lg-7">
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
                                    Create Your Account
                                </h2>

                                <p className="text-secondary">
                                    Join NirmaanX and get started today.
                                </p>
                            </div>

                            {message && (
                                <div
                                    className={`alert ${isError ? "alert-danger" : "alert-success"} rounded-3`}
                                    role="alert"
                                >
                                    {message}
                                </div>
                            )}

                            <form onSubmit={handleSubmit}>
                                <div className="row g-3">
                                    <div className="col-md-6">
                                        <label htmlFor="name" className="form-label fw-semibold">
                                            Full Name
                                        </label>
                                        <input
                                            id="name"
                                            type="text"
                                            name="name"
                                            className={inputClass}
                                            placeholder="Enter your full name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            autoComplete="name"
                                            required
                                        />
                                    </div>

                                    <div className="col-md-6">
                                        <label htmlFor="email" className="form-label fw-semibold">
                                            Email Address
                                        </label>
                                        <input
                                            id="email"
                                            type="email"
                                            name="email"
                                            className={inputClass}
                                            placeholder="you@example.com"
                                            value={formData.email}
                                            onChange={handleChange}
                                            autoComplete="email"
                                            required
                                        />
                                    </div>

                                    <div className="col-12">
                                        <label htmlFor="password" className="form-label fw-semibold">
                                            Password
                                        </label>

                                        <div className="input-group">
                                            <input
                                                id="password"
                                                type={showPassword ? "text" : "password"}
                                                name="password"
                                                className="form-control form-control-lg"
                                                style={{ borderRadius: "10px 0 0 10px" }}
                                                placeholder="Create a password"
                                                value={formData.password}
                                                onChange={handleChange}
                                                autoComplete="new-password"
                                                required
                                            />

                                            <button
                                                type="button"
                                                className="btn btn-outline-secondary"
                                                style={{ borderRadius: "0 10px 10px 0" }}
                                                onClick={() => setShowPassword(!showPassword)}
                                                aria-label={showPassword ? "Hide password" : "Show password"}
                                            >
                                                {showPassword ? "Hide" : "Show"}
                                            </button>
                                        </div>
                                    </div>

                                    <div className="col-12">
                                        <label htmlFor="role" className="form-label fw-semibold">
                                            Register As
                                        </label>

                                        <select
                                            id="role"
                                            name="role"
                                            className="form-select form-select-lg rounded-3"
                                            value={formData.role}
                                            onChange={handleChange}
                                            required
                                        >
                                            <option value="CUSTOMER">Customer</option>
                                            <option value="CONTRACTOR">Contractor</option>
                                            <option value="ENGINEER">Engineer</option>
                                            <option value="SUPPLIER">Supplier</option>
                                            <option value="AGENT">Agent</option>
                                        </select>
                                    </div>

                                    <div className="col-md-6">
                                        <label htmlFor="phoneNumber" className="form-label fw-semibold">
                                            Phone Number
                                        </label>
                                        <input
                                            id="phoneNumber"
                                            type="tel"
                                            name="phoneNumber"
                                            className={inputClass}
                                            placeholder="Enter phone number"
                                            value={formData.phoneNumber}
                                            onChange={handleChange}
                                            autoComplete="tel"
                                        />
                                    </div>

                                    <div className="col-md-6">
                                        <label htmlFor="city" className="form-label fw-semibold">
                                            City
                                        </label>
                                        <input
                                            id="city"
                                            type="text"
                                            name="city"
                                            className={inputClass}
                                            placeholder="Enter city"
                                            value={formData.city}
                                            onChange={handleChange}
                                            autoComplete="address-level2"
                                        />
                                    </div>

                                    <div className="col-12">
                                        <label htmlFor="state" className="form-label fw-semibold">
                                            State
                                        </label>
                                        <input
                                            id="state"
                                            type="text"
                                            name="state"
                                            className={inputClass}
                                            placeholder="Enter state"
                                            value={formData.state}
                                            onChange={handleChange}
                                            autoComplete="address-level1"
                                        />
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    className="btn btn-lg text-white w-100 rounded-3 fw-semibold mt-4"
                                    style={{ backgroundColor: "#F97316" }}
                                    disabled={loading}
                                >
                                    {loading ? "Creating Account..." : "Create Account"}
                                </button>
                            </form>

                            <div className="text-center mt-4">
                                <span className="text-secondary">
                                    Already have an account?{" "}
                                </span>
                                <Link
                                    to="/login"
                                    className="fw-semibold text-decoration-none"
                                    style={{ color: "#2563EB" }}
                                >
                                    Login here
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

export default Register;
