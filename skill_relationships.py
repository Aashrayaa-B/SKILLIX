# ==========================================================
# CAREERINTEL — SKILL RELATIONSHIPS
# ==========================================================
#
# This file defines:
#
# 1. Canonical skill names
# 2. Exact aliases
# 3. Related skills
#
# IMPORTANT:
# Exact aliases receive 100% match.
# Related skills receive partial match later.
#
# We intentionally DO NOT merge:
#
#   excel != advanced excel
#   statistics != statistical analysis
#
# ==========================================================


# ==========================================================
# 1. EXACT ALIASES
# ==========================================================

EXACT_ALIASES = {

    # ------------------------------------------------------
    # BI
    # ------------------------------------------------------

    "powerbi":
        "power bi",

    "power-bi":
        "power bi",

    "power bi":
        "power bi",


    # ------------------------------------------------------
    # SCIKIT LEARN
    # ------------------------------------------------------

    "scikit learn":
        "scikit-learn",

    "sci-kit learn":
        "scikit-learn",

    "scikit-learn":
        "scikit-learn",


    # ------------------------------------------------------
    # JUPYTER
    # ------------------------------------------------------

    "jupyter":
        "jupyter notebook",

    "jupyter notebook":
        "jupyter notebook",


    # ------------------------------------------------------
    # VS CODE
    # ------------------------------------------------------

    "visual studio code":
        "vs code",

    "vs code":
        "vs code",


    # ------------------------------------------------------
    # NODE
    # ------------------------------------------------------

    "nodejs":
        "node.js",

    "node.js":
        "node.js",


    # ------------------------------------------------------
    # REACT
    # ------------------------------------------------------

    "reactjs":
        "react",

    "react.js":
        "react",


    # ------------------------------------------------------
    # EDA
    # ------------------------------------------------------

    "eda":
        "exploratory data analysis",

    "exploratory data analysis":
        "exploratory data analysis",


    # ------------------------------------------------------
    # KPI
    # ------------------------------------------------------

    "kpi":
        "kpi reporting",

    "kpi reporting":
        "kpi reporting"
}


# ==========================================================
# 2. IMPORTANT DISTINCTIONS
# ==========================================================
#
# These are intentionally NOT aliases.
#
# Excel and Advanced Excel are different.
#
# Statistics and Statistical Analysis are different.
#
# Data Analysis and Data Analytics are different.
#
# Machine Learning and Deep Learning are different.
#
# Data Science and Data Scientist are different.
#
# ==========================================================


SEPARATE_SKILLS = {

    "excel",
    "advanced excel",

    "statistics",
    "statistical analysis",

    "data analysis",
    "data analytics",

    "machine learning",
    "deep learning",

    "data visualization",
    "data reporting",

    "data mining",
    "data extraction",

    "data management",
    "data quality",

    "business intelligence",
    "business analytics"
}


# ==========================================================
# 3. RELATED SKILLS
# ==========================================================
#
# These relationships are NOT exact matches.
#
# We will use them later for partial credit.
#
# Example:
#
# Resume:
#     statistical analysis
#
# JD:
#     statistics
#
# This should NOT be treated as a 100% exact match.
#
# ==========================================================


RELATED_SKILLS = {

    "statistics": {

        "statistical analysis": 0.70

    },

    "statistical analysis": {

        "statistics": 0.70

    },


    "data analysis": {

        "data analytics": 0.75

    },

    "data analytics": {

        "data analysis": 0.75

    },


    "machine learning": {

        "deep learning": 0.50

    },

    "deep learning": {

        "machine learning": 0.70

    },


    "data visualization": {

        "dashboard development": 0.60,

        "dashboards": 0.60

    }

}


# ==========================================================
# 4. CANONICALIZE SKILL
# ==========================================================

def canonicalize_skill(skill):

    skill = (
        skill
        .strip()
        .lower()
    )

    return EXACT_ALIASES.get(
        skill,
        skill
    )


# ==========================================================
# 5. CANONICALIZE SKILL LIST
# ==========================================================

def canonicalize_skills(skills):

    return sorted(
        set(
            canonicalize_skill(skill)
            for skill in skills
        )
    )


# ==========================================================
# 6. GET RELATED SKILLS
# ==========================================================

def get_related_skills(skill):

    skill = canonicalize_skill(
        skill
    )

    return RELATED_SKILLS.get(
        skill,
        {}
    )