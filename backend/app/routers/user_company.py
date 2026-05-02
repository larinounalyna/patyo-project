from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.models import UserCompany
from app.schemas.auth.user_company import UserCompanyCreate, UserCompanyUpdate, UserCompanyOut

router = APIRouter(prefix="/user-company", tags=["User Company"])


@router.get("/", response_model=list[UserCompanyOut])
def get_all(db: Session = Depends(get_db)):
    return db.query(UserCompany).all()


@router.get("/{id}", response_model=UserCompanyOut)
def get_one(id: int, db: Session = Depends(get_db)):
    obj = db.query(UserCompany).filter(UserCompany.id == id).first()
    if not obj:
        raise HTTPException(status_code=404, detail="UserCompany record not found")
    return obj


@router.get("/company/{company_id}", response_model=list[UserCompanyOut])
def get_by_company(company_id: int, db: Session = Depends(get_db)):
    return db.query(UserCompany).filter(UserCompany.company_id == company_id).all()


@router.get("/user/{user_id}", response_model=list[UserCompanyOut])
def get_by_user(user_id: int, db: Session = Depends(get_db)):
    return db.query(UserCompany).filter(UserCompany.user_id == user_id).all()


@router.post("/", response_model=UserCompanyOut, status_code=201)
def create(data: UserCompanyCreate, db: Session = Depends(get_db)):
    obj = UserCompany(**data.model_dump())
    db.add(obj)
    db.commit()
    db.refresh(obj)
    return obj


@router.patch("/{id}", response_model=UserCompanyOut)
def update(id: int, data: UserCompanyUpdate, db: Session = Depends(get_db)):
    obj = db.query(UserCompany).filter(UserCompany.id == id).first()
    if not obj:
        raise HTTPException(status_code=404, detail="UserCompany record not found")
    for field, value in data.model_dump(exclude_unset=True).items():
        setattr(obj, field, value)
    db.commit()
    db.refresh(obj)
    return obj


@router.delete("/{id}", status_code=204)
def delete(id: int, db: Session = Depends(get_db)):
    obj = db.query(UserCompany).filter(UserCompany.id == id).first()
    if not obj:
        raise HTTPException(status_code=404, detail="UserCompany record not found")
    db.delete(obj)
    db.commit()