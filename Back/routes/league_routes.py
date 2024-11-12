from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from schemas.League import LeagueSchema
from database import get_db

from controller import leagueController

router = APIRouter()

@router.get("/leagues")
def get_leagues(db:Session = Depends(get_db)):
    return leagueController.get_all_leagues(db)

@router.get("/leagues/{league_id}")
def get_league_by_user_id(league_id: int, db: Session = Depends(get_db)):
    return leagueController.get_league_by_user_id(league_id, db)

@router.post("/leagues")
def create_league(data: LeagueSchema, db: Session = Depends(get_db)):
    return leagueController.create_league(data, db)