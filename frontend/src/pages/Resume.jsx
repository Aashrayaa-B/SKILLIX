import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Resume.css";

function Resume() {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const handleAnalyzeAgain = () => {
    setFile(null);
    setResult(null);
    setError("");

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleAnalyze = async (e) => {
    e.preventDefault();

    if (!file) {
      setError("Please select a PDF resume first.");
      return;
    }

    setLoading(true);
    setError("");
    setResult(null);

    try {
      const formData = new FormData();

      formData.append("file", file);

      const response = await fetch(
        "http://127.0.0.1:8000/analyze-resume",
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.detail || "Resume analysis failed."
        );
      }

      setResult(data);
    } catch (err) {
      setError(
        err.message ||
          "Something went wrong while analyzing your resume."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="resume-page">

      {/* ================= NAVBAR ================= */}

      <nav className="resume-nav">

        <Link
          to="/"
          className="resume-logo"
        >
          SKILLI<span>X</span>
        </Link>

        <Link
          to="/dashboard"
          className="resume-back"
        >
          ← Dashboard
        </Link>

      </nav>


      {/* ================= MAIN ================= */}

      <main className="resume-main">

        {/* ================= HEADER ================= */}

        <div className="resume-header">

          <span className="resume-label">
            ANALYZE YOUR RESUME
          </span>

          <h1>
            Understand what
            <br />
            <span>your resume says.</span>
          </h1>

          <p>
            Upload your resume and Skillix will identify
            your skills, evaluate your career alignment,
            and highlight the roles that fit you best.
          </p>

        </div>


        {/* ================= UPLOAD ================= */}

        <section className="resume-section">

          <div className="resume-section-heading">

            <span className="resume-section-number">
              01
            </span>

            <div>
              <h2>
                Upload your resume
              </h2>

              <p>
                PDF files only.
              </p>
            </div>

          </div>


          <form
            className="resume-form"
            onSubmit={handleAnalyze}
          >

            <label className="resume-upload">

              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf,application/pdf"
                onChange={(e) => {

                  setFile(
                    e.target.files?.[0] || null
                  );

                  setError("");
                  setResult(null);

                }}
              />

              <div className="resume-upload-icon">
                ↑
              </div>

              <strong>
                {file
                  ? file.name
                  : "Choose your resume"}
              </strong>

              <span>
                {file
                  ? "PDF selected"
                  : "Click here to select a PDF"}
              </span>

            </label>


            {error && (
              <div className="resume-error">
                {error}
              </div>
            )}


            <button
              type="submit"
              className="resume-analyze-button"
              disabled={loading}
            >

              {loading
                ? "Analyzing..."
                : "Analyze my resume"}

              {!loading && (
                <span>
                  →
                </span>
              )}

            </button>

          </form>

        </section>


        {/* ================= RESULTS ================= */}

        {result && (

          <div className="resume-results">


            {/* ================= BEST CAREER ================= */}

            <section className="resume-section">

              <div className="resume-section-heading">

                <span className="resume-section-number">
                  02
                </span>

                <div>
                  <h2>
                    Your strongest fit
                  </h2>

                  <p>
                    Based on the skills detected in your resume.
                  </p>
                </div>

              </div>


              {result.best_career && (

                <div className="resume-best-career">

                  <div className="resume-best-career-content">

                    <span>
                      BEST CAREER
                    </span>

                    <h3>
                      {result.best_career.Career}
                    </h3>

                    <p>
                      This career currently has the strongest
                      alignment with your resume.
                    </p>

                  </div>


                  <div className="resume-best-score">

                    <strong>
                      {result.best_career.Score}%
                    </strong>

                    <span>
                      MATCH
                    </span>

                  </div>

                </div>

              )}

            </section>


            {/* ================= SKILLS ================= */}

            <section className="resume-section">

              <div className="resume-section-heading">

                <span className="resume-section-number">
                  03
                </span>

                <div>
                  <h2>
                    Skills detected
                  </h2>

                  <p>
                    {result.skills_detected} skills were found
                    in your resume.
                  </p>
                </div>

              </div>


              <div className="resume-skill-list">

                {result.skills?.map(
                  (skill) => (

                    <span
                      key={skill}
                      className="resume-skill"
                    >
                      {skill}
                    </span>

                  )
                )}

              </div>

            </section>


            {/* ================= CAREER RECOMMENDATIONS ================= */}

            <section className="resume-section">

              <div className="resume-section-heading">

                <span className="resume-section-number">
                  04
                </span>

                <div>
                  <h2>
                    Career paths worth exploring
                  </h2>

                  <p>
                    Other roles your current skill set
                    aligns with.
                  </p>
                </div>

              </div>


              <div className="resume-career-list">

                {result.career_recommendations?.map(
                  (career, index) => (

                    <div
                      className={
                        index === 0
                          ? "resume-career-card top-career"
                          : "resume-career-card"
                      }
                      key={career.Career}
                    >

                      {/* ================= CAREER HEADER ================= */}

                      <div className="resume-career-main">

                        <div className="resume-career-title-row">

                          <div className="resume-career-title">

                            <span className="resume-career-rank">
                              {String(index + 1).padStart(2, "0")}
                            </span>

                            <h3>
                              {career.Career}
                            </h3>

                          </div>


                          <strong>
                            {career.Score}%
                          </strong>

                        </div>


                        {/* ================= MATCH BAR ================= */}

                        <div className="resume-match-bar">

                          <span
                            style={{
                              width: `${Math.min(
                                career.Score,
                                100
                              )}%`,
                            }}
                          />

                        </div>


                        {/* ================= MATCHED SKILLS ================= */}

                        <div className="resume-career-skills">

                          <div className="resume-career-skill-heading">

                            <span>
                              ✓
                            </span>

                            <strong>
                              Matched skills
                            </strong>

                            <small>
                              {career.Matched?.length || 0}
                            </small>

                          </div>


                          {career.Matched?.length > 0 ? (

                            <div className="resume-career-skill-list">

                              {career.Matched.map(
                                (skill) => (

                                  <span
                                    className="resume-career-skill matched"
                                    key={skill}
                                  >
                                    {skill}
                                  </span>

                                )
                              )}

                            </div>

                          ) : (

                            <p className="resume-career-empty">
                              No direct skill matches detected.
                            </p>

                          )}

                        </div>


                        {/* ================= SKILLS TO DEVELOP ================= */}

                        <div className="resume-career-skills missing">

                          <div className="resume-career-skill-heading missing">

                            <span>
                              +
                            </span>

                            <strong>
                              Skills to develop
                            </strong>

                            <small>
                              {career.Missing?.length || 0}
                            </small>

                          </div>


                          {career.Missing?.length > 0 ? (

                            <div className="resume-career-skill-list">

                              {career.Missing.map(
                                (skill) => (

                                  <span
                                    className="resume-career-skill missing"
                                    key={skill}
                                  >
                                    {skill}
                                  </span>

                                )
                              )}

                            </div>

                          ) : (

                            <p className="resume-career-empty">
                              No major skill gaps detected.
                            </p>

                          )}

                        </div>

                      </div>

                    </div>

                  )
                )}

              </div>

            </section>

          </div>

        )}

        {result && (
          <section className="resume-results-actions">

            <button
              className="resume-primary-action"
              onClick={handleAnalyzeAgain}
            >
              Analyze Again
              <span>↗</span>
            </button>


            <button
              className="resume-secondary-action"
              onClick={() => navigate("/job-fit")}
            >
              Check Your Resume Fit to the Job
              <span>↗</span>
            </button>


            <button
              className="resume-secondary-action"
              onClick={() => navigate("/dashboard")}
            >
              Back to Dashboard
            </button>

          </section>
        )}

      </main>

    </div>
  );
}

export default Resume;