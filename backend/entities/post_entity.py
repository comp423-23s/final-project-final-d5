'''User accounts for all registered users in the application.'''


from sqlalchemy import Integer, String, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship
from typing import Self
from .entity_base import EntityBase
from ..models import User
from ..models import Post
from .post_votes_entity import post_votes_table
from .user_entity import UserEntity

__authors__ = ['Kris Jordan']
__copyright__ = 'Copyright 2023'
__license__ = 'MIT'


class PostEntity(EntityBase):
    __tablename__ = 'posts'

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    content: Mapped[str] = mapped_column(String(64), nullable=False, default='')
    
    user_id: Mapped[int] = mapped_column(ForeignKey('user.id'), nullable=True)
    user: Mapped[UserEntity] = relationship("UserEntity",back_populates='posts')

    votes: Mapped[list[UserEntity]] = relationship(secondary=post_votes_table)

    timestamp: Mapped[str] = mapped_column(String(64), nullable=False, default='')

    @classmethod
    def from_model(cls, model: Post) -> Self:
        return cls(
            id=model.id,
            content=model.content,
            user = UserEntity.from_model(model.user),
            votes= [UserEntity.from_model(vote) for vote in model.votes],
            timestamp=model.timestamp,
        )

    def to_model(self) -> Post:
        vote_num = [vote.to_model() for vote in self.votes]
        return Post(
            id=self.id,
            content=self.content,
            user=self.user.to_model(),
            votes=vote_num,
            timestamp=self.timestamp,
        )

    def update(self, model: Post) -> None:
        self.content = model.content
