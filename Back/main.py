from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from database import SessionLocal, Base, engine
from models import models

from routes.user_routes import router as user_routes

Base.metadata.create_all(bind=engine)
db = SessionLocal()

app = FastAPI()

origins = ['*', 'http://localhost:3000']
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(user_routes)


@app.get("/")
async def root():
    return {"message": "Hello World"}