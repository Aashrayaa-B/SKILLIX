
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./JobFit.css";

function JobFit() {
  const navigate = useNavigate();

  const [resume, setResume] = useState(null);
  const [jobDescription, setJobDescription] = useState(null);
  const [jobDescriptionText, setJobDescriptionText] = useState("");
  const [jobDescriptionMode, setJobDescriptionMode] = useState("pdf");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const handleAnalyzeAnother = () => {
    setResume(null);
    setJobDescription(null);
    setJobDescriptionText("");
    setJobDescriptionMode("pdf");
    setResult(null);
    setError("");
    setLoading(false);

    // Clear native file inputs so the same file can be selected again.
    document
      .querySelectorAll('.job-fit-page input[type="file"]')
      .forEach((input) => {
        input.value = "";
      });

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleMatch = async (e) => {
    e.preventDefault();

    const hasPdf = Boolean(jobDescription);
    const hasText = jobDescriptionText.trim().length > 0;

    if (!resume) {
      setError("Please select your resume.");
      setResult(null);
      return;
    }

    if (!hasPdf && !hasText) {
      setError(
        "Please upload a job description PDF or paste the job description text."
      );
      setResult(null);
      return;
    }

    if (hasPdf && hasText) {
      setError("Please use either a PDF or pasted text, not both.");
      setResult(null);
      return;
    }

    setLoading(true);
    setError("");
    setResult(null);

    try {
      const formData = new FormData();
      formData.append("resume", resume);

      if (hasPdf) {
        formData.append("job_description", jobDescription);
      } else {
        formData.append(
          "job_description_text",
          jobDescriptionText.trim()
        );
      }

      const response = await fetch(`${import.meta.env.VITE_API_URL || "http://127.0.0.1:8000"}/match-job`, {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.detail || "Job matching failed.");
      }

      setResult(data);
    } catch (err) {
      setError(
        err.message || "Something went wrong while checking the job fit."
      );
    } finally {
      setLoading(false);
    }
  };

  const scoreClass = (score) => {
    if (score >= 75) return "job-fit-score strong";
    if (score >= 50) return "job-fit-score moderate";
    return "job-fit-score low";
  };

  const selectPdfMode = () => {
    setJobDescriptionMode("pdf");
    setJobDescriptionText("");
    setError("");
    setResult(null);
  };

  const selectTextMode = () => {
    setJobDescriptionMode("text");
    setJobDescription(null);
    setError("");
    setResult(null);
  };

  return (
    <div className="job-fit-page">
      <nav className="job-fit-nav">
        <Link to="/" className="job-fit-logo">
          SKILLI<span>X</span>
        </Link>

        <Link to="/dashboard" className="job-fit-back">
          ← Dashboard
        </Link>
      </nav>

      <main className="job-fit-main">
        <div className="job-fit-header">
          <span className="job-fit-label">CHECK YOUR JOB FIT</span>

          <h1>
            See how well
            <br />
            <span>you match.</span>
          </h1>

          <p>
            Compare your resume with a real job description
            and understand where you match, where you're
            missing skills, and where you can improve.
          </p>
        </div>

        <section className="job-fit-section">
          <div className="job-fit-section-heading">
            <span className="job-fit-section-number">01</span>

            <div>
              <h2>Add your documents</h2>
              <p>
                Upload your resume PDF and provide the job
                description as a PDF or pasted text.
              </p>
            </div>
          </div>

          <form className="job-fit-form" onSubmit={handleMatch}>
            <div className="job-fit-upload-grid">
              <label className="job-fit-upload">
                <input
                  type="file"
                  accept=".pdf,application/pdf"
                  onChange={(e) => {
                    setResume(e.target.files?.[0] || null);
                    setError("");
                    setResult(null);
                  }}
                />

                <div className="job-fit-upload-number">A</div>

                <strong>{resume ? resume.name : "Your resume"}</strong>

                <span>
                  {resume ? "PDF selected" : "Choose your resume PDF"}
                </span>
              </label>

              <div className="job-fit-jd-card">
                <div className="job-fit-upload-number">B</div>

                <strong>Job description</strong>

                <span className="job-fit-jd-subtitle">
                  Upload a PDF or paste the text
                </span>

                <div className="job-fit-jd-methods">
                  <button
                    type="button"
                    className={
                      jobDescriptionMode === "pdf"
                        ? "job-fit-jd-method active"
                        : "job-fit-jd-method"
                    }
                    onClick={selectPdfMode}
                  >
                    Upload PDF
                  </button>

                  <button
                    type="button"
                    className={
                      jobDescriptionMode === "text"
                        ? "job-fit-jd-method active"
                        : "job-fit-jd-method"
                    }
                    onClick={selectTextMode}
                  >
                    Paste text
                  </button>
                </div>

                {jobDescriptionMode === "pdf" && (
                  <label className="job-fit-jd-pdf">
                    <input
                      type="file"
                      accept=".pdf,application/pdf"
                      onChange={(e) => {
                        setJobDescription(e.target.files?.[0] || null);
                        setJobDescriptionText("");
                        setError("");
                        setResult(null);
                      }}
                    />

                    <span className="job-fit-jd-pdf-icon">↑</span>

                    <strong>
                      {jobDescription
                        ? jobDescription.name
                        : "Choose job description PDF"}
                    </strong>

                    <span>
                      {jobDescription
                        ? "PDF selected"
                        : "Click here to select a PDF"}
                    </span>
                  </label>
                )}

                {jobDescriptionMode === "text" && (
                  <textarea
                    className="job-fit-jd-textarea"
                    placeholder="Paste the complete job description here..."
                    value={jobDescriptionText}
                    onChange={(e) => {
                      setJobDescriptionText(e.target.value);
                      setError("");
                      setResult(null);
                    }}
                  />
                )}
              </div>
            </div>

            {error && (
              <div className="job-fit-error" role="alert">
                {error}
              </div>
            )}

            <button
              type="submit"
              className="job-fit-button"
              disabled={loading}
            >
              {loading ? "Checking your fit..." : "Check my job fit"}
              {!loading && <span>→</span>}
            </button>
          </form>
        </section>

        {result && (
          <div className="job-fit-results">
            <section className="job-fit-section">
              <div className="job-fit-section-heading">
                <span className="job-fit-section-number">02</span>

                <div>
                  <h2>Your overall match</h2>
                  <p>Based on required and preferred job skills.</p>
                </div>
              </div>

              <div className="job-fit-score-panel">
                <div className={scoreClass(result.overall_score)}>
                  <strong>{result.overall_score}</strong>
                  <span>/ 100</span>
                </div>

                <div className="job-fit-score-copy">
                  <span>FIT LEVEL</span>
                  <h3>{result.fit_level}</h3>
                  <p>
                    Your score reflects how your detected skills
                    compare with this job's requirements.
                  </p>
                </div>
              </div>
            </section>

            <section className="job-fit-section">
              <div className="job-fit-section-heading">
                <span className="job-fit-section-number">03</span>

                <div>
                  <h2>Required skills</h2>
                  <p>Skills the job description considers essential.</p>
                </div>
              </div>

              <div className="job-fit-stat-row">
                <div>
                  <span>REQUIRED SCORE</span>
                  <strong>{result.required_score}</strong>
                </div>
                <div>
                  <span>MATCHED</span>
                  <strong>{result.required_matches?.length || 0}</strong>
                </div>
                <div>
                  <span>MISSING</span>
                  <strong>{result.required_missing?.length || 0}</strong>
                </div>
              </div>

              <div className="job-fit-skill-group">
                <h3>Matched</h3>
                <div className="job-fit-skill-list">
                  {result.required_matches?.map((item, index) => (
                    <div
                      className="job-fit-match"
                      key={`${item.jd_skill}-${index}`}
                    >
                      <div>
                        <strong>{item.jd_skill}</strong>
                        <span>
                          {item.type} {" · "} {item.score}
                        </span>
                      </div>
                      <span className="job-fit-check">✓</span>
                    </div>
                  ))}
                </div>
              </div>

              {result.required_missing?.length > 0 && (
                <div className="job-fit-skill-group missing">
                  <h3>Skills to work on</h3>
                  <div className="job-fit-skill-list">
                    {result.required_missing.map((skill) => (
                      <span className="job-fit-missing" key={skill}>
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </section>

            <section className="job-fit-section">
              <div className="job-fit-section-heading">
                <span className="job-fit-section-number">04</span>

                <div>
                  <h2>Preferred skills</h2>
                  <p>
                    Additional skills that can strengthen your application.
                  </p>
                </div>
              </div>

              <div className="job-fit-stat-row">
                <div>
                  <span>PREFERRED SCORE</span>
                  <strong>{result.preferred_score}</strong>
                </div>
                <div>
                  <span>MATCHED</span>
                  <strong>{result.preferred_matches?.length || 0}</strong>
                </div>
                <div>
                  <span>MISSING</span>
                  <strong>{result.preferred_missing?.length || 0}</strong>
                </div>
              </div>

              <div className="job-fit-skill-group">
                <h3>You already have</h3>
                <div className="job-fit-skill-list">
                  {result.preferred_matches?.map((item, index) => (
                    <div
                      className="job-fit-match"
                      key={`${item.jd_skill}-${index}`}
                    >
                      <div>
                        <strong>{item.jd_skill}</strong>
                        <span>
                          {item.type} {" · "} {item.score}
                        </span>
                      </div>
                      <span className="job-fit-check">✓</span>
                    </div>
                  ))}
                </div>
              </div>

              {result.preferred_missing?.length > 0 && (
                <div className="job-fit-skill-group missing">
                  <h3>Good next skills to build</h3>
                  <div className="job-fit-skill-list">
                    {result.preferred_missing.map((skill) => (
                      <span className="job-fit-missing" key={skill}>
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </section>

            <section className="job-fit-section">
              <div className="job-fit-section-heading">
                <span className="job-fit-section-number">05</span>

                <div>
                  <h2>Additional strengths</h2>
                  <p>
                    Skills found in your resume that aren't directly
                    required by this job.
                  </p>
                </div>
              </div>

              <div className="job-fit-skill-list">
                {result.extra_resume_skills?.map((skill) => (
                  <span className="job-fit-extra" key={skill}>
                    {skill}
                  </span>
                ))}
              </div>
            </section>
          </div>
        )}

        {/* Always show the bottom actions */}
        <section className="job-fit-results-actions">
          {(result || error) && (
            <button
              type="button"
              className="job-fit-button"
              onClick={handleAnalyzeAnother}
            >
              Analyze Another Resume &amp; Job →
            </button>
          )}

          <button
            type="button"
            className="job-fit-dashboard-button"
            onClick={() => navigate("/dashboard")}
          >
            ← Back to Dashboard
          </button>
        </section>
      </main>
    </div>
  );
}

export default JobFit;
