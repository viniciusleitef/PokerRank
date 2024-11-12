from pydantic import BaseModel
from typing import Optional

class GameSchema(BaseModel):
    league_id: int
    location: Optional[str]
    duration: Optional[str]
    buyIns: int
    rebuys: int
    totalMoney: float
    qntPlayers: int

    class Config:
        orm_mode = True