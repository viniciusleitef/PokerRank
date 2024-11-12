from models.models import Ranking
from sqlalchemy.orm import Session
from schemas.Ranking import RankingSchema
from fastapi import HTTPException
from datetime import datetime

from controller import userController, leagueController, leagueParticipantsController

def get_all_rankings(db: Session):
    return db.query(Ranking).all()

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