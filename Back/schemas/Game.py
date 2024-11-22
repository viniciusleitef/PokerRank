from pydantic import BaseModel
from typing import Optional

class GameSchema(BaseModel):
    league_id: int
    name: str
    location: str
    duration: Optional[str]
    gameDate: Optional[str]

    class Config:
        orm_mode = True