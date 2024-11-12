from fastapi import APIRouter, Depends
from database import get_db
from sqlalchemy.orm import Session
from schemas.GameRanking import GameRankingSchema

from controller import gameRankingController

router = APIRouter()

@router.get("/gameRanking")
def get_games_rank(db: Session = Depends(get_db)):
    return gameRankingController.get_all_games_ranking(db)

@router.post("/gameRanking")
def create_game_ranking(data: GameRankingSchema, db: Session = Depends(get_db)):
    return gameRankingController.create_game_ranking(data, db)
