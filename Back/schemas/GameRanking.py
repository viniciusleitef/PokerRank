from pydantic import BaseModel
from typing import Optional

class GameRankingSchema(BaseModel):
    playersGame_id: int
    profit: float
    stack: float
    totalInvestment: float
    qnt_rebuy: int
    qnt_buyin: int
    rebuysValue: float
    buyinValue: float

    class Config:
        orm_mode = True
