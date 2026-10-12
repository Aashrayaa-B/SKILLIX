
import re

from backend.resume_engine import (
    extract_pdf_text,
    extract_skills,
    normalize_text,
)
from skill_relationships import (
    canonicalize_skill,
    canonicalize_skills,
    get_related_skills,
)


# ==========================================================
# JD MATCHING ENGINE
# ==========================================================

REQUIRED_WEIGHT = 0.70
PREFERRED_WEIGHT = 0.30
RELATED_MATCH_MULTIPLIER = 0.70


class InvalidJobDescriptionError(ValueError):
    """Raised when uploaded job-description content is invalid."""


# ==========================================================
# JOB DESCRIPTION VALIDATION
# ==========================================================

JD_INDICATORS = re.compile(
    r"\b("
    r"job description|"
    r"job title|"
    r"position summary|"
    r"role overview|"
    r"responsibilities|"
    r"required skills|"
    r"preferred skills|"
    r"qualifications|"
    r"key duties|"
    r"what you will do|"
    r"what you'll do|"
    r"we are looking for|"
    r"the ideal candidate|"
    r"candidate should|"
    r"your role|"
    r"about the role|"
    r"employment type|"
    r"job requirements"
    r")\b",
    re.IGNORECASE,
)

RESUME_INDICATORS = re.compile(
    r"\b("
    r"curriculum vitae|"
    r"resume|"
    r"personal profile|"
    r"career objective|"
    r"professional summary|"
    r"projects completed|"
    r"academic projects|"
    r"date of birth|"
    r"declaration"
    r")\b",
    re.IGNORECASE,
)


def validate_job_description_text(text):
    """
    Validate job-description content before calculating a score.

    Raises InvalidJobDescriptionError when the content is empty,
    unreadable, appears to be a resume, or lacks job-description
    indicators and detectable skills.
    """
    if not text or not text.strip():
        raise InvalidJobDescriptionError(
            "The job description is empty or unreadable. "
            "Please upload a readable job description PDF "
            "or paste the job description text."
        )

    normalized_text = normalize_text(text)

    if len(normalized_text.split()) < 15:
        raise InvalidJobDescriptionError(
            "The uploaded document contains too little text "
            "to validate. Please upload a complete, readable "
            "job description."
        )

    has_jd_indicators = bool(JD_INDICATORS.search(normalized_text))
    has_resume_indicators = bool(
        RESUME_INDICATORS.search(normalized_text)
    )

    detected_skills = extract_skills(normalized_text)

    # Reject obvious resumes when they do not contain
    # recognizable job-description structure.
    if has_resume_indicators and not has_jd_indicators:
        raise InvalidJobDescriptionError(
            "This document appears to be a resume, not a job "
            "description. Please upload a valid job description."
        )

    # A job description should have recognizable role-related
    # wording and/or detectable skills.
    if not has_jd_indicators and len(detected_skills) < 3:
        raise InvalidJobDescriptionError(
            "Please upload a valid job description containing "
            "the role, responsibilities, qualifications, or "
            "required skills."
        )

    if not detected_skills:
        raise InvalidJobDescriptionError(
            "We couldn't detect relevant skills in this job "
            "description. Please upload a job description "
            "that includes role requirements or skills."
        )

    return normalized_text


# ==========================================================
# EXTRACT REQUIRED / PREFERRED JD SKILLS
# ==========================================================

def extract_jd_skill_groups(text):
    normalized_text = normalize_text(text)

    required_section = ""
    required_match = re.search(
        r"required\s+skills(.*?)"
        r"(?="
        r"preferred\s+skills|"
        r"responsibilities|"
        r"requirements|"
        r"qualifications|"
        r"what\s+you(?:'|’)ll\s+do|"
        r"what\s+you\s+will\s+do|"
        r"about\s+the\s+role|"
        r"education|"
        r"experience|"
        r"about\s+the\s+company|"
        r"about\s+careerintel|"
        r"$)",
        normalized_text,
        re.IGNORECASE,
    )

    if required_match:
        required_section = required_match.group(1)

    preferred_section = ""
    preferred_match = re.search(
        r"preferred\s+skills(.*?)"
        r"(?="
        r"responsibilities|"
        r"requirements|"
        r"qualifications|"
        r"what\s+you(?:'|’)ll\s+do|"
        r"what\s+you\s+will\s+do|"
        r"about\s+the\s+role|"
        r"education|"
        r"experience|"
        r"about\s+the\s+company|"
        r"about\s+careerintel|"
        r"$)",
        normalized_text,
        re.IGNORECASE,
    )

    if preferred_match:
        preferred_section = preferred_match.group(1)

    required_skills = extract_skills(required_section)
    preferred_skills = extract_skills(preferred_section)

    # If explicit required/preferred sections are unavailable,
    # treat detected skills as required skills.
    if not required_skills and not preferred_skills:
        required_skills = extract_skills(normalized_text)

    return (
        sorted(set(required_skills)),
        sorted(set(preferred_skills)),
    )


# ==========================================================
# FIND BEST MATCH FOR A JD SKILL
# ==========================================================

def find_best_skill_match(jd_skill, resume_skills):
    jd_skill = canonicalize_skill(jd_skill)
    resume_skills = set(canonicalize_skills(resume_skills))

    # Exact match
    if jd_skill in resume_skills:
        return {
            "score": 1.0,
            "type": "Exact",
            "matched_skill": jd_skill,
        }

    # Related match
    related_skills = get_related_skills(jd_skill)
    best_score = 0.0
    best_skill = None

    for resume_skill in resume_skills:
        relationship_score = related_skills.get(
            resume_skill, 0.0
        )

        if relationship_score > best_score:
            best_score = relationship_score
            best_skill = resume_skill

        reverse_relationships = get_related_skills(
            resume_skill
        )
        reverse_score = reverse_relationships.get(
            jd_skill, 0.0
        )

        if reverse_score > best_score:
            best_score = reverse_score
            best_skill = resume_skill

    if best_score > 0:
        return {
            "score": best_score,
            "type": "Related",
            "matched_skill": best_skill,
        }

    return {
        "score": 0.0,
        "type": "Missing",
        "matched_skill": None,
    }


# ==========================================================
# SCORE SKILL GROUP
# ==========================================================

def score_skill_group(jd_skills, resume_skills):
    if not jd_skills:
        return {
            "score": 0.0,
            "matches": [],
            "missing": [],
        }

    total_score = 0.0
    matches = []
    missing = []

    for jd_skill in jd_skills:
        match = find_best_skill_match(
            jd_skill, resume_skills
        )
        total_score += match["score"]

        if match["score"] == 1.0:
            matches.append({
                "jd_skill": jd_skill,
                "matched_skill": match["matched_skill"],
                "type": "Exact",
                "score": 100.0,
            })
        elif match["score"] > 0:
            matches.append({
                "jd_skill": jd_skill,
                "matched_skill": match["matched_skill"],
                "type": "Related",
                "score": match["score"] * 100,
            })
        else:
            missing.append(jd_skill)

    score = (total_score / len(jd_skills)) * 100

    return {
        "score": score,
        "matches": matches,
        "missing": missing,
    }


# ==========================================================
# CALCULATE COMPLETE JOB MATCH
# ==========================================================

def calculate_job_match(
    resume_skills,
    required_skills,
    preferred_skills,
):
    required_result = score_skill_group(
        required_skills, resume_skills
    )
    preferred_result = score_skill_group(
        preferred_skills, resume_skills
    )

    required_score = required_result["score"]
    preferred_score = preferred_result["score"]

    if required_skills and preferred_skills:
        overall_score = (
            required_score * REQUIRED_WEIGHT
            + preferred_score * PREFERRED_WEIGHT
        )
    elif required_skills:
        overall_score = required_score
    elif preferred_skills:
        overall_score = preferred_score
    else:
        raise InvalidJobDescriptionError(
            "No job-related skills could be extracted. "
            "Please upload a more complete job description."
        )

    all_jd_skills = set(
        canonicalize_skills(
            required_skills + preferred_skills
        )
    )
    resume_set = set(canonicalize_skills(resume_skills))

    extra_resume_skills = sorted(resume_set - all_jd_skills)

    if overall_score >= 80:
        fit_level = "Excellent Match"
    elif overall_score >= 65:
        fit_level = "Strong Match"
    elif overall_score >= 50:
        fit_level = "Good Match"
    elif overall_score >= 35:
        fit_level = "Moderate Match"
    else:
        fit_level = "Low Match"

    return {
        "required_score": round(required_score, 2),
        "preferred_score": round(preferred_score, 2),
        "overall_score": round(overall_score, 2),
        "fit_level": fit_level,
        "required_matches": required_result["matches"],
        "required_missing": required_result["missing"],
        "preferred_matches": preferred_result["matches"],
        "preferred_missing": preferred_result["missing"],
        "extra_resume_skills": extra_resume_skills,
        "required_skills": required_skills,
        "preferred_skills": preferred_skills,
    }


# ==========================================================
# COMPLETE PDF → JD MATCH
# ==========================================================

def match_resume_to_jd(resume_pdf_path, jd_pdf_path):
    resume_text = extract_pdf_text(resume_pdf_path)

    if not resume_text.strip():
        raise ValueError(
            "We couldn't read text from your resume PDF. "
            "Please upload a text-based PDF."
        )

    resume_skills = extract_skills(resume_text)

    jd_text = extract_pdf_text(jd_pdf_path)
    jd_text = validate_job_description_text(jd_text)

    required_skills, preferred_skills = (
        extract_jd_skill_groups(jd_text)
    )

    result = calculate_job_match(
        resume_skills,
        required_skills,
        preferred_skills,
    )

    result["resume_skills"] = resume_skills
    result["resume_skills_detected"] = len(resume_skills)
    result["jd_skills_detected"] = len(
        set(required_skills + preferred_skills)
    )

    return result


# ==========================================================
# RESUME PDF + TEXT JOB DESCRIPTION MATCH
# ==========================================================

def match_resume_to_jd_text(resume_pdf_path, jd_text):
    resume_text = extract_pdf_text(resume_pdf_path)

    if not resume_text.strip():
        raise ValueError(
            "We couldn't read text from your resume PDF. "
            "Please upload a text-based PDF."
        )

    resume_skills = extract_skills(resume_text)
    jd_text = validate_job_description_text(jd_text)

    required_skills, preferred_skills = (
        extract_jd_skill_groups(jd_text)
    )

    result = calculate_job_match(
        resume_skills,
        required_skills,
        preferred_skills,
    )

    result["resume_skills"] = resume_skills
    result["resume_skills_detected"] = len(resume_skills)
    result["jd_skills_detected"] = len(
        set(required_skills + preferred_skills)
    )

    return result


if __name__ == "__main__":
    import sys
    from pprint import pprint

    if len(sys.argv) != 3:
        print(
            "Usage: python -m backend.jd_engine "
            "<resume.pdf> <job_description.pdf>"
        )
        raise SystemExit(1)

    try:
        result = match_resume_to_jd(
            sys.argv[1], sys.argv[2]
        )
        pprint(result)
    except (ValueError, InvalidJobDescriptionError) as exc:
        print(f"Validation error: {exc}")
        raise SystemExit(1)
