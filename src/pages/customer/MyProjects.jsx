
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../services/api";

function MyProjects() {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [completionLoadingId, setCompletionLoadingId] = useState(null);
    const [completionMessage, setCompletionMessage] = useState({});


    useEffect(() => {
        fetchProjects();
    }, []);

    const fetchProjects = async () => {
        try {
            setError("");
            const response = await api.get("/projects/my");
            setProjects(response.data);
        } catch (err) {
            console.error("Error fetching projects:", err);
            setError("Unable to load projects. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const retryFetch = () => {
        setLoading(true);
        fetchProjects();
    };

    const respondToCompletion = async (project, accepted) => {
        const action = accepted ? "accept" : "reject";

        const confirmed = window.confirm(
            `Are you sure you want to ${action} the completion request for "${project.title}"?`
        );

        if (!confirmed) return;

        setCompletionLoadingId(project.id);
        setCompletionMessage((prev) => ({
            ...prev,
            [project.id]: ""
        }));

        try {
            const response = await api.put(
                `/projects/${project.id}/completion-response`,
                null,
                {
                    params: { accepted }
                }
            );

            const updatedStatus = response.data.status ||
                (accepted ? "COMPLETED" : "IN_PROGRESS");

            setProjects((prev) =>
                prev.map((item) =>
                    item.id === project.id
                        ? { ...item, status: updatedStatus }
                        : item
                )
            );

            setCompletionMessage((prev) => ({
                ...prev,
                [project.id]: accepted
                    ? "Completion accepted! The project is now marked as completed successfully."
                    : "Completion request rejected. The project is back in progress."
            }));
        } catch (err) {
            console.error("Error responding to completion:", err);

            setCompletionMessage((prev) => ({
                ...prev,
                [project.id]:
                    err.response?.data?.message ||
                    "Unable to process the completion request. Please try again."
            }));
        } finally {
            setCompletionLoadingId(null);
        }
    };

    const getStatusStyle = (status) => {
        const styles = {
            OPEN: { background: "#DCFCE7", color: "#166534" },
            IN_PROGRESS: { background: "#DBEAFE", color: "#1D4ED8" },
            COMPLETED: { background: "#EDE9FE", color: "#6D28D9" },
            CANCELLED: { background: "#FEE2E2", color: "#B91C1C" },
            COMPLETION_REQUESTED: {
                background: "#FEF3C7",
                color: "#92400E"
            }
        };

        return styles[status] || {
            background: "#F1F5F9",
            color: "#475569"
        };
    };

    if (loading) {
        return (
            <div
                className="min-vh-100 d-flex flex-column align-items-center justify-content-center"
                style={{ backgroundColor: "#F5F8FC" }}
            >
                <div className="spinner-border text-primary" role="status" />
                <p className="text-secondary mt-3">Loading your projects...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div
                className="min-vh-100 py-5"
                style={{ backgroundColor: "#F5F8FC" }}
            >
                <div className="container">
                    <div className="alert alert-danger rounded-4">
                        {error}
                    </div>
                    <button className="btn btn-primary rounded-3" onClick={retryFetch}>
                        Try Again
                    </button>
                    <Link
                        to="/customer/dashboard"
                        className="btn btn-outline-secondary rounded-3 ms-2"
                    >
                        Dashboard
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div
            className="min-vh-100 py-4 py-md-5"
            style={{
                background: "linear-gradient(135deg, #EFF6FF, #FFFFFF, #FFF7ED)"
            }}
        >
            <div className="container">

                {/* Header */}
                <div className="d-flex flex-wrap justify-content-between align-items-center gap-3 mb-5">
                    <div>
                        <Link
                            to="/customer/dashboard"
                            className="text-decoration-none fw-bold fs-3"
                            style={{ color: "#17365D" }}
                        >
                            Nirmaan<span style={{ color: "#F97316" }}>X</span>
                        </Link>
                        <p className="text-secondary small mb-0">
                            BUILD WITH TRUST
                        </p>
                    </div>

                    <div className="d-flex flex-wrap gap-2">
                        <Link
                            to="/customer/dashboard"
                            className="btn btn-outline-primary rounded-3 px-3"
                        >
                            Dashboard
                        </Link>

                        <Link
                            to="/customer/create-project"
                            className="btn text-white rounded-3 px-3 fw-semibold"
                            style={{ backgroundColor: "#F97316" }}
                        >
                            + Create Project
                        </Link>
                    </div>
                </div>

                {/* Page heading */}
                <div className="mb-4">
                    <span
                        className="badge rounded-pill px-3 py-2 mb-3"
                        style={{
                            backgroundColor: "#DBEAFE",
                            color: "#1D4ED8"
                        }}
                    >
                        CUSTOMER WORKSPACE
                    </span>

                    <h1 className="fw-bold display-6" style={{ color: "#17365D" }}>
                        My Projects
                    </h1>

                    <p className="text-secondary fs-5">
                        Manage your construction projects and review contractor bids.
                    </p>
                </div>

                {/* Summary cards */}
                <div className="row g-3 mb-4">
                    <div className="col-12 col-sm-6 col-lg-4">
                        <div className="card border-0 rounded-4 shadow-sm h-100">
                            <div className="card-body p-4 d-flex align-items-center gap-3">
                                <div
                                    className="rounded-3 d-flex align-items-center justify-content-center"
                                    style={{
                                        backgroundColor: "#DBEAFE",
                                        width: "54px",
                                        height: "54px",
                                        fontSize: "26px"
                                    }}
                                >
                                    📋
                                </div>
                                <div>
                                    <p className="text-secondary mb-1">Total Projects</p>
                                    <h3 className="fw-bold mb-0" style={{ color: "#17365D" }}>
                                        {projects.length}
                                    </h3>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-12 col-sm-6 col-lg-4">
                        <div className="card border-0 rounded-4 shadow-sm h-100">
                            <div className="card-body p-4 d-flex align-items-center gap-3">
                                <div
                                    className="rounded-3 d-flex align-items-center justify-content-center"
                                    style={{
                                        backgroundColor: "#DCFCE7",
                                        width: "54px",
                                        height: "54px",
                                        fontSize: "26px"
                                    }}
                                >
                                    🟢
                                </div>
                                <div>
                                    <p className="text-secondary mb-1">Open Projects</p>
                                    <h3 className="fw-bold mb-0" style={{ color: "#17365D" }}>
                                        {projects.filter((p) => p.status === "OPEN").length}
                                    </h3>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-12 col-sm-6 col-lg-4">
                        <div className="card border-0 rounded-4 shadow-sm h-100">
                            <div className="card-body p-4 d-flex align-items-center gap-3">
                                <div
                                    className="rounded-3 d-flex align-items-center justify-content-center"
                                    style={{
                                        backgroundColor: "#FFEDD5",
                                        width: "54px",
                                        height: "54px",
                                        fontSize: "26px"
                                    }}
                                >
                                    🏗️
                                </div>
                                <div>
                                    <p className="text-secondary mb-1">In Progress</p>
                                    <h3 className="fw-bold mb-0" style={{ color: "#17365D" }}>
                                        {projects.filter((p) => p.status === "IN_PROGRESS").length}
                                    </h3>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Project list */}
                {projects.length === 0 ? (
                    <div className="card border-0 shadow-sm rounded-4 text-center p-4 p-md-5">
                        <div className="display-2 mb-3">🏗️</div>

                        <h3 className="fw-bold" style={{ color: "#17365D" }}>
                            Your first project starts here
                        </h3>

                        <p className="text-secondary mx-auto" style={{ maxWidth: "500px" }}>
                            You haven't created any projects yet. Create your first
                            project to start receiving bids from contractors.
                        </p>

                        <div>
                            <Link
                                to="/customer/create-project"
                                className="btn text-white rounded-3 px-4 py-2 mt-2"
                                style={{ backgroundColor: "#F97316" }}
                            >
                                + Create Your First Project
                            </Link>
                        </div>
                    </div>
                ) : (
                    <>
                        <div className="d-flex justify-content-between align-items-center mb-3">
                            <h4 className="fw-bold mb-0" style={{ color: "#17365D" }}>
                                Your Projects
                            </h4>
                            <span className="text-secondary small">
                                {projects.length} project{projects.length !== 1 ? "s" : ""}
                            </span>
                        </div>

                        <div className="row g-4">
                            {projects.map((project) => (
                                <div className="col-12 col-md-6 col-xl-4" key={project.id}>
                                    <div
                                        className="card h-100 border-0 rounded-4"
                                        style={{
                                            boxShadow: "0 8px 28px rgba(23, 54, 93, 0.08)"
                                        }}
                                    >
                                        <div className="card-body p-4 d-flex flex-column">
                                            <div className="d-flex justify-content-between align-items-start gap-2 mb-3">
                                                <div
                                                    className="rounded-3 d-flex align-items-center justify-content-center"
                                                    style={{
                                                        backgroundColor: "#EFF6FF",
                                                        width: "46px",
                                                        height: "46px",
                                                        fontSize: "23px",
                                                        flexShrink: 0
                                                    }}
                                                >
                                                    🏠
                                                </div>

                                                <span
                                                    className="badge rounded-pill px-3 py-2"
                                                    style={getStatusStyle(project.status)}
                                                >
                                                    {(project.status || "UNKNOWN").replace("_", " ")}
                                                </span>
                                            </div>

                                            <h5 className="fw-bold mb-2" style={{ color: "#17365D" }}>
                                                {project.title}
                                            </h5>

                                            <p
                                                className="text-secondary mb-4"
                                                style={{
                                                    whiteSpace: "pre-line",
                                                    overflowWrap: "anywhere"
                                                }}
                                            >
                                                {project.description}
                                            </p>

                                            <div className="rounded-3 p-3 mb-3" style={{ backgroundColor: "#F8FAFC" }}>
                                                <p className="text-secondary small mb-1">
                                                    Estimated Budget
                                                </p>
                                                <h4 className="fw-bold mb-0" style={{ color: "#17365D" }}>
                                                    ₹{Number(project.budget).toLocaleString("en-IN")}
                                                </h4>
                                            </div>

                                            <div className="d-flex align-items-start gap-2 mb-4">
                                                <span>📍</span>
                                                <div>
                                                    <small className="text-secondary d-block">
                                                        Project Location
                                                    </small>
                                                    <span className="fw-semibold">
                                                        {project.location}
                                                    </span>
                                                </div>
                                            </div>


                                            <div className="mt-auto">
                                                {project.status === "COMPLETION_REQUESTED" && (
                                                    <div className="alert alert-warning rounded-3 mb-3">
                                                        <strong>Construction Completion Requested</strong>
                                                        <p className="small mb-0 mt-1">
                                                            The contractor says the work is finished.
                                                            Please verify the work before accepting.
                                                        </p>

                                                        <div className="d-grid gap-2 mt-3">
                                                            <button
                                                                type="button"
                                                                className="btn btn-success rounded-3 fw-semibold"
                                                                onClick={() => respondToCompletion(project, true)}
                                                                disabled={completionLoadingId === project.id}
                                                            >
                                                                {completionLoadingId === project.id
                                                                    ? "Processing..."
                                                                    : "✓ Accept Completion"}
                                                            </button>

                                                            <button
                                                                type="button"
                                                                className="btn btn-outline-danger rounded-3 fw-semibold"
                                                                onClick={() => respondToCompletion(project, false)}
                                                                disabled={completionLoadingId === project.id}
                                                            >
                                                                Reject Completion
                                                            </button>
                                                        </div>
                                                    </div>
                                                )}

                                                {project.status === "COMPLETED" && (
                                                    <div className="alert alert-success rounded-3 mb-3">
                                                        <strong>✓ Project Completed Successfully</strong>
                                                        <p className="small mb-0 mt-1">
                                                            You have accepted the contractor's completion request.
                                                        </p>
                                                    </div>
                                                )}

                                                {completionMessage[project.id] && (
                                                    <div
                                                        className={`alert ${
                                                            completionMessage[project.id].startsWith("Unable")
                                                                ? "alert-danger"
                                                                : "alert-success"
                                                        } rounded-3 mb-3`}
                                                        role="status"
                                                    >
                                                        {completionMessage[project.id]}
                                                    </div>
                                                )}

                                                <Link
                                                    to={`/customer/projects/${project.id}/bids`}
                                                    className="btn w-100 rounded-3 fw-semibold text-white"
                                                    style={{ backgroundColor: "#17365D" }}
                                                >
                                                    View Bids →
                                                </Link>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

export default MyProjects;
