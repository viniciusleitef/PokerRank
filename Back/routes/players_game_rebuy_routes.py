from fastapi import APIRouter, Depends
from database import get_db
from sqlalchemy.orm import Session
from schemas.PlayersGameRebuy import PlayersGameRebuySchema

from controller import playersGameRebuyController

router = APIRouter()

@router.get("/playersGameRebuy")
def get_players_game_rebuys(db: Session = Depends(get_db)):
    return playersGameRebuyController.get_all_players_game_rebuys(db)

@router.post("/playersGameRebuy")
def create_players_game_rebuy(data: PlayersGameRebuySchema, db: Session = Depends(get_db)):
    return playersGameRebuyController.create_player_game_rebuy(data, db)
