"""
routers/auth.py
POST /auth/register  – create account (hashes password)
POST /auth/login     – returns JWT access token
GET  /auth/me        – returns the currently logged-in user
"""

from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.core.security import hash_password, verify_password, create_access_token
from app.core.deps import get_current_user
from app.models import User
from app.schemas.auth.user import UserCreate, UserOut, UserWithSkills
from app.schemas.auth.token import Token

router = APIRouter(prefix="/auth", tags=["Auth"])


# ── Register ──────────────────────────────────────────────
@router.post("/register", response_model=UserOut, status_code=201)
def register(data: UserCreate, db: Session = Depends(get_db)):
    """Create a new user. Password is stored hashed."""
    existing = db.query(User).filter(
        (User.email == data.email) | (User.username == data.username)
    ).first()
    if existing:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email or username already taken",
        )

    user_data = data.model_dump()
    user_data["password"] = hash_password(user_data["password"])

    user = User(**user_data)
    db.add(user)
    db.commit()
    db.refresh(user)
    return user


# ── Login (OAuth2 form – works with Swagger "Authorize" button) ──
@router.post("/login", response_model=Token)
def login(
    form_data: OAuth2PasswordRequestForm = Depends(),
    db: Session = Depends(get_db),
):
    """
    Accepts either email or username in the `username` field of the form.
    Returns a JWT bearer token.
    """
    user = db.query(User).filter(
        (User.email == form_data.username) | (User.username == form_data.username)
    ).first()

    if not user or not verify_password(form_data.password, user.password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username/email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )

    token = create_access_token(data={"sub": str(user.id)})
    return {"access_token": token, "token_type": "bearer"}


# ── Login (JSON body – used by the frontend fetch calls) ──
@router.post("/login/json", response_model=Token)
def login_json(
    data: dict,  # { "email": "...", "password": "..." }
    db: Session = Depends(get_db),
):
    """JSON-body login alternative for the Next.js frontend."""
    email_or_username = data.get("email") or data.get("username")
    password = data.get("password")

    if not email_or_username or not password:
        raise HTTPException(status_code=400, detail="email/username and password required")

    user = db.query(User).filter(
        (User.email == email_or_username) | (User.username == email_or_username)
    ).first()

    if not user or not verify_password(password, user.password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect credentials",
        )

    token = create_access_token(data={"sub": str(user.id)})
    return {"access_token": token, "token_type": "bearer"}


# ── Current user ──────────────────────────────────────────
@router.get("/me", response_model=UserWithSkills)
def me(current_user: User = Depends(get_current_user)):
    """Returns the profile of the authenticated user."""
    return current_user
