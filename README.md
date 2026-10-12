# Skillix — AI-Powered Career Intelligence

Skillix is a career intelligence platform that helps users explore career paths, analyze resumes, and understand how their skills align with job descriptions.

## Features

- **Resume Analysis:** Extract text and identify relevant skills from uploaded resumes.
- **Career Recommendations:** Use a trained machine learning model to recommend potential career paths.
- **Job Description Matching:** Compare resumes with job descriptions to identify matching and missing skills.
- **User Authentication:** Registration and login functionality.
- **Career Discovery:** Explore career opportunities through an interactive web interface.

## Tech Stack

**Frontend**
- React
- Vite
- React Router

**Backend**
- Python
- FastAPI
- SQLite
- JWT authentication

**Machine Learning**
- Scikit-learn
- Joblib
- TF-IDF-based text processing
- PDF extraction using pypdf

## Project Structure

```text
Skillix/
├── backend/
│   ├── app.py
│   ├── auth.py
│   ├── career_engine.py
│   ├── database.py
│   ├── jd_engine.py
│   └── resume_engine.py
├── frontend/
│   ├── src/
│   ├── public/
│   └── package.json
├── career_recommender_model.pkl
├── career_tfidf_vectorizer.pkl
├── skill_dictionary.py
├── skill_relationships.py
└── requirements.txt
```

## Getting Started

### 1. Clone the repository

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
cd Skillix
```

### 2. Set up the Python environment

```bash
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
```

### 3. Start the backend

From the project root:

```bash
uvicorn backend.app:app --reload
```

Open `http://127.0.0.1:8000/docs` to access the FastAPI documentation.

### 4. Start the frontend

Open a second terminal:

```bash
cd frontend
npm install
npm run dev
```

Open the local URL displayed by Vite.

## Security

- Never commit API secrets, passwords, or `.env` files.
- Keep personal resumes and private user data out of the public repository.
- Use local environment variables for required configuration.

## Project Status

Skillix is an ongoing project combining web development, resume processing, and machine learning for career exploration.

---

Built with React, FastAPI, and machine learning.
