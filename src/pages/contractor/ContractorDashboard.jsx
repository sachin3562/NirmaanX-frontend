import { Link } from "react-router-dom";

function ContractorDashboard() {
    const actions = [
        {
            icon: "🏗️",
            title: "Available Projects",
            description:
                "Discover construction opportunities, review project requirements, and submit competitive quotations.",
            button: "Browse Projects",
            path: "/contractor/projects",
            number: "01"
        },
        {
            icon: "📋",
            title: "My Bids",
            description:
                "Keep track of your submitted bids and check their pending, accepted, or rejected status.",
            button: "Manage My Bids",
            path: "/contractor/my-bids",
            number: "02"
        },
        {
            icon: "✅",
            title: "My Won Projects",
            description:
                "Review your accepted bids, agreed quotations, and available customer contact details.",
            button: "View Won Projects",
            path: "/contractor/won-projects",
            number: "03"
        }
    ];

    const handleLogout = () => {
        localStorage.removeItem("token");
        window.location.href = "/login";
    };

    return (
        <div className="bg-light min-vh-100">
            <style>{`
                .contractor-navbar {
                    background: #101d35;
                }

                .contractor-brand {
                    letter-spacing: -0.5px;
                }

                .contractor-hero {
                    position: relative;
                    overflow: hidden;
                    background: linear-gradient(125deg, #101d35 0%, #203d68 100%);
                    border-radius: 24px;
                }

                .contractor-hero::after {
                    content: "";
                    position: absolute;
                    width: 250px;
                    height: 250px;
                    border: 35px solid rgba(255,255,255,0.06);
                    border-radius: 50%;
                    right: -70px;
                    top: -90px;
                    pointer-events: none;
                }

                .contractor-hero-content {
                    position: relative;
                    z-index: 1;
                }

                .contractor-accent {
                    color: #ff9f43;
                }

                .contractor-btn-orange {
                    background: #ff9f43;
                    color: #17243a;
                    border: 1px solid #ff9f43;
                    font-weight: 600;
                }

                .contractor-btn-orange:hover {
                    background: #f28c28;
                    color: #17243a;
                    border-color: #f28c28;
                }

                .contractor-action-card {
                    border: 1px solid #e9edf3;
                    transition: transform 0.2s ease, box-shadow 0.2s ease;
                }

                .contractor-action-card:hover {
                    transform: translateY(-5px);
                    box-shadow: 0 14px 32px rgba(16,29,53,0.10) !important;
                }

                .contractor-icon-box {
                    width: 64px;
                    height: 64px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    border-radius: 18px;
                    background: #fff1e3;
                    font-size: 30px;
                }

                .contractor-number {
                    color: #d5dce7;
                    font-size: 13px;
                    font-weight: 700;
                    letter-spacing: 1px;
                }

                .contractor-step {
                    border: 1px solid #e8edf4;
                    border-radius: 16px;
                    height: 100%;
                    background: #fff;
                }

                .contractor-step-number {
                    width: 42px;
                    height: 42px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    border-radius: 13px;
                    background: #101d35;
                    color: #fff;
                    font-weight: 700;
                }

                .contractor-muted {
                    color: #68758a;
                }

                @media (max-width: 575px) {
                    .contractor-hero {
                        border-radius: 18px;
                    }

                    .contractor-hero h1 {
                        font-size: 2rem;
                    }

                    .contractor-navbar .navbar-brand {
                        font-size: 1.15rem !important;
                    }
                }
            `}</style>

            {/* Navigation */}
            <nav className="navbar navbar-dark contractor-navbar shadow-sm py-3">
                <div className="container">
                    <Link
                        to="/contractor/dashboard"
                        className="navbar-brand contractor-brand fw-bold fs-4"
                    >
                        🏗️ Nirmaan<span className="contractor-accent">X</span>
                    </Link>

                    <div className="d-flex align-items-center gap-2">
                        <Link
                            to="/profile"
                            className="btn btn-outline-light btn-sm rounded-pill px-3"
                        >
                            👤 <span className="d-none d-sm-inline">My Profile</span>
                            <span className="d-sm-none">Profile</span>
                        </Link>

                        <button
                            type="button"
                            className="btn btn-outline-light btn-sm rounded-pill px-3"
                            onClick={handleLogout}
                        >
                            Logout
                        </button>
                    </div>
                </div>
            </nav>

            <main className="container py-4 py-lg-5">
                {/* Hero */}
                <section className="contractor-hero shadow-sm mb-5">
                    <div className="contractor-hero-content p-4 p-md-5">
                        <span className="badge rounded-pill bg-light text-dark px-3 py-2 mb-4">
                            🏗️ CONTRACTOR WORKSPACE
                        </span>

                        <h1 className="text-white fw-bold mb-3">
                            Build your next big <span className="contractor-accent">opportunity.</span>
                        </h1>

                        <p
                            className="text-white-50 fs-5 mb-4"
                            style={{ maxWidth: "620px" }}
                        >
                            Find construction projects, submit quotations, and
                            manage your bids — all in one place with NirmaanX.
                        </p>

                        <Link
                            to="/contractor/projects"
                            className="btn contractor-btn-orange btn-lg rounded-pill px-4"
                        >
                            Explore Projects <span className="ms-2">→</span>
                        </Link>

                        <div className="d-flex flex-wrap gap-4 mt-4 pt-2">
                            <div>
                                <div className="text-white fw-semibold">Discover</div>
                                <small className="text-white-50">Open opportunities</small>
                            </div>
                            <div>
                                <div className="text-white fw-semibold">Submit</div>
                                <small className="text-white-50">Competitive bids</small>
                            </div>
                            <div>
                                <div className="text-white fw-semibold">Manage</div>
                                <small className="text-white-50">Your project journey</small>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Workspace */}
                <section className="mb-5">
                    <div className="d-flex flex-wrap justify-content-between align-items-end gap-2 mb-4">
                        <div>
                            <div className="text-uppercase small fw-bold contractor-accent mb-2">
                                YOUR WORKSPACE
                            </div>
                            <h2 className="fw-bold mb-2" style={{ color: "#101d35" }}>
                                Manage your work
                            </h2>
                            <p className="contractor-muted mb-0">
                                Choose an area to continue.
                            </p>
                        </div>
                    </div>

                    <div className="row g-4">
                        {actions.map((action) => (
                            <div
                                className="col-12 col-md-6 col-xl-4"
                                key={action.title}
                            >
                                <div className="card contractor-action-card h-100 rounded-4 shadow-sm">
                                    <div className="card-body p-4 d-flex flex-column">
                                        <div className="d-flex justify-content-between align-items-start mb-4">
                                            <div className="contractor-icon-box">
                                                {action.icon}
                                            </div>
                                            <span className="contractor-number">
                                                {action.number}
                                            </span>
                                        </div>

                                        <h4
                                            className="fw-bold mb-3"
                                            style={{ color: "#101d35" }}
                                        >
                                            {action.title}
                                        </h4>

                                        <p className="contractor-muted mb-4">
                                            {action.description}
                                        </p>

                                        <div className="mt-auto">
                                            <Link
                                                to={action.path}
                                                className="btn btn-outline-dark rounded-pill px-4"
                                            >
                                                {action.button} →
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Workflow */}
                <section className="bg-white rounded-4 shadow-sm p-4 p-md-5 mb-4">
                    <div className="mb-4">
                        <div className="text-uppercase small fw-bold contractor-accent mb-2">
                            GETTING STARTED
                        </div>
                        <h3 className="fw-bold mb-2" style={{ color: "#101d35" }}>
                            How contractor bidding works
                        </h3>
                        <p className="contractor-muted mb-0">
                            Follow these steps to manage your construction opportunities.
                        </p>
                    </div>

                    <div className="row g-3">
                        <div className="col-12 col-md-4">
                            <div className="contractor-step p-4">
                                <div className="contractor-step-number mb-3">1</div>
                                <h5 className="fw-bold">Find Projects</h5>
                                <p className="contractor-muted small mb-0">
                                    Browse open construction projects and understand
                                    each customer's requirements.
                                </p>
                            </div>
                        </div>

                        <div className="col-12 col-md-4">
                            <div className="contractor-step p-4">
                                <div className="contractor-step-number mb-3">2</div>
                                <h5 className="fw-bold">Submit Your Bid</h5>
                                <p className="contractor-muted small mb-0">
                                    Share your quotation, estimated completion time,
                                    and a message for the customer.
                                </p>
                            </div>
                        </div>

                        <div className="col-12 col-md-4">
                            <div className="contractor-step p-4">
                                <div className="contractor-step-number mb-3">3</div>
                                <h5 className="fw-bold">Track Progress</h5>
                                <p className="contractor-muted small mb-0">
                                    Check bid decisions and review accepted projects
                                    from your won-projects section.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Footer */}
                <footer className="text-center py-3">
                    <p className="contractor-muted small mb-0">
                        © {new Date().getFullYear()} NirmaanX · Building better
                        construction connections.
                    </p>
                </footer>
            </main>
        </div>
    );
}

export default ContractorDashboard;
