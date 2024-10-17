from schemas.User import UserSchema
from schemas.UserLogin import UserLoginSchema
from fastapi import Depends
from models.models import User
from sqlalchemy.orm import Session
from datetime import datetime
from fastapi import HTTPException
from services import auth

# Agora você pode usar datetime.now()
created_at = datetime.now()

def get_all_users(db: Session):
    return db.query(User).all()

def get_user_by_id(user_id: int, db: Session):
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user

def get_user_by_email(user_email: str, db: Session):
    user = db.query(User).filter(User.email == user_email).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user

def login(credentials: UserLoginSchema, db: Session):
    user = db.query(User).filter(User.email == credentials.email).first()
    if not user:
        raise HTTPException(status_code=401, detail="Invalid email")
    if not auth.verify_password(credentials.password, user.password):
        raise HTTPException(status_code=401, detail="Invalid password")

    access_token = auth.create_access_token(data={"sub":user.email})
    return {"access_token": access_token}

    

def create_user(user: UserSchema, db: Session):
    db_user = db.query(User).filter(User.email == user.email).first()
    if db_user:
        raise HTTPException(status_code=400, detail="Email already registered")

    hashed_password = auth.hash_password(user.password)
    
    new_user = User(
        username=user.username, 
        email=user.email,
        password=hashed_password,
        created_at=datetime.now(),
        updated_at=datetime.now()
    )
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return new_user

    
from fastapi import Security
from fastapi.security import OAuth2PasswordBearer

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

async def get_current_user(token: str = Depends(oauth2_scheme)):
    credentials_exception = HTTPException(
        status_code=401,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=["HS256"])
        email: str = payload.get("sub")
        if email is None:
            raise credentials_exception
        return email  # Aqui você pode retornar um objeto de usuário se quiser
    except jwt.PyJWTError:
        raise credentials_exception
