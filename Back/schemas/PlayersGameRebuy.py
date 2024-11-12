from pydantic import BaseModel

class PlayersGameRebuySchema(BaseModel):
    playersGame_id: int
    rebuyValue: float

    class Config:
        orm_mode = True
