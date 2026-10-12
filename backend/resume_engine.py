import re

from pypdf import PdfReader

from skill_dictionary import ALL_SKILLS
from skill_relationships import (
    canonicalize_skill,
    canonicalize_skills
)


# ==========================================================
# RESUME EXTRACTION ENGINE
# Based on Resume ↔ JD Matcher V3
# ==========================================================


# ==========================================================
# TEXT NORMALIZATION
# ==========================================================

def normalize_text(text):

    text = text.lower()

    replacements = {

        "powerbi": "power bi",
        "power-bi": "power bi",

        "scikit learn": "scikit-learn",
        "sci-kit learn": "scikit-learn",

        "machine-learning":
            "machine learning",

        "data-analysis":
            "data analysis",

        "data-analytics":
            "data analytics",

        "data-visualization":
            "data visualization",

        "data-cleaning":
            "data cleaning",

        "data-quality":
            "data quality",

        "data-management":
            "data management",

        "data-mining":
            "data mining",

        "data-extraction":
            "data extraction",

        "data-warehousing":
            "data warehousing",

        "business-intelligence":
            "business intelligence",

        "business-analytics":
            "business analytics",

        "predictive-modeling":
            "predictive modeling",

        "statistical-analysis":
            "statistical analysis",

        "exploratory-data-analysis":
            "exploratory data analysis",

        "advanced-excel":
            "advanced excel",

        "kpi-reporting":
            "kpi reporting",

        "requirements gathering":
            "requirement gathering",

        "natural-language-processing":
            "natural language processing"
    }

    for old, new in replacements.items():

        text = text.replace(
            old,
            new
        )

    text = re.sub(
        r"\s+",
        " ",
        text
    )

    return text.strip()


# ==========================================================
# EXTRACT PDF TEXT
# ==========================================================

def extract_pdf_text(file_path):

    reader = PdfReader(
        file_path
    )

    text = ""

    for page in reader.pages:

        page_text = page.extract_text()

        if page_text:

            text += page_text + "\n"

    return text


# ==========================================================
# EXTRACT RESUME SKILLS
# ==========================================================

def extract_skills(text):

    normalized_text = normalize_text(
        text
    )

    detected = []


    # ------------------------------------------------------
    # MASTER DICTIONARY SKILLS
    # ------------------------------------------------------

    for skill in ALL_SKILLS:

        normalized_skill = normalize_text(
            skill
        )

        # C and R handled separately

        if len(normalized_skill) <= 1:
            continue

        # Avoid duplicate KPI representation

        if normalized_skill == "kpi":
            continue

        pattern = re.escape(
            normalized_skill
        )

        if re.search(
            r"\b"
            + pattern
            + r"\b",
            normalized_text
        ):

            canonical = canonicalize_skill(
                normalized_skill
            )

            detected.append(
                canonical
            )


    # ------------------------------------------------------
    # C LANGUAGE
    # ------------------------------------------------------

    if (
        re.search(
            r"\bc\s+language\b",
            normalized_text
        )
        or
        re.search(
            r"\bc\s+programming\b",
            normalized_text
        )
    ):

        detected.append(
            "c"
        )


    # ------------------------------------------------------
    # R LANGUAGE
    # ------------------------------------------------------

    if (
        re.search(
            r"\br\s+programming\b",
            normalized_text
        )
        or
        re.search(
            r"\br\s+language\b",
            normalized_text
        )
    ):

        detected.append(
            "r"
        )


    # ------------------------------------------------------
    # UNIQUE CANONICAL SKILLS
    # ------------------------------------------------------

    return canonicalize_skills(
        detected
    )