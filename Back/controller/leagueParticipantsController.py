from models.models import LeagueParticipant, Game, League, User
from schemas.LeagueParticipants import LeagueParticipantsSchema
from sqlalchemy.orm import Session
from datetime import datetime
from fastapi import HTTPException

from controller import userController, leagueController, userController

def get_all_participants(db):
    return db.query(LeagueParticipant).all()

def get_all_league_participants(league_id: int, db: Session):
    existing_league = db.query(League).filter(League.id == league_id).first()
    participants = db.query(LeagueParticipant).filter(LeagueParticipant.league_id == league_id).all()
    if not existing_league:
        raise HTTPException(status_code= 404, detail=  "League not found")

    users = []
    for i, participant in enumerate(participants):
        user = userController.get_user_by_id(participant.user_id, db)
        users.append({
            "id": user.id,
            "username": user.username,
            "email": user.email,
            "created_at": user.created_at,
            "updated_at": user.updated_at,
            "fullName": user.fullName
        })
    return users

def get_all_league_participants_by_game_id(game_id: int, db: Session):
    game = db.query(Game).filter(Game.id ==  game_id).first()
    league_participants = db.query(LeagueParticipant).filter(LeagueParticipant.league_id == game.league_id).all()
    participants = []

    for participant in league_participants:
        user = userController.get_user_by_id(participant.user_id, db)
        participants.append({
            "id": user.id,
            "username": user.username,
            "email": user.email,
            "created_at": user.created_at,
            "updated_at": user.updated_at,
            "fullName": user.fullName
        })
    return participants

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