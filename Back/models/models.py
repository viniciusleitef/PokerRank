from sqlalchemy import ForeignKey, Integer, String, Float, Date, UniqueConstraint
from sqlalchemy.orm import relationship, mapped_column, Mapped
from database import Base

class User(Base):
    __tablename__ = 'users'

    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    fullName: Mapped[str] = mapped_column(String, nullable=True, unique=False)
    username: Mapped[str] = mapped_column(String, nullable=False, unique=True)
    email: Mapped[str] = mapped_column(String, nullable=False, unique=True)
    password: Mapped[str] = mapped_column(String, nullable=False, unique=False)
    created_at: Mapped[str] = mapped_column(Date)
    updated_at: Mapped[str] = mapped_column(Date)

    leagues = relationship("League", back_populates="user", cascade="all, delete-orphan")
    rankings = relationship("Ranking", back_populates="user")
    players_games = relationship("PlayersGame", back_populates="user")
    league_participants = relationship("LeagueParticipant", back_populates="user")

class League(Base):
    __tablename__ = 'leagues'

    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    user_id: Mapped[int] = mapped_column(Integer, ForeignKey('users.id'))
    name: Mapped[str] = mapped_column(String, nullable=False, unique=False)
    description: Mapped[str] = mapped_column(String, nullable=True)
    created_at: Mapped[str] = mapped_column(Date)
    updated_at: Mapped[str] = mapped_column(Date)

    user = relationship("User", back_populates="leagues")
    rankings = relationship("Ranking", back_populates="league", uselist=False)  # Apenas 1 ranking por liga
    games = relationship("Game", back_populates="league")
    league_participants = relationship("LeagueParticipant", back_populates="league")

class LeagueParticipant(Base):
    __tablename__ = 'league_participants'

    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    league_id: Mapped[int] = mapped_column(Integer, ForeignKey('leagues.id'))
    user_id: Mapped[int] = mapped_column(Integer, ForeignKey('users.id'))
    created_at: Mapped[str] = mapped_column(Date)

    user = relationship("User", back_populates="league_participants")
    league = relationship("League", back_populates="league_participants")

class Ranking(Base):
    __tablename__ = 'rankings'

    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    league_id: Mapped[int] = mapped_column(Integer, ForeignKey('leagues.id'))
    user_id: Mapped[int] = mapped_column(Integer, ForeignKey('users.id'))
    profit: Mapped[float] = mapped_column(Float, nullable=True)
    games_played: Mapped[int] = mapped_column(Integer, nullable=True)
    games_won: Mapped[int] = mapped_column(Integer, nullable=True, default=0)
    games_lost: Mapped[int] = mapped_column(Integer, nullable=True, default=0)
    games_drawn: Mapped[int] = mapped_column(Integer, nullable=True, default=0)
    created_at: Mapped[str] = mapped_column(Date)
    updated_at: Mapped[str] = mapped_column(Date)

    user = relationship("User", back_populates="rankings")
    league = relationship("League", back_populates="rankings")

    __table_args__ = (UniqueConstraint('league_id', 'user_id', name='_league_user_uc'),)

class Game(Base):
    __tablename__ = 'games'

    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    league_id: Mapped[int] = mapped_column(Integer, ForeignKey('leagues.id'))
    name: Mapped[str] = mapped_column(String, nullable=False, unique=True)
    location: Mapped[str] = mapped_column(String, nullable=False)
    duration: Mapped[str] = mapped_column(String, nullable=True)
    buyIns: Mapped[int] = mapped_column(Integer, nullable=True)
    rebuys: Mapped[int] = mapped_column(Integer, nullable=True)
    totalMoney: Mapped[float] = mapped_column(Float, nullable=True)
    qntPlayers: Mapped[int] = mapped_column(Integer, nullable=True)
    gameDate: Mapped[str] = mapped_column(Date, nullable=True)
    created_at: Mapped[str] = mapped_column(Date)
    updated_at: Mapped[str] = mapped_column(Date)

    league = relationship("League", back_populates="games")
    players_games = relationship("PlayersGame", back_populates="game")

class PlayersGame(Base):
    __tablename__ = 'players_games'

    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    user_id: Mapped[int] = mapped_column(Integer, ForeignKey('users.id'))
    game_id: Mapped[int] = mapped_column(Integer, ForeignKey('games.id'))
    created_at: Mapped[str] = mapped_column(Date)

    game = relationship("Game", back_populates="players_games")
    user = relationship("User", back_populates="players_games")
    rebuy = relationship("PlayersGameRebuy", back_populates="players_game")
    buyin = relationship("PlayersGameBuyin", back_populates="players_game")
    game_rankings = relationship("GameRanking", back_populates="players_game")

    # Garantir que a combinação game_id + user_id seja única
    __table_args__ = (UniqueConstraint('game_id', 'user_id', name='_game_user_uc'),)

class PlayersGameRebuy(Base):
    __tablename__ = 'players_games_rebuys'

    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    playersGame_id: Mapped[int] = mapped_column(Integer, ForeignKey('players_games.id'))
    rebuyValue: Mapped[float] = mapped_column(Float, nullable=False)
    created_at: Mapped[str] = mapped_column(Date)

    players_game = relationship("PlayersGame", back_populates="rebuy")

class PlayersGameBuyin(Base):
    __tablename__ = 'players_games_buyin'

    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    playersGame_id: Mapped[int] = mapped_column(Integer, ForeignKey('players_games.id'))
    buyinValue: Mapped[float] = mapped_column(Float, nullable=False)
    created_at: Mapped[str] = mapped_column(Date)

    players_game = relationship("PlayersGame", back_populates="buyin")

class GameRanking(Base):
    __tablename__ = 'games_rankings'

    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    playersGame_id: Mapped[int] = mapped_column(Integer, ForeignKey('players_games.id'), unique=True)
    profit: Mapped[float] = mapped_column(Float, nullable=False)
    stack: Mapped[float] = mapped_column(Float, nullable=False)
    totalInvestment: Mapped[float] = mapped_column(Float, nullable=False)
    qnt_rebuy: Mapped[int] = mapped_column(Integer, nullable = False)
    qnt_buyin: Mapped[int] = mapped_column(Integer, default = 1, nullable = False)
    rebuysValue: Mapped[float] = mapped_column(Float, nullable=False)
    buyinValue: Mapped[float] = mapped_column(Float, nullable=False)
    created_at: Mapped[str] = mapped_column(Date)
    updated_at: Mapped[str] = mapped_column(Date)

    players_game = relationship("PlayersGame", back_populates="game_rankings")
    