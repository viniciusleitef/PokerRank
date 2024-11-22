from pydantic import BaseModel
from typing import List

class AddPlayerGameSchema(BaseModel):
    game_id: int
    user_id: int
    rebuy_value_list: List[int]
    buy_in_value: int
    totalMoney: int

    class Config:
        orm_mode = True