from models.models import Ranking
from sqlalchemy.orm import Session
from schemas.Ranking import RankingSchema
from fastapi import HTTPException
from datetime import datetime

from controller import userController, leagueController, leagueParticipantsController

def get_all_rankings(db: Session):
    return db.query(Ranking).all()

def get_all_rank_by_league_id(league_id: int, db: Session):
    rank = db.query(Ranking).filter(Ranking.league_id == league_id).all()
    if not rank:
        raise HTTPException(status_code=404, detail="Ranking not found.")
    obj = []
    for r in rank:
        user = userController.get_user_by_id(r.user_id, db)
        obj.append({
            "id": r.id,
            "league_id": r.league_id,
            "user_id": r.user_id,
            "username": user.username,
            "profit": r.profit,
            "games_played": r.games_played,
            "games_won": r.games_won,
            "games_lost": r.games_lost,
            "games_drawn": r.games_drawn,
        })

    return obj

def create_ranking(ranking_data: RankingSchema, db: Session):
    # Verificando se o league_id e o user_id passados no parâmetro ja existem
    existing_ranking = db.query(Ranking).filter(Ranking.league_id == ranking_data.league_id, Ranking.user_id == ranking_data.user_id).first()

    # Verificando se a liga existe
    leagueController.get_league_by_id(ranking_data.league_id, db)

    # Verificando se o user particida da liga: ranking_data.league_id
    leagueParticipantsController.get_user_in_league_by_id(ranking_data.league_id, ranking_data.user_id, db)

    # Se user_id e league_id ja existirem, lançã uma exceção
    if existing_ranking:
        raise HTTPException(status_code=400, detail="User already in this league ranking.")

    new_ranking = Ranking(
        league_id=ranking_data.league_id,
        user_id=ranking_data.user_id,
        profit=ranking_data.profit,
        games_played=ranking_data.games_played,
        games_won=ranking_data.games_won,
        games_lost=ranking_data.games_lost,
        games_drawn=ranking_data.games_drawn,
        created_at=datetime.now(),
        updated_at=datetime.now()
        )

    db.add(new_ranking)
    db.commit()
    db.refresh(new_ranking)
    return new_ranking

def update_ranking(data: RankingSchema, db: Session):
    rank = db.query(Ranking).filter(Ranking.league_id == data.league_id, Ranking.user_id == data.user_id).first()

    rank.profit += data.profit
    rank.games_played += data.games_played
    rank.games_won += data.games_won
    rank.games_lost += data.games_lost
    rank.games_drawn += data.games_drawn
    rank.updated_at = datetime.now()

    db.commit()
    return rank