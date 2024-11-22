from models.models import League, Game, LeagueParticipant
from schemas.League import LeagueSchema
from sqlalchemy.orm import Session
from datetime import datetime
from fastapi import HTTPException

from controller import leagueParticipantsController, userController

def get_all_leagues(db):
    return db.query(League).all()

def get_league_by_id(league_id: int, db: Session):
    league = db.query(League).filter(League.id == league_id).first()
    if not league:
        raise HTTPException(status_code=404, detail="League not found.")
    return league

def get_league_by_user_id(user_id: int, db: Session):
    league = db.query(League).filter(League.user_id == user_id).all()
    if not league:
        raise HTTPException(status_code=404, detail="League not found.")
    return league

def get_all_leagues_by_user_id(user_id: int, db: Session):
    leagues = db.query(League).filter(League.user_id == user_id).all()
    if not leagues:
        raise HTTPException(status_code=404, detail="Nenhuma liga criada por este usuário")
    return leagues

def create_league(league: LeagueSchema, db: Session):
    existing_league = db.query(League).filter(League.name == league.name, League.user_id == league.user_id).first()
    existing_user = userController.get_user_by_id(league.user_id, db)
    if not existing_user:
        raise HTTPException(status_code=404, detail="User not found.")
    if existing_league:
        raise HTTPException(status_code=400, detail="League with the same name and user already exists.")

    new_league = League(
        user_id=league.user_id,
        name=league.name,
        description=league.description,
        created_at=datetime.now(),
        updated_at=datetime.now()
    )

    db.add(new_league)
    db.commit()
    db.refresh(new_league)
    return new_league