from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from schemas.User import UserSchema
from schemas.UserLogin import UserLoginSchema
from database import get_db

from controller import userController

router = APIRouter()

@router.get("/users")
def get_users(db: Session = Depends(get_db)):
    return userController.get_all_users(db)

@router.get("/user/{user_id}")
def get_user_by_id(user_id: str, db: Session = Depends(get_db)):
    return userController.get_user_by_id(user_id, db)

@router.get("/user/email/{user_email}")
def get_user_by_email(user_email: str, db: Session = Depends(get_db)):
    return userController.get_user_by_email(user_email, db)

@router.post("/login")
def login(credentials: UserLoginSchema, db: Session = Depends(get_db)):
    return userController.login(credentials, db)

@router.post("/user")
async def create_user(user: UserSchema, db: Session = Depends(get_db)):
    return userController.create_user(user, db)
