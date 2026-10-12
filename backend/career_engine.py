import os
import re
import joblib


# ==========================================================
# CAREERINTEL — ML CAREER RECOMMENDATION ENGINE
# TF-IDF + LOGISTIC REGRESSION
# ==========================================================


# ==========================================================
# PATHS
# ==========================================================

BASE_DIR = os.path.dirname(
    os.path.dirname(
        os.path.abspath(__file__)
    )
)

MODEL_PATH = os.path.join(
    BASE_DIR,
    "career_recommender_model.pkl"
)

VECTORIZER_PATH = os.path.join(
    BASE_DIR,
    "career_tfidf_vectorizer.pkl"
)


# ==========================================================
# LOAD MODEL
# ==========================================================

print("Loading CareerIntel ML model...")

model = joblib.load(
    MODEL_PATH
)

vectorizer = joblib.load(
    VECTORIZER_PATH
)

print("CareerIntel ML model loaded successfully.")


# ==========================================================
# CAREER SKILL PROFILES
# ==========================================================

CAREER_SKILLS = {

    "AI Engineer": [
        "Python",
        "Machine Learning",
        "Deep Learning",
        "TensorFlow",
        "PyTorch",
        "Artificial Intelligence",
        "NLP",
        "Computer Vision"
    ],

    "BI Analyst": [
        "SQL",
        "Excel",
        "Power BI",
        "Tableau",
        "Data Visualization",
        "Business Intelligence",
        "Data Analysis",
        "Statistics"
    ],

    "Business Analyst": [
        "SQL",
        "Excel",
        "Power BI",
        "Business Analysis",
        "Data Analysis",
        "Communication",
        "Problem Solving",
        "Requirements Analysis"
    ],

    "Cloud Engineer": [
        "Python",
        "AWS",
        "Microsoft Azure",
        "Google Cloud",
        "Docker",
        "Kubernetes",
        "Linux",
        "Networking"
    ],

    "Cybersecurity Analyst": [
        "Cybersecurity",
        "Network Security",
        "Linux",
        "Python",
        "SIEM",
        "Threat Analysis",
        "Risk Management",
        "Ethical Hacking"
    ],

    "Data Analyst": [
        "Python",
        "SQL",
        "Pandas",
        "NumPy",
        "Excel",
        "Power BI",
        "Tableau",
        "Data Visualization",
        "Statistics",
        "Data Analysis"
    ],

    "Data Architect": [
        "SQL",
        "Python",
        "Database Design",
        "Data Modeling",
        "Data Warehousing",
        "ETL",
        "Cloud",
        "Big Data"
    ],

    "Data Engineer": [
        "Python",
        "SQL",
        "ETL",
        "Data Warehousing",
        "Apache Spark",
        "Hadoop",
        "Airflow",
        "Cloud"
    ],

    "Data Scientist": [
        "Python",
        "SQL",
        "Pandas",
        "NumPy",
        "Statistics",
        "Machine Learning",
        "Deep Learning",
        "Data Visualization",
        "Scikit-learn"
    ],

    "DevOps Engineer": [
        "Linux",
        "Docker",
        "Kubernetes",
        "AWS",
        "CI/CD",
        "Git",
        "Python",
        "Terraform"
    ],

    "Financial Analyst": [
        "Excel",
        "SQL",
        "Financial Analysis",
        "Statistics",
        "Data Analysis",
        "Power BI",
        "Tableau",
        "Financial Modeling"
    ],

    "ML Engineer": [
        "Python",
        "Machine Learning",
        "Deep Learning",
        "TensorFlow",
        "PyTorch",
        "Scikit-learn",
        "MLOps",
        "SQL"
    ],

    "Marketing Analyst": [
        "Excel",
        "SQL",
        "Python",
        "Statistics",
        "Data Analysis",
        "Data Visualization",
        "Marketing Analytics",
        "Google Analytics"
    ],

    "Product Analyst": [
        "SQL",
        "Python",
        "Excel",
        "Statistics",
        "Data Analysis",
        "Data Visualization",
        "Product Analytics",
        "A/B Testing"
    ],

    "Product Manager": [
        "Product Management",
        "Communication",
        "Problem Solving",
        "Leadership",
        "Data Analysis",
        "Agile",
        "Project Management",
        "Requirements Analysis"
    ],

    "Project Manager": [
        "Project Management",
        "Communication",
        "Leadership",
        "Agile",
        "Scrum",
        "Problem Solving",
        "Time Management",
        "Teamwork"
    ],

    "Research Analyst": [
        "Python",
        "SQL",
        "Statistics",
        "Research",
        "Data Analysis",
        "Data Visualization",
        "Excel",
        "Machine Learning"
    ],

    "Software Engineer": [
        "Python",
        "Java",
        "JavaScript",
        "React",
        "Node.js",
        "HTML",
        "CSS",
        "REST API",
        "Git"
    ],

    "Tableau Developer": [
        "Tableau",
        "SQL",
        "Excel",
        "Data Visualization",
        "Data Analysis",
        "Python",
        "Power BI",
        "Dashboard Development"
    ],

    "Web Developer": [
        "HTML",
        "CSS",
        "JavaScript",
        "React",
        "Node.js",
        "REST API",
        "Git",
        "Web Development"
    ]
}


# ==========================================================
# SKILL ALIASES
# ==========================================================

SKILL_ALIASES = {

    "powerbi": "Power BI",
    "power bi": "Power BI",

    "ms azure": "Microsoft Azure",
    "azure": "Microsoft Azure",
    "microsoft azure": "Microsoft Azure",

    "machinelearning": "Machine Learning",
    "machine learning": "Machine Learning",

    "deeplearning": "Deep Learning",
    "deep learning": "Deep Learning",

    "dataanalysis": "Data Analysis",
    "data analysis": "Data Analysis",

    "datavisualization": "Data Visualization",
    "data visualization": "Data Visualization",

    "businessintelligence": "Business Intelligence",
    "business intelligence": "Business Intelligence",

    "nodejs": "Node.js",
    "node.js": "Node.js",

    "tensorflow": "TensorFlow",
    "pytorch": "PyTorch",

    "scikitlearn": "Scikit-learn",
    "scikit-learn": "Scikit-learn",

    "a/b testing": "A/B Testing",
    "ab testing": "A/B Testing"
}


# ==========================================================
# MODEL INFORMATION
# ==========================================================

def get_model_info():

    return {
        "model": "TF-IDF + Logistic Regression",
        "type": "Machine Learning Recommendation",
        "careers": len(model.classes_),
        "features": len(
            vectorizer.get_feature_names_out()
        )
    }


# ==========================================================
# BUILD INPUT TEXT
# ==========================================================

def prepare_input(
    skills=None,
    resume_text=None
):

    parts = []

    # ------------------------------------------------------
    # RESUME TEXT
    # ------------------------------------------------------

    if resume_text:

        resume_text = str(
            resume_text
        ).strip()

        if resume_text:

            parts.append(
                resume_text
            )

    # ------------------------------------------------------
    # DETECTED SKILLS
    # ------------------------------------------------------

    if skills:

        cleaned_skills = []

        for skill in skills:

            if skill is None:
                continue

            skill = str(
                skill
            ).strip()

            if skill:

                cleaned_skills.append(
                    skill
                )

        if cleaned_skills:

            parts.append(
                " ".join(
                    cleaned_skills
                )
            )

    # ------------------------------------------------------
    # FINAL INPUT
    # ------------------------------------------------------

    return " ".join(
        parts
    ).strip()


# ==========================================================
# NORMALIZE SKILL
# ==========================================================

def normalize_skill(skill):

    value = str(
        skill
    ).strip().lower()

    value = re.sub(
        r"\s+",
        " ",
        value
    )

    return SKILL_ALIASES.get(
        value,
        str(skill).strip()
    )


# ==========================================================
# GET USER SKILLS
# ==========================================================

def get_user_skill_set(
    user_skills=None,
    resume_text=None
):

    detected = []

    # ------------------------------------------------------
    # EXPLICIT USER SKILLS
    # ------------------------------------------------------

    if user_skills:

        for skill in user_skills:

            if skill is None:
                continue

            skill = str(
                skill
            ).strip()

            if skill:

                detected.append(
                    normalize_skill(skill)
                )

    # ------------------------------------------------------
    # RESUME TEXT
    # ------------------------------------------------------

    if resume_text:

        text = str(
            resume_text
        ).lower()

        # Check every known career skill
        for career_skills in CAREER_SKILLS.values():

            for skill in career_skills:

                pattern = re.escape(
                    skill.lower()
                )

                if re.search(
                    r"(?<!\w)"
                    + pattern
                    + r"(?!\w)",
                    text
                ):

                    detected.append(
                        normalize_skill(skill)
                    )

    # ------------------------------------------------------
    # REMOVE DUPLICATES
    # ------------------------------------------------------

    unique_skills = []

    seen = set()

    for skill in detected:

        key = skill.lower()

        if key not in seen:

            seen.add(key)

            unique_skills.append(
                skill
            )

    return unique_skills


# ==========================================================
# CALCULATE CAREER SKILL MATCH
# ==========================================================

def calculate_skill_match(
    career,
    user_skills
):

    required_skills = CAREER_SKILLS.get(
        career,
        []
    )

    user_skill_map = {
        normalize_skill(skill).lower()
        for skill in user_skills
    }

    matched = []
    missing = []

    for skill in required_skills:

        normalized = normalize_skill(
            skill
        )

        if normalized.lower() in user_skill_map:

            matched.append(
                normalized
            )

        else:

            missing.append(
                normalized
            )

    return matched, missing


# ==========================================================
# RECOMMEND CAREERS
# ==========================================================

def recommend_careers(
    user_skills=None,
    resume_text=None,
    top_n=5
):

    # ------------------------------------------------------
    # BUILD MODEL INPUT
    # ------------------------------------------------------

    input_text = prepare_input(
        skills=user_skills,
        resume_text=resume_text
    )

    if not input_text:

        return []

    # ------------------------------------------------------
    # USER SKILLS
    # ------------------------------------------------------

    detected_skills = get_user_skill_set(
        user_skills=user_skills,
        resume_text=resume_text
    )

    # ------------------------------------------------------
    # TF-IDF
    # ------------------------------------------------------

    input_vector = vectorizer.transform(
        [input_text]
    )

    # ------------------------------------------------------
    # ML PREDICTION
    # ------------------------------------------------------

    probabilities = model.predict_proba(
        input_vector
    )[0]

    classes = model.classes_

    # ------------------------------------------------------
    # RANK CAREERS
    # ------------------------------------------------------

    ranked = sorted(
        zip(
            classes,
            probabilities
        ),
        key=lambda x: x[1],
        reverse=True
    )

    # ------------------------------------------------------
    # BUILD RESPONSE
    # ------------------------------------------------------

    results = []

    for career, probability in ranked[:top_n]:

        matched, missing = calculate_skill_match(
            career,
            detected_skills
        )

        results.append({

            "Career": career,

            "Score": round(
                float(probability) * 100,
                2
            ),

            "Raw_Score": round(
                float(probability),
                4
            ),

            "Matched": matched,

            "Missing": missing

        })

    return results


# ==========================================================
# BEST CAREER
# ==========================================================

def get_best_career(
    user_skills=None,
    resume_text=None
):

    results = recommend_careers(
        user_skills=user_skills,
        resume_text=resume_text,
        top_n=1
    )

    if not results:

        return None

    return results[0]