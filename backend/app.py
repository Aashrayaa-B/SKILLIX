from backend.auth import router as auth_router
from backend.database import init_db
from fastapi import (
    FastAPI,
    UploadFile,
    File,
    Form,
    HTTPException,
)
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional

import os
import re
import tempfile
import hashlib

from backend.resume_engine import (
    extract_pdf_text,
    extract_skills,
)
from backend.career_engine import recommend_careers
from backend.jd_engine import (
    InvalidJobDescriptionError,
    match_resume_to_jd,
    match_resume_to_jd_text,
)


# ==========================================================
# CAREERINTEL BACKEND
# ==========================================================

app = FastAPI(
    title="CareerIntel API",
    description="Career intelligence and job matching backend",
    version="2.0.0",
)

# ==========================================================
# AUTHENTICATION AND DATABASE INITIALIZATION
# ==========================================================

app.include_router(auth_router)


@app.on_event("startup")
def startup_event():
    init_db()


# ==========================================================
# CORS
# ==========================================================

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# ==========================================================
# DISCOVER PROFILE REQUEST
# ==========================================================

class DiscoverProfile(BaseModel):
    experience: str = "Student / Fresher"
    skills: list[str] = []
    interests: list[str] = []


# ==========================================================
# DOCUMENT VALIDATION HELPERS
# ==========================================================

RESUME_PATTERNS = [
    r"\bcurriculum vitae\b",
    r"\bpersonal profile\b",
    r"\bcareer objective\b",
    r"\bprofessional summary\b",
    r"\beducation profile\b",
    r"\bdate of birth\b",
    r"\bmarital status\b",
    r"\bcontact details\b",
    r"\bdeclaration\b",
    r"\bfather\s*/?\s*guardian\s*name\b",
]

JD_PATTERNS = [
    r"\bjob description\b",
    r"\bjob title\b",
    r"\bposition summary\b",
    r"\brole overview\b",
    r"\brequired skills\b",
    r"\bpreferred skills\b",
    r"\bresponsibilities\b",
    r"\bqualifications\b",
    r"\bjob requirements\b",
    r"\bwhat you will do\b",
    r"\bwhat you'll do\b",
    r"\babout the role\b",
    r"\bwe are looking for\b",
    r"\bthe ideal candidate\b",
    r"\bkey duties\b",
]


def looks_like_resume(text: str) -> bool:
    """Identify documents containing multiple resume-specific signals."""
    normalized = text.lower()

    matches = sum(
        bool(re.search(pattern, normalized))
        for pattern in RESUME_PATTERNS
    )

    return matches >= 2


def looks_like_job_description(text: str) -> bool:
    """Look for recognizable job-description structure."""
    normalized = text.lower()

    indicators = sum(
        bool(re.search(pattern, normalized))
        for pattern in JD_PATTERNS
    )

    return indicators >= 1


def validate_resume_document(text: str) -> None:
    """Reject unreadable PDFs and obvious job descriptions."""
    if not text or not text.strip():
        raise HTTPException(
            status_code=400,
            detail=(
                "We couldn't extract text from this resume. "
                "Please upload a readable, text-based resume PDF."
            ),
        )

    if looks_like_job_description(text) and not looks_like_resume(text):
        raise HTTPException(
            status_code=400,
            detail=(
                "The document in the resume field appears to be "
                "a job description, not a resume. Please upload "
                "your resume in the first field."
            ),
        )


def validate_job_description_document(text: str) -> None:
    """Reject unreadable PDFs and obvious resumes."""
    if not text or not text.strip():
        raise HTTPException(
            status_code=400,
            detail=(
                "This PDF contains no extractable text. "
                "Please upload a readable job description."
            ),
        )

    if looks_like_resume(text):
        raise HTTPException(
            status_code=400,
            detail=(
                "The uploaded document appears to be a resume, "
                "not a job description. Please upload a valid "
                "job description."
            ),
        )


# ==========================================================
# ROOT
# ==========================================================

@app.get("/")
def root():
    return {
        "message": "CareerIntel API is running",
        "status": "ok",
    }


# ==========================================================
# HEALTH CHECK
# ==========================================================

@app.get("/health")
def health():
    return {
        "status": "healthy",
        "service": "CareerIntel API",
    }


# ==========================================================
# DISCOVER CAREERS
# ==========================================================

@app.post("/discover-careers")
async def discover_careers(data: dict):
    try:
        skills = data.get("skills", [])
        experience = data.get(
            "experience", "Student / Fresher"
        )
        interests = data.get("interests", [])

        if not skills:
            raise HTTPException(
                status_code=400,
                detail="Please select at least one skill.",
            )

        skills = [
            str(skill).strip()
            for skill in skills
            if str(skill).strip()
        ]

        if not skills:
            raise HTTPException(
                status_code=400,
                detail="Please select at least one valid skill.",
            )

        career_recommendations = recommend_careers(skills)

        best_career = (
            career_recommendations[0]
            if career_recommendations
            else None
        )

        return {
            "skills": skills,
            "experience": experience,
            "interests": interests,
            "career_recommendations": career_recommendations,
            "best_career": best_career,
        }

    except HTTPException:
        raise

    except Exception as exc:
        raise HTTPException(
            status_code=500,
            detail=str(exc),
        )


# ==========================================================
# ANALYZE RESUME
# ==========================================================

@app.post("/analyze-resume")
async def analyze_resume(file: UploadFile = File(...)):
    temp_path = None

    try:
        if not file.filename:
            raise HTTPException(
                status_code=400,
                detail="No file selected.",
            )

        if not file.filename.lower().endswith(".pdf"):
            raise HTTPException(
                status_code=400,
                detail="Only PDF files are supported.",
            )

        with tempfile.NamedTemporaryFile(
            delete=False,
            suffix=".pdf",
        ) as temp_file:
            contents = await file.read()
            temp_file.write(contents)
            temp_path = temp_file.name

        try:
            resume_text = extract_pdf_text(temp_path)
        except Exception:
            raise HTTPException(
                status_code=400,
                detail="Invalid or corrupted PDF file.",
            )

        validate_resume_document(resume_text)

        skills = extract_skills(resume_text)

        career_recommendations = recommend_careers(
            user_skills=skills,
            resume_text=resume_text,
        )

        best_career = (
            career_recommendations[0]
            if career_recommendations
            else None
        )

        return {
            "filename": file.filename,
            "skills_detected": len(skills),
            "skills": skills,
            "career_recommendations": career_recommendations,
            "best_career": best_career,
        }

    except HTTPException:
        raise

    except Exception:
        raise HTTPException(
            status_code=500,
            detail="An unexpected error occurred while analyzing the resume.",
        )

    finally:
        if temp_path and os.path.exists(temp_path):
            os.remove(temp_path)


# ==========================================================
# MATCH RESUME WITH JOB DESCRIPTION
# ==========================================================

@app.post("/match-job")
async def match_job(
    resume: UploadFile = File(...),
    job_description: Optional[UploadFile] = File(None),
    job_description_text: Optional[str] = Form(None),
):
    resume_path = None
    jd_path = None

    try:
        # --------------------------------------------------
        # VALIDATE FILE SELECTIONS
        # --------------------------------------------------

        if not resume.filename:
            raise HTTPException(
                status_code=400,
                detail="Resume file is required.",
            )

        if not resume.filename.lower().endswith(".pdf"):
            raise HTTPException(
                status_code=400,
                detail="Resume must be a PDF.",
            )

        has_pdf = (
            job_description is not None
            and bool(job_description.filename)
        )

        has_text = (
            job_description_text is not None
            and bool(job_description_text.strip())
        )

        if not has_pdf and not has_text:
            raise HTTPException(
                status_code=400,
                detail=(
                    "Please upload a job description PDF "
                    "or paste the job description text."
                ),
            )

        if has_pdf and has_text:
            raise HTTPException(
                status_code=400,
                detail=(
                    "Please provide either a job description PDF "
                    "or pasted text, not both."
                ),
            )

        # --------------------------------------------------
        # READ RESUME FILE
        # --------------------------------------------------

        resume_contents = await resume.read()

        if not resume_contents:
            raise HTTPException(
                status_code=400,
                detail="The resume PDF is empty.",
            )

        with tempfile.NamedTemporaryFile(
            delete=False,
            suffix=".pdf",
        ) as temp_resume:
            temp_resume.write(resume_contents)
            resume_path = temp_resume.name

        try:
            resume_text = extract_pdf_text(resume_path)
        except Exception:
            raise HTTPException(
                status_code=400,
                detail=(
                    "We couldn't read the resume PDF. "
                    "Please upload a valid, readable PDF."
                ),
            )

        validate_resume_document(resume_text)

        # --------------------------------------------------
        # JOB DESCRIPTION PDF
        # --------------------------------------------------

        if has_pdf:
            if not job_description.filename.lower().endswith(".pdf"):
                raise HTTPException(
                    status_code=400,
                    detail="Job description must be a PDF.",
                )

            jd_contents = await job_description.read()

            if not jd_contents:
                raise HTTPException(
                    status_code=400,
                    detail="The job description PDF is empty.",
                )

            # Compare actual file contents, not filenames.
            resume_hash = hashlib.sha256(
                resume_contents
            ).hexdigest()

            jd_hash = hashlib.sha256(
                jd_contents
            ).hexdigest()

            if resume_hash == jd_hash:
                raise HTTPException(
                    status_code=400,
                    detail=(
                        "The same PDF was uploaded in both fields. "
                        "Please upload your resume in the first field "
                        "and a different, valid job description in "
                        "the second field."
                    ),
                )

            with tempfile.NamedTemporaryFile(
                delete=False,
                suffix=".pdf",
            ) as temp_jd:
                temp_jd.write(jd_contents)
                jd_path = temp_jd.name

            try:
                jd_text = extract_pdf_text(jd_path)
            except Exception:
                raise HTTPException(
                    status_code=400,
                    detail=(
                        "We couldn't read this job description PDF. "
                        "Please upload a valid, readable PDF."
                    ),
                )

            validate_job_description_document(jd_text)

            try:
                result = match_resume_to_jd(
                    resume_path,
                    jd_path,
                )
            except InvalidJobDescriptionError as exc:
                raise HTTPException(
                    status_code=400,
                    detail=str(exc),
                )
            except ValueError as exc:
                raise HTTPException(
                    status_code=400,
                    detail=str(exc),
                )

            job_description_filename = job_description.filename

        # --------------------------------------------------
        # JOB DESCRIPTION TEXT
        # --------------------------------------------------

        else:
            cleaned_jd_text = job_description_text.strip()

            if looks_like_resume(cleaned_jd_text):
                raise HTTPException(
                    status_code=400,
                    detail=(
                        "The supplied text appears to be a resume, "
                        "not a job description. Please provide a "
                        "valid job description."
                    ),
                )

            try:
                result = match_resume_to_jd_text(
                    resume_path,
                    cleaned_jd_text,
                )
            except InvalidJobDescriptionError as exc:
                raise HTTPException(
                    status_code=400,
                    detail=str(exc),
                )
            except ValueError as exc:
                raise HTTPException(
                    status_code=400,
                    detail=str(exc),
                )

            job_description_filename = "Pasted job description"

        # --------------------------------------------------
        # SUCCESSFUL RESPONSE
        # --------------------------------------------------

        return {
            "resume_filename": resume.filename,
            "job_description_filename": job_description_filename,
            **result,
        }

    except HTTPException:
        raise

    except Exception:
        raise HTTPException(
            status_code=500,
            detail=(
                "An unexpected error occurred while matching the job."
            ),
        )

    finally:
        if resume_path and os.path.exists(resume_path):
            os.remove(resume_path)

        if jd_path and os.path.exists(jd_path):
            os.remove(jd_path)
