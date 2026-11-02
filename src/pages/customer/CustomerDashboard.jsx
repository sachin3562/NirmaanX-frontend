
import { Link } from "react-router-dom";

function CustomerDashboard() {
    const actions = [
        {
            icon: "🏗️",
            title: "Create New Project",
            description:
                "Share your construction requirements, budget, and location to receive contractor bids.",
            button: "Create Project",
            path: "/customer/create-project"
        },
        {
            icon: "📋",
            title: "My Projects",
            description:
                "Review your projects, monitor their status, and compare contractor proposals.",
            button: "View My Projects",
            path: "/customer/projects"
        }
    ];

    return (
        <div
            className="min-vh-100"
            style={{
                background: "linear-gradient(135deg, #EFF6FF, #FFFFFF, #FFF7ED)"
            }}
        >
            {/* Navigation */}
            <nav className="navbar bg-white shadow-sm py-3">
                <div className="container d-flex flex-wrap justify-content-between gap-3">
                    <Link
                        to="/customer/dashboard"
                        className="text-decoration-none fw-bold fs-3"
                        style={{ color: "#17365D" }}
                    >
                        Nirmaan<span style={{ color: "#F97316" }}>X</span>
                        <div
                            className="text-secondary"
                            style={{ fontSize: "10px", letterSpacing: "2px" }}
                        >
                            BUILD WITH TRUST
                        </div>
                    </Link>

                    <div className="d-flex flex-wrap align-items-center gap-2">
                        <Link
                            to="/profile"
                            className="btn btn-outline-primary rounded-3 px-3"
                        >
                            👤 My Profile
                        </Link>

                        <button
                            className="btn btn-outline-danger rounded-3 px-3"
                            onClick={() => {
                                localStorage.removeItem("token");
                                window.location.href = "/login";
                            }}
                        >
                            Logout
                        </button>
                    </div>
                </div>
            </nav>

            <main className="container py-4 py-md-5">

                {/* Welcome banner */}
                <section
                    className="rounded-4 p-4 p-md-5 mb-5 text-white overflow-hidden"
                    style={{
                        background: "linear-gradient(120deg, #17365D, #2563EB)",
                        boxShadow: "0 12px 35px rgba(23, 54, 93, 0.15)"
                    }}
                >
                    <div className="row align-items-center g-4">
                        <div className="col-lg-8">
                            <span
                                className="badge rounded-pill px-3 py-2 mb-3"
                                style={{
                                    backgroundColor: "rgba(255,255,255,0.15)",
                                    color: "#FFFFFF"
                                }}
                            >
                                CUSTOMER WORKSPACE
                            </span>

                            <h1 className="fw-bold display-5 mb-3">
                                Welcome to NirmaanX 👋
                            </h1>

                            <p
                                className="fs-5 mb-4"
                                style={{ color: "#DBEAFE", maxWidth: "650px" }}
                            >
                                Your construction journey starts here. Create
                                projects, connect with contractors, and review
                                bids from one convenient workspace.
                            </p>

                            <Link
                                to="/customer/create-project"
                                className="btn btn-lg rounded-3 px-4 fw-semibold"
                                style={{
                                    backgroundColor: "#F97316",
                                    color: "#FFFFFF"
                                }}
                            >
                                + Create New Project
                            </Link>
                        </div>

                        <div className="col-lg-4 text-center d-none d-lg-block">
                            <div style={{ fontSize: "110px" }}>🏗️</div>
                            <p className="fw-semibold mb-0">
                                Build your vision with confidence
                            </p>
                        </div>
                    </div>
                </section>

                {/* Workspace heading */}
                <section className="mb-4">
                    <h2 className="fw-bold" style={{ color: "#17365D" }}>
                        Your Workspace
                    </h2>
                    <p className="text-secondary mb-0">
                        Everything you need to manage your construction projects.
                    </p>
                </section>

                {/* Action cards */}
                <div className="row g-4">
                    {actions.map((action) => (
                        <div className="col-12 col-md-6" key={action.title}>
                            <div
                                className="card h-100 border-0 rounded-4"
                                style={{
                                    boxShadow: "0 8px 28px rgba(23, 54, 93, 0.08)"
                                }}
                            >
                                <div className="card-body p-4 p-lg-5 d-flex flex-column align-items-start">
                                    <div
                                        className="rounded-4 d-flex align-items-center justify-content-center mb-4"
                                        style={{
                                            width: "68px",
                                            height: "68px",
                                            fontSize: "32px",
                                            backgroundColor: "#EFF6FF"
                                        }}
                                    >
                                        {action.icon}
                                    </div>

                                    <h4
                                        className="fw-bold mb-3"
                                        style={{ color: "#17365D" }}
                                    >
                                        {action.title}
                                    </h4>

                                    <p className="text-secondary mb-4">
                                        {action.description}
                                    </p>

                                    <Link
                                        to={action.path}
                                        className="btn rounded-3 px-4 mt-auto fw-semibold text-white"
                                        style={{ backgroundColor: "#17365D" }}
                                    >
                                        {action.button} →
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Workflow guide */}
                <section className="mt-5">
                    <div className="mb-4">
                        <h3 className="fw-bold" style={{ color: "#17365D" }}>
                            How NirmaanX Works
                        </h3>
                        <p className="text-secondary">
                            Three simple steps to move your construction project forward.
                        </p>
                    </div>

                    <div className="row g-3">
                        {[
                            {
                                number: "01",
                                icon: "📝",
                                title: "Post a Project",
                                description:
                                    "Add your construction requirements, budget, and location."
                            },
                            {
                                number: "02",
                                icon: "🤝",
                                title: "Compare Bids",
                                description:
                                    "Review contractor quotations and estimated completion times."
                            },
                            {
                                number: "03",
                                icon: "🏆",
                                title: "Choose a Contractor",
                                description:
                                    "Accept your preferred bid to move the project forward."
                            }
                        ].map((step) => (
                            <div className="col-12 col-md-4" key={step.number}>
                                <div className="card h-100 border-0 rounded-4 shadow-sm">
                                    <div className="card-body p-4">
                                        <div className="d-flex justify-content-between align-items-center mb-3">
                                            <span style={{ fontSize: "30px" }}>
                                                {step.icon}
                                            </span>
                                            <span
                                                className="fw-bold"
                                                style={{
                                                    color: "#F97316",
                                                    fontSize: "20px"
                                                }}
                                            >
                                                {step.number}
                                            </span>
                                        </div>

                                        <h5
                                            className="fw-bold"
                                            style={{ color: "#17365D" }}
                                        >
                                            {step.title}
                                        </h5>

                                        <p className="text-secondary mb-0">
                                            {step.description}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Footer */}
                <footer className="text-center text-secondary mt-5 pt-4 border-top">
                    <p className="mb-0">
                        © {new Date().getFullYear()} NirmaanX · Build with Trust
                    </p>
                </footer>
            </main>
        </div>
    );
}

export default CustomerDashboard;
