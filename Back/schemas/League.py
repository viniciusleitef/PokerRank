from pydantic import BaseModel
from typing import Optional

class LeagueSchema(BaseModel):
    user_id: int 
    name: str
    description: Optional[str] = None

    class Config:
        orm_mode = True
