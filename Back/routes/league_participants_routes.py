from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from schemas.LeagueParticipants import LeagueParticipantsSchema
from database import get_db

from controller import leagueParticipantsController

router = APIRouter()

@router.get("/leaguesParticipants")
def get_leagues_participants(db: Session = Depends(get_db)):
    return leagueParticipantsController.get_all_leagues_participants(db)

@router.post("/leaguesParticipants")
def create_league_participant(data: LeagueParticipantsSchema, db: Session = Depends(get_db)):
    return leagueParticipantsController.create_league_participant(data, db)
