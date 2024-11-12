from models.models import LeagueParticipant
from schemas.LeagueParticipants import LeagueParticipantsSchema
from sqlalchemy.orm import Session
from datetime import datetime
from fastapi import HTTPException

from controller import userController, leagueController, userController

def get_all_leagues_participants(db):
    return db.query(LeagueParticipant).all()

def get_user_in_league_by_id(league_id: int, user_id: int, db: Session):
    user_in_league = db.query(LeagueParticipant).filter(LeagueParticipant.league_id == league_id, LeagueParticipant.user_id == user_id).first()

    if not user_in_league:
        raise HTTPException(status_code=404, detail="User not found in this league.")
    return user_in_league

def create_league_participant(data: LeagueParticipantsSchema, db: Session):
    existing_league_participant = db.query(LeagueParticipant).filter(LeagueParticipant.league_id == data.league_id, LeagueParticipant.user_id == data.user_id).first()
    existing_league = leagueController.get_league_by_id(data.league_id, db)
    existing_user = userController.get_user_by_id(data.user_id, db)

    if existing_league_participant:
        raise HTTPException(status_code=400, detail="User already in this league.")
    if not existing_league:
        raise HTTPException(status_code=404, detail="League not found.")
    if not existing_user:
        raise HTTPException(status_code=404, detail="User not found.")

    new_league_participant = LeagueParticipant(
        user_id=data.user_id,
        league_id=data.league_id,
        created_at=datetime.now()
    )

    db.add(new_league_participant)
    db.commit()
    db.refresh(new_league_participant)

    return new_league_participant