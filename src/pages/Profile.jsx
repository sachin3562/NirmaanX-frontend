import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";

function Profile() {
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        fetchProfile();
    }, []);

    const fetchProfile = async () => {
        setLoading(true);
        setError("");

        try {
            const response = await api.get("/users/me");
            setProfile(response.data);
        } catch (err) {
            console.error("Error fetching profile:", err);
            setError("Unable to load your profile. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const dashboardPath = {
        CUSTOMER: "/customer/dashboard",
        CONTRACTOR: "/contractor/dashboard",
        ADMIN: "/admin/dashboard",
        ENGINEER: "/engineer/dashboard",
        SUPPLIER: "/supplier/dashboard",
        AGENT: "/agent/dashboard"
    }[profile?.role] || "/login";

    const getInitials = (name) => {
        if (!name) return "U";

        return name
            .trim()
            .split(/\s+/)
            .slice(0, 2)
            .map((part) => part.charAt(0).toUpperCase())
            .join("");
    };

    const InfoItem = ({ icon, label, value }) => (
        <div className="col-12 col-md-6">
            <div className="profile-info-item h-100">
                <div className="d-flex align-items-start gap-3">
                    <div className="profile-info-icon">{icon}</div>
                    <div className="flex-grow-1 min-w-0">
                        <div className="profile-muted small mb-1">{label}</div>
                        <div className="fw-semibold profile-value">
                            {value || "Not provided"}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <div className="nirmaan-profile min-vh-100 bg-light">
            <style>{`
                .profile-navbar {
                    background: #101d35;
                }

                .profile-accent {
                    color: #ff9f43;
                }

                .profile-hero {
                    background: linear-gradient(125deg, #101d35, #254875);
                    border-radius: 22px;
                    overflow: hidden;
                    position: relative;
                }

                .profile-hero-content {
                    position: relative;
                    z-index: 1;
                }

                .profile-avatar {
                    width: 100px;
                    height: 100px;
                    border-radius: 28px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    background: #ff9f43;
                    color: #17243a;
                    font-size: 34px;
                    font-weight: 800;
                    box-shadow: 0 8px 24px rgba(0,0,0,0.15);
                }

                .profile-main-card {
                    border: 1px solid #e8edf4;
                    border-radius: 20px;
                }

                .profile-info-item {
                    background: #f8fafc;
                    border: 1px solid #e8edf4;
                    border-radius: 15px;
                    padding: 18px;
                }

                .profile-info-icon {
                    width: 42px;
                    height: 42px;
                    flex-shrink: 0;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    background: #fff1e3;
                    border-radius: 12px;
                    font-size: 20px;
                }

                .profile-muted {
                    color: #68758a;
                }

                .profile-value {
                    color: #17243a;
                    overflow-wrap: anywhere;
                }

                .profile-role-badge {
                    display: inline-block;
                    padding: 8px 14px;
                    border-radius: 30px;
                    background: rgba(255,255,255,0.13);
                    border: 1px solid rgba(255,255,255,0.22);
                    color: white;
                    font-size: 12px;
                    font-weight: 700;
                    letter-spacing: 0.6px;
                }

                .profile-status {
                    display: inline-flex;
                    align-items: center;
                    gap: 7px;
                    padding: 7px 12px;
                    border-radius: 30px;
                    font-size: 12px;
                    font-weight: 700;
                }

                .profile-verified {
                    color: #146c43;
                    background: #d9f5e5;
                }

                .profile-unverified {
                    color: #805b00;
                    background: #fff2cc;
                }

                .profile-orange-btn {
                    background: #ff9f43;
                    color: #17243a;
                    border: 1px solid #ff9f43;
                    font-weight: 600;
                }

                .profile-orange-btn:hover {
                    background: #f28c28;
                    color: #17243a;
                    border-color: #f28c28;
                }

                @media (max-width: 575px) {
                    .profile-hero {
                        border-radius: 17px;
                    }

                    .profile-avatar {
                        width: 78px;
                        height: 78px;
                        border-radius: 22px;
                        font-size: 27px;
                    }
                }
            `}</style>

            {/* Navigation */}
            <nav className="navbar navbar-dark profile-navbar py-3 shadow-sm">
                <div className="container">
                    <Link
                        to={dashboardPath}
                        className="navbar-brand fw-bold fs-4"
                    >
                        🏗️ Nirmaan<span className="profile-accent">X</span>
                    </Link>

                    <Link
                        to={dashboardPath}
                        className="btn btn-outline-light btn-sm rounded-pill px-3"
                    >
                        ← <span className="d-none d-sm-inline">Back to </span>Dashboard
                    </Link>
                </div>
            </nav>

            <main className="container py-4 py-lg-5">
                {/* Page introduction */}
                <section className="mb-4">
                    <div className="text-uppercase small fw-bold profile-accent mb-2">
                        ACCOUNT SETTINGS
                    </div>
                    <h1 className="fw-bold mb-2" style={{ color: "#101d35" }}>
                        My Profile
                    </h1>
                    <p className="profile-muted mb-0">
                        View your registered information and account status.
                    </p>
                </section>

                {/* Loading */}
                {loading && (
                    <div className="bg-white rounded-4 shadow-sm text-center p-5">
                        <div
                            className="spinner-border mb-3"
                            style={{ color: "#ff9f43" }}
                            role="status"
                        >
                            <span className="visually-hidden">Loading...</span>
                        </div>
                        <h5 className="fw-semibold">Loading your profile...</h5>
                        <p className="profile-muted mb-0">
                            Please wait while we retrieve your account information.
                        </p>
                    </div>
                )}

                {/* Error */}
                {!loading && error && (
                    <div className="alert alert-danger rounded-4 p-4">
                        <h5 className="fw-bold">Unable to load your profile</h5>
                        <p>{error}</p>
                        <button
                            type="button"
                            className="btn btn-danger rounded-pill px-4"
                            onClick={fetchProfile}
                        >
                            Try Again
                        </button>
                    </div>
                )}

                {/* Profile content */}
                {!loading && !error && profile && (
                    <>
                        {/* Profile hero */}
                        <section className="profile-hero p-4 p-md-5 mb-4 shadow-sm">
                            <div className="profile-hero-content d-flex flex-column flex-sm-row align-items-sm-center gap-4">
                                <div className="profile-avatar">
                                    {getInitials(profile.name)}
                                </div>

                                <div className="flex-grow-1">
                                    <span className="profile-role-badge mb-3">
                                        {profile.role || "USER"} ACCOUNT
                                    </span>

                                    <h2 className="text-white fw-bold mt-3 mb-2">
                                        {profile.name || "NirmaanX User"}
                                    </h2>

                                    <p className="text-white-50 mb-3">
                                        {profile.email || "Email not provided"}
                                    </p>

                                    <div className="d-flex flex-wrap gap-2 align-items-center">
                                        <span
                                            className={`profile-status ${
                                                profile.verified
                                                    ? "profile-verified"
                                                    : "profile-unverified"
                                            }`}
                                        >
                                            {profile.verified ? "✓" : "!"}
                                            {profile.verified
                                                ? "Verified Account"
                                                : "Not Verified"}
                                        </span>

                                        {profile.role === "CONTRACTOR" && (
                                            <span className="profile-status bg-light text-dark">
                                                ⭐ Rating: {profile.rating ?? 0}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Information card */}
                        <section className="card profile-main-card shadow-sm">
                            <div className="card-body p-4 p-md-5">
                                <div className="mb-4">
                                    <h4
                                        className="fw-bold mb-2"
                                        style={{ color: "#101d35" }}
                                    >
                                        Account Information
                                    </h4>
                                    <p className="profile-muted mb-0">
                                        Your registered details associated with NirmaanX.
                                    </p>
                                </div>

                                <div className="row g-3">
                                    <InfoItem
                                        icon="👤"
                                        label="Full Name"
                                        value={profile.name}
                                    />

                                    <InfoItem
                                        icon="✉️"
                                        label="Email Address"
                                        value={profile.email}
                                    />

                                    <InfoItem
                                        icon="📱"
                                        label="Phone Number"
                                        value={profile.phoneNumber}
                                    />

                                    <InfoItem
                                        icon="📍"
                                        label="City"
                                        value={profile.city}
                                    />

                                    <InfoItem
                                        icon="🗺️"
                                        label="State"
                                        value={profile.state}
                                    />

                                    <div className="col-12 col-md-6">
                                        <div className="profile-info-item h-100">
                                            <div className="d-flex align-items-start gap-3">
                                                <div className="profile-info-icon">
                                                    🛡️
                                                </div>
                                                <div>
                                                    <div className="profile-muted small mb-1">
                                                        Account Verification
                                                    </div>
                                                    <div className="fw-semibold profile-value">
                                                        {profile.verified
                                                            ? "Verified"
                                                            : "Not verified"}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {profile.role === "CONTRACTOR" && (
                                        <div className="col-12 col-md-6">
                                            <div className="profile-info-item h-100">
                                                <div className="d-flex align-items-start gap-3">
                                                    <div className="profile-info-icon">
                                                        ⭐
                                                    </div>
                                                    <div>
                                                        <div className="profile-muted small mb-1">
                                                            Contractor Rating
                                                        </div>
                                                        <div className="fw-semibold profile-value">
                                                            {profile.rating ?? 0}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                <hr className="my-4" />

                                <div className="d-flex flex-column flex-sm-row gap-3">
                                    <Link
                                        to={dashboardPath}
                                        className="btn profile-orange-btn rounded-pill px-4 py-2"
                                    >
                                        Return to Dashboard →
                                    </Link>

                                    <Link
                                        to="/"
                                        className="btn btn-outline-secondary rounded-pill px-4 py-2"
                                    >
                                        Back to Home
                                    </Link>
                                </div>
                            </div>
                        </section>
                    </>
                )}

                <footer className="text-center py-4">
                    <small className="profile-muted">
                        © {new Date().getFullYear()} NirmaanX · Building better
                        construction connections.
                    </small>
                </footer>
            </main>
        </div>
    );
}

export default Profile;
