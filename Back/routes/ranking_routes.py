from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from schemas.Ranking import RankingSchema
from database import get_db

from controller import rankingController

router = APIRouter()

@router.get("/Rankings")
def get_rankings(db: Session = Depends(get_db)):
    return rankingController.get_all_rankings(db)
@router.get("/Rankings/{league_id}")
def get_rankings_by_league_id(league_id:int, db: Session = Depends(get_db)):
    return rankingController.get_all_rank_by_league_id(league_id, db)

@router.post("/Rankings")
def create_ranking(data: RankingSchema, db: Session = Depends(get_db)):
    return rankingController.create_ranking(data, db)