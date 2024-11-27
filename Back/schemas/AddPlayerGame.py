from pydantic import BaseModel
from typing import List

class AddPlayerGameSchema(BaseModel):
    game_id: int
    user_id: int
    rebuy_value_list: List[float]
    buy_in_value: float
    totalInvestment: float
    stack: float
    profit: float


    class Config:
        orm_mode = True