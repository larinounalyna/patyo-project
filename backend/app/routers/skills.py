from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.models import Skill, UserSkill
from app.schemas.skills.skill import SkillCreate, SkillUpdate, SkillOut
from app.schemas.skills.user_skill import UserSkillCreate, UserSkillOut

router = APIRouter(prefix="/skills", tags=["Skills"])


@router.get("/", response_model=list[SkillOut])
def get_all_skills(db: Session = Depends(get_db)):
    return db.query(Skill).all()


@router.get("/{skill_id}", response_model=SkillOut)
def get_skill(skill_id: int, db: Session = Depends(get_db)):
    skill = db.query(Skill).filter(Skill.id == skill_id).first()
    if not skill:
        raise HTTPException(status_code=404, detail="Skill not found")
    return skill


@router.post("/", response_model=SkillOut, status_code=201)
def create_skill(data: SkillCreate, db: Session = Depends(get_db)):
    skill = Skill(**data.model_dump())
    db.add(skill)
    db.commit()
    db.refresh(skill)
    return skill


@router.patch("/{skill_id}", response_model=SkillOut)
def update_skill(skill_id: int, data: SkillUpdate, db: Session = Depends(get_db)):
    skill = db.query(Skill).filter(Skill.id == skill_id).first()
    if not skill:
        raise HTTPException(status_code=404, detail="Skill not found")
    for field, value in data.model_dump(exclude_unset=True).items():
        setattr(skill, field, value)
    db.commit()
    db.refresh(skill)
    return skill


@router.delete("/{skill_id}", status_code=204)
def delete_skill(skill_id: int, db: Session = Depends(get_db)):
    skill = db.query(Skill).filter(Skill.id == skill_id).first()
    if not skill:
        raise HTTPException(status_code=404, detail="Skill not found")
    db.delete(skill)
    db.commit()


# ── User Skills ───────────────────────────────────────────

@router.get("/user/{user_id}", response_model=list[UserSkillOut])
def get_user_skills(user_id: int, db: Session = Depends(get_db)):
    return db.query(UserSkill).filter(UserSkill.user_id == user_id).all()


@router.post("/user", response_model=UserSkillOut, status_code=201)
def assign_skill_to_user(data: UserSkillCreate, db: Session = Depends(get_db)):
    existing = db.query(UserSkill).filter(
        UserSkill.user_id == data.user_id,
        UserSkill.skill_id == data.skill_id
    ).first()
    if existing:
        raise HTTPException(status_code=400, detail="User already has this skill")
    obj = UserSkill(**data.model_dump())
    db.add(obj)
    db.commit()
    db.refresh(obj)
    return obj


@router.delete("/user/{user_id}/{skill_id}", status_code=204)
def remove_skill_from_user(user_id: int, skill_id: int, db: Session = Depends(get_db)):
    obj = db.query(UserSkill).filter(
        UserSkill.user_id == user_id,
        UserSkill.skill_id == skill_id
    ).first()
    if not obj:
        raise HTTPException(status_code=404, detail="User skill not found")
    db.delete(obj)
    db.commit()