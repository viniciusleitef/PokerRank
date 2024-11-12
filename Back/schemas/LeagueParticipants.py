from pydantic import BaseModel
from typing import Optional

class LeagueParticipantsSchema(BaseModel):
    league_id: int 
    user_id: int

    class Config:
        orm_mode = True
