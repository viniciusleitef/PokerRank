from database import Base
from sqlalchemy import ForeignKey, Integer, String, Float, Date
from sqlalchemy.orm import relationship, mapped_column, Mapped, DeclarativeBase


class User(Base):
    __tablename__ = 'users'

    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    fullName: Mapped[str] = mapped_column(String, nullable=True, unique=False)
    username: Mapped[str] = mapped_column(String, nullable=False, unique=True)
    email: Mapped[str] = mapped_column(String, nullable=False, unique=True)
    password: Mapped[str] = mapped_column(String, nullable=False, unique=False)
    created_at: Mapped[str] = mapped_column(Date)
    updated_at: Mapped[str] = mapped_column(Date)
