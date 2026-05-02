from fastapi import FastAPI
from app.core.database import engine
from app.models import Base
from app.routers import users, companies, roles, user_company, projects, tasks, reports, resources, skills

# Create all tables on startup
Base.metadata.create_all(bind=engine)



app = FastAPI(
    title="Patyo API",
    version="1.0.0",
    description="Project management & resource tracking API",
)

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

origins = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(users)
app.include_router(companies)
app.include_router(roles)
app.include_router(user_company)
app.include_router(projects)
app.include_router(tasks)
app.include_router(reports)
app.include_router(resources)
app.include_router(skills)


@app.get("/")
def root():
    return {"message": "Patyo API is running 🚀"}