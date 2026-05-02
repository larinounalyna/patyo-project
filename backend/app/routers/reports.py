from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.models import Report, ReportFile, ReportType
from app.schemas.reports.report import ReportCreate, ReportUpdate, ReportOut, ReportWithDetails
from app.schemas.reports.report_file import ReportFileCreate, ReportFileOut
from app.schemas.reports.report_type import ReportTypeCreate, ReportTypeUpdate, ReportTypeOut

router = APIRouter(prefix="/reports", tags=["Reports"])


# ── Report Types ──────────────────────────────────────────

@router.get("/types", response_model=list[ReportTypeOut])
def get_report_types(db: Session = Depends(get_db)):
    return db.query(ReportType).all()


@router.post("/types", response_model=ReportTypeOut, status_code=201)
def create_report_type(data: ReportTypeCreate, db: Session = Depends(get_db)):
    obj = ReportType(**data.model_dump())
    db.add(obj)
    db.commit()
    db.refresh(obj)
    return obj


@router.patch("/types/{type_id}", response_model=ReportTypeOut)
def update_report_type(type_id: int, data: ReportTypeUpdate, db: Session = Depends(get_db)):
    obj = db.query(ReportType).filter(ReportType.id == type_id).first()
    if not obj:
        raise HTTPException(status_code=404, detail="Report type not found")
    for field, value in data.model_dump(exclude_unset=True).items():
        setattr(obj, field, value)
    db.commit()
    db.refresh(obj)
    return obj


@router.delete("/types/{type_id}", status_code=204)
def delete_report_type(type_id: int, db: Session = Depends(get_db)):
    obj = db.query(ReportType).filter(ReportType.id == type_id).first()
    if not obj:
        raise HTTPException(status_code=404, detail="Report type not found")
    db.delete(obj)
    db.commit()


# ── Reports ───────────────────────────────────────────────

@router.get("/", response_model=list[ReportOut])
def get_all_reports(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    return db.query(Report).offset(skip).limit(limit).all()


@router.get("/{report_id}", response_model=ReportWithDetails)
def get_report(report_id: int, db: Session = Depends(get_db)):
    report = db.query(Report).filter(Report.id == report_id).first()
    if not report:
        raise HTTPException(status_code=404, detail="Report not found")
    return report


@router.get("/project/{project_id}", response_model=list[ReportOut])
def get_by_project(project_id: int, db: Session = Depends(get_db)):
    return db.query(Report).filter(Report.project_id == project_id).all()


@router.post("/", response_model=ReportOut, status_code=201)
def create_report(data: ReportCreate, db: Session = Depends(get_db)):
    report = Report(**data.model_dump())
    db.add(report)
    db.commit()
    db.refresh(report)
    return report


@router.patch("/{report_id}", response_model=ReportOut)
def update_report(report_id: int, data: ReportUpdate, db: Session = Depends(get_db)):
    report = db.query(Report).filter(Report.id == report_id).first()
    if not report:
        raise HTTPException(status_code=404, detail="Report not found")
    for field, value in data.model_dump(exclude_unset=True).items():
        setattr(report, field, value)
    db.commit()
    db.refresh(report)
    return report


@router.delete("/{report_id}", status_code=204)
def delete_report(report_id: int, db: Session = Depends(get_db)):
    report = db.query(Report).filter(Report.id == report_id).first()
    if not report:
        raise HTTPException(status_code=404, detail="Report not found")
    db.delete(report)
    db.commit()


# ── Report Files ──────────────────────────────────────────

@router.get("/{report_id}/files", response_model=list[ReportFileOut])
def get_files(report_id: int, db: Session = Depends(get_db)):
    return db.query(ReportFile).filter(ReportFile.report_id == report_id).all()


@router.post("/{report_id}/files", response_model=ReportFileOut, status_code=201)
def add_file(report_id: int, data: ReportFileCreate, db: Session = Depends(get_db)):
    file = ReportFile(report_id=report_id, file_url=data.file_url)
    db.add(file)
    db.commit()
    db.refresh(file)
    return file


@router.delete("/files/{file_id}", status_code=204)
def delete_file(file_id: int, db: Session = Depends(get_db)):
    file = db.query(ReportFile).filter(ReportFile.id == file_id).first()
    if not file:
        raise HTTPException(status_code=404, detail="File not found")
    db.delete(file)
    db.commit()