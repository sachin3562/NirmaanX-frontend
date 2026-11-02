import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../services/api";

function MyBids() {
    const [bids, setBids] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("ALL");
    const [deletingId, setDeletingId] = useState(null);

    useEffect(() => {
        fetchMyBids();
    }, []);

    const fetchMyBids = async () => {
        setLoading(true);
        setError("");

        try {
            const response = await api.get("/bids/my");
            setBids(response.data);
        } catch (err) {
            console.error("Error fetching my bids:", err);
            setError("Unable to load your bids. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteBid = async (bidId) => {
        const confirmed = window.confirm(
            "Are you sure you want to delete this rejected bid? This action cannot be undone."
        );

        if (!confirmed) {
            return;
        }

        setDeletingId(bidId);

        try {
            await api.delete(`/bids/${bidId}`);

            setBids((previousBids) =>
                previousBids.filter((bid) => bid.id !== bidId)
            );
        } catch (err) {
            console.error("Error deleting bid:", err);

            window.alert(
                err.response?.data?.message ||
                "Unable to delete this bid. Please try again."
            );
        } finally {
            setDeletingId(null);
        }
    };

    const getStatusClass = (status) => {
        switch (status) {
            case "PENDING":
                return "mybids-pending";
            case "ACCEPTED":
                return "mybids-accepted";
            case "REJECTED":
                return "mybids-rejected";
            default:
                return "mybids-default";
        }
    };

    const filteredBids = bids.filter((bid) => {
        const matchesStatus =
            statusFilter === "ALL" || bid.status === statusFilter;

        const searchText = search.toLowerCase();

        const matchesSearch =
            String(bid.id).includes(searchText) ||
            String(bid.projectId).includes(searchText) ||
            (bid.message || "").toLowerCase().includes(searchText) ||
            bid.status.toLowerCase().includes(searchText);

        return matchesStatus && matchesSearch;
    });

    const pendingCount = bids.filter(
        (bid) => bid.status === "PENDING"
    ).length;

    const acceptedCount = bids.filter(
        (bid) => bid.status === "ACCEPTED"
    ).length;

    const rejectedCount = bids.filter(
        (bid) => bid.status === "REJECTED"
    ).length;

    const formatAmount = (amount) =>
        Number(amount).toLocaleString("en-IN", {
            maximumFractionDigits: 2
        });

    return (
        <div className="my-bids-page min-vh-100 bg-light">
            <style>{`
                .mybids-navbar {
                    background: #101d35;
                }

                .mybids-accent {
                    color: #ff9f43;
                }

                .mybids-hero {
                    background: linear-gradient(125deg, #101d35, #254875);
                    border-radius: 22px;
                }

                .mybids-summary {
                    border: 1px solid #e8edf4;
                    border-radius: 16px;
                }

                .mybids-card {
                    border: 1px solid #e8edf4;
                    border-radius: 18px;
                    transition: transform 0.2s ease, box-shadow 0.2s ease;
                }

                .mybids-card:hover {
                    transform: translateY(-3px);
                    box-shadow: 0 12px 26px rgba(16, 29, 53, 0.08) !important;
                }

                .mybids-icon {
                    width: 52px;
                    height: 52px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    border-radius: 15px;
                    background: #fff1e3;
                    font-size: 25px;
                }

                .mybids-pending,
                .mybids-accepted,
                .mybids-rejected,
                .mybids-default {
                    display: inline-block;
                    padding: 7px 12px;
                    border-radius: 30px;
                    font-size: 11px;
                    font-weight: 700;
                    letter-spacing: 0.4px;
                }

                .mybids-pending {
                    background: #fff2cc;
                    color: #805b00;
                }

                .mybids-accepted {
                    background: #d9f5e5;
                    color: #146c43;
                }

                .mybids-rejected {
                    background: #fde2e2;
                    color: #b42318;
                }

                .mybids-default {
                    background: #e9edf3;
                    color: #46556b;
                }

                .mybids-amount-box {
                    background: #f3f6fa;
                    border-radius: 13px;
                    padding: 14px;
                }

                .mybids-muted {
                    color: #68758a;
                }

                .mybids-search {
                    min-height: 46px;
                    border-radius: 12px;
                    border: 1px solid #dce3ed;
                }

                .mybids-search:focus {
                    border-color: #ff9f43;
                    box-shadow: 0 0 0 0.2rem rgba(255, 159, 67, 0.16);
                }

                .mybids-filter.active {
                    background: #101d35;
                    border-color: #101d35;
                    color: white;
                }

                .mybids-orange-btn {
                    background: #ff9f43;
                    color: #17243a;
                    border: 1px solid #ff9f43;
                    font-weight: 600;
                }

                .mybids-orange-btn:hover {
                    background: #f28c28;
                    color: #17243a;
                    border-color: #f28c28;
                }

                @media (max-width: 575px) {
                    .mybids-hero {
                        border-radius: 17px;
                    }
                }
            `}</style>

            {/* Navigation */}
            <nav className="navbar navbar-dark mybids-navbar py-3 shadow-sm">
                <div className="container">
                    <Link
                        to="/contractor/dashboard"
                        className="navbar-brand fw-bold fs-4"
                    >
                        🏗️ Nirmaan<span className="mybids-accent">X</span>
                    </Link>

                    <div className="d-flex gap-2">
                        <Link
                            to="/contractor/projects"
                            className="btn btn-outline-light btn-sm rounded-pill px-3"
                        >
                            Browse Projects
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
                <section className="mybids-hero p-4 p-md-5 mb-4 shadow-sm">
                    <span className="badge rounded-pill bg-light text-dark px-3 py-2 mb-3">
                        CONTRACTOR WORKSPACE
                    </span>

                    <h1 className="text-white fw-bold mb-3">
                        Track Your <span className="mybids-accent">Bids</span>
                    </h1>

                    <p className="text-white-50 mb-0">
                        Review your submitted quotations, monitor decisions,
                        and keep track of your construction opportunities.
                    </p>
                </section>

                {/* Summary */}
                <div className="row g-3 mb-4">
                    <div className="col-6 col-lg-3">
                        <div className="card mybids-summary shadow-sm h-100">
                            <div className="card-body p-3 p-md-4">
                                <div className="mybids-muted small mb-2">
                                    Total Bids
                                </div>
                                <h3 className="fw-bold mb-0">
                                    {loading ? "—" : bids.length}
                                </h3>
                                <small className="mybids-muted">All submissions</small>
                            </div>
                        </div>
                    </div>

                    <div className="col-6 col-lg-3">
                        <div className="card mybids-summary shadow-sm h-100">
                            <div className="card-body p-3 p-md-4">
                                <div className="mybids-muted small mb-2">
                                    Pending
                                </div>
                                <h3 className="fw-bold mb-0 text-warning">
                                    {loading ? "—" : pendingCount}
                                </h3>
                                <small className="mybids-muted">Awaiting decision</small>
                            </div>
                        </div>
                    </div>

                    <div className="col-6 col-lg-3">
                        <div className="card mybids-summary shadow-sm h-100">
                            <div className="card-body p-3 p-md-4">
                                <div className="mybids-muted small mb-2">
                                    Accepted
                                </div>
                                <h3 className="fw-bold mb-0 text-success">
                                    {loading ? "—" : acceptedCount}
                                </h3>
                                <small className="mybids-muted">Successful bids</small>
                            </div>
                        </div>
                    </div>

                    <div className="col-6 col-lg-3">
                        <div className="card mybids-summary shadow-sm h-100">
                            <div className="card-body p-3 p-md-4">
                                <div className="mybids-muted small mb-2">
                                    Rejected
                                </div>
                                <h3 className="fw-bold mb-0 text-danger">
                                    {loading ? "—" : rejectedCount}
                                </h3>
                                <small className="mybids-muted">Not selected</small>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Search and filters */}
                <section className="bg-white rounded-4 shadow-sm p-3 p-md-4 mb-4">
                    <div className="row g-3 align-items-end">
                        <div className="col-12 col-lg-6">
                            <label
                                htmlFor="bid-search"
                                className="form-label fw-semibold"
                            >
                                Search your bids
                            </label>

                            <input
                                id="bid-search"
                                type="search"
                                className="form-control mybids-search"
                                placeholder="Search bid ID, project ID, message, or status..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                        </div>

                        <div className="col-12 col-lg-6">
                            <label className="form-label fw-semibold">
                                Filter by status
                            </label>

                            <div className="d-flex flex-wrap gap-2">
                                {["ALL", "PENDING", "ACCEPTED", "REJECTED"].map(
                                    (status) => (
                                        <button
                                            key={status}
                                            type="button"
                                            className={`btn btn-sm rounded-pill px-3 mybids-filter ${
                                                statusFilter === status
                                                    ? "active"
                                                    : "btn-outline-secondary"
                                            }`}
                                            onClick={() => setStatusFilter(status)}
                                        >
                                            {status === "ALL" ? "All Bids" : status}
                                        </button>
                                    )
                                )}
                            </div>
                        </div>
                    </div>
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
                        <h5 className="fw-semibold">Loading your bids...</h5>
                        <p className="mybids-muted mb-0">
                            Please wait while we retrieve your submissions.
                        </p>
                    </div>
                )}

                {/* Error */}
                {!loading && error && (
                    <div className="alert alert-danger rounded-4 p-4">
                        <h5 className="fw-bold">Unable to load your bids</h5>
                        <p>{error}</p>
                        <button
                            type="button"
                            className="btn btn-danger rounded-pill px-4"
                            onClick={fetchMyBids}
                        >
                            Try Again
                        </button>
                    </div>
                )}

                {/* Empty state */}
                {!loading && !error && bids.length === 0 && (
                    <div className="bg-white rounded-4 shadow-sm text-center p-4 p-md-5">
                        <div className="display-4 mb-3">📋</div>
                        <h4 className="fw-bold">You haven't submitted any bids yet</h4>
                        <p className="mybids-muted mb-4">
                            Browse open construction projects and submit your first quotation.
                        </p>
                        <Link
                            to="/contractor/projects"
                            className="btn mybids-orange-btn rounded-pill px-4 py-2"
                        >
                            Explore Projects →
                        </Link>
                    </div>
                )}

                {/* Filtered empty state */}
                {!loading && !error && bids.length > 0 && filteredBids.length === 0 && (
                    <div className="bg-white rounded-4 shadow-sm text-center p-4">
                        <h5 className="fw-bold">No matching bids found</h5>
                        <p className="mybids-muted">
                            Try a different search term or status filter.
                        </p>
                        <button
                            type="button"
                            className="btn btn-outline-dark rounded-pill px-4"
                            onClick={() => {
                                setSearch("");
                                setStatusFilter("ALL");
                            }}
                        >
                            Clear Filters
                        </button>
                    </div>
                )}

                {/* Bid cards */}
                {!loading && !error && filteredBids.length > 0 && (
                    <>
                        <div className="d-flex justify-content-between align-items-center mb-3">
                            <h4 className="fw-bold mb-0" style={{ color: "#101d35" }}>
                                Your Submissions
                            </h4>
                            <span className="mybids-muted small">
                                {filteredBids.length} result{filteredBids.length !== 1 ? "s" : ""}
                            </span>
                        </div>

                        <div className="row g-4">
                            {filteredBids.map((bid) => (
                                <div className="col-12 col-lg-6" key={bid.id}>
                                    <div className="card mybids-card h-100 shadow-sm">
                                        <div className="card-body p-4">
                                            <div className="d-flex justify-content-between align-items-start gap-3 mb-4">
                                                <div className="d-flex align-items-center gap-3">
                                                    <div className="mybids-icon">📋</div>
                                                    <div>
                                                        <div className="mybids-muted small">
                                                            BID REFERENCE
                                                        </div>
                                                        <h5 className="fw-bold mb-0">
                                                            Bid #{bid.id}
                                                        </h5>
                                                    </div>
                                                </div>

                                                <span className={getStatusClass(bid.status)}>
                                                    {bid.status}
                                                </span>
                                            </div>

                                            <div className="mb-3">
                                                <div className="mybids-muted small">
                                                    Project Reference
                                                </div>
                                                <div className="fw-semibold">
                                                    Project #{bid.projectId}
                                                </div>
                                            </div>

                                            <div className="mybids-amount-box mb-3">
                                                <div className="mybids-muted small mb-1">
                                                    Your Quotation
                                                </div>
                                                <div className="fw-bold fs-3">
                                                    <span className="mybids-accent">₹</span>
                                                    {formatAmount(bid.quotedAmount)}
                                                </div>
                                            </div>

                                            <div className="row g-3 mb-3">
                                                <div className="col-12 col-sm-6">
                                                    <div className="mybids-muted small">
                                                        Estimated Completion
                                                    </div>
                                                    <div className="fw-semibold">
                                                        🗓️ {bid.estimatedDays} days
                                                    </div>
                                                </div>

                                                <div className="col-12 col-sm-6">
                                                    <div className="mybids-muted small">
                                                        Current Status
                                                    </div>
                                                    <div className="fw-semibold">
                                                        {bid.status === "PENDING" && "Awaiting decision"}
                                                        {bid.status === "ACCEPTED" && "Bid accepted"}
                                                        {bid.status === "REJECTED" && "Bid not selected"}
                                                        {!["PENDING", "ACCEPTED", "REJECTED"].includes(bid.status) && bid.status}
                                                    </div>
                                                </div>
                                            </div>

                                            <hr />

                                            <div className="mybids-muted small mb-1">
                                                Your Proposal Message
                                            </div>
                                            <p className="mb-4" style={{ whiteSpace: "pre-wrap", overflowWrap: "anywhere" }}>
                                                {bid.message || "No message provided."}
                                            </p>

                                            {bid.status === "ACCEPTED" && (
                                                <div className="alert alert-success py-2 small mb-3">
                                                    Congratulations! Your bid was accepted.
                                                    Check your won projects for further details.
                                                </div>
                                            )}

                                            {bid.status === "REJECTED" && (
                                                <button
                                                    type="button"
                                                    className="btn btn-outline-danger rounded-pill px-3"
                                                    onClick={() => handleDeleteBid(bid.id)}
                                                    disabled={deletingId === bid.id}
                                                >
                                                    {deletingId === bid.id
                                                        ? "Deleting..."
                                                        : "🗑️ Delete Rejected Bid"}
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </>
                )}

                <footer className="text-center py-4 mt-3">
                    <small className="mybids-muted">
                        © {new Date().getFullYear()} NirmaanX · Building better construction connections.
                    </small>
                </footer>
            </main>
        </div>
    );
}

export default MyBids;
