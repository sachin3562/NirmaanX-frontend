import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../services/api";

function MyWonProjects() {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [search, setSearch] = useState("");
    const [completionLoadingId, setCompletionLoadingId] = useState(null);
    const [completionMessage, setCompletionMessage] = useState({});

    useEffect(() => {
        fetchWonProjects();
    }, []);

    const fetchWonProjects = async () => {
        setLoading(true);
        setError("");

        try {
            const response = await api.get("/bids/my/won");
            console.log("Won projects API response:", response.data);
            setProjects(response.data);
        } catch (err) {
            console.error("Error fetching won projects:", err);
            setError("Unable to load your won projects. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const requestProjectCompletion = async (project) => {
        const confirmed = window.confirm(
            `Are you sure you want to request completion for "${project.projectTitle}"?`
        );

        if (!confirmed) return;

        setCompletionLoadingId(project.projectId);
        setCompletionMessage((prev) => ({
            ...prev,
            [project.projectId]: ""
        }));

        try {
            const response = await api.put(
                `/projects/${project.projectId}/request-completion`
            );

            const updatedStatus =
                response.data.status || "COMPLETION_REQUESTED";

            setProjects((prev) =>
                prev.map((item) =>
                    item.projectId === project.projectId
                        ? {
                            ...item,
                            projectStatus: updatedStatus
                        }
                        : item
                )
            );

            setCompletionMessage((prev) => ({
                ...prev,
                [project.projectId]: "Completion request sent successfully! Waiting for customer approval."
            }));
        } catch (err) {
            console.error("Error requesting project completion:", err);

            setCompletionMessage((prev) => ({
                ...prev,
                [project.projectId]:
                    err.response?.data?.message ||
                    "Unable to submit completion request. Please try again."
            }));
        } finally {
            setCompletionLoadingId(null);
        }
    };

    const formatAmount = (amount) =>
        Number(amount).toLocaleString("en-IN", {
            maximumFractionDigits: 2
        });

    const filteredProjects = projects.filter((project) => {
        const searchText = search.toLowerCase();

        return (
            (project.projectTitle || "").toLowerCase().includes(searchText) ||
            String(project.bidId).includes(searchText) ||
            String(project.projectId || "").includes(searchText) ||
            (project.projectLocation || "").toLowerCase().includes(searchText) ||
            (project.customerName || "").toLowerCase().includes(searchText)
        );
    });

    return (
        <div className="won-projects-page min-vh-100 bg-light">
            <style>{`
                .won-navbar {
                    background: #101d35;
                }

                .won-accent {
                    color: #ff9f43;
                }

                .won-hero {
                    background: linear-gradient(125deg, #101d35, #254875);
                    border-radius: 22px;
                }

                .won-card {
                    border: 1px solid #e8edf4;
                    border-radius: 19px;
                    overflow: hidden;
                    transition: transform 0.2s ease, box-shadow 0.2s ease;
                }

                .won-card:hover {
                    transform: translateY(-4px);
                    box-shadow: 0 14px 30px rgba(16, 29, 53, 0.09) !important;
                }

                .won-card-header {
                    background: #101d35;
                    color: white;
                    padding: 22px;
                }

                .won-icon {
                    width: 52px;
                    height: 52px;
                    border-radius: 15px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    background: rgba(255,255,255,0.12);
                    font-size: 26px;
                }

                .won-accepted-badge {
                    background: #d9f5e5;
                    color: #146c43;
                    border-radius: 30px;
                    padding: 7px 12px;
                    font-size: 11px;
                    font-weight: 700;
                    white-space: nowrap;
                }

                .won-summary-box {
                    background: #f3f6fa;
                    border-radius: 14px;
                    padding: 15px;
                    height: 100%;
                }

                .won-contact-panel {
                    background: #f8fafc;
                    border: 1px solid #e8edf4;
                    border-radius: 15px;
                    padding: 18px;
                }

                .won-muted {
                    color: #68758a;
                }

                .won-search {
                    min-height: 47px;
                    border-radius: 12px;
                    border: 1px solid #dce3ed;
                }

                .won-search:focus {
                    border-color: #ff9f43;
                    box-shadow: 0 0 0 0.2rem rgba(255, 159, 67, 0.16);
                }

                .won-orange-btn {
                    background: #ff9f43;
                    border: 1px solid #ff9f43;
                    color: #17243a;
                    font-weight: 600;
                }

                .won-orange-btn:hover {
                    background: #f28c28;
                    border-color: #f28c28;
                    color: #17243a;
                }

                .won-detail-row {
                    overflow-wrap: anywhere;
                }

                @media (max-width: 575px) {
                    .won-hero {
                        border-radius: 17px;
                    }
                }
            `}</style>

            {/* Navigation */}
            <nav className="navbar navbar-dark won-navbar py-3 shadow-sm">
                <div className="container">
                    <Link
                        to="/contractor/dashboard"
                        className="navbar-brand fw-bold fs-4"
                    >
                        🏗️ Nirmaan<span className="won-accent">X</span>
                    </Link>

                    <div className="d-flex gap-2">
                        <Link
                            to="/contractor/my-bids"
                            className="btn btn-outline-light btn-sm rounded-pill px-3"
                        >
                            My Bids
                        </Link>

                        <Link
                            to="/contractor/dashboard"
                            className="btn btn-outline-light btn-sm rounded-pill px-3"
                        >
                            Dashboard
                        </Link>
                    </div>
                </div>
            </nav>

            <main className="container py-4 py-lg-5">
                {/* Hero */}
                <section className="won-hero p-4 p-md-5 mb-4 shadow-sm">
                    <span className="badge rounded-pill bg-light text-dark px-3 py-2 mb-3">
                        CONTRACTOR WORKSPACE
                    </span>

                    <h1 className="text-white fw-bold mb-3">
                        Your Won <span className="won-accent">Projects</span>
                    </h1>

                    <p className="text-white-50 mb-0">
                        View your accepted bids, review project commitments,
                        and connect with customers to coordinate the next steps.
                    </p>
                </section>

                {/* Summary */}
                <div className="row g-3 mb-4">
                    <div className="col-12 col-sm-6 col-lg-4">
                        <div className="card border-0 shadow-sm rounded-4 h-100">
                            <div className="card-body p-4">
                                <div className="won-muted small mb-2">
                                    Accepted Projects
                                </div>
                                <h3 className="fw-bold mb-1" style={{ color: "#101d35" }}>
                                    {loading ? "—" : projects.length}
                                </h3>
                                <small className="won-muted">
                                    Projects linked to your accepted bids
                                </small>
                            </div>
                        </div>
                    </div>

                    <div className="col-12 col-sm-6 col-lg-4">
                        <div className="card border-0 shadow-sm rounded-4 h-100">
                            <div className="card-body p-4">
                                <div className="won-muted small mb-2">
                                    Total Accepted Bid Value
                                </div>
                                <h3 className="fw-bold mb-1" style={{ color: "#146c43" }}>
                                    {loading
                                        ? "—"
                                        : `₹${formatAmount(
                                            projects.reduce(
                                                (total, project) =>
                                                    total + Number(project.quotedAmount || 0),
                                                0
                                            )
                                        )}`}
                                </h3>
                                <small className="won-muted">
                                    Sum of your accepted quotations
                                </small>
                            </div>
                        </div>
                    </div>

                    <div className="col-12 col-lg-4">
                        <div className="card border-0 shadow-sm rounded-4 h-100">
                            <div className="card-body p-4">
                                <div className="won-muted small mb-2">
                                    Next Step
                                </div>
                                <h5 className="fw-bold mb-2" style={{ color: "#101d35" }}>
                                    Coordinate with customers
                                </h5>
                                <small className="won-muted">
                                    Use the contact details available on each project card.
                                </small>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Search */}
                <section className="bg-white rounded-4 shadow-sm p-3 p-md-4 mb-4">
                    <label
                        htmlFor="won-project-search"
                        className="form-label fw-semibold"
                    >
                        Find a won project
                    </label>

                    <input
                        id="won-project-search"
                        type="search"
                        className="form-control won-search"
                        placeholder="Search by project title, ID, location, or customer..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </section>

                {/* Heading */}
                <div className="d-flex justify-content-between align-items-center flex-wrap gap-2 mb-4">
                    <div>
                        <h2 className="fw-bold mb-1" style={{ color: "#101d35" }}>
                            Accepted Projects
                        </h2>
                        <p className="won-muted mb-0">
                            Your successful bids and customer information.
                        </p>
                    </div>

                    <button
                        type="button"
                        className="btn btn-outline-secondary rounded-pill px-3"
                        onClick={fetchWonProjects}
                        disabled={loading}
                    >
                        {loading ? "Loading..." : "↻ Refresh"}
                    </button>
                </div>

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
                        <h5 className="fw-semibold">Loading your won projects...</h5>
                        <p className="won-muted mb-0">
                            Please wait while we retrieve your accepted bids.
                        </p>
                    </div>
                )}

                {/* Error */}
                {!loading && error && (
                    <div className="alert alert-danger rounded-4 p-4">
                        <h5 className="fw-bold">Unable to load won projects</h5>
                        <p>{error}</p>
                        <button
                            type="button"
                            className="btn btn-danger rounded-pill px-4"
                            onClick={fetchWonProjects}
                        >
                            Try Again
                        </button>
                    </div>
                )}

                {/* Empty */}
                {!loading && !error && projects.length === 0 && (
                    <div className="bg-white rounded-4 shadow-sm text-center p-4 p-md-5">
                        <div className="display-4 mb-3">🏆</div>
                        <h4 className="fw-bold">No Won Projects Yet</h4>
                        <p className="won-muted mb-4">
                            When a customer accepts your bid, the project will appear here.
                            Continue exploring opportunities to grow your work.
                        </p>
                        <Link
                            to="/contractor/projects"
                            className="btn won-orange-btn rounded-pill px-4 py-2"
                        >
                            Explore Available Projects →
                        </Link>
                    </div>
                )}

                {/* No search results */}
                {!loading && !error && projects.length > 0 && filteredProjects.length === 0 && (
                    <div className="bg-white rounded-4 shadow-sm text-center p-4">
                        <h5 className="fw-bold">No matching projects found</h5>
                        <p className="won-muted mb-3">
                            Try another project title, ID, location, or customer name.
                        </p>
                        <button
                            type="button"
                            className="btn btn-outline-dark rounded-pill px-4"
                            onClick={() => setSearch("")}
                        >
                            Clear Search
                        </button>
                    </div>
                )}

                {/* Project cards */}
                {!loading && !error && filteredProjects.length > 0 && (
                    <div className="row g-4">
                        {filteredProjects.map((project) => (
                            <div
                                className="col-12 col-xl-6"
                                key={project.bidId}
                            >
                                <article className="card won-card h-100 shadow-sm">
                                    <div className="won-card-header">
                                        <div className="d-flex justify-content-between align-items-start gap-3">
                                            <div className="d-flex gap-3 align-items-center">
                                                <div className="won-icon">🏗️</div>
                                                <div>
                                                    <div className="text-white-50 small mb-1">
                                                        ACCEPTED BID #{project.bidId}
                                                    </div>
                                                    <h5 className="fw-bold mb-1">
                                                        {project.projectTitle}
                                                    </h5>
                                                    <div className="text-white-50 small">
                                                        {project.projectStatus || "Project status unavailable"}
                                                    </div>
                                                </div>
                                            </div>

                                            <span className="won-accepted-badge">
                                                ✓ ACCEPTED
                                            </span>
                                        </div>
                                    </div>

                                    <div className="card-body p-4">
                                        <p className="won-muted mb-4">
                                            {project.projectDescription ||
                                                "No project description provided."}
                                        </p>

                                        <h6 className="fw-bold mb-3">
                                            Project & Bid Details
                                        </h6>

                                        <div className="row g-3 mb-4">
                                            <div className="col-12 col-sm-6">
                                                <div className="won-summary-box">
                                                    <div className="won-muted small mb-1">
                                                        Project Budget
                                                    </div>
                                                    <div className="fw-bold fs-5">
                                                        ₹{formatAmount(project.projectBudget)}
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="col-12 col-sm-6">
                                                <div className="won-summary-box">
                                                    <div className="won-muted small mb-1">
                                                        Your Accepted Bid
                                                    </div>
                                                    <div className="fw-bold fs-5 text-success">
                                                        ₹{formatAmount(project.quotedAmount)}
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="col-12 col-sm-6">
                                                <div className="won-summary-box">
                                                    <div className="won-muted small mb-1">
                                                        Estimated Completion
                                                    </div>
                                                    <div className="fw-semibold">
                                                        🗓️ {project.estimatedDays} days
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="col-12 col-sm-6">
                                                <div className="won-summary-box">
                                                    <div className="won-muted small mb-1">
                                                        Project Location
                                                    </div>
                                                    <div className="fw-semibold won-detail-row">
                                                        📍 {project.projectLocation || "Not provided"}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {project.projectLocation && (
                                            <a
                                                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(project.projectLocation)}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="btn btn-outline-secondary btn-sm rounded-pill px-3 mb-4"
                                            >
                                                📍 View Project Location
                                            </a>
                                        )}

                                        <hr />

                                        <h6 className="fw-bold mb-3">
                                            Customer Contact
                                        </h6>

                                        <div className="won-contact-panel mb-3">
                                            <div className="fw-bold mb-3" style={{ color: "#101d35" }}>
                                                👤 {project.customerName || "Customer"}
                                            </div>

                                            <div className="mb-3 won-detail-row">
                                                <div className="won-muted small mb-1">
                                                    Phone
                                                </div>
                                                {project.customerPhone ? (
                                                    <a
                                                        href={`tel:${project.customerPhone}`}
                                                        className="text-decoration-none"
                                                    >
                                                        {project.customerPhone}
                                                    </a>
                                                ) : (
                                                    <span className="won-muted">Not provided</span>
                                                )}
                                            </div>

                                            <div className="mb-3 won-detail-row">
                                                <div className="won-muted small mb-1">
                                                    Email
                                                </div>
                                                {project.customerEmail ? (
                                                    <a
                                                        href={`mailto:${project.customerEmail}`}
                                                        className="text-decoration-none"
                                                    >
                                                        {project.customerEmail}
                                                    </a>
                                                ) : (
                                                    <span className="won-muted">Not provided</span>
                                                )}
                                            </div>

                                            <div className="won-detail-row">
                                                <div className="won-muted small mb-1">
                                                    City
                                                </div>
                                                <div>
                                                    {[project.customerCity, project.customerState]
                                                        .filter(Boolean)
                                                        .join(", ") || "Not provided"}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="d-flex flex-wrap gap-2">
                                            {project.customerPhone && (
                                                <a
                                                    href={`tel:${project.customerPhone}`}
                                                    className="btn btn-success rounded-pill px-3"
                                                >
                                                    📞 Call Customer
                                                </a>
                                            )}

                                            {project.customerEmail && (
                                                <a
                                                    href={`mailto:${project.customerEmail}`}
                                                    className="btn btn-outline-primary rounded-pill px-3"
                                                >
                                                    ✉️ Email Customer
                                                </a>
                                            )}

                                        <hr className="my-4" />

                                        <div className="d-flex flex-column gap-3">
                                            {project.projectStatus === "IN_PROGRESS" && (
                                                <button
                                                    type="button"
                                                    className="btn won-orange-btn rounded-pill px-4 py-2"
                                                    onClick={() => requestProjectCompletion(project)}
                                                    disabled={completionLoadingId === project.projectId}
                                                >
                                                    {completionLoadingId === project.projectId
                                                        ? "Submitting Request..."
                                                        : "✓ Request Project Completion"}
                                                </button>
                                            )}

                                            {project.projectStatus === "COMPLETION_REQUESTED" && (
                                                <div className="alert alert-warning rounded-3 mb-0">
                                                    <strong>Awaiting Customer Approval</strong>
                                                    <div className="small mt-1">
                                                        Your completion request has been submitted.
                                                    </div>
                                                </div>
                                            )}

                                            {project.projectStatus === "COMPLETED" && (
                                                <div className="alert alert-success rounded-3 mb-0">
                                                    <strong>✓ Project Completed Successfully</strong>
                                                    <div className="small mt-1">
                                                        The customer has accepted your completion request.
                                                    </div>
                                                </div>
                                            )}

                                            {completionMessage[project.projectId] && (
                                                <div
                                                    className={`alert ${
                                                        completionMessage[project.projectId].startsWith(
                                                            "Unable to"
                                                        )
                                                            ? "alert-danger"
                                                            : "alert-success"
                                                    } rounded-3 mb-0`}
                                                    role="status"
                                                >
                                                    {completionMessage[project.projectId]}
                                                </div>
                                            )}
                                        </div>

                                        </div>
                                    </div>
                                </article>
                            </div>
                        ))}
                    </div>
                )}

                <footer className="text-center py-4 mt-3">
                    <small className="won-muted">
                        © {new Date().getFullYear()} NirmaanX · Building better construction connections.
                    </small>
                </footer>
            </main>
        </div>
    );
}

export default MyWonProjects;
