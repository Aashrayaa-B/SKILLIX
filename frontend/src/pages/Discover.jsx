import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";
import "./Discover.css";


const SKILL_CATEGORIES = {

  "Programming": [
    "Python",
    "Java",
    "JavaScript",
    "C",
    "C++",
    "C#",
    "R",
    "TypeScript",
  ],

  "Data & Analytics": [
    "SQL",
    "Excel",
    "Tableau",
    "Power BI",
    "Pandas",
    "NumPy",
    "Matplotlib",
    "Seaborn",
    "Statistics",
    "Data Visualization",
  ],

  "AI & Machine Learning": [
    "Machine Learning",
    "Deep Learning",
    "Scikit-learn",
    "TensorFlow",
    "PyTorch",
    "Natural Language Processing",
    "Computer Vision",
    "Artificial Intelligence",
  ],

  "Web Development": [
    "HTML",
    "CSS",
    "React",
    "Node.js",
    "Express.js",
    "MongoDB",
    "REST APIs",
    "Git",
    "GitHub",
  ],

  "Cloud & Tools": [
    "Microsoft Azure",
    "AWS",
    "Google Cloud",
    "Docker",
    "Kubernetes",
    "Linux",
    "Figma",
  ],

  "Professional Skills": [
    "Communication",
    "Problem Solving",
    "Critical Thinking",
    "Teamwork",
    "Leadership",
    "Time Management",
    "Presentation",
    "Research",
  ],

};


/* =========================================================
   INTEREST OPTIONS
========================================================= */

const INTEREST_CATEGORIES = {

  "Technology": [
    "Artificial Intelligence",
    "Machine Learning",
    "Data Science",
    "Software Development",
    "Web Development",
    "Cloud Computing",
    "Cybersecurity",
    "Robotics",
  ],

  "Data & Business": [
    "Data Analytics",
    "Business Analytics",
    "Business Intelligence",
    "Finance",
    "Entrepreneurship",
    "Marketing",
    "Product Management",
    "Consulting",
  ],

  "Creative": [
    "UI/UX Design",
    "Graphic Design",
    "Content Creation",
    "Writing",
    "Photography",
    "Video Production",
    "Animation",
  ],

  "People & Impact": [
    "Education",
    "Psychology",
    "Healthcare",
    "Social Impact",
    "Leadership",
    "Community",
    "Human Resources",
  ],

  "Work Style": [
    "Problem Solving",
    "Research",
    "Innovation",
    "Building Things",
    "Working with People",
    "Working Independently",
    "Public Speaking",
    "Continuous Learning",
  ],

};


function Discover() {

  const { user } = useAuth();
  const navigate = useNavigate();


  const [experience, setExperience] =
    useState("Student / Fresher");


  const [skills, setSkills] =
    useState([]);


  const [skillSearch, setSkillSearch] =
    useState("");


  const [interests, setInterests] =
    useState([]);


  const [interestSearch, setInterestSearch] =
    useState("");


  /* =========================================================
     SKILLS
  ========================================================= */

  const allSkills = useMemo(() => {

    return Object.values(
      SKILL_CATEGORIES
    ).flat();

  }, []);


  const filteredSkills = useMemo(() => {

    const search =
      skillSearch.trim().toLowerCase();


    if (!search) {
      return allSkills;
    }


    return allSkills.filter(
      (skill) =>
        skill
          .toLowerCase()
          .includes(search)
    );

  }, [
    skillSearch,
    allSkills,
  ]);


  const toggleSkill = (skill) => {

    setSkills(
      (currentSkills) => {

        if (
          currentSkills.includes(skill)
        ) {

          return currentSkills.filter(
            (item) => item !== skill
          );

        }


        return [
          ...currentSkills,
          skill,
        ];

      }
    );

  };


  /* =========================================================
     INTERESTS
  ========================================================= */

  const allInterests = useMemo(() => {

    return Object.values(
      INTEREST_CATEGORIES
    ).flat();

  }, []);


  const filteredInterests = useMemo(() => {

    const search =
      interestSearch
        .trim()
        .toLowerCase();


    if (!search) {
      return allInterests;
    }


    return allInterests.filter(
      (interest) =>
        interest
          .toLowerCase()
          .includes(search)
    );

  }, [
    interestSearch,
    allInterests,
  ]);


  const toggleInterest = (interest) => {

    setInterests(
      (currentInterests) => {

        if (
          currentInterests.includes(
            interest
          )
        ) {

          return currentInterests.filter(
            (item) =>
              item !== interest
          );

        }


        return [
          ...currentInterests,
          interest,
        ];

      }
    );

  };


  /* =========================================================
     CONTINUE
  ========================================================= */

  const handleContinue = async (e) => {

    e.preventDefault();


    if (skills.length === 0) {
      return;
    }


    const discoverProfile = {
      experience,
      skills,
      interests,
    };


    try {

      const response = await fetch(
        "http://127.0.0.1:8000/discover-careers",
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body:
            JSON.stringify(
              discoverProfile
            ),
        }
      );


      if (!response.ok) {

        const errorData =
          await response.json();


        throw new Error(
          errorData.detail ||
          "Failed to generate career recommendations."
        );

      }


      const result =
        await response.json();


      localStorage.setItem(
        "skillixDiscoverProfile",
        JSON.stringify(
          discoverProfile
        )
      );


      localStorage.setItem(
        "skillixDiscoverResults",
        JSON.stringify(
          result
        )
      );


      navigate(
        "/discover-results"
      );

    } catch (error) {

      console.error(
        "Discover career error:",
        error
      );


      alert(
        error.message ||
        "Something went wrong while generating career recommendations."
      );

    }

  };


  return (

    <div className="discover-page">


      {/* =====================================================
          NAVBAR
      ===================================================== */}

      <nav className="discover-nav">

        <Link
          to="/"
          className="discover-logo"
        >
          SKILLI
          <span>X</span>
        </Link>


        <Link
          to="/dashboard"
          className="back-dashboard"
        >
          ← Dashboard
        </Link>

      </nav>


      {/* =====================================================
          MAIN
      ===================================================== */}

      <main className="discover-main">

        <div className="discover-header">

          <span className="discover-label">
            DISCOVER YOUR ROLE
          </span>


          <h1>
            Tell us about
            <br />
            <span>yourself.</span>
          </h1>


          <p>
            A few details about you will help Skillix
            understand where your skills and interests fit best.
          </p>

        </div>


        <form
          onSubmit={handleContinue}
        >


          {/* =================================================
              EDUCATION
          ================================================= */}

          <section className="discover-section">

            <div className="section-heading">

              <span className="section-number">
                01
              </span>


              <div>

                <h2>
                  Education
                </h2>


                <p>
                  Where are you in your professional journey?
                </p>

              </div>

            </div>


            <div className="choice-grid">

              {[
                "Student / Fresher",
                "Less than 1 year",
                "1–2 years",
                "3–5 years",
                "5+ years",
              ].map(
                (option) => (

                  <button
                    type="button"
                    key={option}
                    className={
                      experience === option
                        ? "choice-button active"
                        : "choice-button"
                    }
                    onClick={() =>
                      setExperience(option)
                    }
                  >
                    {option}
                  </button>

                )
              )}

            </div>

          </section>


          {/* =================================================
              SKILLS
          ================================================= */}

          <section className="discover-section skills-section">

            <div className="section-heading">

              <span className="section-number">
                02
              </span>


              <div>

                <h2>
                  Skills
                </h2>


                <p>
                  What can you already do?
                </p>

              </div>

            </div>


            <div className="skills-selector">

              <label>
                Select your skills <span>*</span>
              </label>


              {/* SEARCH */}

              <div className="skill-search">

                <span className="search-icon">
                  ⌕
                </span>


                <input
                  type="text"
                  placeholder="Search for a skill..."
                  value={skillSearch}
                  onChange={(e) =>
                    setSkillSearch(
                      e.target.value
                    )
                  }
                />


                {skillSearch && (

                  <button
                    type="button"
                    className="clear-search"
                    onClick={() =>
                      setSkillSearch("")
                    }
                  >
                    ×
                  </button>

                )}

              </div>


              {/* SELECTED SKILLS */}

              {skills.length > 0 && (

                <div className="selected-skills">

                  <div className="selected-title">
                    Selected skills
                  </div>


                  <div className="selected-list">

                    {skills.map(
                      (skill) => (

                        <button
                          type="button"
                          key={skill}
                          className="selected-skill"
                          onClick={() =>
                            toggleSkill(
                              skill
                            )
                          }
                        >
                          {skill}
                          <span>
                            ×
                          </span>
                        </button>

                      )
                    )}

                  </div>

                </div>

              )}


              {/* SKILL CATEGORIES */}

              <div className="skill-categories">

                {Object.entries(
                  SKILL_CATEGORIES
                ).map(
                  ([category, categorySkills]) => {

                    const visibleSkills =
                      categorySkills.filter(
                        (skill) =>
                          filteredSkills.includes(
                            skill
                          )
                      );


                    if (
                      visibleSkills.length === 0
                    ) {
                      return null;
                    }


                    return (

                      <div
                        className="skill-category"
                        key={category}
                      >

                        <h3>
                          {category}
                        </h3>


                        <div className="skill-buttons">

                          {visibleSkills.map(
                            (skill) => {

                              const selected =
                                skills.includes(
                                  skill
                                );


                              return (

                                <button
                                  type="button"
                                  key={skill}
                                  className={
                                    selected
                                      ? "skill-button selected"
                                      : "skill-button"
                                  }
                                  onClick={() =>
                                    toggleSkill(
                                      skill
                                    )
                                  }
                                >

                                  {selected && (

                                    <span className="skill-check">
                                      ✓
                                    </span>

                                  )}

                                  {skill}

                                </button>

                              );

                            }
                          )}

                        </div>

                      </div>

                    );

                  }
                )}

              </div>


              {filteredSkills.length === 0 && (

                <div className="no-skills">
                  No matching skills found.
                </div>

              )}


              <p className="skill-help">
                Select all the skills you already know.
                You can choose multiple skills.
              </p>

            </div>

          </section>


          {/* =================================================
              INTERESTS
          ================================================= */}

          <section className="discover-section interests-section">

            <div className="section-heading">

              <span className="section-number">
                03
              </span>


              <div>

                <h2>
                  Interests
                </h2>


                <p>
                  What kind of work excites you?
                </p>

              </div>

            </div>


            <div className="interests-selector">

              <label>
                Select your interests
              </label>


              {/* SEARCH */}

              <div className="skill-search interest-search">

                <span className="search-icon">
                  ⌕
                </span>


                <input
                  type="text"
                  placeholder="Search for an interest..."
                  value={interestSearch}
                  onChange={(e) =>
                    setInterestSearch(
                      e.target.value
                    )
                  }
                />


                {interestSearch && (

                  <button
                    type="button"
                    className="clear-search"
                    onClick={() =>
                      setInterestSearch("")
                    }
                  >
                    ×
                  </button>

                )}

              </div>


              {/* SELECTED INTERESTS */}

              {interests.length > 0 && (

                <div className="selected-skills selected-interests">

                  <div className="selected-title">
                    Selected interests
                  </div>


                  <div className="selected-list">

                    {interests.map(
                      (interest) => (

                        <button
                          type="button"
                          key={interest}
                          className="selected-skill"
                          onClick={() =>
                            toggleInterest(
                              interest
                            )
                          }
                        >
                          {interest}

                          <span>
                            ×
                          </span>

                        </button>

                      )
                    )}

                  </div>

                </div>

              )}


              {/* INTEREST CATEGORIES */}

              <div className="skill-categories interest-categories">

                {Object.entries(
                  INTEREST_CATEGORIES
                ).map(
                  ([category, categoryInterests]) => {

                    const visibleInterests =
                      categoryInterests.filter(
                        (interest) =>
                          filteredInterests.includes(
                            interest
                          )
                      );


                    if (
                      visibleInterests.length === 0
                    ) {
                      return null;
                    }


                    return (

                      <div
                        className="skill-category"
                        key={category}
                      >

                        <h3>
                          {category}
                        </h3>


                        <div className="skill-buttons">

                          {visibleInterests.map(
                            (interest) => {

                              const selected =
                                interests.includes(
                                  interest
                                );


                              return (

                                <button
                                  type="button"
                                  key={interest}
                                  className={
                                    selected
                                      ? "skill-button selected"
                                      : "skill-button"
                                  }
                                  onClick={() =>
                                    toggleInterest(
                                      interest
                                    )
                                  }
                                >

                                  {selected && (

                                    <span className="skill-check">
                                      ✓
                                    </span>

                                  )}

                                  {interest}

                                </button>

                              );

                            }
                          )}

                        </div>

                      </div>

                    );

                  }
                )}

              </div>


              {filteredInterests.length === 0 && (

                <div className="no-skills">
                  No matching interests found.
                </div>

              )}


              <p className="skill-help">
                Choose the areas, subjects, and types
                of work that genuinely interest you.
              </p>

            </div>

          </section>


          {/* =================================================
              SUMMARY
          ================================================= */}

          <section className="discover-summary">

            <div>

              <span>
                YOUR PROFILE
              </span>


              <strong>

                {skills.length}{" "}

                {skills.length === 1
                  ? "skill"
                  : "skills"}

                {" · "}

                {interests.length}{" "}

                {interests.length === 1
                  ? "interest"
                  : "interests"}

                {" selected"}

              </strong>

            </div>


            <button
              type="submit"
              className="continue-button"
              disabled={
                skills.length === 0
              }
            >
              Continue
              <span>↗</span>
            </button>

          </section>


        </form>

      </main>

    </div>

  );
}


export default Discover;