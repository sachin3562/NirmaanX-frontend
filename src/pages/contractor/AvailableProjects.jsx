import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../services/api";

function AvailableProjects() {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [search, setSearch] = useState("");

    useEffect(() => {
        fetchProjects();
    }, []);

    async function fetchProjects() {
        setLoading(true);
        setError("");

        try {
            const response = await api.get("/projects/status/OPEN");
            setProjects(response.data);
        } catch (error) {
            console.error("Failed to fetch projects:", error);
            setError("Unable to load projects. Please try again.");
        } finally {
            setLoading(false);
        }
    }

    const filteredProjects = projects.filter((project) => {
        const searchText = search.toLowerCase();

        return (
            (project.title || "").toLowerCase().includes(searchText) ||
            (project.description || "").toLowerCase().includes(searchText) ||
            (project.location || "").toLowerCase().includes(searchText)
        );
    });

    const formatBudget = (budget) =>
        Number(budget).toLocaleString("en-IN", {
            maximumFractionDigits: 2
        });

    return (
        <div className="available-projects-page min-vh-100 bg-light">
            <style>{`
                .available-navbar {
                    background: #101d35;
                }

                .available-accent {
                    color: #ff9f43;
                }

                .available-hero {
                    background: linear-gradient(125deg, #101d35, #254875);
                    border-radius: 22px;
                }

                .available-search {
                    border: 1px solid #e1e7ef;
                    border-radius: 13px;
                    min-height: 48px;
                }

                .available-search:focus {
                    border-color: #ff9f43;
                    box-shadow: 0 0 0 0.2rem rgba(255, 159, 67, 0.16);
                }

                .available-project-card {
                    border: 1px solid #e8edf4;
                    border-radius: 18px;
                    transition: transform 0.2s ease, box-shadow 0.2s ease;
                }

                .available-project-card:hover {
                    transform: translateY(-4px);
                    box-shadow: 0 14px 28px rgba(16, 29, 53, 0.09) !important;
                }

                .available-project-icon {
                    width: 50px;
                    height: 50px;
                    border-radius: 14px;
                    background: #fff1e3;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 25px;
                }

                .available-budget {
                    background: #f3f6fa;
                    border-radius: 13px;
                    padding: 13px 15px;
                }

                .available-orange-btn {
                    background: #ff9f43;
                    border: 1px solid #ff9f43;
                    color: #17243a;
                    font-weight: 600;
                }

                .available-orange-btn:hover {
                    background: #f28c28;
                    border-color: #f28c28;
                    color: #17243a;
                }

                .available-muted {
                    color: #68758a;
                }

                @media (max-width: 575px) {
                    .available-hero {
                        border-radius: 17px;
                    }
                }
            `}</style>

            {/* Navigation */}
            <nav className="navbar navbar-dark available-navbar py-3 shadow-sm">
                <div className="container">
                    <Link
                        to="/contractor/dashboard"
                        className="navbar-brand fw-bold fs-4"
                    >
                        🏗️ Nirmaan<span className="available-accent">X</span>
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
                <section className="available-hero p-4 p-md-5 mb-4 shadow-sm">
                    <span className="badge rounded-pill bg-light text-dark px-3 py-2 mb-3">
                        CONTRACTOR WORKSPACE
                    </span>

                    <h1 className="text-white fw-bold mb-3">
                        Find your next <span className="available-accent">project.</span>
                    </h1>

                    <p
                        className="text-white-50 mb-0"
                        style={{ maxWidth: "650px" }}
                    >
                        Explore open construction opportunities, review budgets
                        and locations, and submit bids for projects that match your expertise.
                    </p>
                </section>

                {/* Search and summary */}
                <section className="bg-white rounded-4 shadow-sm p-3 p-md-4 mb-4">
                    <div className="row g-3 align-items-center">
                        <div className="col-12 col-md-8">
                            <label
                                htmlFor="project-search"
                                className="form-label fw-semibold"
                            >
                                Search projects
                            </label>

                            <input
                                id="project-search"
                                type="search"
                                className="form-control available-search"
                                placeholder="Search by title, description, or location..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                        </div>

                        <div className="col-12 col-md-4">
                            <div className="available-budget mt-md-4">
                                <div className="available-muted small">
                                    {search ? "Matching projects" : "Open projects"}
                                </div>
                                <div className="fw-bold fs-4">
                                    {loading ? "—" : filteredProjects.length}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Project list heading */}
                <div className="d-flex justify-content-between align-items-center flex-wrap gap-2 mb-4">
                    <div>
                        <h2 className="fw-bold mb-1" style={{ color: "#101d35" }}>
                            Available Projects
                        </h2>
                        <p className="available-muted mb-0">
                            Review project details before submitting your quotation.
                        </p>
                    </div>

                    <button
                        type="button"
                        className="btn btn-outline-secondary rounded-pill px-3"
                        onClick={fetchProjects}
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
                        <h5 className="fw-semibold">Finding available projects...</h5>
                        <p className="available-muted mb-0">
                            Please wait while we retrieve open projects.
                        </p>
                    </div>
                )}

                {/* Error */}
                {!loading && error && (
                    <div className="alert alert-danger rounded-4 p-4">
                        <h5 className="fw-bold">Couldn't load projects</h5>
                        <p>{error}</p>
                        <button
                            type="button"
                            className="btn btn-danger rounded-pill px-4"
                            onClick={fetchProjects}
                        >
                            Try Again
                        </button>
                    </div>
                )}

                {/* Empty state */}
                {!loading && !error && filteredProjects.length === 0 && (
                    <div className="bg-white rounded-4 shadow-sm text-center p-4 p-md-5">
                        <div className="display-4 mb-3">🏗️</div>
                        <h4 className="fw-bold">
                            {projects.length === 0
                                ? "No open projects right now"
                                : "No matching projects found"}
                        </h4>
                        <p className="available-muted mb-4">
                            {projects.length === 0
                                ? "New opportunities may become available later. Check back soon."
                                : "Try another project title, description, or location."}
                        </p>

                        {search && (
                            <button
                                type="button"
                                className="btn btn-outline-dark rounded-pill px-4"
                                onClick={() => setSearch("")}
                            >
                                Clear Search
                            </button>
                        )}
                    </div>
                )}

                {/* Project cards */}
                {!loading && !error && filteredProjects.length > 0 && (
                    <div className="row g-4">
                        {filteredProjects.map((project) => (
                            <div
                                className="col-12 col-md-6 col-xl-4"
                                key={project.id}
                            >
                                <div className="card available-project-card h-100 shadow-sm">
                                    <div className="card-body p-4 d-flex flex-column">
                                        <div className="d-flex justify-content-between align-items-start gap-2 mb-3">
                                            <div className="available-project-icon">
                                                🏗️
                                            </div>

                                            <span className="badge rounded-pill bg-success-subtle text-success border border-success-subtle px-3 py-2">
                                                {project.status}
                                            </span>
                                        </div>

                                        <h5
                                            className="fw-bold mb-2"
                                            style={{ color: "#101d35" }}
                                        >
                                            {project.title}
                                        </h5>

                                        <p className="available-muted small mb-4">
                                            {project.description ||
                                                "No project description provided."}
                                        </p>

                                        <div className="available-budget mb-3">
                                            <div className="available-muted small mb-1">
                                                Project Budget
                                            </div>
                                            <div className="fw-bold fs-4">
                                                <span className="available-accent">₹</span>
                                                {formatBudget(project.budget)}
                                            </div>
                                        </div>

                                        <div className="mb-4">
                                            <div className="available-muted small mb-1">
                                                Project Location
                                            </div>

                                            <div className="d-flex align-items-start gap-2">
                                                <span>📍</span>
                                                <a
                                                    href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(project.location || "")}`}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-decoration-none"
                                                >
                                                    {project.location || "Location not specified"}
                                                </a>
                                            </div>
                                        </div>

                                        <div className="mt-auto">
                                            <Link
                                                to={`/contractor/projects/${project.id}/bid`}
                                                className="btn available-orange-btn rounded-pill w-100 py-2"
                                            >
                                                Submit Your Bid <span className="ms-1">→</span>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                <footer className="text-center py-4 mt-3">
                    <small className="available-muted">
                        NirmaanX · Building better construction connections.
                    </small>
                </footer>
            </main>
        </div>
    );
}

export default AvailableProjects;
