from pydantic import BaseModel

class PlayersGameSchema(BaseModel):
    game_id: int 
    user_id: int

    class Config:
        orm_mode = True
