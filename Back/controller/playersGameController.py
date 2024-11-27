from models.models import PlayersGame, GameRanking, PlayersGameRebuy, PlayersGameBuyin
from schemas.PlayersGame import PlayersGameSchema
from schemas.AddPlayerGame import AddPlayerGameSchema
from schemas.GameRanking import GameRankingSchema
from sqlalchemy.orm import Session
from datetime import datetime
from fastapi import HTTPException

from controller import gameController, leagueParticipantsController, playersGameRebuyController, playersGameBuyinController, gameRankingController

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

def get_player_game_by_game_id(game_id: int, db: Session):
    playersGame = db.query(PlayersGame).filter(PlayersGame.game_id == game_id).all()
    if not playersGame:
        raise HTTPException(status_code=404, detail="Player_Game not found for this game_id")
    return playersGame

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

def add_player_game(data: AddPlayerGameSchema, db:Session):

    existing_player_game = db.query(PlayersGame).filter(PlayersGame.user_id == data.user_id, PlayersGame.game_id == data.game_id).first()
    if existing_player_game:
        raise HTTPException(status_code=400, detail="Player already registered in this game.")

    new_playerGame = PlayersGame(
        user_id=data.user_id,
        game_id=data.game_id,
        created_at = datetime.now()
    )
    rebuyTotal = 0
    buyinTotal = 0

    db.add(new_playerGame)
    db.commit()
    db.refresh(new_playerGame)

    buyin_data = PlayersGameBuyin(
        playersGame_id=new_playerGame.id,
        buyinValue=data.buy_in_value
    )
    playersGameBuyinController.create_player_game_buyin(buyin_data, db)
    #para cada rebuy criar um playergamerebuy

    for rebuyValue in data.rebuy_value_list:
        rebuy_data = PlayersGameRebuy(
            playersGame_id=new_playerGame.id,
            rebuyValue=rebuyValue
        )
        rebuyTotal += rebuyValue
        playersGameRebuyController.create_player_game_rebuy(rebuy_data, db)
    buyinTotal = data.buy_in_value

    #Adicionar a tabela game_ranking
    ranking_data = GameRankingSchema(
        playersGame_id= new_playerGame.id,
        profit=data.profit,
        stack=data.stack,
        totalInvestment=data.totalInvestment,
        qnt_rebuy=len(data.rebuy_value_list),
        qnt_buyin=1,
        rebuysValue=rebuyTotal,
        buyinValue=buyinTotal,
    )
    gameRankingController.create_game_ranking(ranking_data, db)

    #Atualiza a tabela game
    gameController.update_game(new_playerGame, db)

    return new_playerGame