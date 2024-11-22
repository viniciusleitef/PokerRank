from fastapi import APIRouter, Depends
from database import get_db
from sqlalchemy.orm import Session
from schemas.Game import GameSchema

from controller import gameController

router = APIRouter()

@router.get("/game")
def get_games(db: Session = Depends(get_db)):
    return gameController.get_all_games(db)

@router.get("/game/{game_id}")
def get_game_by_id(game_id: int, db: Session = Depends(get_db)):
    return gameController.get_game_by_id(game_id, db)

@router.get("/games/{league_id}")
def get_games_by_league_id(league_id, db: Session = Depends(get_db)):
    return gameController.get_games_by_league_id(league_id, db)

@router.post("/game")
def create_game(data: GameSchema, db: Session = Depends(get_db)):
    return gameController.create_game(data, db)
