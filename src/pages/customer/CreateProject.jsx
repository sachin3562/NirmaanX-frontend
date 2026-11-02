
import { useState } from "react";
import { Link } from "react-router-dom";
import api from "../../services/api";

function CreateProject() {
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        budget: "",
        location: ""
    });

    const [message, setMessage] = useState("");
    const [isError, setIsError] = useState(false);
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

            const response = await api.post("/projects", {
                title: formData.title,
                description: formData.description,
                budget: Number(formData.budget),
                location: formData.location
            });

            console.log("Project Created:", response.data);

            setMessage("Project created successfully!");
            setFormData({
                title: "",
                description: "",
                budget: "",
                location: ""
            });
        } catch (error) {
            console.error("Project creation failed:", error);

            setIsError(true);
            setMessage(
                error.response?.data?.message ||
                "Failed to create project. Please try again."
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

                {/* Header */}
                <div className="d-flex flex-wrap justify-content-between align-items-center gap-3 mb-4">
                    <div>
                        <Link
                            to="/customer/dashboard"
                            className="text-decoration-none fw-bold fs-3"
                            style={{ color: "#17365D" }}
                        >
                            Nirmaan<span style={{ color: "#F97316" }}>X</span>
                        </Link>
                        <p className="text-secondary mb-0">
                            BUILD WITH TRUST
                        </p>
                    </div>

                    <Link
                        to="/customer/projects"
                        className="btn btn-outline-primary rounded-3 px-4"
                    >
                        ← My Projects
                    </Link>
                </div>

                <div className="row justify-content-center align-items-start g-4">

                    {/* Form */}
                    <div className="col-12 col-lg-7">
                        <div
                            className="card border-0 rounded-4 p-4 p-md-5"
                            style={{
                                boxShadow: "0 15px 50px rgba(23, 54, 93, 0.10)"
                            }}
                        >
                            <div className="mb-4">
                                <span
                                    className="badge rounded-pill px-3 py-2 mb-3"
                                    style={{
                                        backgroundColor: "#DBEAFE",
                                        color: "#1D4ED8"
                                    }}
                                >
                                    NEW CONSTRUCTION PROJECT
                                </span>

                                <h2
                                    className="fw-bold"
                                    style={{ color: "#17365D" }}
                                >
                                    Create Your Project
                                </h2>

                                <p className="text-secondary mb-0">
                                    Share your requirements to help contractors
                                    understand your project and submit their bids.
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
                                <div className="mb-4">
                                    <label
                                        htmlFor="title"
                                        className="form-label fw-semibold"
                                    >
                                        Project Title
                                    </label>

                                    <input
                                        id="title"
                                        type="text"
                                        name="title"
                                        className={inputClass}
                                        placeholder="e.g. Residential House Construction"
                                        value={formData.title}
                                        onChange={handleChange}
                                        required
                                    />

                                    <div className="form-text">
                                        Choose a short, descriptive title.
                                    </div>
                                </div>

                                <div className="mb-4">
                                    <label
                                        htmlFor="description"
                                        className="form-label fw-semibold"
                                    >
                                        Project Description
                                    </label>

                                    <textarea
                                        id="description"
                                        name="description"
                                        className="form-control rounded-3"
                                        rows="5"
                                        placeholder="Describe the construction work, requirements, and important details..."
                                        value={formData.description}
                                        onChange={handleChange}
                                        required
                                    />

                                    <div className="form-text">
                                        Include enough detail for contractors to
                                        understand your requirements.
                                    </div>
                                </div>

                                <div className="row g-3">
                                    <div className="col-md-6 mb-3">
                                        <label
                                            htmlFor="budget"
                                            className="form-label fw-semibold"
                                        >
                                            Estimated Budget (₹)
                                        </label>

                                        <input
                                            id="budget"
                                            type="number"
                                            name="budget"
                                            className={inputClass}
                                            placeholder="Enter budget"
                                            value={formData.budget}
                                            onChange={handleChange}
                                            min="1"
                                            step="any"
                                            required
                                        />
                                    </div>

                                    <div className="col-md-6 mb-3">
                                        <label
                                            htmlFor="location"
                                            className="form-label fw-semibold"
                                        >
                                            Project Location
                                        </label>

                                        <input
                                            id="location"
                                            type="text"
                                            name="location"
                                            className={inputClass}
                                            placeholder="City or area"
                                            value={formData.location}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="d-flex flex-wrap gap-3 mt-3">
                                    <button
                                        type="submit"
                                        className="btn btn-lg text-white rounded-3 px-4 fw-semibold"
                                        style={{ backgroundColor: "#F97316" }}
                                        disabled={loading}
                                    >
                                        {loading ? "Creating Project..." : "Create Project"}
                                    </button>

                                    <Link
                                        to="/customer/dashboard"
                                        className="btn btn-lg btn-outline-secondary rounded-3 px-4"
                                    >
                                        Cancel
                                    </Link>
                                </div>
                            </form>
                        </div>
                    </div>

                    {/* Information panel */}
                    <div className="col-12 col-lg-5">
                        <div
                            className="rounded-4 p-4 p-md-5 text-white"
                            style={{
                                background: "linear-gradient(145deg, #17365D, #2563EB)"
                            }}
                        >
                            <div className="display-3 mb-3">🏗️</div>

                            <h3 className="fw-bold">
                                Build with confidence
                            </h3>

                            <p style={{ color: "#DBEAFE" }}>
                                A clear project description helps contractors
                                understand your needs and prepare relevant bids.
                            </p>

                            <hr className="border-light opacity-25 my-4" />

                            <h6 className="fw-bold mb-3">Before you submit</h6>

                            <div className="d-flex gap-3 mb-3">
                                <span>✓</span>
                                <span>Give your project a clear title.</span>
                            </div>

                            <div className="d-flex gap-3 mb-3">
                                <span>✓</span>
                                <span>Explain the work and requirements.</span>
                            </div>

                            <div className="d-flex gap-3 mb-3">
                                <span>✓</span>
                                <span>Enter your estimated budget.</span>
                            </div>

                            <div className="d-flex gap-3">
                                <span>✓</span>
                                <span>Provide the project location.</span>
                            </div>

                            <div
                                className="rounded-3 p-3 mt-4"
                                style={{ backgroundColor: "rgba(255,255,255,0.10)" }}
                            >
                                <small style={{ color: "#DBEAFE" }}>
                                    Your project will be submitted to NirmaanX
                                    for management through your customer dashboard.
                                </small>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default CreateProject;
