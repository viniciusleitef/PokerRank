from sqlalchemy.orm import Session
from models.models import GameRanking
from schemas.GameRanking import GameRankingSchema
from datetime import datetime
from fastapi import HTTPException

from controller import gameController, userController, playersGameController

def get_all_games_ranking(db: Session):
    return db.query(GameRanking).all()

def get_game_ranking_by_playersGame_id(playersGame_id, db: Session):
    existing_game = db.query(GameRanking).filter(GameRanking.playersGame_id == playersGame_id).first()
    if not existing_game:
        raise HTTPException(status_code=404, detail="Game not found.")
    return existing_game

def get_game_ranking_by_game_id(game_id: int, db: Session):
    gameController.get_game_by_id(game_id, db)
    playersGame = playersGameController.get_player_game_by_game_id(game_id, db)
    ranking = []

    for player in playersGame:
        user = userController.get_user_by_id(player.user_id, db)
        new_ranking = get_game_ranking_by_playersGame_id(player.id, db)
        new_ranking.username = user.username
        ranking.append(new_ranking)
    return ranking

def create_game_ranking(data: GameRankingSchema, db: Session):

    existing_player = playersGameController.get_player_game_by_id(data.playersGame_id, db)
    existing_game = gameController.get_game_by_id(existing_player.game_id, db) 
    existing_game_ranking = db.query(GameRanking).filter(GameRanking.playersGame_id == data.playersGame_id).first()

    if existing_game_ranking:
        raise HTTPException(status_code=400, detail="Player already has a ranking for this game.")
    
    new_game_ranking = GameRanking(
        playersGame_id = data.playersGame_id,
        profit=data.profit,
        stack=data.stack,
        totalInvestment=data.totalInvestment,
        qnt_rebuy =data.qnt_rebuy,
        qnt_buyin =data.qnt_buyin,
        rebuysValue=data.rebuysValue,
        buyinValue=data.buyinValue,
        created_at=datetime.now(),
        updated_at=datetime.now()
    )

    db.add(new_game_ranking)
    db.commit()
    db.refresh(new_game_ranking)

    return new_game_ranking