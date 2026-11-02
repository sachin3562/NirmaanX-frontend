
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import api from "../../services/api";

function ProjectBids() {
    const { projectId } = useParams();

    const [bids, setBids] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [updatingBidId, setUpdatingBidId] = useState(null);

    useEffect(() => {
        fetchBids();
    }, [projectId]);

    async function fetchBids() {
        try {
            setError("");
            const response = await api.get(`/bids/project/${projectId}`);
            setBids(response.data);
        } catch (err) {
            console.error("Failed to load bids:", err);
            setError(
                err.response?.data?.message ||
                "Unable to load bids. Please try again."
            );
        } finally {
            setLoading(false);
        }
    }

    async function updateBidStatus(bidId, status) {
        try {
            setError("");
            setUpdatingBidId(bidId);

            await api.put(`/bids/${bidId}/status`, null, {
                params: { status }
            });

            await fetchBids();
        } catch (err) {
            console.error("Failed to update bid:", err);
            setError(
                err.response?.data?.message ||
                err.response?.data ||
                "Failed to update bid. Please try again."
            );
        } finally {
            setUpdatingBidId(null);
        }
    }

    function getStatusStyle(status) {
        const styles = {
            PENDING: { background: "#FEF3C7", color: "#92400E" },
            ACCEPTED: { background: "#DCFCE7", color: "#166534" },
            REJECTED: { background: "#FEE2E2", color: "#991B1B" }
        };

        return styles[status] || {
            background: "#F1F5F9",
            color: "#475569"
        };
    }

    if (loading) {
        return (
            <div
                className="min-vh-100 d-flex flex-column align-items-center justify-content-center"
                style={{ backgroundColor: "#F5F8FC" }}
            >
                <div className="spinner-border text-primary" role="status" />
                <p className="text-secondary mt-3">Loading contractor bids...</p>
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

                    <div className="d-flex gap-2">
                        <Link
                            to="/customer/projects"
                            className="btn btn-outline-primary rounded-3 px-3"
                        >
                            ← My Projects
                        </Link>
                        <Link
                            to="/customer/dashboard"
                            className="btn btn-outline-secondary rounded-3 px-3"
                        >
                            Dashboard
                        </Link>
                    </div>
                </div>

                {/* Page title */}
                <div className="mb-4">
                    <span
                        className="badge rounded-pill px-3 py-2 mb-3"
                        style={{
                            backgroundColor: "#DBEAFE",
                            color: "#1D4ED8"
                        }}
                    >
                        CONTRACTOR PROPOSALS
                    </span>

                    <h1 className="fw-bold display-6" style={{ color: "#17365D" }}>
                        Contractor Bids
                    </h1>

                    <p className="text-secondary fs-5 mb-0">
                        Compare contractor quotations, review their proposals,
                        and choose the right bid for your project.
                    </p>
                </div>

                {/* Summary */}
                <div className="row g-3 mb-4">
                    <div className="col-12 col-sm-4">
                        <div className="card border-0 rounded-4 shadow-sm h-100">
                            <div className="card-body p-4">
                                <p className="text-secondary mb-1">Total Bids</p>
                                <h3 className="fw-bold mb-0" style={{ color: "#17365D" }}>
                                    {bids.length}
                                </h3>
                            </div>
                        </div>
                    </div>

                    <div className="col-12 col-sm-4">
                        <div className="card border-0 rounded-4 shadow-sm h-100">
                            <div className="card-body p-4">
                                <p className="text-secondary mb-1">Pending Review</p>
                                <h3 className="fw-bold mb-0" style={{ color: "#B45309" }}>
                                    {bids.filter((bid) => bid.status === "PENDING").length}
                                </h3>
                            </div>
                        </div>
                    </div>

                    <div className="col-12 col-sm-4">
                        <div className="card border-0 rounded-4 shadow-sm h-100">
                            <div className="card-body p-4">
                                <p className="text-secondary mb-1">Accepted</p>
                                <h3 className="fw-bold mb-0" style={{ color: "#15803D" }}>
                                    {bids.filter((bid) => bid.status === "ACCEPTED").length}
                                </h3>
                            </div>
                        </div>
                    </div>
                </div>

                {error && (
                    <div className="alert alert-danger rounded-3" role="alert">
                        {error}
                    </div>
                )}

                {/* Bid list */}
                {bids.length === 0 ? (
                    <div className="card border-0 rounded-4 shadow-sm text-center p-4 p-md-5">
                        <div className="display-2 mb-3">🤝</div>
                        <h3 className="fw-bold" style={{ color: "#17365D" }}>
                            No bids yet
                        </h3>
                        <p className="text-secondary mb-4">
                            Contractors haven't submitted bids for this project yet.
                            Check back later for new proposals.
                        </p>
                        <div>
                            <Link
                                to="/customer/projects"
                                className="btn btn-outline-primary rounded-3 px-4"
                            >
                                Back to My Projects
                            </Link>
                        </div>
                    </div>
                ) : (
                    <div className="row g-4">
                        {bids.map((bid) => (
                            <div className="col-12 col-md-6 col-xl-4" key={bid.id}>
                                <div
                                    className="card h-100 border-0 rounded-4"
                                    style={{
                                        boxShadow: "0 8px 28px rgba(23, 54, 93, 0.08)"
                                    }}
                                >
                                    <div className="card-body p-4 d-flex flex-column">

                                        <div className="d-flex justify-content-between align-items-start gap-2 mb-3">
                                            <div className="d-flex align-items-center gap-3">
                                                <div
                                                    className="rounded-circle d-flex align-items-center justify-content-center"
                                                    style={{
                                                        width: "52px",
                                                        height: "52px",
                                                        backgroundColor: "#DBEAFE",
                                                        fontSize: "25px",
                                                        flexShrink: 0
                                                    }}
                                                >
                                                    👷
                                                </div>

                                                <div>
                                                    <h5
                                                        className="fw-bold mb-1"
                                                        style={{
                                                            color: "#17365D",
                                                            overflowWrap: "anywhere"
                                                        }}
                                                    >
                                                        {bid.contractorName}
                                                    </h5>
                                                    <small className="text-secondary">
                                                        Contractor
                                                    </small>
                                                </div>
                                            </div>

                                            <span
                                                className="badge rounded-pill px-2 py-2"
                                                style={getStatusStyle(bid.status)}
                                            >
                                                {bid.status}
                                            </span>
                                        </div>

                                        <hr className="my-2" />

                                        <div
                                            className="rounded-3 p-3 my-3"
                                            style={{ backgroundColor: "#F8FAFC" }}
                                        >
                                            <small className="text-secondary d-block mb-1">
                                                Quoted Amount
                                            </small>
                                            <h3 className="fw-bold mb-0" style={{ color: "#17365D" }}>
                                                ₹{Number(bid.quotedAmount).toLocaleString("en-IN")}
                                            </h3>

                                            <div className="mt-3">
                                                <small className="text-secondary d-block mb-1">
                                                    Estimated Completion
                                                </small>
                                                <span className="fw-semibold">
                                                    ⏱️ {bid.estimatedDays} days
                                                </span>
                                            </div>
                                        </div>

                                        <div className="mb-3">
                                            <p className="fw-semibold mb-2" style={{ color: "#17365D" }}>
                                                Contact Details
                                            </p>

                                            <p className="small mb-2" style={{ overflowWrap: "anywhere" }}>
                                                <span className="me-2">📧</span>
                                                {bid.contractorEmail || "Email not provided"}
                                            </p>

                                            <p className="small mb-2">
                                                <span className="me-2">📞</span>
                                                {bid.contractorPhone || "Phone not provided"}
                                            </p>

                                            <p className="small mb-0">
                                                <span className="me-2">📍</span>
                                                {[bid.contractorCity, bid.contractorState]
                                                    .filter(Boolean)
                                                    .join(", ") || "Location not provided"}
                                            </p>
                                        </div>

                                        <div className="mb-4">
                                            <p className="fw-semibold mb-2" style={{ color: "#17365D" }}>
                                                Contractor's Message
                                            </p>
                                            <p
                                                className="text-secondary small mb-0"
                                                style={{
                                                    whiteSpace: "pre-line",
                                                    overflowWrap: "anywhere"
                                                }}
                                            >
                                                {bid.message || "No additional message provided."}
                                            </p>
                                        </div>

                                        <div className="mt-auto">
                                            <div className="d-flex flex-wrap gap-2 mb-3">
                                                {bid.contractorPhone && (
                                                    <a
                                                        href={`tel:${bid.contractorPhone}`}
                                                        className="btn btn-outline-success rounded-3 flex-fill"
                                                    >
                                                        📞 Call
                                                    </a>
                                                )}

                                                {bid.contractorEmail && (
                                                    <a
                                                        href={`mailto:${bid.contractorEmail}`}
                                                        className="btn btn-outline-primary rounded-3 flex-fill"
                                                    >
                                                        ✉ Email
                                                    </a>
                                                )}
                                            </div>

                                            {bid.status === "PENDING" && (
                                                <div className="d-flex gap-2">
                                                    <button
                                                        className="btn text-white rounded-3 flex-fill fw-semibold"
                                                        style={{ backgroundColor: "#15803D" }}
                                                        disabled={updatingBidId !== null}
                                                        onClick={() => updateBidStatus(bid.id, "ACCEPTED")}
                                                    >
                                                        {updatingBidId === bid.id
                                                            ? "Updating..."
                                                            : "✓ Accept"}
                                                    </button>

                                                    <button
                                                        className="btn btn-outline-danger rounded-3 flex-fill fw-semibold"
                                                        disabled={updatingBidId !== null}
                                                        onClick={() => updateBidStatus(bid.id, "REJECTED")}
                                                    >
                                                        {updatingBidId === bid.id
                                                            ? "Updating..."
                                                            : "✕ Reject"}
                                                    </button>
                                                </div>
                                            )}

                                            {bid.status === "ACCEPTED" && (
                                                <div className="alert alert-success rounded-3 mb-0 py-2 text-center">
                                                    ✓ This bid has been accepted
                                                </div>
                                            )}

                                            {bid.status === "REJECTED" && (
                                                <div className="text-secondary small text-center">
                                                    This bid was rejected
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default ProjectBids;
