from pydantic import BaseModel
from typing import Optional

class RankingSchema(BaseModel):
    league_id: int 
    user_id: int
    profit: float
    games_played: int
    games_won: int
    games_lost: int
    games_drawn: int

    class Config:
        orm_mode = True
