import {
  Routes,
  Route,
  Navigate,
  Link,
  useNavigate,
} from "react-router-dom";
import { useAuth } from "./AuthContext";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Discover from "./pages/Discover";
import DiscoverResults from "./pages/DiscoverResults";
import Resume from "./pages/Resume";
import JobFit from "./pages/JobFit";
import "./App.css";


function ProtectedRoute({ children }) {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return null;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
}


function SkillixLogo({ className = "" }) {
  return (
    <span className={`skillix-logo ${className}`}>
      SKILLI<span>X</span>
    </span>
  );
}

function LandingPage() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleDiscover = () => {
    navigate(isAuthenticated ? "/discover" : "/signup");
  };

  const handleResume = () => {
    navigate(isAuthenticated ? "/resume" : "/signup");
  };

  const handleJobFit = () => {
    navigate(isAuthenticated ? "/job-fit" : "/signup");
  };

  return (
    <div className="landing-page">
      {/* NAVBAR */}
      <nav className="landing-nav">
        <Link to="/" className="landing-brand">
          <SkillixLogo />
        </Link>

        <div className="landing-nav-links">
          <a href="#how-it-works">How it works</a>
          <a href="#features">Features</a>
          <a href="#about">About</a>
        </div>
      </nav>

      <main>
        {/* HERO */}
        <section className="landing-hero">
          <div className="hero-background-glow hero-glow-one"></div>
          <div className="hero-background-glow hero-glow-two"></div>

          <div className="hero-copy">
            <div className="hero-badge">
              <span className="hero-badge-dot"></span>
              Career intelligence, reimagined
            </div>

            <h1 className="hero-title">
              <span className="hero-black">
                Discover the role
              </span>

              <span className="hero-purple">
                that's already yours.
              </span>
            </h1>

            <p className="hero-description">
              Your skills, education, experience, and interests
              come together to reveal where you fit best.
            </p>

            <div className="hero-keywords">
              <span>Skills</span>
              <span>Education</span>
              <span>Experience</span>
              <span>Interests</span>
            </div>

            <div className="hero-auth-buttons">
              <Link
                to="/login"
                className="hero-login-button"
              >
                Log in
                <span>↗</span>
              </Link>

              <Link
                to="/signup"
                className="hero-signup-button"
              >
                Sign up
                <span>↗</span>
              </Link>
            </div>

            <p className="hero-note">
              One profile. Multiple possibilities.
            </p>
          </div>

          {/* CONSTELLATION */}
          <div className="constellation-wrapper">
            <div className="constellation">
              <div className="constellation-glow"></div>

              <div className="constellation-ring ring-one"></div>
              <div className="constellation-ring ring-two"></div>
              <div className="constellation-ring ring-three"></div>

              <div className="constellation-line line-top"></div>
              <div className="constellation-line line-right-top"></div>
              <div className="constellation-line line-right-bottom"></div>
              <div className="constellation-line line-bottom"></div>
              <div className="constellation-line line-left-bottom"></div>
              <div className="constellation-line line-left-top"></div>
              <div className="constellation-line line-diagonal-one"></div>
              <div className="constellation-line line-diagonal-two"></div>

              <span className="constellation-star star-one"></span>
              <span className="constellation-star star-two"></span>
              <span className="constellation-star star-three"></span>
              <span className="constellation-star star-four"></span>
              <span className="constellation-star star-five"></span>
              <span className="constellation-star star-six"></span>
              <span className="constellation-star star-seven"></span>
              <span className="constellation-star star-eight"></span>

              <div className="constellation-center">
                <div className="center-halo"></div>

                <div className="center-circle">
                  <SkillixLogo />
                  <small>YOUR PROFILE</small>
                </div>
              </div>

              <div className="constellation-node node-skills">
                <div className="node-point"></div>
                <div className="constellation-card">
                  <div className="node-icon">01</div>
                  <div>
                    <strong>Skills</strong>
                  </div>
                </div>
              </div>

              <div className="constellation-node node-education">
                <div className="node-point"></div>
                <div className="constellation-card">
                  <div className="node-icon">02</div>
                  <div>
                    <strong>Education</strong>
                  </div>
                </div>
              </div>

              <div className="constellation-node node-experience">
                <div className="node-point"></div>
                <div className="constellation-card">
                  <div className="node-icon">03</div>
                  <div>
                    <strong>Experience</strong>
                  </div>
                </div>
              </div>

              <div className="constellation-node node-interests">
                <div className="node-point"></div>
                <div className="constellation-card">
                  <div className="node-icon">04</div>
                  <div>
                    <strong>Interests</strong>
                  </div>
                </div>
              </div>

              <div className="constellation-node node-projects">
                <div className="node-point"></div>
                <div className="constellation-card">
                  <div className="node-icon">05</div>
                  <div>
                    <strong>Projects</strong>
                  </div>
                </div>
              </div>

              <div className="constellation-node node-goals">
                <div className="node-point"></div>
                <div className="constellation-card">
                  <div className="node-icon">06</div>
                  <div>
                    <strong>Goals</strong>
                  </div>
                </div>
              </div>

              <div className="constellation-node node-certifications">
                <div className="node-point"></div>
                <div className="constellation-card">
                  <div className="node-icon">07</div>
                  <div>
                    <strong>Certifications</strong>
                  </div>
                </div>
              </div>

              <div className="constellation-node node-values">
                <div className="node-point"></div>
                <div className="constellation-card">
                  <div className="node-icon">08</div>
                  <div>
                    <strong>Values</strong>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section
          id="how-it-works"
          className="process-section"
        >
          <div className="process-background-grid"></div>

          <div className="process-header">
            <div>
              <span className="process-label">
                FROM WHO YOU ARE
              </span>

              <h2>to where you fit.</h2>
            </div>

            <p>
              Skillix looks beyond a single resume.
              We connect the different pieces of your
              professional identity to find meaningful
              career direction.
            </p>
          </div>

          <div className="process-flow">
            {/* STEP 01 */}
            <div className="process-step">
              <div className="process-icon">
                <span>01</span>
                <svg
                  className="process-icon-symbol"
                  viewBox="0 0 32 32"
                  aria-hidden="true"
                >
                  <circle cx="9" cy="9" r="3" />
                  <circle cx="23" cy="9" r="3" />
                  <circle cx="9" cy="23" r="3" />
                  <circle cx="23" cy="23" r="3" />
                </svg>
              </div>

              <h3>Understand</h3>

              <p>
                Bring together your skills, education,
                experience, and interests.
              </p>
            </div>

            <div className="process-connector">
              <span></span>
            </div>

            {/* STEP 02 */}
            <div className="process-step">
              <div className="process-icon">
                <span>02</span>
                <svg
                  className="process-icon-symbol"
                  viewBox="0 0 32 32"
                  aria-hidden="true"
                >
                  <path d="M6 9h20M6 16h14M6 23h9" />
                </svg>
              </div>

              <h3>Analyze</h3>

              <p>
                Analyze your profile and identify
                meaningful career signals.
              </p>
            </div>

            <div className="process-connector">
              <span></span>
            </div>

            {/* STEP 03 */}
            <div className="process-step">
              <div className="process-icon">
                <span>03</span>
                <svg
                  className="process-icon-symbol"
                  viewBox="0 0 32 32"
                  aria-hidden="true"
                >
                  <circle cx="11" cy="16" r="7" />
                  <circle cx="21" cy="16" r="7" />
                </svg>
              </div>

              <h3>Match</h3>

              <p>
                Compare your strengths against
                careers and opportunities.
              </p>
            </div>

            <div className="process-connector">
              <span></span>
            </div>

            {/* STEP 04 */}
            <div className="process-step">
              <div className="process-icon">
                <span>04</span>
                <svg
                  className="process-icon-symbol"
                  viewBox="0 0 32 32"
                  aria-hidden="true"
                >
                  <circle cx="16" cy="16" r="9" />
                  <circle cx="16" cy="16" r="4" />
                </svg>
              </div>

              <h3>Discover</h3>

              <p>
                Find the roles and directions that
                align with who you are.
              </p>
            </div>

            <div className="process-connector">
              <span></span>
            </div>

            {/* STEP 05 */}
            <div className="process-step">
              <div className="process-icon">
                <span>05</span>
                <svg
                  className="process-icon-symbol"
                  viewBox="0 0 32 32"
                  aria-hidden="true"
                >
                  <path d="M5 16h19M18 10l7 6-7 6" />
                </svg>
              </div>

              <h3>Move</h3>

              <p>
                Turn insight into a clearer,
                more confident next step.
              </p>
            </div>
          </div>

          <div className="process-bottom-line">
            <span>PROFILE</span>
            <i></i>
            <span>INTELLIGENCE</span>
            <i></i>
            <span>DIRECTION</span>
            <i></i>
            <span>ACTION</span>
          </div>
        </section>
        {/* FEATURES */}
        <section
          id="features"
          className="features-section"
        >
          <div className="features-heading">
            <div>
              <span className="section-label">
                WHAT YOU CAN DO
              </span>

              <h2>
                <span>One profile.</span>
                <br />
                <strong>Multiple possibilities.</strong>
              </h2>
            </div>

            <p>
              Your profile becomes the foundation
              for everything you explore inside Skillix.
            </p>
          </div>

          <div className="feature-grid">
            {/* FEATURE 01 — DISCOVER MY ROLE */}
            <div className="feature-card">
              <div className="feature-visual discover-visual">
                <div className="visual-glow"></div>

                <div className="role-map-visual">
                  <div className="role-map-header">
                    <span>ROLE DISCOVERY</span>
                    <i></i>
                  </div>

                  <div className="role-map-profile">
                    <div className="role-profile-mark">
                      <span></span>
                    </div>

                    <div>
                      <strong>Your Profile</strong>
                      <small>
                        Skills + Interests + Experience
                      </small>
                    </div>
                  </div>

                  <div className="role-map-connector">
                    <span></span>
                  </div>

                  <div className="role-map-roles">
                    <div className="role-card role-card-primary">
                      <span className="role-card-dot"></span>
                      <strong>Data Analyst</strong>
                      <small>Strong alignment</small>
                    </div>

                    <div className="role-card">
                      <span className="role-card-dot"></span>
                      <strong>ML Engineer</strong>
                      <small>Potential path</small>
                    </div>

                    <div className="role-card">
                      <span className="role-card-dot"></span>
                      <strong>Product Analyst</strong>
                      <small>Potential path</small>
                    </div>
                  </div>
                </div>

                <div className="visual-mini-label">
                  ROLE MAP
                </div>
              </div>

              <div className="feature-content">
                <span className="feature-number">01</span>

                <h3>Discover My Role</h3>

                <p>
                  Find career directions that align
                  with the person you already are.
                </p>

                <button
                  type="button"
                  className="feature-action"
                  onClick={handleDiscover}
                >
                  Explore
                  <span>→</span>
                </button>
              </div>
            </div>

            {/* FEATURE 02 — ANALYZE MY RESUME */}
            <div className="feature-card">
              <div className="feature-visual resume-visual">
                <div className="visual-glow"></div>

                <div className="code-window">
                  <div className="code-topbar">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>

                  <div className="code-body">
                    <div className="code-line code-purple long"></div>
                    <div className="code-line code-white medium"></div>
                    <div className="code-line code-purple short"></div>
                    <div className="code-line code-white long"></div>
                    <div className="code-line code-purple medium"></div>
                    <div className="code-line code-white short"></div>
                    <div className="code-line code-purple long"></div>
                  </div>
                </div>

                <div className="analysis-panel">
                  <div className="analysis-header">
                    AI ANALYSIS
                  </div>

                  <div className="analysis-row">
                    <span>Skills</span>
                    <strong>Detected</strong>
                  </div>

                  <div className="analysis-row">
                    <span>Profile</span>
                    <strong>Analyzed</strong>
                  </div>

                  <div className="analysis-row">
                    <span>Career</span>
                    <strong>Matched</strong>
                  </div>
                </div>

                <div className="analysis-scan"></div>
              </div>

              <div className="feature-content">
                <span className="feature-number">02</span>

                <h3>Analyze My Resume</h3>

                <p>
                  Understand what your resume says
                  about your strengths and career direction.
                </p>

                <button
                  type="button"
                  className="feature-action"
                  onClick={handleResume}
                >
                  Analyze
                  <span>→</span>
                </button>
              </div>
            </div>

            {/* FEATURE 03 — CHECK MY JOB FIT */}
            <div className="feature-card">
              <div className="feature-visual job-visual">
                <div className="visual-glow"></div>

                <div className="job-dashboard">
                  <div className="job-dashboard-header">
                    <span>MATCH ENGINE</span>
                    <i></i>
                  </div>

                  <div className="match-score">
                    <strong>92</strong>
                    <span>%</span>
                  </div>

                  <div className="match-label">
                    MATCH SCORE
                  </div>

                  <div className="match-bars">
                    <div>
                      <span>Skills</span>
                      <i>
                        <b style={{ width: "92%" }}></b>
                      </i>
                    </div>

                    <div>
                      <span>Experience</span>
                      <i>
                        <b style={{ width: "76%" }}></b>
                      </i>
                    </div>

                    <div>
                      <span>Role</span>
                      <i>
                        <b style={{ width: "87%" }}></b>
                      </i>
                    </div>
                  </div>
                </div>

                <div className="job-floating-chip">
                  <span>✓</span>
                  PROFILE MATCHED
                </div>
              </div>

              <div className="feature-content">
                <span className="feature-number">03</span>

                <h3>Check My Job Fit</h3>

                <p>
                  Compare your profile against a real
                  opportunity before you make your move.
                </p>

                <button
                  type="button"
                  className="feature-action"
                  onClick={handleJobFit}
                >
                  Check fit
                  <span>→</span>
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* ABOUT / CTA */}
        <section
          id="about"
          className="about-section"
        >
          <div className="about-glow"></div>

          <span className="section-label">
            YOUR NEXT MOVE STARTS HERE
          </span>

          <h2>
            You already have
            <br />
            <span>
              more potential than you think.
            </span>
          </h2>

          <p>
            Let's find where it fits.
          </p>

          <div className="about-buttons">
            <Link
              to="/login"
              className="about-login"
            >
              Log in
              <span>↗</span>
            </Link>

            <Link
              to="/signup"
              className="about-signup"
            >
              Sign up
              <span>↗</span>
            </Link>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="landing-footer">
        <div className="footer-brand">
          <SkillixLogo />

          <p>
            Discover the role that's already yours.
          </p>
        </div>

        <div className="footer-links">
          <a href="/">Home</a>
          <a href="#features">Features</a>
          <a href="#how-it-works">How it works</a>
        </div>

        <span className="footer-copy">
          © 2026 Skillix
        </span>
      </footer>
    </div>
  );
}

function App() {
  return (
    <Routes>
      {/* Public pages */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      {/* Protected pages */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/discover"
        element={
          <ProtectedRoute>
            <Discover />
          </ProtectedRoute>
        }
      />

      <Route
        path="/discover-results"
        element={
          <ProtectedRoute>
            <DiscoverResults />
          </ProtectedRoute>
        }
      />

      <Route
        path="/resume"
        element={
          <ProtectedRoute>
            <Resume />
          </ProtectedRoute>
        }
      />

      <Route
        path="/job-fit"
        element={
          <ProtectedRoute>
            <JobFit />
          </ProtectedRoute>
        }
      />

      {/* Unknown routes return home */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;