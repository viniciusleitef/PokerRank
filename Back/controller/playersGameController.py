from models.models import PlayersGame
from schemas.PlayersGame import PlayersGameSchema
from sqlalchemy.orm import Session
from datetime import datetime
from fastapi import HTTPException

from controller import gameController, leagueParticipantsController

def get_all_players_games(db: Session):
    return db.query(PlayersGame).all()

def get_player_game_by_id(player_game_id: int, db:Session):
    player_game = db.query(PlayersGame).filter(PlayersGame.id == player_game_id).first()
    if not player_game:
        raise HTTPException(status_code=404, detail="Player_Game not found.")
    return player_game

def get_player_game_by_user_id(user_id: int, db: Session):
    player_games = db.query(PlayersGame).filter(PlayersGame.user_id == user_id).first()
    if not player_games:
        raise HTTPException(status_code=404, detail="This player dont exist in this game.")
    return player_games

def create_player_game(data: PlayersGameSchema, db: Session):
    # Verificando se o jogador já está cadastrado no jogo
    existing_player_game = db.query(PlayersGame).filter(PlayersGame.game_id == data.game_id, PlayersGame.user_id == data.user_id).first()
    if existing_player_game:
        raise HTTPException(status_code=400, detail="Player already registered in this game.")
    # Verificando se o jogo existe / Pegando game para saber o league_id
    game = gameController.get_game_by_id(data.game_id, db)

    #Verificando se player existe dentro da liga
    leagueParticipantsController.get_user_in_league_by_id(game.league_id, data.user_id, db)

    new_player_game = PlayersGame(
        game_id=data.game_id,
        user_id=data.user_id,
        buyIn=1,
        created_at=datetime.now()
    )

    db.add(new_player_game)
    db.commit()
    db.refresh(new_player_game)

    return new_player_game