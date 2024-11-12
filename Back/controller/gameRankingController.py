from sqlalchemy.orm import Session
from models.models import GameRanking
from schemas.GameRanking import GameRankingSchema
from datetime import datetime
from fastapi import HTTPException

from controller import gameController, userController, playersGameController

def get_all_games_ranking(db: Session):
    return db.query(GameRanking).all()

def create_game_ranking(data: GameRankingSchema, db: Session):
    # Verificando se o game existe
    gameController.get_game_by_id(data.game_id, db)
    # Verificando se user existe
    userController.get_user_by_id(data.user_id, db)
    # Verificando se o user pertence ao game
    playersGameController.get_player_game_by_user_id(data.user_id, db)
    # Verificando se o user ja pertence a um mesmo game
    existing_game_ranking = db.query(GameRanking).filter(GameRanking.game_id == data.game_id, GameRanking.user_id == data.user_id).first()

    if existing_game_ranking:
        raise HTTPException(status_code=400, detail="Player already has a ranking for this game.")
    
    new_game_ranking = GameRanking(
        game_id=data.game_id,
        user_id=data.user_id,
        profit=data.profit,
        created_at=datetime.now(),
        updated_at=datetime.now()
    )

    db.add(new_game_ranking)
    db.commit()
    db.refresh(new_game_ranking)

    return new_game_ranking