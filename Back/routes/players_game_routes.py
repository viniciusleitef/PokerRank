from fastapi import APIRouter, Depends
from database import get_db
from sqlalchemy.orm import Session
from schemas.PlayersGame import PlayersGameSchema

from controller import playersGameController

router = APIRouter()

@router.get("/playersGame")
def get_players_games(db: Session = Depends(get_db)):
    return playersGameController.get_all_players_games(db)

@router.post("/playersGame")
def create_players_game(data: PlayersGameSchema, db: Session = Depends(get_db)):
    return playersGameController.create_player_game(data, db)