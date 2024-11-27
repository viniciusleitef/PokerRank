from pydantic import BaseModel

class PlayersGameBuyinSchema(BaseModel):
    playersGame_id: int
    buyinValue: float

    class Config:
        orm_mode = True
