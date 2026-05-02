from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.models import (
    Resource, ResourceAllocation, ResourceEvent,
    ResourceETA, ResourceAssignment, Supplier
)
from app.schemas.resources.resource import ResourceCreate, ResourceUpdate, ResourceOut, ResourceWithDetails
from app.schemas.resources.allocation import ResourceAllocationCreate, ResourceAllocationUpdate, ResourceAllocationOut
from app.schemas.resources.event import ResourceEventCreate, ResourceEventUpdate, ResourceEventOut
from app.schemas.resources.eta import ResourceETACreate, ResourceETAUpdate, ResourceETAOut
from app.schemas.resources.assignment import ResourceAssignmentCreate, ResourceAssignmentUpdate, ResourceAssignmentOut
from app.schemas.resources.supplier import SupplierCreate, SupplierUpdate, SupplierOut

router = APIRouter(prefix="/resources", tags=["Resources"])


# ── Suppliers ─────────────────────────────────────────────

@router.get("/suppliers", response_model=list[SupplierOut])
def get_all_suppliers(db: Session = Depends(get_db)):
    return db.query(Supplier).all()


@router.get("/suppliers/{supplier_id}", response_model=SupplierOut)
def get_supplier(supplier_id: int, db: Session = Depends(get_db)):
    obj = db.query(Supplier).filter(Supplier.id == supplier_id).first()
    if not obj:
        raise HTTPException(status_code=404, detail="Supplier not found")
    return obj


@router.post("/suppliers", response_model=SupplierOut, status_code=201)
def create_supplier(data: SupplierCreate, db: Session = Depends(get_db)):
    obj = Supplier(**data.model_dump())
    db.add(obj)
    db.commit()
    db.refresh(obj)
    return obj


@router.patch("/suppliers/{supplier_id}", response_model=SupplierOut)
def update_supplier(supplier_id: int, data: SupplierUpdate, db: Session = Depends(get_db)):
    obj = db.query(Supplier).filter(Supplier.id == supplier_id).first()
    if not obj:
        raise HTTPException(status_code=404, detail="Supplier not found")
    for field, value in data.model_dump(exclude_unset=True).items():
        setattr(obj, field, value)
    db.commit()
    db.refresh(obj)
    return obj


@router.delete("/suppliers/{supplier_id}", status_code=204)
def delete_supplier(supplier_id: int, db: Session = Depends(get_db)):
    obj = db.query(Supplier).filter(Supplier.id == supplier_id).first()
    if not obj:
        raise HTTPException(status_code=404, detail="Supplier not found")
    db.delete(obj)
    db.commit()


# ── Resources ─────────────────────────────────────────────

@router.get("/", response_model=list[ResourceOut])
def get_all_resources(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    return db.query(Resource).offset(skip).limit(limit).all()


@router.get("/{resource_id}", response_model=ResourceWithDetails)
def get_resource(resource_id: int, db: Session = Depends(get_db)):
    obj = db.query(Resource).filter(Resource.id == resource_id).first()
    if not obj:
        raise HTTPException(status_code=404, detail="Resource not found")
    return obj


@router.post("/", response_model=ResourceOut, status_code=201)
def create_resource(data: ResourceCreate, db: Session = Depends(get_db)):
    obj = Resource(**data.model_dump())
    db.add(obj)
    db.commit()
    db.refresh(obj)
    return obj


@router.patch("/{resource_id}", response_model=ResourceOut)
def update_resource(resource_id: int, data: ResourceUpdate, db: Session = Depends(get_db)):
    obj = db.query(Resource).filter(Resource.id == resource_id).first()
    if not obj:
        raise HTTPException(status_code=404, detail="Resource not found")
    for field, value in data.model_dump(exclude_unset=True).items():
        setattr(obj, field, value)
    db.commit()
    db.refresh(obj)
    return obj


@router.delete("/{resource_id}", status_code=204)
def delete_resource(resource_id: int, db: Session = Depends(get_db)):
    obj = db.query(Resource).filter(Resource.id == resource_id).first()
    if not obj:
        raise HTTPException(status_code=404, detail="Resource not found")
    db.delete(obj)
    db.commit()


# ── Resource Allocations ──────────────────────────────────

@router.get("/{resource_id}/allocations", response_model=list[ResourceAllocationOut])
def get_allocations(resource_id: int, db: Session = Depends(get_db)):
    return db.query(ResourceAllocation).filter(ResourceAllocation.resource_id == resource_id).all()


@router.post("/allocations", response_model=ResourceAllocationOut, status_code=201)
def create_allocation(data: ResourceAllocationCreate, db: Session = Depends(get_db)):
    obj = ResourceAllocation(**data.model_dump())
    db.add(obj)
    db.commit()
    db.refresh(obj)
    return obj


@router.patch("/allocations/{allocation_id}", response_model=ResourceAllocationOut)
def update_allocation(allocation_id: int, data: ResourceAllocationUpdate, db: Session = Depends(get_db)):
    obj = db.query(ResourceAllocation).filter(ResourceAllocation.id == allocation_id).first()
    if not obj:
        raise HTTPException(status_code=404, detail="Allocation not found")
    for field, value in data.model_dump(exclude_unset=True).items():
        setattr(obj, field, value)
    db.commit()
    db.refresh(obj)
    return obj


@router.delete("/allocations/{allocation_id}", status_code=204)
def delete_allocation(allocation_id: int, db: Session = Depends(get_db)):
    obj = db.query(ResourceAllocation).filter(ResourceAllocation.id == allocation_id).first()
    if not obj:
        raise HTTPException(status_code=404, detail="Allocation not found")
    db.delete(obj)
    db.commit()


# ── Resource Events ───────────────────────────────────────

@router.get("/{resource_id}/events", response_model=list[ResourceEventOut])
def get_events(resource_id: int, db: Session = Depends(get_db)):
    return db.query(ResourceEvent).filter(ResourceEvent.resource_id == resource_id).all()


@router.post("/events", response_model=ResourceEventOut, status_code=201)
def create_event(data: ResourceEventCreate, db: Session = Depends(get_db)):
    obj = ResourceEvent(**data.model_dump())
    db.add(obj)
    db.commit()
    db.refresh(obj)
    return obj


@router.patch("/events/{event_id}", response_model=ResourceEventOut)
def update_event(event_id: int, data: ResourceEventUpdate, db: Session = Depends(get_db)):
    obj = db.query(ResourceEvent).filter(ResourceEvent.id == event_id).first()
    if not obj:
        raise HTTPException(status_code=404, detail="Event not found")
    for field, value in data.model_dump(exclude_unset=True).items():
        setattr(obj, field, value)
    db.commit()
    db.refresh(obj)
    return obj


@router.delete("/events/{event_id}", status_code=204)
def delete_event(event_id: int, db: Session = Depends(get_db)):
    obj = db.query(ResourceEvent).filter(ResourceEvent.id == event_id).first()
    if not obj:
        raise HTTPException(status_code=404, detail="Event not found")
    db.delete(obj)
    db.commit()


# ── Resource ETA ──────────────────────────────────────────

@router.get("/{resource_id}/eta", response_model=list[ResourceETAOut])
def get_eta(resource_id: int, db: Session = Depends(get_db)):
    return db.query(ResourceETA).filter(ResourceETA.resource_id == resource_id).all()


@router.post("/eta", response_model=ResourceETAOut, status_code=201)
def create_eta(data: ResourceETACreate, db: Session = Depends(get_db)):
    obj = ResourceETA(**data.model_dump())
    db.add(obj)
    db.commit()
    db.refresh(obj)
    return obj


@router.patch("/eta/{eta_id}", response_model=ResourceETAOut)
def update_eta(eta_id: int, data: ResourceETAUpdate, db: Session = Depends(get_db)):
    obj = db.query(ResourceETA).filter(ResourceETA.id == eta_id).first()
    if not obj:
        raise HTTPException(status_code=404, detail="ETA record not found")
    for field, value in data.model_dump(exclude_unset=True).items():
        setattr(obj, field, value)
    db.commit()
    db.refresh(obj)
    return obj


@router.delete("/eta/{eta_id}", status_code=204)
def delete_eta(eta_id: int, db: Session = Depends(get_db)):
    obj = db.query(ResourceETA).filter(ResourceETA.id == eta_id).first()
    if not obj:
        raise HTTPException(status_code=404, detail="ETA record not found")
    db.delete(obj)
    db.commit()


# ── Resource Assignments ──────────────────────────────────

@router.get("/{resource_id}/assignments", response_model=list[ResourceAssignmentOut])
def get_assignments(resource_id: int, db: Session = Depends(get_db)):
    return db.query(ResourceAssignment).filter(ResourceAssignment.resource_id == resource_id).all()


@router.post("/assignments", response_model=ResourceAssignmentOut, status_code=201)
def create_assignment(data: ResourceAssignmentCreate, db: Session = Depends(get_db)):
    obj = ResourceAssignment(**data.model_dump())
    db.add(obj)
    db.commit()
    db.refresh(obj)
    return obj


@router.patch("/assignments/{assignment_id}", response_model=ResourceAssignmentOut)
def update_assignment(assignment_id: int, data: ResourceAssignmentUpdate, db: Session = Depends(get_db)):
    obj = db.query(ResourceAssignment).filter(ResourceAssignment.id == assignment_id).first()
    if not obj:
        raise HTTPException(status_code=404, detail="Assignment not found")
    for field, value in data.model_dump(exclude_unset=True).items():
        setattr(obj, field, value)
    db.commit()
    db.refresh(obj)
    return obj


@router.delete("/assignments/{assignment_id}", status_code=204)
def delete_assignment(assignment_id: int, db: Session = Depends(get_db)):
    obj = db.query(ResourceAssignment).filter(ResourceAssignment.id == assignment_id).first()
    if not obj:
        raise HTTPException(status_code=404, detail="Assignment not found")
    db.delete(obj)
    db.commit()