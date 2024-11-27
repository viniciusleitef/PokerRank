from models.models import PlayersGameRebuy
from schemas.PlayersGameRebuy import PlayersGameRebuySchema
from sqlalchemy.orm import Session
from datetime import datetime
from fastapi import HTTPException

from controller import playersGameController

def get_all_players_game_rebuys(db: Session):
    return db.query(PlayersGameRebuy).all()

def create_player_game_rebuy(data: PlayersGameRebuySchema, db: Session):
    # Verificando se o player que deu esse rebuy existe 
    existing_player_game = playersGameController.get_player_game_by_id(data.playersGame_id, db)

    new_rebuy = PlayersGameRebuy(
        playersGame_id=data.playersGame_id,
        rebuyValue=data.rebuyValue,
        created_at=datetime.now(),
    )

    db.add(new_rebuy)
    db.commit()
    db.refresh(new_rebuy)
    
    return new_rebuy
