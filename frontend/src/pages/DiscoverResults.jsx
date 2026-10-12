import React, {
  useEffect,
  useState,
} from "react";

import {
  useLocation,
  useNavigate,
} from "react-router-dom";

import "./Discover.css";


/* =========================================================
   DISCOVER RESULTS
========================================================= */

function DiscoverResults() {
  const location = useLocation();
  const navigate = useNavigate();

  const [storedResult, setStoredResult] =
    useState(null);

  const [storedProfile, setStoredProfile] =
    useState(null);


  /* =======================================================
     READ RESULTS FROM LOCAL STORAGE
  ======================================================= */

  useEffect(() => {
    const savedResults =
      localStorage.getItem(
        "skillixDiscoverResults"
      );

    const savedProfile =
      localStorage.getItem(
        "skillixDiscoverProfile"
      );


    if (savedResults) {
      try {
        setStoredResult(
          JSON.parse(savedResults)
        );
      } catch (error) {
        console.error(
          "Failed to read Discover results:",
          error
        );
      }
    }


    if (savedProfile) {
      try {
        setStoredProfile(
          JSON.parse(savedProfile)
        );
      } catch (error) {
        console.error(
          "Failed to read Discover profile:",
          error
        );
      }
    }

  }, []);


  /* =======================================================
     NORMALIZE RESULTS
  ======================================================= */

  const stateResults =
    location.state?.results;

  let results = [];


  /*
     Support the current localStorage response format.
  */

  if (
    storedResult?.career_recommendations &&
    Array.isArray(
      storedResult.career_recommendations
    )
  ) {
    results =
      storedResult.career_recommendations;
  }


  /*
     Also support a direct array response.
  */

  else if (
    Array.isArray(storedResult)
  ) {
    results =
      storedResult;
  }


  /*
     Support results passed through router state.
  */

  else if (
    Array.isArray(stateResults)
  ) {
    results =
      stateResults;
  }


  /*
     Support a generic results/recommendations
     response as a safety fallback.
  */

  else if (
    Array.isArray(storedResult?.results)
  ) {
    results =
      storedResult.results;
  }


  else if (
    Array.isArray(
      storedResult?.recommendations
    )
  ) {
    results =
      storedResult.recommendations;
  }


  /* =======================================================
     SELECTED SKILLS
  ======================================================= */

  const selectedSkills =
    location.state?.selectedSkills ||
    storedProfile?.skills ||
    [];


  /* =======================================================
     CLEAR DISCOVER SESSION
  ======================================================= */

  const startNewDiscovery = () => {
    localStorage.removeItem(
      "skillixDiscoverResults"
    );

    localStorage.removeItem(
      "skillixDiscoverProfile"
    );

    navigate(
      "/discover",
      {
        replace: true,
      }
    );
  };


  /* =======================================================
     EMPTY STATE
  ======================================================= */

  if (!results.length) {
    return (
      <div className="discover-results-page">

        <div className="discover-results-container">

          <button
            type="button"
            className="back-button"
            onClick={startNewDiscovery}
          >
            ← Back to Discover
          </button>


          <div className="results-empty">

            <span className="results-label">
              CAREER DISCOVERY
            </span>


            <h1>
              No career results yet.
            </h1>


            <p>
              Go back and complete your profile so we can
              find career paths that match your strengths.
            </p>


            <button
              type="button"
              className="results-primary-button"
              onClick={startNewDiscovery}
            >
              Discover My Role
              <span>↗</span>
            </button>

          </div>

        </div>

      </div>
    );
  }


  /* =======================================================
     STRONGEST MATCH
  ======================================================= */

  const strongestMatch =
    storedResult?.best_career ||
    results[0];


  /* =======================================================
     OTHER CAREER PATHS

     Strongest match is shown separately.
     Only show 4 additional careers.
  ======================================================= */

  const otherCareers =
    results.slice(1, 5);


  /* =======================================================
     DISPLAY RESULTS
  ======================================================= */

  return (
    <div className="discover-results-page">


      {/* ===================================================
          HEADER
      =================================================== */}

      <header className="discover-results-header">

        <div className="results-header-inner">

          <button
            type="button"
            className="results-logo"
            onClick={() =>
              navigate("/dashboard")
            }
          >
            SKILLI
            <span>X</span>
          </button>


          <button
            type="button"
            className="results-dashboard-button"
            onClick={() =>
              navigate("/dashboard")
            }
          >
            Dashboard
          </button>

        </div>

      </header>


      {/* ===================================================
          MAIN
      =================================================== */}

      <main className="discover-results-main">

        <div className="discover-results-container">


          {/* =================================================
              BACK
          ================================================= */}

          <button
            type="button"
            className="back-button"
            onClick={startNewDiscovery}
          >
            ← Back to Discover
          </button>


          {/* =================================================
              INTRO
          ================================================= */}

          <section className="results-intro">

            <span className="results-label">
              YOUR CAREER PATHS
            </span>


            <h1>
              Here’s where your
              <br />
              strengths could take you.
            </h1>


            <p>
              Based on the skills and interests you selected,
              these career paths show where your profile aligns
              most strongly.
            </p>

          </section>


          {/* =================================================
              STRONGEST MATCH
          ================================================= */}

          {strongestMatch && (

            <section className="strongest-match-section">

              <div className="strongest-match-label">
                STRONGEST MATCH
              </div>


              <div className="strongest-match-card">

                <div className="strongest-match-content">


                  <div className="strongest-match-number">
                    01
                  </div>


                  <div className="strongest-match-info">

                    <h2>
                      {strongestMatch.Career}
                    </h2>


                    <p>
                      This career currently has the strongest
                      alignment with your selected profile.
                    </p>


                    {strongestMatch.Matched?.length > 0 && (

                      <div className="skill-section">

                        <h3>
                          Matched skills
                        </h3>


                        <div className="skill-list">

                          {strongestMatch.Matched.map(
                            (skill, skillIndex) => (

                              <span
                                className="skill-pill matched-pill"
                                key={`${skill}-${skillIndex}`}
                              >
                                {skill}
                              </span>

                            )
                          )}

                        </div>

                      </div>

                    )}


                    {strongestMatch.Missing?.length > 0 && (

                      <div className="skill-section">

                        <h3>
                          Skills to develop
                        </h3>


                        <div className="skill-list">

                          {strongestMatch.Missing.map(
                            (skill, skillIndex) => (

                              <span
                                className="skill-pill develop-pill"
                                key={`${skill}-${skillIndex}`}
                              >
                                {skill}
                              </span>

                            )
                          )}

                        </div>

                      </div>

                    )}

                  </div>


                  <div className="strongest-score">

                    <span>
                      MATCH
                    </span>


                    <strong>
                      {strongestMatch.Score}%
                    </strong>

                  </div>

                </div>

              </div>

            </section>

          )}


          {/* =================================================
              OTHER CAREER PATHS
          ================================================= */}

          {otherCareers.length > 0 && (

            <section className="career-paths-section">


              <div className="career-paths-heading">

                <div>

                  <span className="results-label">
                    OTHER POSSIBILITIES
                  </span>


                  <h2>
                    Career paths worth exploring
                  </h2>

                </div>


                <span className="career-count">
                  {otherCareers.length} paths
                </span>

              </div>


              <div className="career-results-grid">

                {otherCareers.map(
                  (career, index) => (

                    <article
                      className="career-result-card"
                      key={`${career.Career}-${index}`}
                    >


                      <div className="career-card-top">

                        <span className="career-card-number">
                          {String(index + 2).padStart(
                            2,
                            "0"
                          )}
                        </span>


                        <span className="career-card-score">
                          {career.Score}%
                        </span>

                      </div>


                      <h3>
                        {career.Career}
                      </h3>


                      {career.Matched?.length > 0 && (

                        <div className="skill-section">

                          <h4>
                            Matched skills
                          </h4>


                          <div className="skill-list">

                            {career.Matched.map(
                              (skill, skillIndex) => (

                                <span
                                  className="skill-pill matched-pill"
                                  key={`${skill}-${skillIndex}`}
                                >
                                  {skill}
                                </span>

                              )
                            )}

                          </div>

                        </div>

                      )}


                      {career.Missing?.length > 0 && (

                        <div className="skill-section">

                          <h4>
                            Skills to develop
                          </h4>


                          <div className="skill-list">

                            {career.Missing.map(
                              (skill, skillIndex) => (

                                <span
                                  className="skill-pill develop-pill"
                                  key={`${skill}-${skillIndex}`}
                                >
                                  {skill}
                                </span>

                              )
                            )}

                          </div>

                        </div>

                      )}


                      {!career.Matched?.length &&
                        !career.Missing?.length && (

                          <p className="no-skill-message">
                            No direct skill alignment detected
                            from your current selections.
                          </p>

                        )}

                    </article>

                  )
                )}

              </div>

            </section>

          )}


          {/* =================================================
              SELECTED PROFILE
          ================================================= */}

          {selectedSkills.length > 0 && (

            <section className="selected-profile-section">

              <span className="results-label">
                YOUR PROFILE SIGNALS
              </span>


              <h2>
                Skills you selected
              </h2>


              <div className="skill-list selected-skill-list">

                {selectedSkills.map(
                  (skill, index) => (

                    <span
                      className="skill-pill selected-pill"
                      key={`${skill}-${index}`}
                    >
                      {skill}
                    </span>

                  )
                )}

              </div>

            </section>

          )}


          {/* =================================================
              ACTIONS
          ================================================= */}

          <section className="results-actions">


            <button
              type="button"
              className="results-primary-button"
              onClick={startNewDiscovery}
            >
              Explore Again
              <span>↗</span>
            </button>


            <button
              type="button"
              className="results-secondary-button"
              onClick={() =>
                navigate("/resume")
              }
            >
              Analyze My Resume
              <span>↗</span>
            </button>


            <button
              type="button"
              className="results-secondary-button"
              onClick={() =>
                navigate("/dashboard")
              }
            >
              Back to Dashboard
            </button>

          </section>


        </div>

      </main>

    </div>
  );
}


export default DiscoverResults;