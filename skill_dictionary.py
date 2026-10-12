# ==========================================================
# MASTER SKILL DICTIONARY
# ==========================================================

SKILL_DICTIONARY = {

    # ------------------------------------------------------
    # PROGRAMMING LANGUAGES
    # ------------------------------------------------------

    "programming": [
        "python",
        "java",
        "c",
        "c++",
        "c#",
        "javascript",
        "typescript",
        "r",
        "scala",
        "go",
        "ruby",
        "php"
    ],


    # ------------------------------------------------------
    # DATA SCIENCE
    # ------------------------------------------------------

    "data_science": [
        "numpy",
        "pandas",
        "matplotlib",
        "seaborn",
        "scikit-learn",
        "scikit learn",
        "tensorflow",
        "pytorch",
        "keras",
        "scipy",
        "statsmodels",
        "machine learning",
        "deep learning",
        "artificial intelligence",
        "natural language processing",
        "nlp",
        "computer vision",
        "neural networks",
        "predictive modeling",
        "data mining",
        "feature engineering",
        "model evaluation",
        "regression",
        "classification",
        "clustering",
        "time series",
        "reinforcement learning"
    ],


    # ------------------------------------------------------
    # DATA ANALYTICS
    # ------------------------------------------------------

    "analytics": [
        "data analysis",
        "data analytics",
        "data visualization",
        "exploratory data analysis",
        "eda",
        "statistical analysis",
        "statistics",
        "statistical modeling",
        "data cleaning",
        "data cleansing",
        "data preprocessing",
        "data extraction",
        "data transformation",
        "data quality",
        "data management",
        "data modeling",
        "data reporting",
        "reporting",
        "kpi",
        "kpi reporting",
        "business intelligence",
        "business analytics",
        "dashboard development",
        "dashboards"
    ],


    # ------------------------------------------------------
    # DATABASES & SQL
    # ------------------------------------------------------

    "databases": [
        "sql",
        "mysql",
        "postgresql",
        "postgres",
        "oracle",
        "mongodb",
        "nosql",
        "database",
        "database management",
        "database design",
        "rdbms",
        "sql server",
        "microsoft sql server",
        "sqlite",
        "redis"
    ],


    # ------------------------------------------------------
    # BI & VISUALIZATION TOOLS
    # ------------------------------------------------------

    "bi_tools": [
        "tableau",
        "power bi",
        "powerbi",
        "excel",
        "advanced excel",
        "google sheets",
        "looker",
        "qlik",
        "qlik sense",
        "power query",
        "power pivot"
    ],


    # ------------------------------------------------------
    # BIG DATA
    # ------------------------------------------------------

    "big_data": [
        "hadoop",
        "spark",
        "pyspark",
        "hive",
        "kafka",
        "databricks",
        "bigquery",
        "snowflake",
        "data lake",
        "data warehouse",
        "data warehousing",
        "etl",
        "elt",
        "data engineering",
        "data pipeline"
    ],


    # ------------------------------------------------------
    # CLOUD
    # ------------------------------------------------------

    "cloud": [
        "aws",
        "amazon web services",
        "azure",
        "microsoft azure",
        "google cloud",
        "gcp",
        "google cloud platform",
        "ec2",
        "s3",
        "lambda",
        "azure data lake",
        "azure data factory"
    ],


    # ------------------------------------------------------
    # WEB DEVELOPMENT
    # ------------------------------------------------------

    "web": [
        "html",
        "css",
        "javascript",
        "typescript",
        "react",
        "react.js",
        "node.js",
        "nodejs",
        "express",
        "express.js",
        "next.js",
        "nextjs",
        "frontend",
        "front end",
        "backend",
        "back end",
        "full stack",
        "rest api",
        "api"
    ],


    # ------------------------------------------------------
    # SOFTWARE DEVELOPMENT
    # ------------------------------------------------------

    "software": [
        "software development",
        "software engineering",
        "object oriented programming",
        "oop",
        "data structures",
        "algorithms",
        "api development",
        "microservices",
        "unit testing",
        "integration testing",
        "functional testing",
        "debugging",
        "system design",
        "application development"
    ],


    # ------------------------------------------------------
    # DEVELOPMENT TOOLS
    # ------------------------------------------------------

    "tools": [
        "git",
        "github",
        "gitlab",
        "docker",
        "kubernetes",
        "jupyter",
        "jupyter notebook",
        "vs code",
        "visual studio code",
        "postman",
        "jira",
        "confluence"
    ],


    # ------------------------------------------------------
    # BUSINESS ANALYSIS
    # ------------------------------------------------------

    "business_analysis": [
        "business analysis",
        "business analyst",
        "business process",
        "requirement gathering",
        "requirements gathering",
        "requirements analysis",
        "stakeholder management",
        "stakeholder engagement",
        "business requirements",
        "brd",
        "functional requirements",
        "user stories",
        "use cases",
        "gap analysis",
        "process improvement",
        "agile",
        "scrum",
        "kanban",
        "user acceptance testing",
        "uat",
        "product management",
        "project management"
    ],


    # ------------------------------------------------------
    # GENERAL PROFESSIONAL SKILLS
    # ------------------------------------------------------

    "professional": [
        "communication",
        "leadership",
        "teamwork",
        "problem solving",
        "analytical skills",
        "critical thinking",
        "research",
        "time management",
        "presentation",
        "documentation",
        "collaboration",
        "decision making"
    ]
}


# ==========================================================
# CREATE FLAT SKILL LIST
# ==========================================================

ALL_SKILLS = []

for category, skills in SKILL_DICTIONARY.items():

    for skill in skills:

        if skill not in ALL_SKILLS:

            ALL_SKILLS.append(skill)


# ==========================================================
# DISPLAY SUMMARY
# ==========================================================

if __name__ == "__main__":

    print("=" * 70)
    print("MASTER SKILL DICTIONARY")
    print("=" * 70)

    print(
        "\nCategories:",
        len(SKILL_DICTIONARY)
    )

    print(
        "Total unique skills:",
        len(ALL_SKILLS)
    )

    print("\n")

    for category, skills in SKILL_DICTIONARY.items():

        print(
            f"{category}: {len(skills)} skills"
        )

    print("\n")

    print(
        "✓ Skill dictionary loaded successfully."
    )