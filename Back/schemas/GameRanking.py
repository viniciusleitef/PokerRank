from pydantic import BaseModel
from typing import Optional

class GameRankingSchema(BaseModel):
    game_id: int 
    user_id: int
    profit: float

    class Config:
        orm_mode = True
