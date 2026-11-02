
import { Link } from "react-router-dom";

function Home() {
    return (
        <div className="nirmaan-home">
            {/* Navigation */}
            <nav className="navbar navbar-expand-lg bg-white shadow-sm py-3">
                <div className="container">
                    <Link
                        className="navbar-brand fw-bold fs-3"
                        to="/"
                        style={{ color: "#17365D" }}
                    >
                        Nirmaan<span style={{ color: "#F97316" }}>X</span>
                        <div className="text-secondary" style={{ fontSize: "11px" }}>
                            BUILD WITH TRUST
                        </div>
                    </Link>

                    <div className="d-flex gap-2">
                        <Link to="/login" className="btn btn-outline-primary px-4">
                            Login
                        </Link>
                        <Link
                            to="/register"
                            className="btn text-white px-4"
                            style={{ backgroundColor: "#F97316" }}
                        >
                            Register
                        </Link>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section
                className="py-5"
                style={{
                    background:
                        "linear-gradient(120deg, #EFF6FF 0%, #FFFFFF 55%, #FFF7ED 100%)"
                }}
            >
                <div className="container py-lg-5">
                    <div className="row align-items-center g-5">
                        <div className="col-lg-7">
                            <span className="badge rounded-pill bg-primary-subtle text-primary px-3 py-2 mb-3">
                                YOUR CONSTRUCTION PARTNER
                            </span>

                            <h1
                                className="fw-bold display-3 mb-4"
                                style={{ color: "#17365D" }}
                            >
                                Build Your Dream with{" "}
                                <span style={{ color: "#F97316" }}>
                                    NirmaanX
                                </span>
                            </h1>

                            <p className="fs-5 text-secondary mb-4">
                                Connect with contractors, post construction
                                projects, compare competitive bids, and bring
                                your ideas to life — all in one place.
                            </p>

                            <div className="d-flex flex-wrap gap-3">
                                <Link
                                    to="/register"
                                    className="btn btn-lg text-white px-4 py-3"
                                    style={{ backgroundColor: "#F97316" }}
                                >
                                    Get Started →
                                </Link>

                                <Link
                                    to="/login"
                                    className="btn btn-lg btn-outline-primary px-4 py-3"
                                >
                                    Login to Your Account
                                </Link>
                            </div>

                            <div className="row mt-5 g-3">
                                <div className="col-4">
                                    <div className="fw-bold text-primary">
                                        Trusted
                                    </div>
                                    <small className="text-secondary">
                                        Contractor network
                                    </small>
                                </div>
                                <div className="col-4">
                                    <div className="fw-bold text-primary">
                                        Transparent
                                    </div>
                                    <small className="text-secondary">
                                        Competitive bidding
                                    </small>
                                </div>
                                <div className="col-4">
                                    <div className="fw-bold text-primary">
                                        Secure
                                    </div>
                                    <small className="text-secondary">
                                        Role-based access
                                    </small>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-5">
                            <div
                                className="rounded-4 p-4 p-lg-5 shadow"
                                style={{
                                    background:
                                        "linear-gradient(145deg, #17365D, #2563EB)",
                                    color: "white",
                                    minHeight: "350px"
                                }}
                            >
                                <div style={{ fontSize: "70px" }}>🏗️</div>

                                <h2 className="fw-bold mt-3">
                                    Every Project.
                                    <br />
                                    One Platform.
                                </h2>

                                <p className="mt-3 mb-4" style={{ color: "#DBEAFE" }}>
                                    From project creation to contractor selection,
                                    manage your construction journey with confidence.
                                </p>

                                <div className="bg-white bg-opacity-10 rounded-3 p-3">
                                    <div className="fw-semibold">
                                        Your vision. Your project. Your NirmaanX.
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features */}
            <section className="py-5 bg-white">
                <div className="container py-3">
                    <div className="text-center mb-5">
                        <h2 className="fw-bold" style={{ color: "#17365D" }}>
                            Everything You Need to Build
                        </h2>
                        <p className="text-secondary">
                            A simpler way to connect customers and contractors.
                        </p>
                    </div>

                    <div className="row g-4">
                        <div className="col-md-4">
                            <div className="border rounded-4 p-4 h-100">
                                <div className="fs-1 mb-3">📋</div>
                                <h5 className="fw-bold">Post Projects</h5>
                                <p className="text-secondary mb-0">
                                    Customers can publish project requirements,
                                    budgets, and locations.
                                </p>
                            </div>
                        </div>

                        <div className="col-md-4">
                            <div className="border rounded-4 p-4 h-100">
                                <div className="fs-1 mb-3">🤝</div>
                                <h5 className="fw-bold">Compare Bids</h5>
                                <p className="text-secondary mb-0">
                                    Receive contractor bids and compare prices,
                                    timelines, and proposals.
                                </p>
                            </div>
                        </div>

                        <div className="col-md-4">
                            <div className="border rounded-4 p-4 h-100">
                                <div className="fs-1 mb-3">🔐</div>
                                <h5 className="fw-bold">Manage Securely</h5>
                                <p className="text-secondary mb-0">
                                    Role-based access helps each user manage
                                    their own construction workflow.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* How it works */}
            <section className="py-5" style={{ backgroundColor: "#F8FAFC" }}>
                <div className="container py-3 text-center">
                    <h2 className="fw-bold mb-5" style={{ color: "#17365D" }}>
                        How NirmaanX Works
                    </h2>

                    <div className="row g-4">
                        <div className="col-md-3">
                            <h3 className="text-primary">01</h3>
                            <h6 className="fw-bold">Create an Account</h6>
                            <p className="text-secondary">
                                Register for your user role.
                            </p>
                        </div>
                        <div className="col-md-3">
                            <h3 className="text-primary">02</h3>
                            <h6 className="fw-bold">Post or Find Projects</h6>
                            <p className="text-secondary">
                                Customers post jobs; contractors explore projects.
                            </p>
                        </div>
                        <div className="col-md-3">
                            <h3 className="text-primary">03</h3>
                            <h6 className="fw-bold">Submit and Compare Bids</h6>
                            <p className="text-secondary">
                                Review proposals and select the right bid.
                            </p>
                        </div>
                        <div className="col-md-3">
                            <h3 className="text-primary">04</h3>
                            <h6 className="fw-bold">Move Forward</h6>
                            <p className="text-secondary">
                                Manage your project through your dashboard.
                            </p>
                        </div>
                    </div>

                    <Link
                        to="/register"
                        className="btn btn-lg text-white px-5 mt-4"
                        style={{ backgroundColor: "#F97316" }}
                    >
                        Join NirmaanX
                    </Link>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-4 bg-white border-top">
                <div className="container text-center text-secondary">
                    © {new Date().getFullYear()} NirmaanX. Build with Trust.
                </div>
            </footer>
        </div>
    );
}

export default Home;
