from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from database import SessionLocal, Base, engine
from models import models

from routes.user_routes import router as user_routes
from routes.league_routes import router as league_routes
from routes.ranking_routes import router as ranking_routes
from routes.league_participants_routes import router as league_participants_routes
from routes.game_routes import router as game_routes
from routes.players_game_routes import router as players_game_routes
from routes.players_game_rebuy_routes import router as players_game_rebuy_routes
from routes.game_ranking_routes import router as game_ranking_routes

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
app.include_router(league_routes)
app.include_router(ranking_routes)
app.include_router(league_participants_routes)
app.include_router(game_routes)
app.include_router(players_game_routes)
app.include_router(players_game_rebuy_routes)
app.include_router(game_ranking_routes)


@app.get("/")
async def root():
    return {"message": "Hello World"}