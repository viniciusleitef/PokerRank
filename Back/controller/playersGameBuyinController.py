from models.models import PlayersGameBuyin
from schemas.PlayersGameBuyin import PlayersGameBuyinSchema
from sqlalchemy.orm import Session
from datetime import datetime
from fastapi import HTTPException

from controller import playersGameController

def get_all_players_game_buyin(db: Session):
    return db.query(PlayersGamebuyin).all()

def create_player_game_buyin(data: PlayersGameBuyinSchema, db: Session):
    # Verificando se o player que deu esse buyin existe 
    existing_player_game = playersGameController.get_player_game_by_id(data.playersGame_id, db)

    new_buyin = PlayersGameBuyin(
        playersGame_id=data.playersGame_id,
        buyinValue=data.buyinValue,
        created_at=datetime.now(),
    )

    db.add(new_buyin)
    db.commit()
    db.refresh(new_buyin)
    
    return new_buyin
