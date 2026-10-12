
import os
import re
from datetime import datetime, timedelta, timezone

import jwt
from jwt.exceptions import InvalidTokenError
from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from passlib.context import CryptContext
from pydantic import BaseModel, EmailStr, Field

from backend.database import (
    create_user,
    get_user_by_email,
    get_user_by_id,
    init_db,
)

router = APIRouter(prefix="/auth", tags=["Authentication"])

bearer_scheme = HTTPBearer(auto_error=False)

password_context = CryptContext(
    schemes=["bcrypt"],
    deprecated="auto",
)

JWT_SECRET = os.getenv("SKILLIX_JWT_SECRET", "")

if len(JWT_SECRET) < 32:
    raise RuntimeError(
        "SKILLIX_JWT_SECRET must be configured with "
        "a secure secret of at least 32 characters."
    )

JWT_ALGORITHM = "HS256"
TOKEN_EXPIRE_HOURS = 12


class SignupRequest(BaseModel):
    name: str = Field(min_length=2, max_length=100)
    email: EmailStr
    password: str = Field(min_length=8, max_length=72)


class LoginRequest(BaseModel):
    email: EmailStr
    password: str = Field(min_length=1, max_length=72)


def public_user(user):
    return {
        "id": user["id"],
        "name": user["name"],
        "email": user["email"],
    }


def create_access_token(user_id):
    now = datetime.now(timezone.utc)

    payload = {
        "sub": str(user_id),
        "iat": now,
        "exp": now + timedelta(hours=TOKEN_EXPIRE_HOURS),
    }

    return jwt.encode(
        payload,
        JWT_SECRET,
        algorithm=JWT_ALGORITHM,
    )


@router.post("/signup", status_code=status.HTTP_201_CREATED)
def signup(data: SignupRequest):
    name = data.name.strip()
    email = str(data.email).strip().lower()

    if len(name) < 2 or not re.search(r"[A-Za-z]", name):
        raise HTTPException(
            status_code=400,
            detail="Please enter a valid full name.",
        )

    init_db()

    if get_user_by_email(email):
        raise HTTPException(
            status_code=409,
            detail="An account with this email already exists.",
        )

    password_hash = password_context.hash(data.password)

    try:
        user_id = create_user(
            name,
            email,
            password_hash,
        )
    except Exception as exc:
        if get_user_by_email(email):
            raise HTTPException(
                status_code=409,
                detail="An account with this email already exists.",
            ) from exc

        raise HTTPException(
            status_code=500,
            detail="Unable to create your account right now.",
        ) from exc

    user = get_user_by_id(user_id)

    return {
        "message": "Account created successfully.",
        "access_token": create_access_token(user_id),
        "token_type": "bearer",
        "user": public_user(user),
    }


@router.post("/login")
def login(data: LoginRequest):
    init_db()

    email = str(data.email).strip().lower()
    user = get_user_by_email(email)

    if not user or not password_context.verify(
        data.password,
        user["password_hash"],
    ):
        raise HTTPException(
            status_code=401,
            detail="Incorrect email or password.",
        )

    return {
        "message": "Login successful.",
        "access_token": create_access_token(user["id"]),
        "token_type": "bearer",
        "user": public_user(user),
    }


def get_current_user(
    credentials: HTTPAuthorizationCredentials = Depends(
        bearer_scheme
    ),
):
    if credentials is None:
        raise HTTPException(
            status_code=401,
            detail="Please log in to continue.",
            headers={"WWW-Authenticate": "Bearer"},
        )

    try:
        payload = jwt.decode(
            credentials.credentials,
            JWT_SECRET,
            algorithms=[JWT_ALGORITHM],
        )

        user_id = int(payload["sub"])

    except (
        InvalidTokenError,
        ValueError,
        KeyError,
        TypeError,
    ):
        raise HTTPException(
            status_code=401,
            detail="Your session is invalid or expired. Please log in again.",
            headers={"WWW-Authenticate": "Bearer"},
        )

    user = get_user_by_id(user_id)

    if not user:
        raise HTTPException(
            status_code=401,
            detail="Account not found. Please log in again.",
        )

    return user


@router.get("/me")
def get_me(user=Depends(get_current_user)):
    return {"user": public_user(user)}
