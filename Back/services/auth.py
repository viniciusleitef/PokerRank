from dotenv import load_dotenv
import bcrypt
import jwt
import datetime
import os

load_dotenv()
SECRET_KEY = os.getenv("SECRET_KEY")
TOKEN_DURATION = 30

def hash_password(password: str) -> str:
    salt = bcrypt.gensalt()
    hashed_password = bcrypt.hashpw(password.encode('utf-8'), salt)
    return hashed_password.decode('utf-8')

def verify_password(password: str, hashed_password: str) -> bool:
    return bcrypt.checkpw(password.encode('utf-8'), hashed_password.encode('utf-8'))

def create_access_token(data: dict):
    to_encode = data.copy()
   
    expire = datetime.datetime.utcnow() + datetime.timedelta(minutes=TOKEN_DURATION) 
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm="HS256")
    return encoded_jwt

