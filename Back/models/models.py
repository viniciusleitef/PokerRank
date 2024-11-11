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
    game_rankings = relationship("GameRanking", back_populates="player")
    players_games = relationship("PlayersGame", back_populates="user")

class League(Base):
    __tablename__ = 'leagues'

    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    user_id: Mapped[int] = mapped_column(Integer, ForeignKey('users.id'))
    name: Mapped[str] = mapped_column(String, nullable=False, unique=True)
    description: Mapped[str] = mapped_column(String, nullable=True)
    created_at: Mapped[str] = mapped_column(Date)
    updated_at: Mapped[str] = mapped_column(Date)

    user = relationship("User", back_populates="leagues")
    rankings = relationship("Ranking", back_populates="league", uselist=False)  # Apenas 1 ranking por liga
    games = relationship("Game", back_populates="league")

class Ranking(Base):
    __tablename__ = 'rankings'

    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    league_id: Mapped[int] = mapped_column(Integer, ForeignKey('leagues.id'))
    user_id: Mapped[int] = mapped_column(Integer, ForeignKey('users.id'))
    profit: Mapped[float] = mapped_column(Float, nullable=False)
    games_played: Mapped[int] = mapped_column(Integer, nullable=False)
    games_won: Mapped[int] = mapped_column(Integer, nullable=False, default=0)
    games_lost: Mapped[int] = mapped_column(Integer, nullable=False, default=0)
    games_drawn: Mapped[int] = mapped_column(Integer, nullable=False, default=0)

    user = relationship("User", back_populates="rankings")
    league = relationship("League", back_populates="rankings")

    __table_args__ = (UniqueConstraint('league_id', 'user_id', name='_league_user_uc'),)

class Game(Base):
    __tablename__ = 'games'

    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    league_id: Mapped[int] = mapped_column(Integer, ForeignKey('leagues.id'))
    location: Mapped[str] = mapped_column(String, nullable=True)
    duration: Mapped[str] = mapped_column(String, nullable=True)
    buyIns: Mapped[int] = mapped_column(Integer, nullable=False)
    rebuys: Mapped[int] = mapped_column(Integer, nullable=False)
    totalMoney: Mapped[float] = mapped_column(Float, nullable=False)
    qntPlayers: Mapped[int] = mapped_column(Integer, nullable=False)
    created_at: Mapped[str] = mapped_column(Date)
    updated_at: Mapped[str] = mapped_column(Date)

    league = relationship("League", back_populates="games")
    game_rankings = relationship("GameRanking", back_populates="game")

class PlayersGame(Base):
    __tablename__ = 'players_games'

    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    game_id: Mapped[int] = mapped_column(Integer, ForeignKey('games.id'))
    user_id: Mapped[int] = mapped_column(Integer, ForeignKey('users.id'))
    buyIn: Mapped[int] = mapped_column(Integer, nullable=False, default=1)

    game = relationship("Game", back_populates="players_games")
    user = relationship("User", back_populates="players_games")
    rebuy = relationship("PlayersGameRebuy", back_populates="players_game")

    # Garantir que a combinação game_id + user_id seja única
    __table_args__ = (UniqueConstraint('game_id', 'user_id', name='_game_user_uc'),)

class PlayersGameRebuy(Base):
    __tablename__ = 'players_games_rebuys'

    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    playersGame_id: Mapped[int] = mapped_column(Integer, ForeignKey('players_games.id'))
    rebuyValue: Mapped[float] = mapped_column(Float, nullable=False)

    players_game = relationship("PlayersGame", back_populates="rebuy")

class GameRanking(Base):
    __tablename__ = 'games_rankings'

    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    game_id: Mapped[int] = mapped_column(Integer, ForeignKey('games.id'))
    player_id: Mapped[int] = mapped_column(Integer, ForeignKey('users.id'))
    profit: Mapped[float] = mapped_column(Float, nullable=False)

    game = relationship("Game", back_populates="game_rankings")
    player = relationship("User", back_populates="game_rankings")

    # Garantir que a combinação game_id + player_id seja única
    __table_args__ = (UniqueConstraint('game_id', 'player_id', name='_game_player_uc'),)
