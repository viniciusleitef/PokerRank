from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from schemas.LeagueParticipants import LeagueParticipantsSchema
from database import get_db

from controller import leagueParticipantsController

router = APIRouter()

@router.get("/leaguesParticipants")
def get_participants(db: Session = Depends(get_db)):
    return leagueParticipantsController.get_all_participants(db)

@router.get("/allLeagueParticipants/{league_id}")
def get_all_league_participants(league_id: int, db: Session = Depends(get_db)):
    return leagueParticipantsController.get_all_league_participants(league_id, db)

@router.get("/allLeagueParticipantsGameid/{game_id}")
def get_all_league_participants_by_game_id(game_id: int, db: Session = Depends(get_db)):
    return leagueParticipantsController.get_all_league_participants_by_game_id(game_id, db)


@router.post("/leaguesParticipants")
def create_league_participant(data: LeagueParticipantsSchema, db: Session = Depends(get_db)):
    return leagueParticipantsController.create_league_participant(data, db)
