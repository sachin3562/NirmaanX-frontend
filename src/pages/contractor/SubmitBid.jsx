import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import api from "../../services/api";

function SubmitBid() {
    const { projectId } = useParams();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        quotedAmount: "",
        estimatedDays: "",
        message: ""
    });

    const [message, setMessage] = useState("");
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);

    function handleChange(e) {
        const { name, value } = e.target;

        setFormData((previous) => ({
            ...previous,
            [name]: value
        }));

        setMessage("");
    }

    async function handleSubmit(e) {
        e.preventDefault();

        const amount = Number(formData.quotedAmount);
        const days = Number(formData.estimatedDays);

        if (!Number.isFinite(amount) || amount <= 0) {
            setError(true);
            setMessage("Please enter a quotation greater than zero.");
            return;
        }

        if (!Number.isInteger(days) || days <= 0) {
            setError(true);
            setMessage("Estimated completion must be a whole number of days greater than zero.");
            return;
        }

        if (!formData.message.trim()) {
            setError(true);
            setMessage("Please add a message explaining your proposal.");
            return;
        }

        setLoading(true);
        setMessage("");
        setError(false);

        try {
            const bid = {
                projectId: Number(projectId),
                quotedAmount: amount,
                estimatedDays: days,
                message: formData.message.trim()
            };

            await api.post("/bids", bid);

            setMessage("Your bid has been submitted successfully!");
            setError(false);

            setTimeout(() => {
                navigate("/contractor/projects");
            }, 1500);
        } catch (err) {
            console.error("Bid submission failed:", err);

            setError(true);
            setMessage(
                err.response?.data?.message ||
                "Failed to submit your bid. Please try again."
            );
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="submit-bid-page min-vh-100 bg-light">
            <style>{`
                .bid-navbar {
                    background: #101d35;
                }

                .bid-accent {
                    color: #ff9f43;
                }

                .bid-hero {
                    background: linear-gradient(125deg, #101d35, #254875);
                    border-radius: 20px;
                }

                .bid-form-card {
                    border: 1px solid #e8edf4;
                    border-radius: 20px;
                }

                .bid-input {
                    min-height: 48px;
                    border: 1px solid #dce3ed;
                    border-radius: 12px;
                }

                .bid-input:focus {
                    border-color: #ff9f43;
                    box-shadow: 0 0 0 0.2rem rgba(255, 159, 67, 0.17);
                }

                .bid-textarea {
                    border: 1px solid #dce3ed;
                    border-radius: 12px;
                    resize: vertical;
                }

                .bid-textarea:focus {
                    border-color: #ff9f43;
                    box-shadow: 0 0 0 0.2rem rgba(255, 159, 67, 0.17);
                }

                .bid-orange-btn {
                    background: #ff9f43;
                    border: 1px solid #ff9f43;
                    color: #17243a;
                    font-weight: 600;
                }

                .bid-orange-btn:hover {
                    background: #f28c28;
                    border-color: #f28c28;
                    color: #17243a;
                }

                .bid-info-panel {
                    background: #f3f6fa;
                    border-radius: 14px;
                }

                .bid-muted {
                    color: #68758a;
                }

                @media (max-width: 575px) {
                    .bid-hero {
                        border-radius: 16px;
                    }
                }
            `}</style>

            {/* Navigation */}
            <nav className="navbar navbar-dark bid-navbar py-3 shadow-sm">
                <div className="container">
                    <Link
                        to="/contractor/dashboard"
                        className="navbar-brand fw-bold fs-4"
                    >
                        🏗️ Nirmaan<span className="bid-accent">X</span>
                    </Link>

                    <Link
                        to="/contractor/projects"
                        className="btn btn-outline-light btn-sm rounded-pill px-3"
                    >
                        ← Available Projects
                    </Link>
                </div>
            </nav>

            <main className="container py-4 py-lg-5">
                {/* Page heading */}
                <section className="bid-hero p-4 p-md-5 mb-4 shadow-sm">
                    <span className="badge rounded-pill bg-light text-dark px-3 py-2 mb-3">
                        CONTRACTOR WORKSPACE
                    </span>

                    <h1 className="text-white fw-bold mb-3">
                        Submit Your <span className="bid-accent">Bid</span>
                    </h1>

                    <p className="text-white-50 mb-0">
                        Present your quotation and proposed timeline to the customer.
                        Make your offer clear, realistic, and professional.
                    </p>
                </section>

                <div className="row g-4 align-items-start">
                    {/* Bid form */}
                    <div className="col-12 col-lg-8">
                        <div className="card bid-form-card shadow-sm">
                            <div className="card-body p-4 p-md-5">
                                <h4 className="fw-bold mb-2" style={{ color: "#101d35" }}>
                                    Your Proposal
                                </h4>

                                <p className="bid-muted mb-4">
                                    Enter the quotation and estimated time required
                                    to complete this project.
                                </p>

                                <form onSubmit={handleSubmit}>
                                    <div className="mb-4">
                                        <label
                                            htmlFor="quotedAmount"
                                            className="form-label fw-semibold"
                                        >
                                            Your Quotation (₹)
                                        </label>

                                        <div className="input-group">
                                            <span className="input-group-text bg-light border-end-0">
                                                ₹
                                            </span>

                                            <input
                                                id="quotedAmount"
                                                type="number"
                                                name="quotedAmount"
                                                className="form-control bid-input border-start-0"
                                                placeholder="Enter your total quotation"
                                                min="0.01"
                                                step="0.01"
                                                value={formData.quotedAmount}
                                                onChange={handleChange}
                                                required
                                                disabled={loading}
                                            />
                                        </div>

                                        <div className="form-text">
                                            Enter the amount you propose for the work.
                                        </div>
                                    </div>

                                    <div className="mb-4">
                                        <label
                                            htmlFor="estimatedDays"
                                            className="form-label fw-semibold"
                                        >
                                            Estimated Completion Time
                                        </label>

                                        <div className="input-group">
                                            <input
                                                id="estimatedDays"
                                                type="number"
                                                name="estimatedDays"
                                                className="form-control bid-input"
                                                placeholder="e.g. 45"
                                                min="1"
                                                step="1"
                                                value={formData.estimatedDays}
                                                onChange={handleChange}
                                                required
                                                disabled={loading}
                                            />

                                            <span className="input-group-text">
                                                Days
                                            </span>
                                        </div>

                                        <div className="form-text">
                                            Provide a realistic completion estimate.
                                        </div>
                                    </div>

                                    <div className="mb-4">
                                        <label
                                            htmlFor="message"
                                            className="form-label fw-semibold"
                                        >
                                            Proposal Message
                                        </label>

                                        <textarea
                                            id="message"
                                            name="message"
                                            className="form-control bid-textarea"
                                            rows="5"
                                            placeholder="Describe your approach, experience, materials, or other relevant details..."
                                            value={formData.message}
                                            onChange={handleChange}
                                            required
                                            disabled={loading}
                                        />

                                        <div className="form-text">
                                            Explain why your quotation and timeline are suitable.
                                        </div>
                                    </div>

                                    {message && (
                                        <div
                                            className={`alert ${error ? "alert-danger" : "alert-success"} rounded-3`}
                                            role="status"
                                        >
                                            {message}
                                        </div>
                                    )}

                                    <div className="d-flex flex-column flex-sm-row gap-3 pt-2">
                                        <button
                                            type="submit"
                                            className="btn bid-orange-btn rounded-pill px-4 py-2"
                                            disabled={loading}
                                        >
                                            {loading ? (
                                                <>
                                                    <span
                                                        className="spinner-border spinner-border-sm me-2"
                                                        role="status"
                                                        aria-hidden="true"
                                                    />
                                                    Submitting...
                                                </>
                                            ) : (
                                                "Submit Bid →"
                                            )}
                                        </button>

                                        <Link
                                            to="/contractor/projects"
                                            className="btn btn-outline-secondary rounded-pill px-4 py-2"
                                        >
                                            Cancel
                                        </Link>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>

                    {/* Guidance panel */}
                    <div className="col-12 col-lg-4">
                        <div className="card bid-form-card shadow-sm mb-4">
                            <div className="card-body p-4">
                                <h5 className="fw-bold mb-3" style={{ color: "#101d35" }}>
                                    💡 Tips for a Strong Bid
                                </h5>

                                <div className="mb-3">
                                    <div className="fw-semibold">Be realistic</div>
                                    <p className="bid-muted small mb-0">
                                        Submit a quotation and timeline you can deliver.
                                    </p>
                                </div>

                                <div className="mb-3">
                                    <div className="fw-semibold">Explain your approach</div>
                                    <p className="bid-muted small mb-0">
                                        Describe how you plan to complete the work.
                                    </p>
                                </div>

                                <div>
                                    <div className="fw-semibold">Review before submitting</div>
                                    <p className="bid-muted small mb-0">
                                        Check your amount, estimated days, and message.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="bid-info-panel p-4">
                            <h6 className="fw-bold mb-2">Project Reference</h6>
                            <div className="bid-muted small mb-1">
                                Project ID
                            </div>
                            <div className="fw-bold fs-5" style={{ color: "#101d35" }}>
                                #{projectId}
                            </div>
                            <hr />
                            <p className="bid-muted small mb-0">
                                Your bid will be associated with this project.
                                The customer can review it and decide whether to accept or reject it.
                            </p>
                        </div>
                    </div>
                </div>

                <footer className="text-center py-4">
                    <small className="bid-muted">
                        © {new Date().getFullYear()} NirmaanX · Building better
                        construction connections.
                    </small>
                </footer>
            </main>
        </div>
    );
}

export default SubmitBid;
