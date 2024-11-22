from sqlalchemy.orm import Session
from models.models import Game
from schemas.Game import GameSchema
from datetime import datetime
from fastapi import HTTPException

from controller import leagueController

def get_all_games(db: Session):
    return db.query(Game).all()

def get_game_by_id(game_id: int, db: Session):
    game = db.query(Game).filter(Game.id == game_id).first()
    if not game:
        raise HTTPException(status_code=404, detail="Game not found.")
    return game

def get_games_by_league_id(league_id: int, db: Session):
    games = db.query(Game).filter(Game.league_id == league_id).all()
    if not games:
        return None
    return games

def create_game(data: GameSchema, db: Session):
    # Verificando se a league existe
    leagueController.get_league_by_id(data.league_id, db)
    # Verificando se um jogo com o mesmo name ja existe
    existing_game = db.query(Game).filter(Game.name == data.name).first()
    if existing_game:
        raise HTTPException(status_code=400, detail="Game with the same name already exists.")

    new_game = Game(
        league_id=data.league_id,
        name=data.name,
        location=data.location,
        duration=data.duration,
        gameDate=data.gameDate,
        created_at=datetime.now(),
        updated_at=datetime.now()
    )

    db.add(new_game)
    db.commit()
    db.refresh(new_game)

    return new_game